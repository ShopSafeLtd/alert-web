import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useAtomValue } from 'jotai';
import { useCallback, useEffect, useState } from 'react';

import type { BusinessPttDataQuery } from '../../graphql/queries/__generated__/business-ptt-data.generated';
import type { PttEvidenceDetailQuery } from '../../graphql/queries/__generated__/ptt-evidence-detail.generated';

import { useBusinessPttDataQuery } from '../../graphql/queries/__generated__/business-ptt-data.generated';
import { usePttEvidenceDetailQuery } from '../../graphql/queries/__generated__/ptt-evidence-detail.generated';

export type PttDevice = BusinessPttDataQuery['scheme']['pttDevices'][number];
export type PttSession =
  BusinessPttDataQuery['scheme']['pttEvidence']['sessions'][number];
type PttDetail = PttEvidenceDetailQuery['pttEvidenceDetail'];

const DEFAULT_PAGE_SIZE = 12;

interface UsePttSectionResult {
  currentPage: number;
  detailData: PttDetail | null;
  detailError: Error | undefined;
  detailLoading: boolean;
  devices: PttDevice[];
  loading: boolean;
  notConfigured: boolean;
  onCloseDrawer: () => void;
  onPageChange: (page: number, pageSize: number) => void;
  onSelectSession: (sessionId: string) => void;
  pageSize: number;
  patchSession: (sessionId: string, updates: Partial<PttSession>) => void;
  prependSession: (session: PttSession) => void;
  pttEnabled: boolean;
  refetchDetail: () => void;
  selectedSessionId: null | string;
  sessions: PttSession[];
  total: number;
}

export function usePttSection(
  businessId: string,
  pttGroupId: null | string | undefined
): UsePttSectionResult {
  const schemeId = useAtomValue(currentSchemeIdAtom);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  // pageCursors[i] is the cursor needed to fetch page i+1 (0-indexed, pageCursors[0] = null)
  const [pageCursors, setPageCursors] = useState<(null | string)[]>([null]);
  const [currentPageSessions, setCurrentPageSessions] = useState<PttSession[]>(
    []
  );
  const [selectedSessionId, setSelectedSessionId] = useState<null | string>(
    null
  );

  const skip = !schemeId || !businessId || !pttGroupId;
  const cursor = pageCursors[currentPage - 1] ?? null;

  const { data, loading } = useBusinessPttDataQuery({
    fetchPolicy: 'cache-and-network',
    skip,
    variables: {
      businessId,
      cursor: cursor ?? undefined,
      limit: pageSize,
      schemeId: schemeId ?? '',
    },
  });

  useEffect(() => {
    if (!data?.scheme.pttEvidence) return;
    const incoming = data.scheme.pttEvidence.sessions;
    const nextCursor = data.scheme.pttEvidence.nextCursor ?? null;

    setCurrentPageSessions((prev) => {
      const prevMap = new Map(prev.map((s) => [s.sessionId, s]));
      const incomingIds = new Set(incoming.map((s) => s.sessionId));

      // Merge server data, preserving local 'uploading' status regardless of what the server
      // returns — completion is driven by the realtime timer/chunk events, not server data
      const merged = incoming.map((s) => {
        const local = prevMap.get(s.sessionId);
        if (local?.status === 'uploading') {
          return { ...s, status: 'uploading' };
        }
        return s;
      });

      // Keep realtime-prepended sessions not yet reflected in server data
      const realtimeOnly = prev.filter(
        (s) =>
          !incomingIds.has(s.sessionId) &&
          (s.status === 'recording' || s.status === 'uploading')
      );

      return [...realtimeOnly, ...merged];
    });

    setPageCursors((prev) => {
      if (prev.length <= currentPage) {
        const updated = [...prev];
        updated[currentPage] = nextCursor;
        return updated;
      }
      return prev;
    });
  }, [data, currentPage]);

  const hasNextPage = !!data?.scheme?.pttEvidence?.nextCursor;
  const total =
    (currentPage - 1) * pageSize +
    currentPageSessions.length +
    (hasNextPage ? 1 : 0);

  const onPageChange = useCallback(
    (page: number, newPageSize: number) => {
      if (newPageSize === pageSize) {
        setCurrentPage(page);
      } else {
        setPageSize(newPageSize);
        setCurrentPage(1);
        setPageCursors([null]);
        setCurrentPageSessions([]);
      }
    },
    [pageSize]
  );

  const {
    data: detailQueryData,
    error: detailError,
    loading: detailLoading,
    refetch: refetchDetail,
    startPolling: startDetailPolling,
    stopPolling: stopDetailPolling,
  } = usePttEvidenceDetailQuery({
    fetchPolicy: 'no-cache',
    skip: !selectedSessionId || !schemeId,
    variables: {
      schemeId: schemeId ?? '',
      sessionId: selectedSessionId ?? '',
    },
  });

  const detailChunkCount =
    detailQueryData?.pttEvidenceDetail?.chunks.length ?? 0;

  // Poll every 2s while the drawer is open but chunks haven't loaded yet —
  // the PTT Admin API can lag a few seconds behind the upload completing.
  useEffect(() => {
    if (selectedSessionId && detailChunkCount === 0) {
      startDetailPolling(2000);
    } else {
      stopDetailPolling();
    }
    return () => stopDetailPolling();
  }, [
    selectedSessionId,
    detailChunkCount,
    startDetailPolling,
    stopDetailPolling,
  ]);

  const onSelectSession = useCallback((sessionId: string) => {
    setSelectedSessionId(sessionId);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setSelectedSessionId(null);
  }, []);

  const prependSession = useCallback((session: PttSession) => {
    setCurrentPageSessions((prev) => [session, ...prev]);
  }, []);

  const patchSession = useCallback(
    (sessionId: string, updates: Partial<PttSession>) => {
      setCurrentPageSessions((prev) =>
        prev.map((s) => (s.sessionId === sessionId ? { ...s, ...updates } : s))
      );
    },
    []
  );

  const handleRefetchDetail = useCallback(() => {
    void refetchDetail();
  }, [refetchDetail]);

  return {
    currentPage,
    detailData: detailQueryData?.pttEvidenceDetail ?? null,
    detailError,
    detailLoading,
    devices: data?.scheme.pttDevices ?? [],
    loading,
    notConfigured: !pttGroupId,
    onCloseDrawer,
    onPageChange,
    onSelectSession,
    pageSize,
    patchSession,
    prependSession,
    pttEnabled: data?.scheme.pttEnabled ?? false,
    refetchDetail: handleRefetchDetail,
    selectedSessionId,
    sessions: currentPageSessions,
    total,
  };
}
