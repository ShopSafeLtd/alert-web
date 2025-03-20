import type {
  ListArticlesQuery,
  ListArticlesQueryVariables,
} from 'graphql/article/queries/__generated__/list_articles.generated';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useListArticlesQuery } from 'graphql/article/queries/__generated__/list_articles.generated';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'state';

interface Return {
  data:
    | Exclude<ListArticlesQuery['listArticles'], null | undefined>
    | null
    | undefined;
  fetchMoreScroll: () => void;
  loading: boolean;
  sortFilter: boolean;
  toggleSortFilter: () => void;
}

const useArticlesSideList = (): Return => {
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const { filterDefaultGroups: defaultGroups } = useStoreState(
    (state) => state.user
  );
  const filterVariables = useStoreState(
    (state) => state.data.articles.variables
  );

  const setFilterState = useStoreActions((actions) => actions.data.setArticles);
  const {
    createdAt: createdAtFilter,
    groups: groupsFilter,
    order,
    priorities: priorityFilter,
  } = filterVariables;

  const variables: ListArticlesQueryVariables = {
    order: {
      updatedAt: order,
    },
    scheme: {
      id: schemeId,
    },
    take: 12,
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

  const { data, fetchMore, loading } = useListArticlesQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const [sortFilter, setSortFilter] = useState(false);

  const toggleSortFilter = () => {
    setSortFilter(!sortFilter);
  };

  const fetchMoreScroll = () => {
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listArticles: {
            ...fetchMoreResult.listArticles,
            articles: [
              ...(prev.listArticles?.articles || []),
              ...(fetchMoreResult.listArticles?.articles || []),
            ],
            total:
              prev.listArticles?.total ||
              fetchMoreResult?.listArticles?.total ||
              0,
          },
        };
      },
      variables: {
        ...variables,
        skip: data?.listArticles?.articles?.length || 0,
        take: 6,
      },
    });
  };

  return {
    data: data?.listArticles,
    fetchMoreScroll,
    loading: (data === null || data === undefined) && loading,
    sortFilter,
    toggleSortFilter,
  };
};

export default useArticlesSideList;
