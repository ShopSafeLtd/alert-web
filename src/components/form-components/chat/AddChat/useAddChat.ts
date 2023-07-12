import { useState } from 'react';
import type {
  CreateChatMutation,
  ListSchemeUsersQuery,
} from 'graphql/generated';
import {
  useCreateChatMutation,
  useListSchemeUsersQuery,
  SortOrder,
} from 'graphql/generated';

import { useStoreState } from 'state';
import type { MutationUpdaterFn } from '@apollo/client';
import { notification } from 'antd';
import errorNotification from 'types/error_notification';
import { useIntl } from 'react-intl';

interface FormData {
  name: string;
  description: string;
  users: string[];
}
interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateChatMutation>;
}
interface Return {
  onSubmit: (value: FormData) => void;
  usersData: ListSchemeUsersQuery | undefined;
  usersLoading: boolean;
  saving: boolean;
}

const useAddChat = ({ onClose, update }: Props): Return => {
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);

  const { data: usersData, loading: usersLoading } = useListSchemeUsersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        schemes: {
          some: {
            scheme: {
              id: {
                equals: schemeId,
              },
            },
          },
        },
      },
      groupWhere: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
      orderBy: {
        fullName: SortOrder.Asc,
      },
      schemesWhere: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
    },
  });
  const [createChat] = useCreateChatMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
          id: '5Hvk21',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The Chat has been added!',
          id: 'qKyEqm',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update,
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    void createChat({
      variables: {
        data: {
          name: data.name,
          description: data.description || null,
          members:
            data.users && data.users?.length > 0
              ? {
                  create: data.users?.map((id) => ({
                    user: { connect: { id } },
                    newMessages: false,
                  })),
                }
              : undefined,
          scheme: {
            connect: {
              id: schemeId,
            },
          },
        },
      },
    });
  };

  return {
    onSubmit,
    usersData,
    usersLoading,
    saving,
  };
};
export default useAddChat;
