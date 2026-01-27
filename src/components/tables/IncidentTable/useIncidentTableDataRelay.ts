import type { UnrestrictedIncidentsRelayQuery } from 'graphql/incidents/queries/__generated__/unrestricted-incidents-relay.generated';
import type { UnrestrictedIncidentRelayInput } from 'graphql/types';

import { useUnrestrictedIncidentsRelayQuery } from 'graphql/incidents/queries/__generated__/unrestricted-incidents-relay.generated';
import { SortOrder } from 'graphql/types';
import { useCursorPagination } from 'hooks/useCursorPagination';
import { useCallback, useEffect, useMemo, useState } from 'react';

export interface IncidentFilters {
  crimeTypes?: string[];
  dateRange?: {
    endDate: Date;
    startDate: Date;
  };
  hasCrimeReference?: boolean;
  locationId?: string;
  offenderId?: string;
}

interface UseIncidentTableDataRelayProps {
  crimeGroupId?: string;
  defaultSortField?: 'date';
  defaultSortOrder?: 'ascend' | 'descend';
  investigationId?: string;
  offenderId?: string;
  pageSize?: number;
}

export type IncidentNode =
  UnrestrictedIncidentsRelayQuery['unrestrictedIncidentsRelay']['edges'][number]['node'];

export interface UseIncidentTableDataRelayReturn {
  error?: Error;
  filters: IncidentFilters;
  handleClearFilters: () => void;
  handleFiltersChange: (filters: Partial<IncidentFilters>) => void;
  handlePageChange: (page: number, pageSize?: number) => void;
  handleSortChange: (field: 'date', order: 'ascend' | 'descend') => void;
  incidents: IncidentNode[];
  loading: boolean;
  page: number;
  pageSize: number;
  refetch: () => void;
  sortField: 'date';
  sortOrder: 'ascend' | 'descend';
  totalCount: number;
}

/**
 * Relay pagination version of useIncidentTableData.
 *
 * Key differences from the original:
 * 1. Uses unrestrictedIncidentsRelay query instead of listIncidentsForTable
 * 2. Uses cursor-based pagination (first/after) instead of offset (skip/take)
 * 3. Extracts nodes from edges structure
 * 4. Uses useCursorPagination for page management
 * 5. Uses UnrestrictedIncidentRelayInput for server-side filtering
 * 6. All filters now server-side: crimeTypes, hasCrimeReference, locationId, dateRange
 *
 * Note: All filtering is server-side, so totalCount accurately reflects filtered results.
 */
export const useIncidentTableDataRelay = ({
  crimeGroupId,
  defaultSortField = 'date',
  defaultSortOrder = 'descend',
  investigationId,
  offenderId,
  pageSize: initialPageSize = 10,
}: UseIncidentTableDataRelayProps): UseIncidentTableDataRelayReturn => {
  // State management
  const [sortField, setSortField] = useState<'date'>(defaultSortField);
  const [sortOrder, setSortOrder] = useState<'ascend' | 'descend'>(
    defaultSortOrder
  );
  const [filters, setFilters] = useState<IncidentFilters>({});

  // Build where clause using simplified input structure with server-side filters
  const where: UnrestrictedIncidentRelayInput = useMemo(() => {
    const whereClause: UnrestrictedIncidentRelayInput = {
      approved: true, // Only show approved incidents
    };

    // Context filters (required - at least one should be present)
    if (investigationId) {
      whereClause.investigationIds = [investigationId];
    }

    if (offenderId) {
      whereClause.offenderIds = [offenderId];
    }

    if (crimeGroupId) {
      whereClause.crimeGroupIds = [crimeGroupId];
    }

    // User filters - now all server-side!
    if (filters.crimeTypes && filters.crimeTypes.length > 0) {
      whereClause.crimeTypes = filters.crimeTypes;
    }

    if (filters.hasCrimeReference !== undefined) {
      whereClause.hasCrimeReference = filters.hasCrimeReference;
    }

    if (filters.locationId) {
      whereClause.locationId = filters.locationId;
    }

    if (filters.dateRange) {
      whereClause.dateRange = {
        gte: filters.dateRange.startDate,
        lte: filters.dateRange.endDate,
      };
    }

    return whereClause;
  }, [crimeGroupId, investigationId, offenderId, filters]);

  // Build orderBy clause
  const orderBy = useMemo(
    () => ({
      date: sortOrder === 'ascend' ? SortOrder.Asc : SortOrder.Desc,
    }),
    [sortOrder]
  );

  // Execute query
  const { data, error, loading, networkStatus, refetch } =
    useUnrestrictedIncidentsRelayQuery({
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      variables: {
        after: undefined,
        first: initialPageSize,
        orderBy,
        where,
      },
    });

  // NetworkStatus 4 means refetch is in progress
  // This ensures loading state is true during pagination changes
  const isRefetching = networkStatus === 4;
  const isLoading = loading || isRefetching;

  // Extract pagination info from response
  const totalCount = data?.unrestrictedIncidentsRelay?.totalCount || 0;
  const pageInfo = data?.unrestrictedIncidentsRelay?.pageInfo;
  const currentCursor = pageInfo?.endCursor;
  const hasNextPage = pageInfo?.hasNextPage || false;

  // Use cursor pagination hook
  const {
    currentPage,
    getCursorForPage,
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

  // Extract incidents from edges - all filtering is now server-side
  const incidents = useMemo((): IncidentNode[] => {
    if (!data?.unrestrictedIncidentsRelay?.edges) {
      return [];
    }
    return data.unrestrictedIncidentsRelay.edges.map((edge) => edge.node);
  }, [data]);

  // Handlers
  const handlePageChange = useCallback(
    (newPage: number, newPageSize?: number) => {
      handleCursorPageChange(newPage, newPageSize);

      // Compute the cursor for the new page directly to avoid stale state
      const cursorForNewPage = getCursorForPage(newPage);

      // Refetch with new pagination variables
      void refetch({
        after: cursorForNewPage,
        first: newPageSize || initialPageSize,
        orderBy,
        where,
      });
    },
    [
      handleCursorPageChange,
      getCursorForPage,
      refetch,
      initialPageSize,
      where,
      orderBy,
    ]
  );

  const handleSortChange = useCallback(
    (field: 'date', order: 'ascend' | 'descend') => {
      setSortField(field);
      setSortOrder(order);
      resetPagination(); // Reset to first page on sort change
    },
    [resetPagination]
  );

  const handleFiltersChange = useCallback(
    (newFilters: Partial<IncidentFilters>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
      resetPagination(); // Reset to first page on filter change
    },
    [resetPagination]
  );

  const handleClearFilters = useCallback(() => {
    setFilters({});
    resetPagination();
  }, [resetPagination]);

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
    incidents,
    loading: isLoading,
    page: currentPage,
    pageSize: initialPageSize,
    refetch: handleRefetch,
    sortField,
    sortOrder,
    totalCount,
  };
};
