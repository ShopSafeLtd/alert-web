import type {
  ListArticlesFeedQuery,
  ListArticlesFeedQueryVariables,
} from '#/views/article/ArticleFeed/graphql/queries/__generated__/list-articles-feed.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { DeleteArticleMutation } from 'graphql/article/mutations/__generated__/delete_article.generated';
import type { ArticlePriority } from 'graphql/types';
import type { ArticleFilters } from 'state/data-model';
import type { DateType } from 'types/DataType';

import { useGroupsContext } from '#/context/groups-context';
import {
  ListArticlesFeedDocument,
  useListArticlesFeedQuery,
} from '#/views/article/ArticleFeed/graphql/queries/__generated__/list-articles-feed.generated';
import { QueryMode, SortOrder } from 'graphql/types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'state';

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
  hasCreateRights: boolean;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  lightboxElements: {
    src: string;
  }[];
  loading: boolean;
  onNavigate: () => void;
  openLightbox: (elements: { src: string }[], index: number) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  setGallery: (values: string[]) => void;
  setGroupsFilter: (value: string[]) => void;
  setOrder: (value: SortOrder) => void;
  setPriorityFilter: (value: ArticlePriority[]) => void;
  setSearch: (value: string) => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  updateArticleList: MutationUpdaterFn<DeleteArticleMutation>;
}

const useArticleFeed = (): Return => {
  const navigate = useNavigate();
  const onNavigate = () => navigate('/app/article/add');

  // Global State
  const schemeId = useStoreState((state) => state.scheme.id);
  const {
    filterDefaultGroups: defaultGroups,
    id: userId,
    role,
  } = useStoreState((state) => state.user);
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
  const [sortFilter, setSortFilter] = useState(false);

  // lightBox
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  const [lightBoxOpen, setLightBoxOpen] = useState({
    index: 0,
    open: false,
  });

  const variables: ListArticlesFeedQueryVariables = {
    first: 12,
    order: {
      updatedAt: order,
    },
    scheme: {
      id: schemeId,
    },
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
  // On mount
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
  // const { data, loading, fetchMore } = useListArticlesQuery({
  //   fetchPolicy: 'cache-and-network',
  //   variables,
  // });

  const { data, fetchMore, loading } = useListArticlesFeedQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });
  // update Article list after deleting an item
  const updateArticleList: MutationUpdaterFn<DeleteArticleMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<ListArticlesFeedQuery>({
      query: ListArticlesFeedDocument,
      variables,
    });

    if (existingData === null) return;
    if (existingData?.listArticlesRelay?.edges === undefined) return;

    store.writeQuery<ListArticlesFeedQuery>({
      data: {
        __typename: 'Query',
        listArticlesRelay: {
          ...existingData.listArticlesRelay,
          edges: existingData.listArticlesRelay?.edges.filter(
            (article) => article?.node?.id !== res?.deleteArticle?.id
          ),
        },
      },
      query: ListArticlesFeedDocument,
      variables,
    });
  };

  const { groups, groupsLoading } = useGroupsContext();

  // Functions
  const triggerLightbox = (elements: { src: string }[], index: number) => {
    setLightboxElements(elements);
    if (lightBoxOpen.open) {
      setLightBoxOpen({
        index,
        open: !lightBoxOpen.open,
      });
    } else {
      setTimeout(
        () =>
          setLightBoxOpen({
            index,
            open: !lightBoxOpen.open,
          }),
        0.3
      );
    }
  };

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
  // function

  const toggleSortFilter = () => {
    setSortFilter(!sortFilter);
  };
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
  const setGallery = (values: string[]) => {
    setFilterState({
      variables: {
        ...filterVariables,
        gallery: values,
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
      },
    });
  };
  return {
    clearFilters,
    data: data?.listArticlesRelay || null,
    fetchMoreScroll,
    filterVariables,
    groups,
    groupsLoading,
    // TODO change to new permissions model
    hasCreateRights: role === 'SCHEME_ADMIN' || role === 'GROUP_ADMIN',
    lightBoxOpen,
    lightboxElements,
    loading: (data === null || data === undefined) && loading,
    onNavigate,
    openLightbox: triggerLightbox,
    setCreatedAtFilter,
    setGallery,
    setGroupsFilter,
    setOrder,
    setPriorityFilter,
    setSearch,
    sortFilter,
    toggleSortFilter,
    updateArticleList,
  };
};

export default useArticleFeed;
