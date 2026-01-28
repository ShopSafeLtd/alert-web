import type { ListIncidentsForTableQuery } from 'graphql/incidents/queries/__generated__/list-incidents-for-table.generated';
import type { IncidentWhereInput } from 'graphql/types';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useListIncidentsForTableQuery } from 'graphql/incidents/queries/__generated__/list-incidents-for-table.generated';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai';
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

interface UseIncidentTableDataProps {
  crimeGroupId?: string;
  defaultSortField?: 'date';
  defaultSortOrder?: 'ascend' | 'descend';
  investigationId?: string;
  offenderId?: string;
  pageSize?: number;
}

export interface UseIncidentTableDataReturn {
  error?: Error;
  filters: IncidentFilters;
  handleClearFilters: () => void;
  handleFiltersChange: (filters: Partial<IncidentFilters>) => void;
  handlePageChange: (page: number, pageSize?: number) => void;
  handleSortChange: (field: 'date', order: 'ascend' | 'descend') => void;
  incidents: NonNullable<
    ListIncidentsForTableQuery['listIncidents']
  >['incidents'];
  loading: boolean;
  page: number;
  pageSize: number;
  refetch: () => void;
  sortField: 'date';
  sortOrder: 'ascend' | 'descend';
  totalCount: number;
}

export const useIncidentTableData = ({
  crimeGroupId,
  defaultSortField = 'date',
  defaultSortOrder = 'descend',
  investigationId,
  offenderId,
  pageSize: initialPageSize = 10,
}: UseIncidentTableDataProps): UseIncidentTableDataReturn => {
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const [instanceId] = useState(() => {
    const id = Math.random().toString(36).slice(7);
    console.log('[useIncidentTableData] Hook instance created:', id);
    return id;
  });

  // State management
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortField, setSortField] = useState<'date'>(defaultSortField);
  const [sortOrder, setSortOrder] = useState<'ascend' | 'descend'>(
    defaultSortOrder
  );
  const [filters, setFilters] = useState<IncidentFilters>({});

  // Debug: Track page state changes
  useEffect(() => {
    console.log(
      `[useIncidentTableData:${instanceId}] Page state changed to:`,
      page
    );
  }, [page, instanceId]);

  // Build query variables
  const queryVariables = useMemo(() => {
    // Build where clause
    const where: IncidentWhereInput = {};

    // Context filters (required - at least one should be present, or neither for all incidents)
    if (investigationId) {
      where.investigations = { some: { id: { equals: investigationId } } };
    }

    if (offenderId) {
      where.offenders = { some: { id: { equals: offenderId } } };
    }

    if (crimeGroupId) {
      where.offenders = {
        some: { crimeGroups: { some: { id: { equals: crimeGroupId } } } },
      };
    }

    // User filters (optional)
    if (filters.crimeTypes && filters.crimeTypes.length > 0) {
      where.crimeTypes = { some: { id: { in: filters.crimeTypes } } };
    }

    if (filters.hasCrimeReference !== undefined) {
      // Filter by whether policeRef exists or not
      where.policeRef = filters.hasCrimeReference
        ? { not: { equals: null } }
        : { equals: null };
    }

    if (filters.offenderId) {
      where.offenders = { some: { id: { equals: filters.offenderId } } };
    }

    if (filters.locationId) {
      where.business = { id: { equals: filters.locationId } };
    }

    if (filters.dateRange) {
      where.date = {
        gte: filters.dateRange.startDate,
        lte: filters.dateRange.endDate,
      };
    }

    // Build orderBy clause
    const orderBy = {
      date: sortOrder === 'ascend' ? SortOrder.Asc : SortOrder.Desc,
    };

    const vars = {
      order: orderBy,
      scheme: { id: schemeId },
      skip: (page - 1) * pageSize,
      take: pageSize,
      where,
    };

    console.log(
      `[useIncidentTableData:${instanceId}] Query variables computed:`,
      {
        page,
        pageSize,
        skip: vars.skip,
        take: vars.take,
      }
    );

    return vars;
  }, [
    crimeGroupId,
    investigationId,
    offenderId,
    filters,
    sortOrder,
    page,
    pageSize,
    schemeId,
    instanceId,
  ]);

  // Execute query
  const { data, error, loading, networkStatus, refetch } =
    useListIncidentsForTableQuery({
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      variables: queryVariables,
    });

  console.log(`[useIncidentTableData:${instanceId}] Query state:`, {
    dataCount: data?.listIncidents?.incidents.length || 0,
    loading,
    networkStatus,
    page,
    pageSize,
  });

  // NetworkStatus 4 means refetch is in progress
  // This ensures loading state is true during pagination changes
  const isRefetching = networkStatus === 4;
  const isLoading = loading || isRefetching;

  // Handlers
  const handlePageChange = useCallback(
    (newPage: number, newPageSize?: number) => {
      console.log(
        `[useIncidentTableData:${instanceId}] handlePageChange called:`,
        {
          newPage,
          newPageSize,
        }
      );

      if (newPageSize && newPageSize !== pageSize) {
        // Reset to page 1 if pageSize changes
        console.log(
          `[useIncidentTableData:${instanceId}] Setting pageSize to:`,
          newPageSize,
          'and page to 1'
        );
        setPageSize(newPageSize);
        setPage(1);
      } else {
        console.log(
          `[useIncidentTableData:${instanceId}] About to call setPage with:`,
          newPage
        );
        setPage((prevPage) => {
          console.log(
            `[useIncidentTableData:${instanceId}] setPage callback - prevPage:`,
            prevPage,
            'newPage:',
            newPage
          );
          return newPage;
        });
      }
    },
    [pageSize, instanceId]
  );

  const handleSortChange = useCallback(
    (field: 'date', order: 'ascend' | 'descend') => {
      setSortField(field);
      setSortOrder(order);
      setPage(1); // Reset to first page on sort change
    },
    []
  );

  const handleFiltersChange = useCallback(
    (newFilters: Partial<IncidentFilters>) => {
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
    handleSortChange,
    incidents: data?.listIncidents?.incidents || [],
    loading: isLoading,
    page,
    pageSize,
    refetch: handleRefetch,
    sortField,
    sortOrder,
    totalCount: data?.listIncidents?.total || 0,
  };
};
