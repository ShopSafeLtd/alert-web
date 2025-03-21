import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { userIdAtom } from '#/providers/UserProvider/UserProvider';
import { QueryMode, Role, SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useStoreState } from 'state';

import type { ListBusinessesSelectQuery } from './graphql/__generated__/list-businesses-select.generated';

import { useListBusinessesSelectQuery } from './graphql/__generated__/list-businesses-select.generated';

interface Props {
  onClose: () => void;
  update: (value: string) => void;
}

interface Return {
  data: ListBusinessesSelectQuery | undefined;
  loading: boolean;
  onSearchBusiness: (value: string) => void;
  onSelect: (item: { key: string }) => void;
  onSubmit: () => void;
  pagination: { page: number; pageSize: number };
  resetPage: () => void;
  saving: boolean;
  searchValue: string;
  setPagination: (value: { page: number; pageSize: number }) => void;
}
// TODO change to business select
const useLinkBusiness = ({ onClose, update }: Props): Return => {
  const currentScheme = useAtomValue(currentSchemeIdAtom);
  const userSchemes = useStoreState((state) => state.user.schemes);

  const [saving, setSaving] = useState(false);
  const [searchValue, onSearchBusiness] = useState('');
  const [selectedValue, setSelectedValue] = useState<string | undefined>();
  const currentUserId = useAtomValue(userIdAtom);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 12 });
  const { data, loading } = useListBusinessesSelectQuery({
    variables: {
      orderBy: {
        name: SortOrder.Asc,
      },
      skip: (pagination.page - 1) * pagination.pageSize,
      take: pagination.pageSize,
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

  const onSubmit = () => {
    setSaving(true);
    if (selectedValue) {
      update(selectedValue);
    }
    setSaving(false);
    onClose();
  };

  const resetPage = () => {
    if (pagination.page !== 1)
      setPagination({ page: 1, pageSize: pagination.pageSize });
  };

  const onSelect = (item: { key: string }) => {
    setSelectedValue(item.key);
  };

  return {
    data,
    loading,
    onSearchBusiness,
    onSelect,
    onSubmit,
    pagination,
    resetPage,
    saving,
    searchValue,
    setPagination,
  };
};

export default useLinkBusiness;
