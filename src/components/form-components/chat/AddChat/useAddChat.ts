import type { MutationUpdaterFn } from '@apollo/client';
import type { FormInstance } from 'antd';
import type { CreateChatMutation } from 'graphql/chats/mutations/__generated__/create-chat.generated';
import type { ListSchemeUsersQuery } from 'graphql/users/queries/__generated__/list-scheme-users.generated';

import { Form, notification } from 'antd';
import { useCreateChatMutation } from 'graphql/chats/mutations/__generated__/create-chat.generated';
import { SortOrder } from 'graphql/types';
import { useListSchemeUsersQuery } from 'graphql/users/queries/__generated__/list-scheme-users.generated';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

const { useForm } = Form;

interface FormData {
  description: string;
  name: string;
  users: string[];
}
interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateChatMutation>;
}
interface Return {
  form: FormInstance<FormData>;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  usersData: ListSchemeUsersQuery | undefined;
  usersLoading: boolean;
}

const useAddChat = ({ onClose, update }: Props): Return => {
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const userId = useStoreState((state) => state.user.id);

  const [form] = useForm<FormData>();
  const { data: usersData, loading: usersLoading } = useListSchemeUsersQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: () => {
      form.setFieldValue('users', [userId]);
    },
    variables: {
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
    },
  });
  const [createChat] = useCreateChatMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The Chat has been added!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
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
      newMessages: false,
      user: { connect: { id } },
    }));

    setSaving(true);
    void createChat({
      variables: {
        data: {
          description: data.description || null,
          members:
            usersToAddArray.length > 0
              ? {
                  create: usersToAddArray,
                }
              : undefined,
          name: data.name,
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
    form,
    onSubmit,
    saving,
    usersData,
    usersLoading,
  };
};
export default useAddChat;
