import type { GeographicalFilter } from '#/components/filters/GeographicalFilterControl';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import dayjs from 'dayjs';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type {
  SharedOffendersFeedQuery,
  SharedOffendersFeedQueryVariables,
} from '../graphql/queries/__generated__/shared-offenders-feed.generated';

import { useSharedOffendersFeedQuery } from '../graphql/queries/__generated__/shared-offenders-feed.generated';

type DateFilter = '3months' | '6months' | '30days' | 'all' | 'custom';
type BooleanFilter = 'all' | 'false' | 'true';
type PriorityFilter = 'all' | 'high' | 'low' | 'medium';
type SortOption = 'incidents' | 'priority' | 'recent' | 'value';
type SortBy = SortOption[];

interface Return {
  customDateRange: {
    endDate: null | string;
    startDate: null | string;
  };
  data: SharedOffendersFeedQuery | undefined;
  dateFilter: DateFilter;
  fetchMoreScroll: () => void;
  geographicalFilter: GeographicalFilter | undefined;
  hasImageFilter: BooleanFilter;
  hasNameFilter: BooleanFilter;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  lightboxElements: { src: string }[];
  loading: boolean;
  onNavigate: () => void;
  openLightbox: (elements: { src: string }[], index: number) => void;
  priorityFilter: PriorityFilter;
  search: string;
  setCustomDateRange: (range: {
    endDate: null | string;
    startDate: null | string;
  }) => void;
  setDateFilter: (value: DateFilter) => void;
  setGeographicalFilter: (filter: GeographicalFilter | undefined) => void;
  setHasImageFilter: (value: BooleanFilter) => void;
  setHasNameFilter: (value: BooleanFilter) => void;
  setLightBoxOpen: (state: { index: number; open: boolean }) => void;
  setPriorityFilter: (value: PriorityFilter) => void;
  setSearch: (value: string) => void;
  setSortBy: (value: SortBy) => void;
  sortBy: SortBy;
}

