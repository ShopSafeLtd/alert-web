import type { ListOffendersForGridQuery } from 'graphql/offenders/queries/__generated__/list-offenders-for-grid.generated';
import type {
  OffenderOrderByWithRelationInput,
  OffenderWhereInput,
} from 'graphql/types';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useListOffendersForGridQuery } from 'graphql/offenders/queries/__generated__/list-offenders-for-grid.generated';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai';
import { useCallback, useMemo, useState } from 'react';

export interface OffenderFilters {
  // Empty for MVP - structure ready for future filtering
}

interface UseOffenderGridDataRelayProps {
  crimeGroupId?: string;
  defaultSortBy?: string;
  incidentId?: string;
  investigationId?: string;
  pageSize?: number;
}

export type OffenderNode =
  ListOffendersForGridQuery['listOffenders']['offenders'][number];

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

export const useOffenderGridDataRelay = ({
  crimeGroupId,
  defaultSortBy = 'incidents',
  incidentId,
  investigationId,
  pageSize: initialPageSize = 12,
}: UseOffenderGridDataRelayProps): UseOffenderGridDataRelayReturn => {
  const schemeId = useAtomValue(currentSchemeIdAtom);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortBy, setSortBy] = useState<string>(defaultSortBy);
  const [filters, setFilters] = useState<OffenderFilters>({});

  const where: OffenderWhereInput = useMemo(() => {
    const whereClause: OffenderWhereInput = {};

    if (crimeGroupId) {
      whereClause.crimeGroups = { some: { id: { equals: crimeGroupId } } };
    }

    if (incidentId) {
      whereClause.incidents = { some: { id: { equals: incidentId } } };
    }

    if (investigationId) {
      whereClause.investigations = {
        some: { id: { equals: investigationId } },
      };
    }

    return whereClause;
  }, [crimeGroupId, incidentId, investigationId]);

  const order: OffenderOrderByWithRelationInput = useMemo(() => {
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
        return { totalIncidentsCount: SortOrder.Desc };
      }
    }
  }, [sortBy]);

  const { data, error, loading, refetch } = useListOffendersForGridQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      order,
      scheme: { id: schemeId },
      skip: (page - 1) * pageSize,
      take: pageSize,
      where,
    },
  });

  const offenders = useMemo(() => data?.listOffenders?.offenders || [], [data]);

  const handlePageChange = useCallback(
    (newPage: number, newPageSize?: number) => {
      if (newPageSize && newPageSize !== pageSize) {
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
      setPage(1);
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setFilters({});
    setPage(1);
  }, []);

  const handleSortChange = useCallback((newSortBy: string) => {
    setSortBy(newSortBy);
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
    handleSortChange,
    loading,
    offenders,
    page,
    pageSize,
    refetch: handleRefetch,
    sortBy,
    totalCount: data?.listOffenders?.total || 0,
  };
};
