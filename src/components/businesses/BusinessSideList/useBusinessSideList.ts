import type { ListBusinessesQuery } from 'graphql/generated';
import { SortOrder, useListBusinessesQuery } from 'graphql/generated';
import { useState } from 'react';
import { useStoreState } from 'state';

interface Return {
  data: ListBusinessesQuery | undefined;
  loading: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
  pagination: { page: number; pageSize: number };
}

const useBusinessSideList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
  });

  const { data, loading } = useListBusinessesQuery({
    variables: {
      where: {
        schemes: {
          some: {
            id: {
              equals: schemeId,
            },
          },
        },
      },
      orderBy: { name: SortOrder.Asc },
      take: pagination.pageSize,
      skip: (pagination.page - 1) * pagination.pageSize,
    },
    fetchPolicy: 'cache-and-network',
  });

  const onPaginationChange = (page: number, pageSize: number) => {
    setPagination({
      ...pagination,
      page,
      pageSize,
    });
  };

  return {
    data,
    loading: data?.listBusinesses ? false : loading,
    onPaginationChange,
    pagination,
  };
};

export default useBusinessSideList;
