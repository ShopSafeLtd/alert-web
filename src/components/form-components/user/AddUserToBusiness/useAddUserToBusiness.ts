import type { MutationUpdaterFn } from '@apollo/client';
import type { AddUsersToBusinessMutation } from 'graphql/businesses/mutations/__generated__/add-users-to-business.generated';
import type { ListSchemeUsersQuery } from 'graphql/users/queries/__generated__/list-scheme-users.generated';

import { notification } from 'antd';
import { useAddUsersToBusinessMutation } from 'graphql/businesses/mutations/__generated__/add-users-to-business.generated';
import { SortOrder } from 'graphql/types';
import { useListSchemeUsersQuery } from 'graphql/users/queries/__generated__/list-scheme-users.generated';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

interface Row {
  business: {
    id: string;
    name: string;
  } | null;
  fullName: string;
  key: string;
  status: null | string | undefined;
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
      schemesWhere: {
        scheme: {
          id: {
            equals: currentScheme,
          },
        },
      },
      where: {
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
        recycled: { equals: false },
        schemes: {
          some: {
            scheme: {
              id: {
                equals: currentScheme,
              },
            },
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
        description: intl.formatMessage({
          defaultMessage:
            'The users have been successfully added to the business',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Users Added!',
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
        groupWhere: {
          scheme: {
            id: {
              equals: currentScheme,
            },
          },
        },
        schemeWhere: {
          id: currentScheme,
        },
        where: {
          id: businessId,
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
