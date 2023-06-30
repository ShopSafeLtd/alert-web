import type {
  ListBusinessesQuery,
  ListBusinessesQueryVariables,
} from 'graphql/generated';
import {
  ListBusinessesDocument,
  QueryMode,
  useLinkBusinessToSchemeMutation,
  useListBusinessesQuery,
  SortOrder,
} from 'graphql/generated';
import { useState } from 'react';
import { useStoreState } from 'state';

interface Props {
  onClose: () => void;
}

interface Return {
  data: ListBusinessesQuery | undefined;
  onSubmit: () => void;
  saving: boolean;
  onSearchBusiness: (value: string) => void;
  loading: boolean;
  selectedValue: React.Key[];
  currentPage: number;
  currentPageSize: number;
  onPaginationChange: (page: number, pageSize: number) => void;
  searchValue: string;
  onTableChange: (selectedRowKeys: React.Key[]) => void;
}

const useLinkBusiness = ({ onClose }: Props): Return => {
  const currentScheme = useStoreState((state) => state.scheme.id);
  const userSchemes = useStoreState((state) => state.user.schemes);

  const [saving, setSaving] = useState(false);
  const [searchValue, onSearchBusiness] = useState('');
  const [selectedValue, setSelectedValue] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(50);

  const { data, loading } = useListBusinessesQuery({
    variables: {
      orderBy: {
        name: SortOrder.Asc,
      },
      where: {
        name: {
          contains: searchValue,
          mode: QueryMode.Insensitive,
        },
        schemes: {
          some: {
            id: {
              in: userSchemes
                .map((item) => item.scheme.id)
                .filter((item) => item !== currentScheme),
            },
          },
        },
      },
    },
  });

  const [linkBusinessToScheme] = useLinkBusinessToSchemeMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
    },
    update: (store, result) => {
      const existingData = store.readQuery<
        ListBusinessesQuery,
        ListBusinessesQueryVariables
      >({
        query: ListBusinessesDocument,
        variables: {
          where: {
            name: {
              contains: '',
              mode: QueryMode.Insensitive,
            },
            schemes: {
              some: {
                id: {
                  equals: currentScheme,
                },
              },
            },
          },
          orderBy: {
            name: SortOrder.Asc,
          },
        },
      });

      if (existingData && result.data)
        store.writeQuery<ListBusinessesQuery, ListBusinessesQueryVariables>({
          query: ListBusinessesDocument,
          variables: {
            where: {
              name: {
                contains: '',
                mode: QueryMode.Insensitive,
              },
              schemes: {
                some: {
                  id: {
                    equals: currentScheme,
                  },
                },
              },
            },
            orderBy: {
              name: SortOrder.Asc,
            },
          },
          data: {
            listBusinesses: {
              total: (existingData?.listBusinesses.total || 0) + 1,
              businesses: [
                ...existingData.listBusinesses.businesses,
                result.data?.linkBusinessToScheme,
              ],
            },
          },
        });
    },
  });

  const onSubmit = () => {
    if (selectedValue.length > 0) {
      setSaving(true);
      void linkBusinessToScheme({
        variables: {
          business: {
            id: selectedValue[0] as string,
          },
          scheme: {
            id: currentScheme,
          },
        },
      });
    }
  };

  const onPaginationChange = (pageVale: number, pageSizeValue: number) => {
    setCurrentPage(pageVale);
    setCurrentPageSize(pageSizeValue);
  };

  const onTableChange = (selectedRowKeys: React.Key[]) => {
    setSelectedValue(selectedRowKeys);
  };

  return {
    onSubmit,
    saving,
    onSearchBusiness,
    data,
    loading,
    selectedValue,
    currentPage,
    currentPageSize,
    onPaginationChange,
    searchValue,
    onTableChange,
  };
};

export default useLinkBusiness;
