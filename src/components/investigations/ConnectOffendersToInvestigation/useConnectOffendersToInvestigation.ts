import type { UnrestrictedOffenderRelayInput } from 'graphql/types';
import type { CascadeOptions } from 'types/investigations';

import { notification } from 'antd';
import { useConnectOffendersToInvestigationMutation } from 'graphql/investigations/mutations/__generated__/connect-offenders-to-investigation.generated';
import { ListOffendersForGridDocument } from 'graphql/offenders/queries/__generated__/list-offenders-for-grid.generated';
import {
  UnrestrictedOffendersRelayDocument,
  useUnrestrictedOffendersRelayQuery,
} from 'graphql/offenders/queries/__generated__/unrestricted-offenders-relay.generated';
import { SortOrder } from 'graphql/types';
import { useCursorPagination } from 'hooks/useCursorPagination';
import { useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

interface Props {
  existingOffenderIds: string[];
  investigationId: string;
  investigationName: string;
  onClose: () => void;
  onSuccess?: () => void;
}

const useConnectOffendersToInvestigation = ({
  existingOffenderIds,
  investigationId,
  onClose,
  onSuccess,
}: Props) => {
  const intl = useIntl();

  // Search state
  const [search, setSearch] = useState('');
  const pageSize = 24;

  // Sort state
  const [sortBy, setSortBy] = useState('recent');

  // Selection state
  const [selectedOffenderIds, setSelectedOffenderIds] = useState<string[]>([]);

  // Cascade options state
  const [cascadeOptions, setCascadeOptions] = useState<CascadeOptions>({
    connectCrimeGroups: false,
    connectIncidents: false,
    connectVehicles: false,
  });

  // Filter state
  const [filters, setFilters] = useState({
    age: [] as string[],
    build: [] as string[],
    ethnicity: [] as string[],
    gender: [] as string[],
  });

  // Build where clause for Relay query
  // Note: UnrestrictedOffenderRelayInput only supports search, not individual filters
  const where: UnrestrictedOffenderRelayInput = useMemo(() => {
    const whereClause: UnrestrictedOffenderRelayInput = {
      // Search term (if present)
      search: search || undefined,
    };

    return whereClause;
  }, [search]);

  // Build orderBy based on sort selection
  const orderBy = useMemo(() => {
    switch (sortBy) {
      case 'recent': {
        return { createdAt: SortOrder.Desc };
      }
      case 'oldest': {
        return { createdAt: SortOrder.Asc };
      }
      case 'nameAsc': {
        return { name: SortOrder.Asc };
      }
      case 'nameDesc': {
        return { name: SortOrder.Desc };
      }
      case 'incidents': {
        return { totalIncidentsCount: SortOrder.Desc };
      }
      case 'value': {
        return { totalValueCount: SortOrder.Desc };
      }
      default: {
        return { createdAt: SortOrder.Desc };
      }
    }
  }, [sortBy]);

  // Query offenders using Relay pagination
  const { data, loading, refetch } = useUnrestrictedOffendersRelayQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      first: pageSize,
      orderBy,
      where,
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
  } = useCursorPagination({
    currentCursor,
    hasNextPage,
    pageSize,
    totalCount,
  });

  // Extract offenders from edges and apply client-side filtering
  const offenders = useMemo(() => {
    if (!data?.unrestrictedOffendersRelay?.edges) {
      return [];
    }

    // Extract nodes from edges
    let results = data.unrestrictedOffendersRelay.edges.map(
      (edge) => edge.node
    );

    // Client-side filtering for fields not supported by UnrestrictedOffenderRelayInput

    // Filter out already connected offenders
    results = results.filter(
      (offender) => !existingOffenderIds.includes(offender.id)
    );

    // Apply ethnicity filter if set
    if (filters.ethnicity.length > 0) {
      results = results.filter(
        (offender) => offender.race && filters.ethnicity.includes(offender.race)
      );
    }

    // Apply build filter if set
    if (filters.build.length > 0) {
      results = results.filter(
        (offender) => offender.build && filters.build.includes(offender.build)
      );
    }

    // Apply gender filter if set
    if (filters.gender.length > 0) {
      results = results.filter(
        (offender) =>
          offender.gender && filters.gender.includes(offender.gender)
      );
    }

    return results;
  }, [data, existingOffenderIds, filters]);

  // Connect mutation
  const [connectOffenders, { loading: submitting }] =
    useConnectOffendersToInvestigationMutation({
      onCompleted: () => {
        const addedCount = selectedOffenderIds.length;
        const offendersText =
          addedCount === 1
            ? intl.formatMessage({ defaultMessage: 'offender' })
            : intl.formatMessage({ defaultMessage: 'offenders' });

        notification.success({
          description: intl.formatMessage(
            {
              defaultMessage:
                'Added {count} {offendersText} to the investigation.',
            },
            {
              count: addedCount,
              offendersText,
            }
          ),
          message: intl.formatMessage({
            defaultMessage: 'Successfully Added!',
          }),
          placement: 'bottomRight',
        });

        onSuccess?.();
        onClose();
      },
      onError: () => {
        errorNotification();
      },
      refetchQueries: [
        {
          query: ListOffendersForGridDocument,
        },
        {
          query: UnrestrictedOffendersRelayDocument,
        },
      ],
    });

  // Toggle offender selection
  const toggleOffenderSelection = (offenderId: string) => {
    setSelectedOffenderIds((prev) => {
      if (prev.includes(offenderId)) {
        return prev.filter((id) => id !== offenderId);
      }
      return [...prev, offenderId];
    });
  };

  // Clear selection
  const clearSelection = () => {
    setSelectedOffenderIds([]);
  };

  // Handle search change
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value);
      resetPagination(); // Reset to first page on search
    },
    [resetPagination]
  );

  // Handle page change
  const handlePageChange = useCallback(
    (newPage: number) => {
      handleCursorPageChange(newPage);
      void refetch({
        after: fetchVariables.after,
        first: pageSize,
        orderBy,
        where,
      });
    },
    [handleCursorPageChange, refetch, pageSize, fetchVariables, where, orderBy]
  );

  // Handle cascade option change
  const handleCascadeOptionChange =
    (key: keyof CascadeOptions) => (checked: boolean) => {
      setCascadeOptions((prev) => ({
        ...prev,
        [key]: checked,
      }));
    };

  // Handle filter change
  const handleFilterChange = useCallback(
    (filterKey: keyof typeof filters, value: string[]) => {
      setFilters((prev) => ({
        ...prev,
        [filterKey]: value,
      }));
      resetPagination(); // Reset to first page on filter change
    },
    [resetPagination]
  );

  // Handle sort change
  const handleSortChange = useCallback(
    (value: string) => {
      setSortBy(value);
      resetPagination(); // Reset to first page on sort change
    },
    [resetPagination]
  );

  // Handle submit
  const handleSubmit = async () => {
    if (selectedOffenderIds.length === 0) return;

    await connectOffenders({
      variables: {
        data: {
          investigationId,
          offenderIds: selectedOffenderIds,
          ...cascadeOptions,
        },
      },
    });
  };

  // Get selected offenders data
  // Note: selectedOffenders might not all be in current page's offenders array
  // We need to maintain a separate cache or just use the IDs
  const selectedOffenders = useMemo(() => {
    if (!data?.unrestrictedOffendersRelay?.edges) {
      return [];
    }

    // Find selected offenders from all edges
    const allOffenders = data.unrestrictedOffendersRelay.edges.map(
      (edge) => edge.node
    );
    return allOffenders.filter((offender) =>
      selectedOffenderIds.includes(offender.id)
    );
  }, [data, selectedOffenderIds]);

  return {
    // Cascade options
    cascadeOptions,
    // Selection
    clearSelection,
    // Filters
    filters,
    // Actions
    handleCancel: onClose,
    // Cascade options
    handleCascadeOptionChange,
    // Filters
    handleFilterChange,
    // Pagination
    handlePageChange,
    // Search
    handleSearchChange,
    // Sort
    handleSortChange,
    // Actions
    handleSubmit,
    // Data
    loading,
    // Data
    offenders, // Now filtered list from relay edges
    // Pagination
    page: currentPage, // Use currentPage from useCursorPagination
    // Pagination
    pageSize,
    // Search
    search,
    // Selection
    selectedOffenderIds,
    // Selection
    selectedOffenders,
    // Sort
    sortBy,
    // Data
    submitting,
    // Selection
    toggleOffenderSelection,
    // Data
    total: totalCount, // Total count from relay
  };
};

export default useConnectOffendersToInvestigation;
