import { useStoreState } from 'state';
import type { ListArticlesQuery, ArticlePriority } from 'graphql/generated';
import { useListArticlesQuery, QueryMode, SortOrder } from 'graphql/generated';
import { useEffect, useState } from 'react';
import type { DateType } from 'types/DataType';

interface Props {
  fullSearch: string;
  searchMydata: boolean;
  fullCreatedAtFilter: DateType | undefined;
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
}

const useArticlesSection = ({
  fullSearch,
  searchMydata,
  fullCreatedAtFilter,
}: Props): Return => {
  const userId = useStoreState((state) => state.user.id);
  const schemeId = useStoreState((state) => state.scheme.id);
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<SortOrder>(SortOrder.Desc);
  const [sortFilter, setSortFilter] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<ArticlePriority[]>([]);
  const [groupsFilter, setGroupsFilter] = useState<string[]>([]);
  const [createdAtFilter, setCreatedAtFilter] = useState<
    DateType | undefined
  >();
  useEffect(() => {
    if (!search && fullSearch) setSearch(fullSearch);
  }, [fullSearch]);
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
  };
};

export default useArticlesSection;
