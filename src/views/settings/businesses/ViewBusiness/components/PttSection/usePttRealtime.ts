import type { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { createClient } from '@supabase/supabase-js';
import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';

import type { PttDevice, PttSession } from './usePttSection';

import { usePttRealtimeTokenQuery } from '../../graphql/queries/__generated__/ptt-realtime-token.generated';

// Minimum ms to show the uploading state so the user can perceive it
const MIN_UPLOADING_MS = 1500;

export interface RecordingState {
  isComplete: boolean;
  sessionId: string;
}

interface SessionStartPayload {
  device_id: string;
  session_id: string;
  started_at: string;
  thumbnail_url?: string;
}

interface SessionEndPayload {
  chunk_count: number;
  device_id: string;
  duration_ms: number;
  ended_at: string;
  session_id: string;
  total_size_bytes: number;
}

interface ChunkUploadedPayload {
  chunk_number: number;
  device_id: string;
  session_id: string;
  status: 'completed' | 'failed';
}

interface PendingUpload {
  received: Set<number>;
  total: null | number;
}

export interface UploadProgress {
  received: number;
  total: null | number;
}

interface UsePttRealtimeResult {
  onlineDeviceIds: Set<string>;
  recordingStates: Map<string, RecordingState>;
  uploadProgress: Map<string, UploadProgress>;
}

export function usePttRealtime(
  devices: PttDevice[],
  enabled: boolean,
  onSessionStart: (session: PttSession) => void,
  onSessionEnd: (sessionId: string, updates: Partial<PttSession>) => void
): UsePttRealtimeResult {
  const schemeId = useAtomValue(currentSchemeIdAtom);

  const [onlineDeviceIds, setOnlineDeviceIds] = useState<Set<string>>(
    new Set()
  );
  const [recordingStates, setRecordingStates] = useState<
    Map<string, RecordingState>
  >(new Map());
  const [uploadProgress, setUploadProgress] = useState<
    Map<string, UploadProgress>
  >(new Map());

  const clientRef = useRef<SupabaseClient | null>(null);
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingUploadsRef = useRef<Map<string, PendingUpload>>(new Map());
  // Timers for the minimum uploading display duration (when chunks already done at session:end)
  const completionTimersRef = useRef<
    Map<string, ReturnType<typeof setTimeout>>
  >(new Map());

  // Stable refs for callbacks so the effect closure always sees latest values
  const onSessionStartRef = useRef(onSessionStart);
  const onSessionEndRef = useRef(onSessionEnd);
  const devicesRef = useRef(devices);
  onSessionStartRef.current = onSessionStart;
  onSessionEndRef.current = onSessionEnd;
  devicesRef.current = devices;

  const { data: tokenData, refetch: refetchToken } = usePttRealtimeTokenQuery({
    fetchPolicy: 'no-cache',
    skip: !schemeId || !enabled,
    variables: { schemeId: schemeId ?? '' },
  });

  const accessToken = tokenData?.scheme.pttRealtimeToken.accessToken;

  useEffect(() => {
    const token = tokenData?.scheme.pttRealtimeToken;
    if (!token) return;

    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    if (clientRef.current) void clientRef.current.removeAllChannels();

    const client = createClient(token.supabaseUrl, token.anonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
      global: { headers: { Authorization: `Bearer ${token.accessToken}` } },
    });
    clientRef.current = client;

    const completeSession = (sessionId: string) => {
      onSessionEndRef.current(sessionId, { status: 'completed' });
      setUploadProgress((prev) => {
        const next = new Map(prev);
        next.delete(sessionId);
        return next;
      });
      completionTimersRef.current.delete(sessionId);
    };

    // Presence channel — online/offline dot per device
    const presenceChannel: RealtimeChannel = client.channel(
      token.presenceChannel
    );
    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        const state = presenceChannel.presenceState<{ device_id: string }>();
        const ids = new Set(
          Object.values(state)
            .flat()
            .map((p) => p.device_id)
        );
        setOnlineDeviceIds(ids);
      })
      .on(
        'presence',
        { event: 'join' },
        ({ newPresences }: { newPresences: { device_id: string }[] }) => {
          setOnlineDeviceIds((prev) => {
            const next = new Set(prev);
            for (const p of newPresences) next.add(p.device_id);
            return next;
          });
        }
      )
      .on(
        'presence',
        { event: 'leave' },
        ({ leftPresences }: { leftPresences: { device_id: string }[] }) => {
          setOnlineDeviceIds((prev) => {
            const next = new Set(prev);
            for (const p of leftPresences) next.delete(p.device_id);
            return next;
          });
        }
      )
      .subscribe();

    // Single org-wide recording channel
    client
      .channel(token.recordingChannel)
      .on(
        'broadcast',
        { event: 'session:start' },
        ({ payload }: { payload: SessionStartPayload }) => {
          const currentDevices = devicesRef.current;
          const device = currentDevices.find((d) => d.id === payload.device_id);
          if (!device) return;

          setRecordingStates((prev) => {
            const next = new Map(prev);
            next.set(payload.device_id, {
              isComplete: false,
              sessionId: payload.session_id,
            });
            return next;
          });

          onSessionStartRef.current({
            chunkCount: 0,
            deviceId: payload.device_id,
            deviceName: device.name,
            durationMs: null,
            endedAt: null,
            sessionId: payload.session_id,
            startedAt: new Date(payload.started_at),
            status: 'recording',
            thumbnailUrl: payload.thumbnail_url ?? null,
            totalSizeBytes: 0,
          });
        }
      )
      .on(
        'broadcast',
        { event: 'session:end' },
        ({ payload }: { payload: SessionEndPayload }) => {
          const currentDevices = devicesRef.current;
          const belongsToBusiness = currentDevices.some(
            (d) => d.id === payload.device_id
          );
          if (!belongsToBusiness) return;

          setRecordingStates((prev) => {
            const next = new Map(prev);
            const existing = next.get(payload.device_id);
            if (existing && existing.sessionId === payload.session_id) {
              next.set(payload.device_id, {
                isComplete: true,
                sessionId: payload.session_id,
              });
            }
            return next;
          });

          const pending = pendingUploadsRef.current.get(payload.session_id) ?? {
            received: new Set<number>(),
            total: null,
          };
          const alreadyReceived = pending.received.size;
          pending.total = payload.chunk_count;
          const allDone =
            payload.chunk_count === 0 || alreadyReceived >= payload.chunk_count;

          // Always show 'uploading' first so the card state change is visible
          onSessionEndRef.current(payload.session_id, {
            chunkCount: payload.chunk_count,
            durationMs: payload.duration_ms,
            endedAt: new Date(payload.ended_at),
            status: 'uploading',
            totalSizeBytes: payload.total_size_bytes,
          });

          setUploadProgress((prev) => {
            const next = new Map(prev);
            next.set(payload.session_id, {
              received: alreadyReceived,
              total: payload.chunk_count,
            });
            return next;
          });

          if (allDone) {
            // All chunks already uploaded during recording — hold uploading for MIN_UPLOADING_MS
            pendingUploadsRef.current.delete(payload.session_id);
            const timer = setTimeout(() => {
              completeSession(payload.session_id);
            }, MIN_UPLOADING_MS);
            completionTimersRef.current.set(payload.session_id, timer);
          } else {
            // Chunks still arriving — keep pendingUploadsRef so chunk:uploaded can detect completion
            pendingUploadsRef.current.set(payload.session_id, pending);
          }
        }
      )
      .on(
        'broadcast',
        { event: 'chunk:uploaded' },
        ({ payload }: { payload: ChunkUploadedPayload }) => {
          const currentDevices = devicesRef.current;
          const belongsToBusiness = currentDevices.some(
            (d) => d.id === payload.device_id
          );
          if (!belongsToBusiness) return;

          const pending = pendingUploadsRef.current.get(payload.session_id) ?? {
            received: new Set<number>(),
            total: null,
          };
          if (payload.status === 'completed')
            pending.received.add(payload.chunk_number);
          pendingUploadsRef.current.set(payload.session_id, pending);

          const uploadedCount = pending.received.size;
          const allReceived =
            pending.total !== null && uploadedCount >= pending.total;

          onSessionEndRef.current(payload.session_id, {
            chunkCount: uploadedCount,
          });

          if (allReceived) {
            // Last chunk just arrived naturally — complete immediately (user saw real progress)
            pendingUploadsRef.current.delete(payload.session_id);
            completeSession(payload.session_id);
          } else {
            setUploadProgress((prev) => {
              const next = new Map(prev);
              const existing = next.get(payload.session_id) ?? {
                received: 0,
                total: null,
              };
              next.set(payload.session_id, {
                received: uploadedCount,
                total: existing.total,
              });
              return next;
            });
          }
        }
      )
      .subscribe();

    // Refresh 60 seconds before token expiry
    const refreshMs = (token.expiresIn - 60) * 1000;
    refreshTimerRef.current = setTimeout(
      () => {
        void refetchToken();
      },
      Math.max(refreshMs, 0)
    );

    return () => {
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
      for (const t of completionTimersRef.current.values()) clearTimeout(t);
      completionTimersRef.current.clear();
      void client.removeAllChannels();
      clientRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return { onlineDeviceIds, recordingStates, uploadProgress };
}
