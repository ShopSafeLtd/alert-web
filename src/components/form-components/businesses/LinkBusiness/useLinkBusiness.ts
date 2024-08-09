import type {
  ListBusinessesQuery,
  ListBusinessesQueryVariables,
} from 'graphql/businesses/queries/__generated__/list-businesses.generated';

import { useLinkBusinessToSchemeMutation } from 'graphql/businesses/mutations/__generated__/link-business-to-scheme.generated';
import {
  ListBusinessesDocument,
  useListBusinessesQuery,
} from 'graphql/businesses/queries/__generated__/list-businesses.generated';
import { QueryMode, Role, SortOrder } from 'graphql/types';
import { useState } from 'react';
import { useStoreState } from 'state';

interface Props {
  onClose: () => void;
}

interface Return {
  currentPage: number;
  currentPageSize: number;
  data: ListBusinessesQuery | undefined;
  loading: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
  onSearchBusiness: (value: string) => void;
  onSubmit: () => void;
  onTableChange: (selectedRowKeys: React.Key[]) => void;
  saving: boolean;
  searchValue: string;
  selectedValue: React.Key[];
}
// TODO change to business select
const useLinkBusiness = ({ onClose }: Props): Return => {
  const currentScheme = useStoreState((state) => state.scheme.id);
  const userSchemes = useStoreState((state) => state.user.schemes);

  const [saving, setSaving] = useState(false);
  const [searchValue, onSearchBusiness] = useState('');
  const [selectedValue, setSelectedValue] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(50);
  const currentUserId = useStoreState((state) => state.user.id);

  const { data, loading } = useListBusinessesQuery({
    variables: {
      orderBy: {
        name: SortOrder.Asc,
      },
      take: 100,
      where: {
        name: {
          contains: searchValue,
          mode: QueryMode.Insensitive,
        },
        schemes: {
          some: {
            AND: [
              {
                id: {
                  in: userSchemes
                    .map((item) => item.scheme.id)
                    .filter((item) => item !== currentScheme),
                },
              },
              {
                members: {
                  some: {
                    AND: [
                      {
                        user: {
                          id: {
                            equals: currentUserId,
                          },
                        },
                      },
                      {
                        role: {
                          // TODO change to new permissions when available
                          equals: Role.SchemeAdmin,
                        },
                      },
                    ],
                  },
                },
              },
            ],
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
          orderBy: {
            name: SortOrder.Asc,
          },
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
        },
      });

      if (existingData && result.data)
        store.writeQuery<ListBusinessesQuery, ListBusinessesQueryVariables>({
          data: {
            listBusinesses: {
              businesses: [
                ...existingData.listBusinesses.businesses,
                result.data?.linkBusinessToScheme,
              ],
              total: (existingData?.listBusinesses.total || 0) + 1,
            },
          },
          query: ListBusinessesDocument,
          variables: {
            orderBy: {
              name: SortOrder.Asc,
            },
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
    currentPage,
    currentPageSize,
    data,
    loading,
    onPaginationChange,
    onSearchBusiness,
    onSubmit,
    onTableChange,
    saving,
    searchValue,
    selectedValue,
  };
};

export default useLinkBusiness;
