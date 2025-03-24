import type { ListArticlesQuery } from 'graphql/article/queries/__generated__/list_articles.generated';
import type { DateType } from 'types/DataType';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  currentSchemeDefaultGroups,
  currentUserAtom,
} from '#/providers/UserProvider/UserProvider';
import { useListArticlesQuery } from 'graphql/article/queries/__generated__/list_articles.generated';
import { QueryMode } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'state';

interface Props {
  fullCreatedAtFilter: DateType | undefined;
  fullGallery: string[];
  fullGroupFilter: string[];
  fullSearch: string;
}

interface Return {
  data:
    | Exclude<ListArticlesQuery['listArticles'], null | undefined>
    | null
    | undefined;
  fetchMoreScroll: () => void;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
}

const useArticlesSection = ({
  fullCreatedAtFilter,
  fullGallery,
  fullGroupFilter,
  fullSearch,
}: Props): Return => {
  const defaultGroups = useAtomValue(currentSchemeDefaultGroups);
  const userId = useAtomValue(currentUserAtom)?.id;
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const [sortFilter, setSortFilter] = useState(false);
  const filterVariables = useStoreState(
    (state) => state.data.articles.variables
  );
  const setFilterState = useStoreActions((actions) => actions.data.setArticles);
  const {
    createdAt: createdAtFilter,
    gallery,
    groups: groupsFilter,
    order,
    priorities: priorityFilter,
    search,
  } = filterVariables;

  useEffect(() => {
    setFilterState({
      variables: {
        ...filterVariables,
        createdAt: fullCreatedAtFilter,
        gallery: fullGallery,
        groups: fullGroupFilter || defaultGroups?.map(({ id }) => id),
        search: fullSearch,
      },
    });
  }, []);

  const variables = {
    order: {
      updatedAt: order,
    },
    scheme: {
      id: schemeId,
    },
    take: 6,
    where: {
      OR: [
        {
          title: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
      ],
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
    },
  };

  const { data, fetchMore, loading } = useListArticlesQuery({
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
    search,
    setSearch,
    sortFilter,
    toggleSortFilter,
  };
};

export default useArticlesSection;
