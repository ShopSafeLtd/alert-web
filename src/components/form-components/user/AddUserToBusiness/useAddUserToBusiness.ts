import type { MutationUpdaterFn } from '@apollo/client';
import { notification } from 'antd';
import type {
  AddUsersToBusinessMutation,
  ListSchemeUsersQuery,
} from 'graphql/generated';
import {
  SortOrder,
  useAddUsersToBusinessMutation,
  useListSchemeUsersQuery,
} from 'graphql/generated';
import { useState } from 'react';
import { useStoreState } from 'state';

interface Row {
  key: string;
  fullName: string;
  status: string | null | undefined;
  business: {
    id: string;
    name: string;
  } | null;
}

interface Return {
  data: ListSchemeUsersQuery | undefined;
  loading: boolean;
  onSelectChange: (selectedRowKeys: React.Key[], selectedRows: Row[]) => void;
  onSubmit: () => void;
  saving: boolean;
}

interface Props {
  businessId: string;
  onClose: () => void;
  update: MutationUpdaterFn<AddUsersToBusinessMutation>;
}

const useAddUserToBusiness = ({
  businessId,
  onClose,
  update,
}: Props): Return => {
  const currentScheme = useStoreState((state) => state.scheme.id);
  const [selected, setSelected] = useState<Row[]>([]);
  const [saving, setSaving] = useState(false);

  const { data, loading } = useListSchemeUsersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: [{ fullName: SortOrder.Asc }],
      where: {
        schemes: {
          some: {
            scheme: {
              id: {
                equals: currentScheme,
              },
            },
          },
        },
        recycled: { equals: false },
        OR: [
          {
            businesses: {
              some: {
                id: {
                  not: {
                    equals: businessId,
                  },
                },
              },
            },
          },
          {
            businesses: {
              none: {
                id: {
                  equals: businessId,
                },
              },
            },
          },
        ],
      },
    },
  });

  const onSelectChange = (_: React.Key[], selectedRows: Row[]) => {
    setSelected(selectedRows);
  };

  const [addUsersToBusiness] = useAddUsersToBusinessMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: 'Users Added',
        description: 'The users have been successfully added to the business',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      notification.error({
        message: 'Oops, something has gone wrong!',
        description:
          'This has been reported to our team but if it keeps happening please contact us.',
        placement: 'bottomRight',
      });
    },
    update,
  });

  const onSubmit = () => {
    setSaving(false);
    addUsersToBusiness({
      variables: {
        data: selected.map((item) => ({
          id: item.key,
        })),
        schemeWhere: {
          id: currentScheme,
        },
        where: {
          id: businessId,
        },
        groupWhere: {
          scheme: {
            id: {
              equals: currentScheme,
            },
          },
        },
      },
    });
  };

  return {
    data,
    loading,
    onSelectChange,
    onSubmit,
    saving,
  };
};

export default useAddUserToBusiness;
