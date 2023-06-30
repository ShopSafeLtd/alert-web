import type {
  ArticlePriority,
  DeleteArticleMutation,
  ListArticlesQuery,
} from 'graphql/generated';
import {
  ListArticlesDocument,
  useListArticlesQuery,
  QueryMode,
  Role,
  SortOrder,
  useSchemeGroupsQuery,
} from 'graphql/generated';
import { useState } from 'react';
import { useStoreState } from 'state';

import { useNavigate } from 'react-router-dom';
import type { DateType } from 'types/DataType';
import type { MutationUpdaterFn } from '@apollo/client';

interface Return {
  data:
    | Exclude<ListArticlesQuery['listArticles'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  currentPage: number;
  currentPageSize: number;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  clearFilters: () => void;
  groupsFilter: string[];
  setGroupsFilter: (value: string[]) => void;
  priorityFilter: ArticlePriority[];
  setPriorityFilter: (value: ArticlePriority[]) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  order: SortOrder;
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
  gallery: string[];
  setGallery: (values: string[]) => void;
  updateArticleList: MutationUpdaterFn<DeleteArticleMutation>;
}

const useArticleFeed = (): Return => {
  const navigate = useNavigate();
  const onNavigate = () => navigate(`/app/article/add`);

  // Global State
  const schemeId = useStoreState((state) => state.scheme.id);
  const { role, groups, id: userId } = useStoreState((state) => state.user);
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [gallery, setGallery] = useState<string[]>([]);
  // filter initial state
  const [order, setOrder] = useState<SortOrder>(SortOrder.Desc);
  const [sortFilter, setSortFilter] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<ArticlePriority[]>([]);
  const [groupsFilter, setGroupsFilter] = useState<string[]>([]);
  const [createdAtFilter, setCreatedAtFilter] = useState<
    DateType | undefined
  >();

  // lightBox
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  const [lightBoxOpen, setLightBoxOpen] = useState({
    open: false,
    index: 0,
  });

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
    skip: (page - 1) * pageSize,
    take: pageSize,
  };

  const { data, loading } = useListArticlesQuery({
    fetchPolicy: 'cache-and-network',
    // @ts-expect-error TODO: fix this
    variables,
  });
  // update Article list after deleting an item
  const updateArticleList: MutationUpdaterFn<DeleteArticleMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<ListArticlesQuery>({
      query: ListArticlesDocument,
      variables,
    });

    if (existingData === null) return;
    if (existingData?.listArticles?.articles === undefined) return;

    store.writeQuery<ListArticlesQuery>({
      query: ListArticlesDocument,
      data: {
        listArticles: {
          ...existingData.listArticles,
          articles: existingData.listArticles?.articles.filter(
            (article) => article.id !== res?.deleteArticle?.id
          ),
        },
        __typename: 'Query',
      },
      variables,
    });
  };
  // function

  const toggleSortFilter = () => {
    setSortFilter(!sortFilter);
  };
  const clearFilters = () => {
    setGroupsFilter([]);
    setPriorityFilter([]);
    setOrder(SortOrder.Desc);
    setCreatedAtFilter(undefined);
  };
  const onPaginationChange = (pageVale: number, pageSizeValue: number) => {
    setPage(pageVale);
    setPageSize(pageSizeValue);
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

  return {
    data: data?.listArticles,
    loading: (data === null || data === undefined) && loading,
    onPaginationChange,
    order,
    setOrder,
    search,
    setSearch,
    currentPage: page,
    currentPageSize: pageSize,
    priorityFilter,
    setPriorityFilter,
    groups:
      role === Role.SchemeAdmin
        ? groupsData?.groups.map((group) => ({
            value: group.id,
            label: group.name,
          })) || []
        : groups.map((group) => ({ value: group.id, label: group.name })),
    groupsLoading,
    onNavigate,
    lightboxElements,
    lightBoxOpen,
    openLightbox: triggerLightbox,
    sortFilter,
    toggleSortFilter,
    clearFilters,
    gallery,
    setGallery,
    groupsFilter,
    setGroupsFilter,
    setCreatedAtFilter,
    updateArticleList,
  };
};

export default useArticleFeed;
