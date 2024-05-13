import { useEffect, useState } from 'react';
import type { ArticlePriority, ListArticlesFeedQuery } from 'graphql/generated';
import {
  QueryMode,
  SortOrder,
  useListArticlesFeedQuery,
} from 'graphql/generated';
import { useStoreActions, useStoreState } from 'state';
import type { ArticleData, DateType } from 'types/DataType';
import type { ArticleFilters } from 'state/data-model';
import { useGroupsContext } from '#/context/groups-context';

interface Props {
  onClose: () => void;
  update: (value: ArticleData) => void;
  articleIds: string[] | undefined;
}

interface Return {
  onSubmit: () => void;
  data:
    | Exclude<ListArticlesFeedQuery['listArticlesRelay'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  setSearch: (value: string) => void;
  selectedArticle: ArticleData | undefined;
  setSelectedArticle: (value: ArticleData | undefined) => void;
  openLightbox: (index: number) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  filterVariables: ArticleFilters;
  setOrder: (value: SortOrder) => void;
  setGroupsFilter: (value: string[]) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  setPriorityFilter: (value: ArticlePriority[]) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  clearFilters: () => void;
  fetchMoreScroll: () => void;
}

const useLinkArticle = ({ onClose, update, articleIds }: Props): Return => {
  const { filterDefaultGroups: defaultGroups } = useStoreState(
    (state) => state.user
  );
  const schemeId = useStoreState((state) => state.scheme.id);
  const filterVariables = useStoreState(
    (state) => state.data.articles.variables
  );

  const setFilterState = useStoreActions((actions) => actions.data.setArticles);

  const [selectedArticle, setSelectedArticle] = useState<
    ArticleData | undefined
  >(undefined);

  const {
    groups: groupsFilter,
    createdAt: createdAtFilter,
    order,
    priorities: priorityFilter,
    search,
  } = filterVariables;
  const [lightBoxOpen, setLightBoxOpen] = useState({
    open: false,
    index: 0,
  });
  const variables = {
    take: 18,
    order: {
      updatedAt: order,
    },
    scheme: {
      id: schemeId,
    },
    where: {
      id: { notIn: articleIds },

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
      OR: [
        {
          title: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
      ],
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
              ?.filter(({ scheme }) => scheme.id === schemeId)
              ?.map(({ id }) => id) || [],
        },
      });
    }
  }, []);

  const { data, loading, fetchMore } = useListArticlesFeedQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });
  const fetchMoreScroll = () => {
    void fetchMore({
      variables: {
        ...variables,
        after: data?.listArticlesRelay?.pageInfo?.endCursor,
      },

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
    setLightBoxOpen({ open: !lightBoxOpen.open, index });
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
        search: '',
        gallery: [],
        order: SortOrder.Desc,
        createdAt: undefined,
        groups: [],
        priorities: [],
      },
    });
  };
  return {
    onSubmit,
    data: data?.listArticlesRelay,
    loading: data?.listArticlesRelay ? false : loading,
    groups,
    groupsLoading,
    setSearch,
    openLightbox,
    lightBoxOpen,
    selectedArticle,
    setSelectedArticle,
    filterVariables,
    setOrder,
    setGroupsFilter,
    setCreatedAtFilter,
    clearFilters,
    fetchMoreScroll,
    setPriorityFilter,
  };
};

export default useLinkArticle;
