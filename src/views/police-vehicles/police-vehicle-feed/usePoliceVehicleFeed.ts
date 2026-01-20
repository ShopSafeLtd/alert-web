import type { GeographicalFilter } from '#/components/filters/GeographicalFilterControl';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type {
  SharedVehiclesFeedQuery,
  SharedVehiclesFeedQueryVariables,
} from '../graphql/queries/__generated__/shared-vehicles-feed.generated';

import { useSharedVehiclesFeedQuery } from '../graphql/queries/__generated__/shared-vehicles-feed.generated';

interface Return {
  compactView: boolean;
  data: SharedVehiclesFeedQuery | undefined;
  fetchMoreScroll: () => void;
  geographicalFilter: GeographicalFilter | undefined;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  lightboxElements: { src: string }[];
  loading: boolean;
  onNavigate: () => void;
  openLightbox: (elements: { src: string }[], index: number) => void;
  search: string;
  setCompactView: () => void;
  setGeographicalFilter: (filter: GeographicalFilter | undefined) => void;
  setSearch: (value: string) => void;
  setTableView: () => void;
  tableView: boolean;
}

const usePoliceVehicleFeed = (): Return => {
  const navigate = useNavigate();
  const schemeId = useAtomValue(currentSchemeIdAtom);

  // Local State
  const [search, setSearch] = useState('');
  const [tableView, setTableViewState] = useState(false);
  const [compactView, setCompactViewState] = useState(true);
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
  const variables: SharedVehiclesFeedQueryVariables = {
    first: compactView ? 48 : 12,
    orderBy: {
      policePriorityScore: SortOrder.Desc,
      updatedAt: SortOrder.Desc,
    },
    where: {
      geographicalFilter: geographicalFilterInput,
      schemeIds: schemeId ? [schemeId] : undefined,
      search: search || undefined,
    },
  };

  // GraphQL Query
  const { data, fetchMore, loading } = useSharedVehiclesFeedQuery({
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    variables,
  });

  // Handlers
  const onNavigate = () => navigate('/app/police-vehicles/add');

  const setCompactView = () => {
    setCompactViewState(true);
    setTableViewState(false);
  };

  const setTableView = () => {
    setTableViewState(true);
    setCompactViewState(false);
  };

  const fetchMoreScroll = () => {
    const endCursor = data?.sharedVehicleRelay?.pageInfo.endCursor;
    const hasNextPage = data?.sharedVehicleRelay?.pageInfo.hasNextPage;

    if (hasNextPage && endCursor && !loading) {
      void fetchMore({
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          return {
            sharedVehicleRelay: {
              ...fetchMoreResult.sharedVehicleRelay,
              edges: [
                ...(prev.sharedVehicleRelay?.edges || []),
                ...(fetchMoreResult.sharedVehicleRelay?.edges || []),
              ],
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
    compactView,
    data,
    fetchMoreScroll,
    geographicalFilter,
    lightBoxOpen,
    lightboxElements,
    loading,
    onNavigate,
    openLightbox,
    search,
    setCompactView,
    setGeographicalFilter,
    setSearch,
    setTableView,
    tableView,
  };
};

export default usePoliceVehicleFeed;
