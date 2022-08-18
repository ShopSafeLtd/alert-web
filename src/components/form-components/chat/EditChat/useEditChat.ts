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
      notification.success({
        message: 'Successfully Updated!',
        description: 'The chat group has been updated! ',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
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
