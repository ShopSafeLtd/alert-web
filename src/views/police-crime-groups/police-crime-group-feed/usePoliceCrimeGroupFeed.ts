import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type {
  SharedCrimeGroupsFeedQuery,
  SharedCrimeGroupsFeedQueryVariables,
} from '../graphql/queries/__generated__/shared-crime-groups-feed.generated';

import { useSharedCrimeGroupsFeedQuery } from '../graphql/queries/__generated__/shared-crime-groups-feed.generated';

interface Return {
  compactView: boolean;
  data: SharedCrimeGroupsFeedQuery | undefined;
  fetchMoreScroll: () => void;
  loading: boolean;
  onNavigate: () => void;
  search: string;
  setCompactView: () => void;
  setSearch: (value: string) => void;
  setTableView: () => void;
  tableView: boolean;
}

const usePoliceCrimeGroupFeed = (): Return => {
  const navigate = useNavigate();
  const schemeId = useAtomValue(currentSchemeIdAtom);

  // Local State
  const [search, setSearch] = useState('');
  const [tableView, setTableViewState] = useState(false);
  const [compactView, setCompactViewState] = useState(true);

  // Query Variables
  const variables: SharedCrimeGroupsFeedQueryVariables = {
    first: compactView ? 48 : 12,
    orderBy: {
      aiSophisticationLevel: SortOrder.Desc,
      policePriorityScore: SortOrder.Desc,
      updatedAt: SortOrder.Desc,
    },
    where: {
      schemeIds: schemeId ? [schemeId] : undefined,
      search: search || undefined,
    },
  };

  // GraphQL Query
  const { data, fetchMore, loading } = useSharedCrimeGroupsFeedQuery({
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    variables,
  });

  // Handlers
  const onNavigate = () => navigate('/app/police-crime-groups/add');

  const setCompactView = () => {
    setCompactViewState(true);
    setTableViewState(false);
  };

  const setTableView = () => {
    setTableViewState(true);
    setCompactViewState(false);
  };

  const fetchMoreScroll = () => {
    const endCursor = data?.sharedCrimeGroupRelay?.pageInfo.endCursor;
    const hasNextPage = data?.sharedCrimeGroupRelay?.pageInfo.hasNextPage;

    if (hasNextPage && endCursor && !loading) {
      void fetchMore({
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          return {
            sharedCrimeGroupRelay: {
              ...fetchMoreResult.sharedCrimeGroupRelay,
              edges: [
                ...(prev.sharedCrimeGroupRelay?.edges || []),
                ...(fetchMoreResult.sharedCrimeGroupRelay?.edges || []),
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

  return {
    compactView,
    data,
    fetchMoreScroll,
    loading,
    onNavigate,
    search,
    setCompactView,
    setSearch,
    setTableView,
    tableView,
  };
};

export default usePoliceCrimeGroupFeed;
