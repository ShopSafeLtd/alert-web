import { useStoreActions, useStoreState } from 'state';

import { useEffect, useState } from 'react';
import type { DateType } from 'types/DataType';
import type { ListArticlesQuery } from 'graphql/article/queries/list_articles.generated';
import { useListArticlesQuery } from 'graphql/article/queries/list_articles.generated';
import { QueryMode } from 'graphql/types';

interface Props {
  fullSearch: string;
  fullCreatedAtFilter: DateType | undefined;
  fullGroupFilter: string[];
  fullGallery: string[];
}

interface Return {
  data:
    | Exclude<ListArticlesQuery['listArticles'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  fetchMoreScroll: () => void;
}

const useArticlesSection = ({
  fullSearch,
  fullCreatedAtFilter,
  fullGroupFilter,
  fullGallery,
}: Props): Return => {
  const { id: userId, defaultGroups } = useStoreState((state) => state.user);
  const schemeId = useStoreState((state) => state.scheme.id);
  const [sortFilter, setSortFilter] = useState(false);
  const filterVariables = useStoreState(
    (state) => state.data.articles.variables
  );
  const setFilterState = useStoreActions((actions) => actions.data.setArticles);
  const {
    groups: groupsFilter,
    createdAt: createdAtFilter,
    order,
    priorities: priorityFilter,
    search,
    gallery,
  } = filterVariables;

  useEffect(() => {
    setFilterState({
      variables: {
        ...filterVariables,
        search: fullSearch,
        gallery: fullGallery,
        groups: fullGroupFilter || defaultGroups?.map(({ id }) => id),
        createdAt: fullCreatedAtFilter,
      },
    });
  }, []);

  const variables = {
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
      createdBy: gallery.includes('MYDATA')
        ? {
            id: {
              equals: userId,
            },
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
      OR: [
        {
          title: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
      ],
    },
    order: {
      updatedAt: order,
    },
    take: 6,
  };

  const { data, loading, fetchMore } = useListArticlesQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  // function

  const toggleSortFilter = () => {
    setSortFilter(!sortFilter);
  };
  const setSearch = (value: string) => {
    setFilterState({
      variables: {
        ...filterVariables,
        search: value,
      },
    });
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
    search,
    setSearch,
    fetchMoreScroll,
  };
};

export default useArticlesSection;
