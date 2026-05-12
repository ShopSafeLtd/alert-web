import type { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { createClient } from '@supabase/supabase-js';
import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';

import type { PttSession } from './usePttEvidence';

import { usePttEvidencePageRealtimeTokenQuery } from './graphql/__generated__/ptt-realtime-token.generated';

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

export interface UsePttRealtimeResult {
  onlineDeviceIds: Set<string>;
  recordingStates: Map<string, RecordingState>;
}

// deviceNames is used to construct the session object on session:start; it's a
// map of deviceId → deviceName sourced from the filter-options query.
export function usePttRealtime(
  deviceNames: Map<string, string>,
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

  const clientRef = useRef<SupabaseClient | null>(null);
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingUploadsRef = useRef<Map<string, PendingUpload>>(new Map());

  const onSessionStartRef = useRef(onSessionStart);
  const onSessionEndRef = useRef(onSessionEnd);
  const deviceNamesRef = useRef(deviceNames);
  onSessionStartRef.current = onSessionStart;
  onSessionEndRef.current = onSessionEnd;
  deviceNamesRef.current = deviceNames;

  const { data: tokenData, refetch: refetchToken } =
    usePttEvidencePageRealtimeTokenQuery({
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

    client
      .channel(token.recordingChannel)
      .on(
        'broadcast',
        { event: 'session:start' },
        ({ payload }: { payload: SessionStartPayload }) => {
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
            deviceName:
              deviceNamesRef.current.get(payload.device_id) ??
              payload.device_id,
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
          pending.total = payload.chunk_count;
          pendingUploadsRef.current.set(payload.session_id, pending);

          const allReceived =
            payload.chunk_count === 0 ||
            pending.received.size >= payload.chunk_count;

          onSessionEndRef.current(payload.session_id, {
            chunkCount: payload.chunk_count,
            durationMs: payload.duration_ms,
            endedAt: new Date(payload.ended_at),
            status: allReceived ? 'completed' : 'uploading',
            totalSizeBytes: payload.total_size_bytes,
          });

          if (allReceived) pendingUploadsRef.current.delete(payload.session_id);
        }
      )
      .on(
        'broadcast',
        { event: 'chunk:uploaded' },
        ({ payload }: { payload: ChunkUploadedPayload }) => {
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
            ...(allReceived ? { status: 'completed' } : {}),
          });

          if (allReceived) pendingUploadsRef.current.delete(payload.session_id);
        }
      )
      .subscribe();

    const refreshMs = (token.expiresIn - 60) * 1000;
    refreshTimerRef.current = setTimeout(
      () => {
        void refetchToken();
      },
      Math.max(refreshMs, 0)
    );

    return () => {
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
      void client.removeAllChannels();
      clientRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return { onlineDeviceIds, recordingStates };
}
