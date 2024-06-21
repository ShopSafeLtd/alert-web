import type { MutationUpdaterFn } from '@apollo/client';
import { notification } from 'antd';

import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';
import type { AddUsersToBusinessMutation } from 'graphql/businesses/mutations/add-users-to-business.generated';
import { useAddUsersToBusinessMutation } from 'graphql/businesses/mutations/add-users-to-business.generated';
import type { ListSchemeUsersQuery } from 'graphql/users/queries/list-scheme-users.generated';
import { useListSchemeUsersQuery } from 'graphql/users/queries/list-scheme-users.generated';
import { SortOrder } from 'graphql/types';

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
  const intl = useIntl();
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
      schemesWhere: {
        scheme: {
          id: {
            equals: currentScheme,
          },
        },
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
        message: intl.formatMessage({
          defaultMessage: 'Users Added!',
        }),
        description: intl.formatMessage({
          defaultMessage:
            'The users have been successfully added to the business',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
    update,
  });

  const onSubmit = () => {
    setSaving(false);
    void addUsersToBusiness({
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
