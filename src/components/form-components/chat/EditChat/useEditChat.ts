import { useState } from 'react';
import { useStoreState } from 'state';
import {
  ChatQuery,
  SortOrder,
  useListSchemeUsersQuery,
  useUpdateChatMutation,
  ListSchemeUsersQuery,
  useChatQuery,
} from 'graphql/generated';
import { notification } from 'antd';
import { useParams } from 'react-router-dom';

interface FormData {
  name: string;
  description: string;
  user: string[];
}
interface Props {
  onClose: () => void;
}
interface Return {
  onSubmit: (value: FormData) => void;
  data: ChatQuery | undefined;
  loading: boolean;
  usersData: ListSchemeUsersQuery | undefined;
  usersLoading: boolean;
  saving: boolean;
}
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const useEditChat = ({ onClose }: Props): Return => {
  const chatId = useParams().id;
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);

  const openNotification = (type: NotificationType) => {
    if (type === 'success') {
      notification.success({
        message: 'Success!',
        description: 'The user has been updated! ',
        placement: 'bottomRight',
      });
    } else if (type === 'error') {
      notification.error({
        message: 'error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    }
  };
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
        fullName: SortOrder.Desc,
      },
    },
  });

  const [updateChat] = useUpdateChatMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      openNotification('success');
    },
    onError: () => {
      openNotification('error');
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    if (chatId)
      updateChat({
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
