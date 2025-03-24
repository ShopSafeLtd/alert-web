import type { ListArticlesFeedQuery } from '#/views/article/ArticleFeed/graphql/queries/__generated__/list-articles-feed.generated';
import type { ArticlePriority } from 'graphql/types';
import type { ArticleFilters } from 'state/data-model';
import type { ArticleData, DateType } from 'types/DataType';

import { useGroupsContext } from '#/context/groups-context';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { currentSchemeDefaultGroups } from '#/providers/UserProvider/UserProvider';
import { useListArticlesFeedQuery } from '#/views/article/ArticleFeed/graphql/queries/__generated__/list-articles-feed.generated';
import { QueryMode, SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'state';

interface Props {
  articleIds: string[] | undefined;
  onClose: () => void;
  update: (value: ArticleData) => void;
}

interface Return {
  clearFilters: () => void;
  data:
    | Exclude<ListArticlesFeedQuery['listArticlesRelay'], null | undefined>
    | null
    | undefined;
  fetchMoreScroll: () => void;
  filterVariables: ArticleFilters;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  loading: boolean;
  onSubmit: () => void;
  openLightbox: (index: number) => void;
  selectedArticle: ArticleData | undefined;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  setGroupsFilter: (value: string[]) => void;
  setOrder: (value: SortOrder) => void;
  setPriorityFilter: (value: ArticlePriority[]) => void;
  setSearch: (value: string) => void;
  setSelectedArticle: (value: ArticleData | undefined) => void;
}

const useLinkArticle = ({ articleIds, onClose, update }: Props): Return => {
  const defaultGroups = useAtomValue(currentSchemeDefaultGroups);
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const filterVariables = useStoreState(
    (state) => state.data.articles.variables
  );

  const setFilterState = useStoreActions((actions) => actions.data.setArticles);

  const [selectedArticle, setSelectedArticle] = useState<
    ArticleData | undefined
  >(undefined);

  const {
    createdAt: createdAtFilter,
    groups: groupsFilter,
    order,
    priorities: priorityFilter,
    search,
  } = filterVariables;
  const [lightBoxOpen, setLightBoxOpen] = useState({
    index: 0,
    open: false,
  });
  const variables = {
    order: {
      updatedAt: order,
    },
    scheme: {
      id: schemeId,
    },
    take: 18,
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
      id: { notIn: articleIds },
      priority:
        priorityFilter.length > 0
          ? {
              in: priorityFilter,
            }
          : undefined,
    },
  };

  // On mount
  useEffect(() => {
    if (groupsFilter.length === 0) {
      setFilterState({
        variables: {
          ...filterVariables,
          groups:
            defaultGroups
              ?.filter((group) => group.schemeId === schemeId)
              ?.map(({ id }) => id) || [],
        },
      });
    }
  }, []);

  const { data, fetchMore, loading } = useListArticlesFeedQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });
  const fetchMoreScroll = () => {
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listArticlesRelay: {
            ...fetchMoreResult.listArticlesRelay,
            edges: [
              ...(prev.listArticlesRelay?.edges || []),
              ...(fetchMoreResult.listArticlesRelay?.edges || []),
            ],
          },
        };
      },

      variables: {
        ...variables,
        after: data?.listArticlesRelay?.pageInfo?.endCursor,
      },
    });
  };
  const { groups, groupsLoading } = useGroupsContext();

  // function
  const onSubmit = () => {
    if (selectedArticle) {
      update(selectedArticle);
    }
    onClose();
  };

  const openLightbox = (index: number) => {
    setLightBoxOpen({ index, open: !lightBoxOpen.open });
  };

  // filter function
  const setCreatedAtFilter = (values: DateType | undefined) => {
    setFilterState({
      variables: {
        ...filterVariables,
        createdAt: values,
      },
    });
  };

  const setOrder = (values: SortOrder) => {
    setFilterState({
      variables: {
        ...filterVariables,
        order: values,
      },
    });
  };
  const setSearch = (value: string) => {
    setFilterState({
      variables: {
        ...filterVariables,
        search: value,
      },
    });
  };
  const setGroupsFilter = (values: string[]) => {
    setFilterState({
      variables: {
        ...filterVariables,
        groups: values,
      },
    });
  };
  const setPriorityFilter = (values: ArticlePriority[]) => {
    setFilterState({
      variables: {
        ...filterVariables,
        priorities: values,
      },
    });
  };
  const clearFilters = () => {
    setFilterState({
      variables: {
        createdAt: undefined,
        gallery: [],
        groups: [],
        order: SortOrder.Desc,
        priorities: [],
        search: '',
        status: [],
      },
    });
  };
  return {
    clearFilters,
    data: data?.listArticlesRelay,
    fetchMoreScroll,
    filterVariables,
    groups,
    groupsLoading,
    lightBoxOpen,
    loading: data?.listArticlesRelay ? false : loading,
    onSubmit,
    openLightbox,
    selectedArticle,
    setCreatedAtFilter,
    setGroupsFilter,
    setOrder,
    setPriorityFilter,
    setSearch,
    setSelectedArticle,
  };
};

export default useLinkArticle;
