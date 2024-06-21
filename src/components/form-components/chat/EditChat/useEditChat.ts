import { useState } from 'react';
import { useStoreState } from 'state';
import { notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';
import type { ChatQuery } from 'graphql/chat/queries/chat.generated';
import { useChatQuery } from 'graphql/chat/queries/chat.generated';
import type { ListSchemeUsersQuery } from 'graphql/users/queries/list-scheme-users.generated';
import { useListSchemeUsersQuery } from 'graphql/users/queries/list-scheme-users.generated';
import { SortOrder } from 'graphql/types';
import { useUpdateChatMutation } from 'graphql/chat/mutation/update_chat.generated';

interface FormData {
  name: string;
  description: string;
  user: string[];
}
interface Props {
  onClose: () => void;
  chatId: string;
}
interface Return {
  onSubmit: (value: FormData) => void;
  data: ChatQuery | undefined;
  loading: boolean;
  usersData: ListSchemeUsersQuery | undefined;
  usersLoading: boolean;
  saving: boolean;
}

const useEditChat = ({ onClose, chatId }: Props): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const intl = useIntl();
  const { data: chatData, loading } = useChatQuery({
    variables: {
      where: {
        id: chatId,
      },
    },
  });

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

  const [updateChat] = useUpdateChatMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The chat group has been updated!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    if (chatId)
      void updateChat({
        variables: {
          where: {
            id: chatId,
          },
          data: {
            name: { set: data.name },
            description: { set: data.description },
            members: {
              create: data.user
                .filter(
                  (userId) =>
                    !chatData?.chat?.members
                      .map((userChat) => userChat.user.id)
                      .includes(userId)
                )
                .map((userId) => ({
                  user: { connect: { id: userId } },
                  newMessages: true,
                })),
              delete: chatData?.chat?.members
                .filter((userChat) => !data.user.includes(userChat.user.id))
                .map((userChat) => ({ id: userChat.id })),
            },
          },
        },
      });
  };

  return {
    onSubmit,
    data: chatData,
    loading,
    usersData,
    usersLoading,
    saving,
  };
};

export default useEditChat;
