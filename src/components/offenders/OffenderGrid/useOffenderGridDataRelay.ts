import type { UnrestrictedOffendersRelayQuery } from 'graphql/offenders/queries/__generated__/unrestricted-offenders-relay.generated';
import type { UnrestrictedOffenderRelayInput } from 'graphql/types';

import { useUnrestrictedOffendersRelayQuery } from 'graphql/offenders/queries/__generated__/unrestricted-offenders-relay.generated';
import { SortOrder } from 'graphql/types';
import { useCursorPagination } from 'hooks/useCursorPagination';
import { useCallback, useEffect, useMemo, useState } from 'react';

export interface OffenderFilters {
  // Empty for MVP - structure ready for future filtering
  // nameSearch?: string;
  // tags?: string[];
  // gender?: Gender;
  // race?: Race;
}

interface UseOffenderGridDataRelayProps {
  crimeGroupId?: string;
  defaultSortBy?: string;
  incidentId?: string;
  investigationId?: string;
  pageSize?: number;
}

export type OffenderNode =
  UnrestrictedOffendersRelayQuery['unrestrictedOffendersRelay']['edges'][number]['node'];

export interface UseOffenderGridDataRelayReturn {
  error?: Error;
  filters: OffenderFilters;
  handleClearFilters: () => void;
  handleFiltersChange: (filters: Partial<OffenderFilters>) => void;
  handlePageChange: (page: number, pageSize?: number) => void;
  handleSortChange: (sortKey: string) => void;
  loading: boolean;
  offenders: OffenderNode[];
  page: number;
  pageSize: number;
  refetch: () => void;
  sortBy: string;
  totalCount: number;
}

/**
 * Relay pagination version of useOffenderGridData.
 *
 * Key differences from the original:
 * 1. Uses unrestrictedOffendersRelay query instead of listOffendersForGrid
 * 2. Uses cursor-based pagination (first/after) instead of offset (skip/take)
 * 3. Extracts nodes from edges structure
 * 4. Uses useCursorPagination for page management
 * 5. Uses simplified UnrestrictedOffenderRelayInput for filtering
 */
export const useOffenderGridDataRelay = ({
  crimeGroupId,
  defaultSortBy = 'lastSeen',
  incidentId,
  investigationId,
  pageSize: initialPageSize = 12,
}: UseOffenderGridDataRelayProps): UseOffenderGridDataRelayReturn => {
  // State management
  const [sortBy, setSortBy] = useState<string>(defaultSortBy);
  const [filters, setFilters] = useState<OffenderFilters>({});

  // Build where clause for filtering using simplified input structure
  const where: UnrestrictedOffenderRelayInput = useMemo(() => {
    const whereClause: UnrestrictedOffenderRelayInput = {};

    // Context filters (at least one should be present)
    if (crimeGroupId) {
      whereClause.crimeGroupIds = [crimeGroupId];
    }

    if (incidentId) {
      whereClause.incidentIds = [incidentId];
    }

    if (investigationId) {
      whereClause.investigationIds = [investigationId];
    }

    // User filters (empty for MVP)
    // Future: add search, approved filter here

    return whereClause;
  }, [crimeGroupId, incidentId, investigationId]);

  // Build orderBy clause from sortBy key
  const orderBy = useMemo(() => {
    switch (sortBy) {
      case 'name': {
        return { name: SortOrder.Asc };
      }
      case 'nameDesc': {
        return { name: SortOrder.Desc };
      }
      case 'incidents': {
        return { totalIncidentsCount: SortOrder.Desc };
      }
      case 'incidentsAsc': {
        return { totalIncidentsCount: SortOrder.Asc };
      }
      case 'value': {
        return { totalValueCount: SortOrder.Desc };
      }
      case 'valueAsc': {
        return { totalValueCount: SortOrder.Asc };
      }
      default: {
        // Note: "lastSeen" requires client-side sorting as it depends on latestIncident.date
        // which is not a direct field. For now, we'll use createdAt as a proxy
        // and still allow client-side sorting in the view
        return undefined;
      }
    }
  }, [sortBy]);

  // Execute query (initial load to get totalCount)
  const { data, error, loading, refetch } = useUnrestrictedOffendersRelayQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      first: initialPageSize,
      where,
      ...(orderBy && { orderBy }),
    },
  });

  // Extract pagination info from response
  const totalCount = data?.unrestrictedOffendersRelay?.totalCount || 0;
  const pageInfo = data?.unrestrictedOffendersRelay?.pageInfo;
  const currentCursor = pageInfo?.endCursor;
  const hasNextPage = pageInfo?.hasNextPage || false;

  // Use cursor pagination hook
  const {
    currentPage,
    fetchVariables,
    handlePageChange: handleCursorPageChange,
    resetPagination,
    updateCursorCache,
  } = useCursorPagination({
    currentCursor,
    hasNextPage,
    pageSize: initialPageSize,
    totalCount,
  });

  // Update cursor cache when data changes
  useEffect(() => {
    if (currentCursor && currentPage > 0) {
      updateCursorCache(currentPage, currentCursor);
    }
  }, [currentCursor, currentPage, updateCursorCache]);

  // Extract offenders from edges
  const offenders = useMemo((): OffenderNode[] => {
    if (!data?.unrestrictedOffendersRelay?.edges) {
      return [];
    }
    return data.unrestrictedOffendersRelay.edges.map((edge) => edge.node);
  }, [data]);

  // Handlers
  const handlePageChange = useCallback(
    (newPage: number, newPageSize?: number) => {
      handleCursorPageChange(newPage, newPageSize);

      // Refetch with new pagination variables
      void refetch({
        ...fetchVariables,
        first: newPageSize || initialPageSize,
        where,
        ...(orderBy && { orderBy }),
      });
    },
    [
      handleCursorPageChange,
      refetch,
      fetchVariables,
      initialPageSize,
      where,
      orderBy,
    ]
  );

  const handleFiltersChange = useCallback(
    (newFilters: Partial<OffenderFilters>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
      resetPagination(); // Reset to first page on filter change
    },
    [resetPagination]
  );

  const handleClearFilters = useCallback(() => {
    setFilters({});
    resetPagination();
  }, [resetPagination]);

  const handleSortChange = useCallback(
    (newSortBy: string) => {
      setSortBy(newSortBy);
      resetPagination(); // Reset to first page on sort change
    },
    [resetPagination]
  );

  const handleRefetch = useCallback(() => {
    void refetch();
  }, [refetch]);

  return {
    error: error ? new Error(error.message) : undefined,
    filters,
    handleClearFilters,
    handleFiltersChange,
    handlePageChange,
    handleSortChange,
    loading,
    offenders,
    page: currentPage,
    pageSize: initialPageSize,
    refetch: handleRefetch,
    sortBy,
    totalCount,
  };
};
