import { useState } from 'react';

import { useStoreState } from 'state';
import type { MutationUpdaterFn } from '@apollo/client';
import type { FormInstance } from 'antd';
import { Form, notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';
import type { CreateChatMutation } from 'graphql/chats/mutations/create-chat.generated';
import { useCreateChatMutation } from 'graphql/chats/mutations/create-chat.generated';
import type { ListSchemeUsersQuery } from 'graphql/users/queries/list-scheme-users.generated';
import { useListSchemeUsersQuery } from 'graphql/users/queries/list-scheme-users.generated';
import { SortOrder } from 'graphql/types';

const { useForm } = Form;

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
  form: FormInstance<FormData>;
}

const useAddChat = ({ onClose, update }: Props): Return => {
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const userId = useStoreState((state) => state.user.id);

  const [form] = useForm<FormData>();
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
    onCompleted: () => {
      form.setFieldValue('users', [userId]);
    },
  });
  const [createChat] = useCreateChatMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The Chat has been added!',
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
    // made a set as added creating user here, changed to add it in the form so that they can remove themselves if they really want to
    // left set in so that if we want to change it back it becomes new Set([...data.users, userId])
    const usersToAdd = new Set(data.users);

    const usersToAddArray = [...usersToAdd].map((id) => ({
      user: { connect: { id } },
      newMessages: false,
    }));

    setSaving(true);
    void createChat({
      variables: {
        data: {
          name: data.name,
          description: data.description || null,
          members:
            usersToAddArray.length > 0
              ? {
                  create: usersToAddArray,
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
    form,
  };
};
export default useAddChat;
