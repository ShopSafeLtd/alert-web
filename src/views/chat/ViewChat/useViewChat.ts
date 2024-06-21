import { useEffect, useState } from 'react';
import { useStoreState } from 'state';

import type { MutationUpdaterFn } from '@apollo/client';
import { useNavigate } from 'react-router';
import type { UserChatsQuery } from 'graphql/userChat/queries/user_chats.generated';
import {
  UserChatsDocument,
  useUserChatsQuery,
} from 'graphql/userChat/queries/user_chats.generated';
import type { CreateChatMutation } from 'graphql/chats/mutations/create-chat.generated';
import type { DeleteChatMutation } from 'graphql/chat/mutation/delete_chat.generated';
import { Role, SortOrder, TodoType } from 'graphql/types';
import { useMarkAsReadMessagesMutation } from 'graphql/userChat/mutations/mark_ad_read_messages.generated';
import { useUpdateTodoMentionMutation } from 'graphql/todos/mutations/update_todo_mention.generated';

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
          totalChats: existingData.user.totalChats + 1,
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
