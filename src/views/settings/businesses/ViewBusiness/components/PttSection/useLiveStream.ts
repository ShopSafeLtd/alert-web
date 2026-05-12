import type { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { createClient } from '@supabase/supabase-js';
import { useAtomValue } from 'jotai';
import { useCallback, useEffect, useRef, useState } from 'react';

import { usePttEndStreamMutation } from '../../graphql/mutations/__generated__/ptt-end-stream.generated';
import { usePttStartStreamMutation } from '../../graphql/mutations/__generated__/ptt-start-stream.generated';
import { usePttRealtimeTokenQuery } from '../../graphql/queries/__generated__/ptt-realtime-token.generated';

export type StreamStatus =
  | 'error'
  | 'idle'
  | 'requesting'
  | 'streaming'
  | 'waiting';

export interface StreamState {
  deviceId?: string;
  error?: string;
  livekitRoom?: string;
  livekitToken?: string;
  livekitUrl?: string;
  status: StreamStatus;
  streamId?: string;
}

interface UseLiveStreamResult {
  handleEndStream: () => Promise<void>;
  handleStartStream: (deviceId: string) => Promise<void>;
  streamState: StreamState;
}

export function useLiveStream(enabled: boolean): UseLiveStreamResult {
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const [streamState, setStreamState] = useState<StreamState>({
    status: 'idle',
  });

  const channelRef = useRef<RealtimeChannel | null>(null);
  const clientRef = useRef<SupabaseClient | null>(null);

  const [startStream] = usePttStartStreamMutation();
  const [endStream] = usePttEndStreamMutation();

  const { data: tokenData } = usePttRealtimeTokenQuery({
    fetchPolicy: 'cache-first',
    skip: !schemeId || !enabled,
    variables: { schemeId: schemeId ?? '' },
  });

  const cleanup = useCallback(() => {
    if (channelRef.current) {
      void channelRef.current.unsubscribe();
      channelRef.current = null;
    }
    if (clientRef.current) {
      void clientRef.current.removeAllChannels();
      clientRef.current = null;
    }
  }, []);

  useEffect(
    () => () => {
      cleanup();
    },
    [cleanup]
  );

  const handleStartStream = useCallback(
    async (deviceId: string) => {
      setStreamState({ deviceId, status: 'requesting' });
      try {
        const result = await startStream({
          variables: { deviceId, schemeId: schemeId ?? undefined },
        });
        const stream = result.data?.pttStartStream;
        if (!stream) throw new Error('No stream data returned');

        const { livekitRoom, livekitToken, livekitUrl, streamId } = stream;
        setStreamState({
          deviceId,
          livekitRoom,
          livekitToken,
          livekitUrl,
          status: 'waiting',
          streamId,
        });

        const token = tokenData?.scheme.pttRealtimeToken;
        if (!token) throw new Error('No realtime token available');

        const supabase = createClient(token.supabaseUrl, token.anonKey, {
          auth: { autoRefreshToken: false, persistSession: false },
          global: { headers: { Authorization: `Bearer ${token.accessToken}` } },
        });
        clientRef.current = supabase;

        const channel = supabase.channel(`video-stream:${streamId}`);
        channelRef.current = channel;

        channel
          .on(
            'broadcast',
            { event: 'status_update' },
            ({ payload }: { payload: { status: string } }) => {
              if (payload.status === 'streaming') {
                setStreamState({
                  deviceId,
                  livekitRoom,
                  livekitToken,
                  livekitUrl,
                  status: 'streaming',
                  streamId,
                });
              }
            }
          )
          .subscribe();
      } catch (error_) {
        const error =
          error_ instanceof Error ? error_.message : 'Failed to start stream';
        setStreamState({ deviceId, error, status: 'error' });
      }
    },
    [schemeId, startStream, tokenData]
  );

  const handleEndStream = useCallback(async () => {
    const { streamId } = streamState;
    if (!streamId) {
      cleanup();
      setStreamState({ status: 'idle' });
      return;
    }
    try {
      await endStream({
        variables: { schemeId: schemeId ?? undefined, streamId },
      });
    } finally {
      cleanup();
      setStreamState({ status: 'idle' });
    }
  }, [cleanup, endStream, schemeId, streamState]);

  return { handleEndStream, handleStartStream, streamState };
}
