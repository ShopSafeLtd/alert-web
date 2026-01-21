import type { ListOffendersForGridQuery } from 'graphql/offenders/queries/__generated__/list-offenders-for-grid.generated';
import type { OffenderWhereInput } from 'graphql/types';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useListOffendersForGridQuery } from 'graphql/offenders/queries/__generated__/list-offenders-for-grid.generated';
import { useAtomValue } from 'jotai';
import { useCallback, useMemo, useState } from 'react';

export interface OffenderFilters {
  // Empty for MVP - structure ready for future filtering
  // nameSearch?: string;
  // tags?: string[];
  // gender?: Gender;
  // race?: Race;
}

interface UseOffenderGridDataProps {
  crimeGroupId?: string;
  defaultSortBy?: string;
  incidentId?: string;
  investigationId?: string;
  pageSize?: number;
}

export interface UseOffenderGridDataReturn {
  error?: Error;
  filters: OffenderFilters;
  handleClearFilters: () => void;
  handleFiltersChange: (filters: Partial<OffenderFilters>) => void;
  handlePageChange: (page: number, pageSize?: number) => void;
  handleSortChange?: (sortKey: string) => void;
  loading: boolean;
  offenders: NonNullable<
    ListOffendersForGridQuery['listOffenders']
  >['offenders'];
  page: number;
  pageSize: number;
  refetch: () => void;
  sortBy: string;
  totalCount: number;
}

export const useOffenderGridData = ({
  crimeGroupId,
  defaultSortBy = 'lastSeen',
  incidentId,
  investigationId,
  pageSize: initialPageSize = 12,
}: UseOffenderGridDataProps): UseOffenderGridDataReturn => {
  const schemeId = useAtomValue(currentSchemeIdAtom);

  // State management
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortBy] = useState<string>(defaultSortBy);
  const [filters, setFilters] = useState<OffenderFilters>({});

  // Build query variables
  const queryVariables = useMemo(() => {
    // Build where clause
    const where: OffenderWhereInput = {};

    // Context filters (at least one should be present)
    if (crimeGroupId) {
      where.crimeGroups = { some: { id: { equals: crimeGroupId } } };
    }

    if (incidentId) {
      where.incidents = { some: { id: { equals: incidentId } } };
    }

    if (investigationId) {
      where.investigations = { some: { id: { equals: investigationId } } };
    }

    // User filters (empty for MVP)
    // Future: add name search, tags, gender, race filters here

    // No orderBy - sorting is client-side via OffenderGrid
    // Pagination using take/skip

    return {
      scheme: { id: schemeId },
      skip: (page - 1) * pageSize,
      take: pageSize,
      where,
    };
  }, [
    crimeGroupId,
    incidentId,
    investigationId,
    filters,
    page,
    pageSize,
    schemeId,
  ]);

  // Execute query
  const { data, error, loading, refetch } = useListOffendersForGridQuery({
    fetchPolicy: 'cache-and-network',
    variables: queryVariables,
  });

  // Handlers
  const handlePageChange = useCallback(
    (newPage: number, newPageSize?: number) => {
      if (newPageSize && newPageSize !== pageSize) {
        // Reset to page 1 if pageSize changes
        setPageSize(newPageSize);
        setPage(1);
      } else {
        setPage(newPage);
      }
    },
    [pageSize]
  );

  const handleFiltersChange = useCallback(
    (newFilters: Partial<OffenderFilters>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
      setPage(1); // Reset to first page on filter change
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setFilters({});
    setPage(1);
  }, []);

  const handleRefetch = useCallback(() => {
    void refetch();
  }, [refetch]);

  return {
    error: error ? new Error(error.message) : undefined,
    filters,
    handleClearFilters,
    handleFiltersChange,
    handlePageChange,
    loading,
    offenders: data?.listOffenders?.offenders || [],
    page,
    pageSize,
    refetch: handleRefetch,
    sortBy,
    totalCount: data?.listOffenders?.total || 0,
  };
};
