import type { DeleteChatMutation } from '#/graphql/chat/mutation/__generated__/delete_chat.generated';
import type { CreateChatMutation } from '#/graphql/chats/mutations/__generated__/create-chat.generated';
import type { UserChatsQuery } from '#/graphql/userChat/queries/__generated__/user_chats.generated';
import type { MutationUpdaterFn } from '@apollo/client';

import { useUpdateTodoMentionMutation } from '#/graphql/todos/mutations/__generated__/update_todo_mention.generated';
import { useMarkAsReadMessagesMutation } from '#/graphql/userChat/mutations/__generated__/mark_ad_read_messages.generated';
import {
  UserChatsDocument,
  useUserChatsQuery,
} from '#/graphql/userChat/queries/__generated__/user_chats.generated';
import { Role, SortOrder, TodoType } from 'graphql/types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useStoreState } from 'state';

interface Props {
  chatId: string;
}
interface Return {
  addChat: boolean;
  adminRights: boolean;
  currentId: string;
  data: UserChatsQuery | undefined;
  handleMarkAsRead: (value: string | undefined) => void;
  loading: boolean;
  refetch: () => void;
  saving: boolean;
  toggleAddChat: () => void;
  updateAddUserChat: MutationUpdaterFn<CreateChatMutation>;
  updateDeletedUserChat: MutationUpdaterFn<DeleteChatMutation>;
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
    onCompleted: ({ user }) => {
      if (chatId) {
        setCurrentId(chatId);
      } else if (user && user.chats.length > 0) {
        setCurrentId(user.chats[0].chat.id);
      } else {
        setCurrentId('');
      }
    },
    variables: {
      orderBy: {
        chat: {
          updatedAt: SortOrder.Desc,
        },
      },
      scheme: schemeId,
      where: {
        id: userId,
      },
    },
  });

  useEffect(() => {
    if (!chatId) {
      void refetch();
      navigate('/app/chat');
    }
  }, [schemeId]);

  const [markAsReadMessages] = useMarkAsReadMessagesMutation({
    onCompleted: () => {
      setSaving(false);
      void refetch();
    },
  });
  const [updateTodoMention] = useUpdateTodoMentionMutation({
    ignoreResults: true,
  });
  const handleMarkAsRead = (userChatId: string | undefined) => {
    if (userChatId) {
      setSaving(true);
      void markAsReadMessages({
        variables: { userChatId },
      });
      void updateTodoMention({
        variables: {
          where: {
            chatId: userChatId,
            type: TodoType.ChatMessage,
            userId,
          },
        },
      });
    }
  };
  useEffect(() => {
    if (chatId === currentId) handleMarkAsRead(currentId);
  }, [chatId, currentId]);

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
        orderBy: {
          chat: {
            updatedAt: SortOrder.Desc,
          },
        },
        scheme: schemeId,
        where: {
          id: userId,
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
      data: {
        __typename: 'Query',
        user: {
          chats: [...existingData.user.chats, res.createChat.members[0]],
          id: userId,
          totalChats: existingData.user.totalChats + 1,
        },
      },
      query: UserChatsDocument,
      variables: {
        orderBy: {
          chat: {
            updatedAt: SortOrder.Desc,
          },
        },
        scheme: schemeId,
        where: {
          id: userId,
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
        orderBy: {
          chat: {
            updatedAt: SortOrder.Desc,
          },
        },
        scheme: schemeId,
        where: {
          id: userId,
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
      data: {
        ...existingData,
        __typename: 'Query',
        user: {
          ...existingData.user,
          chats: existingData.user?.chats.filter(
            (userChat) => userChat.chat.id !== res.deleteChat?.id
          ),
        },
      },
      query: UserChatsDocument,
      variables: {
        orderBy: {
          chat: {
            updatedAt: SortOrder.Desc,
          },
        },
        scheme: schemeId,
        where: {
          id: userId,
        },
      },
    });
  };

  return {
    addChat,
    adminRights: role !== Role.User,
    currentId,
    data,
    handleMarkAsRead,
    loading,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    refetch,
    saving,
    toggleAddChat,
    updateAddUserChat,
    updateDeletedUserChat,
  };
};

export default useViewChat;
