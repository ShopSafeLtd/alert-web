import type {
  ArticlePriority,
  DeleteArticleMutation,
  ListArticlesFeedQuery,
} from 'graphql/generated';
import {
  SortOrder,
  ListArticlesFeedDocument,
  QueryMode,
  Role,
  useListArticlesFeedQuery,
  useSchemeGroupsQuery,
} from 'graphql/generated';
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'state';
import { useNavigate } from 'react-router-dom';
import type { DateType } from 'types/DataType';
import type { MutationUpdaterFn } from '@apollo/client';
import type { ArticleFilters } from 'state/data-model';

interface Return {
  data:
    | Exclude<ListArticlesFeedQuery['listArticlesRelay'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  setSearch: (value: string) => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  clearFilters: () => void;
  setGroupsFilter: (value: string[]) => void;
  setPriorityFilter: (value: ArticlePriority[]) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  setOrder: (value: SortOrder) => void;
  lightboxElements: {
    src: string;
  }[];
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  openLightbox: (elements: { src: string }[], index: number) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  onNavigate: () => void;
  setGallery: (values: string[]) => void;
  updateArticleList: MutationUpdaterFn<DeleteArticleMutation>;
  fetchMoreScroll: () => void;
  filterVariables: ArticleFilters;
}

const useArticleFeed = (): Return => {
  const navigate = useNavigate();
  const onNavigate = () => navigate(`/app/article/add`);

  // Global State
  const schemeId = useStoreState((state) => state.scheme.id);
  const {
    role,
    id: userId,
    filterDefaultGroups: defaultGroups,
  } = useStoreState((state) => state.user);
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
  const [sortFilter, setSortFilter] = useState(false);

  // lightBox
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  const [lightBoxOpen, setLightBoxOpen] = useState({
    open: false,
    index: 0,
  });

  const variables = {
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

  const { data, loading, fetchMore } = useListArticlesFeedQuery({
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
      query: ListArticlesFeedDocument,
      data: {
        listArticlesRelay: {
          ...existingData.listArticlesRelay,
          edges: existingData.listArticlesRelay?.edges.filter(
            (article) => article?.node?.id !== res?.deleteArticle?.id
          ),
        },
        __typename: 'Query',
      },
      variables,
    });
  };

  // Fetch scheme groups if scheme admin
  const { data: groupsData, loading: groupsLoading } = useSchemeGroupsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
        users:
          role === Role.User
            ? {
                some: {
                  id: {
                    equals: userId,
                  },
                },
              }
            : undefined,
      },
    },
    fetchPolicy: 'cache-and-network',
    skip: role !== Role.SchemeAdmin,
  });

  // Functions
  const triggerLightbox = (elements: { src: string }[], index: number) => {
    setLightboxElements(elements);
    if (lightBoxOpen.open) {
      setLightBoxOpen({
        open: !lightBoxOpen.open,
        index,
      });
    } else {
      setTimeout(
        () =>
          setLightBoxOpen({
            open: !lightBoxOpen.open,
            index,
          }),
        0.3
      );
    }
  };

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
    fetchMoreScroll,
    data: data?.listArticlesRelay || null,
    loading: (data === null || data === undefined) && loading,
    setOrder,
    setGallery,
    setSearch,
    setPriorityFilter,
    groups:
      groupsData?.groups.map((group) => ({
        value: group.id,
        label: group.name,
      })) || [],
    groupsLoading,
    onNavigate,
    lightboxElements,
    lightBoxOpen,
    openLightbox: triggerLightbox,
    sortFilter,
    toggleSortFilter,
    clearFilters,
    setGroupsFilter,
    setCreatedAtFilter,
    updateArticleList,
    filterVariables,
  };
};

export default useArticleFeed;
