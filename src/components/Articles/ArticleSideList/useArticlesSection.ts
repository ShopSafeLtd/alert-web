import { useStoreActions, useStoreState } from 'state';
import type {
  ListArticlesQuery,
  ListArticlesQueryVariables,
} from 'graphql/generated';
import { useListArticlesQuery } from 'graphql/generated';
import { useEffect, useState } from 'react';

interface Return {
  data:
    | Exclude<ListArticlesQuery['listArticles'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  fetchMoreScroll: () => void;
}

const useArticlesSideList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const { filterDefaultGroups: defaultGroups } = useStoreState(
    (state) => state.user
  );
  const filterVariables = useStoreState(
    (state) => state.data.articles.variables
  );

  const setFilterState = useStoreActions((actions) => actions.data.setArticles);
  const {
    groups: groupsFilter,
    createdAt: createdAtFilter,
    order,
    priorities: priorityFilter,
  } = filterVariables;

  const variables: ListArticlesQueryVariables = {
    order: {
      updatedAt: order,
    },
    take: 12,
    scheme: {
      id: schemeId,
    },
    where: {
      createdAt: createdAtFilter
        ? {
            gte: createdAtFilter.startDate,
            lte: createdAtFilter.endDate,
          }
        : undefined,
      groups:
        groupsFilter.length > 0
          ? {
              some: {
                id: {
                  in: groupsFilter,
                },
              },
            }
          : undefined,
      priority:
        priorityFilter.length > 0
          ? {
              in: priorityFilter,
            }
          : undefined,
    },
  };

  useEffect(() => {
    if (groupsFilter.length === 0)
      setFilterState({
        variables: {
          ...filterVariables,
          groups:
            defaultGroups
              ?.filter(({ scheme }) => scheme.id === schemeId)
              ?.map(({ id }) => id) || [],
        },
      });
  }, []);

  const { data, loading, fetchMore } = useListArticlesQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const [sortFilter, setSortFilter] = useState(false);

  const toggleSortFilter = () => {
    setSortFilter(!sortFilter);
  };

  const fetchMoreScroll = () => {
    void fetchMore({
      variables: {
        ...variables,
        take: 6,
        skip: data?.listArticles?.articles?.length || 0,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listArticles: {
            ...fetchMoreResult.listArticles,
            total:
              prev.listArticles?.total ||
              fetchMoreResult?.listArticles?.total ||
              0,
            articles: [
              ...(prev.listArticles?.articles || []),
              ...(fetchMoreResult.listArticles?.articles || []),
            ],
          },
        };
      },
    });
  };

  return {
    data: data?.listArticles,
    loading: (data === null || data === undefined) && loading,
    sortFilter,
    toggleSortFilter,
    fetchMoreScroll,
  };
};

export default useArticlesSideList;
