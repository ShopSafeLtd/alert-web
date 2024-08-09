import type { ChatQuery } from 'graphql/chat/queries/__generated__/chat.generated';
import type { ListSchemeUsersQuery } from 'graphql/users/queries/__generated__/list-scheme-users.generated';

import { notification } from 'antd';
import { useUpdateChatMutation } from 'graphql/chat/mutation/__generated__/update_chat.generated';
import { useChatQuery } from 'graphql/chat/queries/__generated__/chat.generated';
import { SortOrder } from 'graphql/types';
import { useListSchemeUsersQuery } from 'graphql/users/queries/__generated__/list-scheme-users.generated';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

interface FormData {
  description: string;
  name: string;
  user: string[];
}
interface Props {
  chatId: string;
  onClose: () => void;
}
interface Return {
  data: ChatQuery | undefined;
  loading: boolean;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  usersData: ListSchemeUsersQuery | undefined;
  usersLoading: boolean;
}

const useEditChat = ({ chatId, onClose }: Props): Return => {
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

  const [updateChat] = useUpdateChatMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The chat group has been updated!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
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
          data: {
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
                  newMessages: true,
                  user: { connect: { id: userId } },
                })),
              delete: chatData?.chat?.members
                .filter((userChat) => !data.user.includes(userChat.user.id))
                .map((userChat) => ({ id: userChat.id })),
            },
            name: { set: data.name },
          },
          where: {
            id: chatId,
          },
        },
      });
  };

  return {
    data: chatData,
    loading,
    onSubmit,
    saving,
    usersData,
    usersLoading,
  };
};

export default useEditChat;
