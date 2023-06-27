import { useEffect, useState } from 'react';
import { useStoreState } from 'state';
import type {
  CreateChatMutation,
  DeleteChatMutation,
  UserChatsQuery,
} from 'graphql/generated';
import {
  Role,
  SortOrder,
  TodoType,
  UserChatsDocument,
  useUpdateTodoMentionMutation,
  useUpdateUserChatMutation,
  useUserChatsQuery,
} from 'graphql/generated';
import type { MutationUpdaterFn } from '@apollo/client';
import { useNavigate } from 'react-router';

interface Props {
  chatId: string;
}
interface Return {
  currentId: string;
  data: UserChatsQuery | undefined;
  loading: boolean;
  saving: boolean;
  handleMarkAsRead: (value: string | undefined) => void;
  addChat: boolean;
  toggleAddChat: () => void;
  updateAddUserChat: MutationUpdaterFn<CreateChatMutation>;
  updateDeletedUserChat: MutationUpdaterFn<DeleteChatMutation>;
  adminRights: boolean;
  refetch: () => void;
}

const useViewChat = ({ chatId }: Props): Return => {
  const role = useStoreState((state) => state.user.role);
  const userId = useStoreState((state) => state.user.id);
  const schemeId = useStoreState((state) => state.scheme.id);
  const navigate = useNavigate();
  const [addChat, setAddChat] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [saving, setSaving] = useState(false);

  const { data, loading, refetch } = useUserChatsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: userId,
      },
      scheme: schemeId,
      orderBy: {
        chat: {
          updatedAt: SortOrder.Desc,
        },
      },
    },
    onCompleted: ({ user }) => {
      if (user && user.chats.length > 0) {
        setCurrentId(user.chats[0].chat.id);
      } else {
        setCurrentId('');
      }
    },
  });

  useEffect(() => {
    void refetch();
    navigate('/app/chat');
  }, [schemeId]);

  const [updateUserChat] = useUpdateUserChatMutation({
    onCompleted: () => {
      setSaving(false);
      void refetch();
    },
  });
  const [updateTodoMention] = useUpdateTodoMentionMutation();
  const handleMarkAsRead = (userChatId: string | undefined) => {
    if (userChatId) {
      setSaving(true);
      void updateUserChat({
        variables: {
          where: {
            id: userId,
          },
          data: {
            chats: {
              update: [
                {
                  data: {
                    newMessages: { set: false },
                    mentioned: { set: false },
                  },
                  where: {
                    id: userChatId,
                  },
                },
              ],
            },
          },
        },
      });

      void updateTodoMention({
        variables: {
          where: {
            userId,
            chatId: userChatId,
            type: TodoType.ChatMessage,
          },
        },
      });
    }
  };
  useEffect(() => {
    if (chatId === currentId) handleMarkAsRead(currentId);
  }, [chatId]);

  const toggleAddChat = () => {
    setAddChat(!addChat);
  };

  const updateAddUserChat: MutationUpdaterFn<CreateChatMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<UserChatsQuery>({
      query: UserChatsDocument,
      variables: {
        where: {
          id: userId,
        },
        scheme: schemeId,
        orderBy: {
          chat: {
            updatedAt: SortOrder.Desc,
          },
        },
      },
    });

    if (existingData?.user === null || existingData?.user === undefined) return;

    if (
      existingData?.user?.chats === null ||
      existingData?.user.chats === undefined
    )
      return;

    store.writeQuery<UserChatsQuery>({
      query: UserChatsDocument,
      data: {
        user: {
          id: userId,
          chats: [...existingData.user.chats, res.createChat.members[0]],
        },
        __typename: 'Query',
      },
      variables: {
        where: {
          id: userId,
        },
        scheme: schemeId,
        orderBy: {
          chat: {
            updatedAt: SortOrder.Desc,
          },
        },
      },
    });
  };

  // update userChat list after deleting a chat
  const updateDeletedUserChat: MutationUpdaterFn<DeleteChatMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<UserChatsQuery>({
      query: UserChatsDocument,
      variables: {
        where: {
          id: userId,
        },
        scheme: schemeId,
        orderBy: {
          chat: {
            updatedAt: SortOrder.Desc,
          },
        },
      },
    });

    if (existingData === null) return;
    if (
      existingData?.user?.chats === null ||
      existingData?.user?.chats === undefined
    )
      return;

    store.writeQuery<UserChatsQuery>({
      query: UserChatsDocument,
      data: {
        ...existingData,
        user: {
          ...existingData.user,
          chats: existingData.user?.chats.filter(
            (userChat) => userChat.chat.id !== res.deleteChat?.id
          ),
        },
        __typename: 'Query',
      },
      variables: {
        where: {
          id: userId,
        },
        scheme: schemeId,
        orderBy: {
          chat: {
            updatedAt: SortOrder.Desc,
          },
        },
      },
    });
  };

  return {
    data,
    loading,
    saving,
    handleMarkAsRead,
    currentId,
    addChat,
    toggleAddChat,
    updateAddUserChat,
    updateDeletedUserChat,
    adminRights: role !== Role.User,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    refetch,
  };
};

export default useViewChat;