const usePoliceOffenderFeed = (): Return => {
  const navigate = useNavigate();
  const schemeId = useAtomValue(currentSchemeIdAtom);

  // Local State
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [customDateRange, setCustomDateRange] = useState<{
    endDate: null | string;
    startDate: null | string;
  }>({
    endDate: null,
    startDate: null,
  });
  const [hasImageFilter, setHasImageFilter] = useState<BooleanFilter>('all');
  const [hasNameFilter, setHasNameFilter] = useState<BooleanFilter>('all');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [sortBy, setSortBy] = useState<SortBy>(['priority']);
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  const [lightBoxOpen, setLightBoxOpen] = useState({
    index: 0,
    open: false,
  });
  const [geographicalFilter, setGeographicalFilter] = useState<
    GeographicalFilter | undefined
  >(undefined);

  // Filter helpers - memoized to prevent unnecessary re-renders
  const dateRange = useMemo(() => {
    const now = dayjs();
    switch (dateFilter) {
      case 'all': {
        return {};
      }
      case '6months': {
        return {
          lastIncidentAfter: now.subtract(6, 'months').toDate(),
        };
      }
      case '3months': {
        return {
          lastIncidentAfter: now.subtract(3, 'months').toDate(),
        };
      }
      case '30days': {
        return {
          lastIncidentAfter: now.subtract(30, 'days').toDate(),
        };
      }
      case 'custom': {
        return {
          ...(customDateRange.startDate && {
            lastIncidentAfter: new Date(customDateRange.startDate),
          }),
          ...(customDateRange.endDate && {
            lastIncidentBefore: new Date(customDateRange.endDate),
          }),
        };
      }
    }
  }, [dateFilter, customDateRange.startDate, customDateRange.endDate]);

  const hasImagesValue = useMemo(() => {
    if (hasImageFilter === 'all') return undefined;
    return hasImageFilter === 'true';
  }, [hasImageFilter]);

  const hasNameValue = useMemo(() => {
    if (hasNameFilter === 'all') return undefined;
    return hasNameFilter === 'true';
  }, [hasNameFilter]);

  const priorityRange = useMemo(() => {
    switch (priorityFilter) {
      case 'high': {
        return { policePriorityScoreMin: 70 };
      }
      case 'medium': {
        return { policePriorityScoreMax: 69, policePriorityScoreMin: 40 };
      }
      case 'low': {
        return { policePriorityScoreMax: 39 };
      }
      default: {
        return {};
      }
    }
  }, [priorityFilter]);

  const orderBy = useMemo(() => {
    const orderByObj: Record<string, SortOrder> = {};

    // Apply sorts in priority order based on user selection
    // Priority order: policePriorityScore > totalIncidents > totalLossValue > lastIncidentAt
    if (sortBy.includes('priority')) {
      orderByObj.policePriorityScore = SortOrder.Desc;
    }
    if (sortBy.includes('incidents')) {
      orderByObj.totalIncidents = SortOrder.Desc;
    }
    if (sortBy.includes('value')) {
      orderByObj.totalLossValue = SortOrder.Desc;
    }
    if (sortBy.includes('recent')) {
      orderByObj.lastIncidentAt = SortOrder.Desc;
    }

    // Default to priority if nothing selected
    if (Object.keys(orderByObj).length === 0) {
      orderByObj.policePriorityScore = SortOrder.Desc;
    }

    return orderByObj;
  }, [sortBy]);

  // Convert geographical filter to GraphQL input format
  const geographicalFilterInput = useMemo(() => {
    if (!geographicalFilter) return undefined;

    if (geographicalFilter.type === 'saved' && geographicalFilter.areaId) {
      return { areaId: geographicalFilter.areaId };
    }

    if (geographicalFilter.type === 'inline') {
      if (geographicalFilter.circle) {
        return { circle: geographicalFilter.circle };
      }
      if (geographicalFilter.polygon) {
        return { polygon: geographicalFilter.polygon };
      }
    }

    return undefined;
  }, [geographicalFilter]);

  // Query Variables
  const variables: SharedOffendersFeedQueryVariables = useMemo(
    () => ({
      first: 48,
      orderBy,
      where: {
        schemeIds: schemeId ? [schemeId] : undefined,
        search: search || undefined,
        ...dateRange,
        hasImages: hasImagesValue,
        hasName: hasNameValue,
        ...priorityRange,
        geographicalFilter: geographicalFilterInput,
      },
    }),
    [
      schemeId,
      search,
      dateRange,
      hasImagesValue,
      hasNameValue,
      priorityRange,
      orderBy,
      geographicalFilterInput,
    ]
  );

  // GraphQL Query
  const { data, fetchMore, loading } = useSharedOffendersFeedQuery({
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    variables,
  });

  // Handlers
  const onNavigate = () => navigate('/app/police-offenders/add');

  const fetchMoreScroll = () => {
    const endCursor = data?.sharedOffenderRelay?.pageInfo.endCursor;
    const hasNextPage = data?.sharedOffenderRelay?.pageInfo.hasNextPage;

    if (hasNextPage && endCursor && !loading) {
      void fetchMore({
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          // Deduplicate edges by node ID to prevent duplicate keys
          const prevEdges = prev.sharedOffenderRelay?.edges || [];
          const newEdges = fetchMoreResult.sharedOffenderRelay?.edges || [];

          const seenIds = new Set(prevEdges.map((edge) => edge.node.id));
          const uniqueNewEdges = newEdges.filter(
            (edge) => !seenIds.has(edge.node.id)
          );

          return {
            sharedOffenderRelay: {
              ...fetchMoreResult.sharedOffenderRelay,
              edges: [...prevEdges, ...uniqueNewEdges],
            },
          };
        },
        variables: {
          after: endCursor,
          first: variables.first,
          orderBy: variables.orderBy,
          where: variables.where,
        },
      });
    }
  };

  const openLightbox = (elements: { src: string }[], index: number) => {
    setLightboxElements(elements);
    setLightBoxOpen({
      index,
      open: true,
    });
  };

  return {
    customDateRange,
    data,
    dateFilter,
    fetchMoreScroll,
    geographicalFilter,
    hasImageFilter,
    hasNameFilter,
    lightBoxOpen,
    lightboxElements,
    loading,
    onNavigate,
    openLightbox,
    priorityFilter,
    search,
    setCustomDateRange,
    setDateFilter,
    setGeographicalFilter,
    setHasImageFilter,
    setHasNameFilter,
    setLightBoxOpen,
    setPriorityFilter,
    setSearch,
    setSortBy,
    sortBy,
  };
};

export default usePoliceOffenderFeed;
