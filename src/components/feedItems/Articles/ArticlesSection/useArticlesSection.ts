import { useStoreState } from 'state';
import type { ArticlePriority, ListArticlesQuery } from 'graphql/generated';
import { QueryMode, SortOrder, useListArticlesQuery } from 'graphql/generated';
import { useState } from 'react';
import type { DateType } from 'types/DataType';

interface Props {
  fullSearch: string;
  searchMydata: boolean;
  fullCreatedAtFilter: DateType | undefined;
  fullGroupFilter: string[];
}

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
  fetchMoreScroll: () => void;
}

const useArticlesSection = ({
  fullSearch,
  searchMydata,
  fullCreatedAtFilter,
  fullGroupFilter,
}: Props): Return => {
  const userId = useStoreState((state) => state.user.id);
  const schemeId = useStoreState((state) => state.scheme.id);
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(6);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<SortOrder>(SortOrder.Desc);
  const [sortFilter, setSortFilter] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<ArticlePriority[]>([]);
  const [groupsFilter, setGroupsFilter] = useState<string[]>([]);
  const [createdAtFilter, setCreatedAtFilter] = useState<
    DateType | undefined
  >();

  const getCreatedAtFilter = () => {
    if (createdAtFilter) {
      return {
        gte: createdAtFilter.startDate,
        lte: createdAtFilter.endDate,
      };
    }
    if (fullCreatedAtFilter) {
      return {
        gte: fullCreatedAtFilter.startDate,
        lte: fullCreatedAtFilter.endDate,
      };
    }
    return undefined;
  };
  const getGroupFilter = () => {
    if (groupsFilter && groupsFilter.length > 0) {
      return {
        some: {
          id: {
            in: groupsFilter,
          },
        },
      };
    }
    if (fullGroupFilter && fullGroupFilter.length > 0) {
      return {
        some: {
          id: {
            in: fullGroupFilter,
          },
        },
      };
    }
    return undefined;
  };

  const variables = {
    scheme: {
      id: schemeId,
    },
    where: {
      createdAt: getCreatedAtFilter(),

      createdBy: searchMydata
        ? {
            id: {
              equals: userId,
            },
          }
        : undefined,
      priority:
        priorityFilter.length > 0
          ? {
              in: priorityFilter,
            }
          : undefined,
      groups: getGroupFilter(),
      OR: [
        {
          title: {
            contains: search || fullSearch,
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
    groupsWhere: {
      scheme: {
        id: {
          equals: schemeId,
        },
      },
    },
  };

  const { data, loading, fetchMore } = useListArticlesQuery({
    fetchPolicy: 'cache-and-network',
    // @ts-expect-error TODO fix date issue
    variables,
  });

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
    clearFilters,
    search,
    setSearch,
    onPaginationChange,
    currentPage: page,
    currentPageSize: pageSize,
    groupsFilter,
    setGroupsFilter,
    priorityFilter,
    setPriorityFilter,
    setCreatedAtFilter,
    order,
    setOrder,
    fetchMoreScroll,
  };
};

export default useArticlesSection;
