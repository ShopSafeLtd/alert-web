import { useCallback, useEffect, useRef, useState } from 'react';

import type { PttEvidencePageDetailQuery } from './graphql/__generated__/ptt-evidence-detail.generated';
import type { PttEvidencePageQuery } from './graphql/__generated__/ptt-evidence-page.generated';

import { usePttEvidencePageDetailQuery } from './graphql/__generated__/ptt-evidence-detail.generated';
import { usePttEvidencePageQuery } from './graphql/__generated__/ptt-evidence-page.generated';
import { usePttFilterOptionsQuery } from './graphql/__generated__/ptt-filter-options.generated';

export type PttSession =
  PttEvidencePageQuery['scheme']['pttEvidence']['sessions'][number];
export type PttDetail = PttEvidencePageDetailQuery['pttEvidenceDetail'];

export interface PttFilters {
  deviceId: null | string;
  groupId: null | string;
  limit: number;
  since: null | string;
  status: null | string;
  until: null | string;
}

const DEFAULT_PAGE_SIZE = 20;

const BLOB_URL_TTL_MS = 55 * 60 * 1000;

export function usePttEvidence(schemeId: string) {
  const [filters, setFilters] = useState<PttFilters>({
    deviceId: null,
    groupId: null,
    limit: DEFAULT_PAGE_SIZE,
    since: null,
    status: null,
    until: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  // pageCursors[i] = cursor to fetch page i+1; pageCursors[0] = null (start)
  const [pageCursors, setPageCursors] = useState<(null | string)[]>([null]);
  const [currentPageSessions, setCurrentPageSessions] = useState<PttSession[]>(
    []
  );

  const [selectedSessionId, setSelectedSessionId] = useState<null | string>(
    null
  );
  const detailFetchedAt = useRef<null | number>(null);

  // Reset pagination whenever filters change
  useEffect(() => {
    setCurrentPage(1);
    setPageCursors([null]);
    setCurrentPageSessions([]);
  }, [
    filters.groupId,
    filters.deviceId,
    filters.since,
    filters.until,
    filters.status,
    filters.limit,
  ]);

  const cursor = pageCursors[currentPage - 1] ?? null;

  const { data, loading } = usePttEvidencePageQuery({
    fetchPolicy: 'cache-and-network',
    skip: !schemeId,
    variables: {
      cursor: cursor ?? undefined,
      deviceId: filters.deviceId ?? undefined,
      groupId: filters.deviceId ? undefined : (filters.groupId ?? undefined),
      limit: filters.limit,
      schemeId,
      since: filters.since ?? undefined,
      status: filters.status ?? undefined,
      until: filters.until ?? undefined,
    },
  });

  useEffect(() => {
    if (!data?.scheme?.pttEvidence) return;
    const serverSessions = data.scheme.pttEvidence.sessions;
    const nextCursor = data.scheme.pttEvidence.nextCursor ?? null;

    setCurrentPageSessions((prev) => {
      const serverIds = new Set(serverSessions.map((s) => s.sessionId));
      // Keep any live sessions prepended by realtime that the server hasn't returned yet
      const orphanedLive = prev.filter(
        (s) =>
          !serverIds.has(s.sessionId) &&
          (s.status === 'recording' || s.status === 'uploading')
      );
      // For sessions present in both, preserve local live status/chunkCount so realtime
      // patches survive a background refetch where the server hasn't caught up yet
      const merged = serverSessions.map((s) => {
        const live = prev.find(
          (p) =>
            p.sessionId === s.sessionId &&
            (p.status === 'recording' || p.status === 'uploading')
        );
        return live
          ? { ...s, chunkCount: live.chunkCount, status: live.status }
          : s;
      });
      return [...orphanedLive, ...merged];
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
    (currentPage - 1) * filters.limit +
    currentPageSessions.length +
    (hasNextPage ? 1 : 0);

  const onPageChange = useCallback(
    (page: number, newPageSize: number) => {
      if (newPageSize === filters.limit) {
        setCurrentPage(page);
      } else {
        setFilters((prev) => ({ ...prev, limit: newPageSize }));
      }
    },
    [filters.limit]
  );

  // Filter options — run once on mount
  const { data: filterOptionsData } = usePttFilterOptionsQuery({
    fetchPolicy: 'cache-first',
    skip: !schemeId,
    variables: { schemeId },
  });

  const devices = filterOptionsData?.scheme?.pttDevices ?? [];

  const deviceOptions = devices.map((d) => ({ label: d.name, value: d.id }));

  const groupOptions = [
    ...new Map(
      devices
        .filter((d) => d.groupId && d.groupName)
        .map((d) => [d.groupId, d.groupName])
    ).entries(),
  ].map(([value, label]) => ({
    label: label as string,
    value: value as string,
  }));

  const deviceNameMap = new Map(devices.map((d) => [d.id, d.name]));

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

  // Detail query
  const {
    data: detailData,
    loading: detailLoading,
    refetch: refetchDetail,
  } = usePttEvidencePageDetailQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: () => {
      detailFetchedAt.current = Date.now();
    },
    skip: !selectedSessionId || !schemeId,
    variables: { schemeId, sessionId: selectedSessionId! },
  });

  const onOpenDetail = (sessionId: string) => {
    if (sessionId === selectedSessionId) {
      if (
        detailFetchedAt.current &&
        Date.now() - detailFetchedAt.current > BLOB_URL_TTL_MS
      ) {
        void refetchDetail({ schemeId, sessionId });
      }
    } else {
      setSelectedSessionId(sessionId);
    }
  };

  const onCloseDetail = () => setSelectedSessionId(null);

  const setFilter = <K extends keyof PttFilters>(
    key: K,
    value: PttFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const onDateRangeChange = (dates: [Date | null, Date | null] | null) => {
    setFilters((prev) => ({
      ...prev,
      since: dates?.[0]?.toISOString() ?? null,
      until: dates?.[1]?.toISOString() ?? null,
    }));
  };

  const onReset = () => {
    setFilters({
      deviceId: null,
      groupId: null,
      limit: DEFAULT_PAGE_SIZE,
      since: null,
      status: null,
      until: null,
    });
  };

  return {
    currentPage,
    detailData: detailData?.pttEvidenceDetail ?? null,
    detailLoading,
    deviceNameMap,
    deviceOptions,
    filters,
    groupOptions,
    loading,
    onCloseDetail,
    onDateRangeChange,
    onOpenDetail,
    onPageChange,
    onReset,
    patchSession,
    prependSession,
    selectedSessionId,
    sessions: currentPageSessions,
    setFilter,
    total,
  };
}
