import { useEffect, useState } from 'react';
import { useStoreState } from 'state';
import {
  CreateChatMutation,
  DeleteChatMutation,
  Role,
  SortOrder,
  UserChatsDocument,
  UserChatsQuery,
  useUpdateUserChatMutation,
  useUserChatsQuery,
} from 'graphql/generated';
import { MutationUpdaterFn } from '@apollo/client';
import { useNavigate } from 'react-router';

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
}

const useViewChat = (): Return => {
  const role = useStoreState((state) => state.user.role);
  const userId = useStoreState((state) => state.user.id);
  const schemeId = useStoreState((state) => state.scheme.id);
  const navigate = useNavigate();
  const [addChat, setAddChat] = useState(false);
  const [currentId, setCurrentId] = useState('');
  // const [currentSchemeId, setCurrentSchemeId] = useState(schemeId);
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
          name: SortOrder.Asc,
        },
      },
    },
    onCompleted: ({ user }) => {
      if (user && user.chats.length > 0) {
        setCurrentId(user.chats[0].chat.id);
      }
    },
  });
  useEffect(() => {
    refetch();
    navigate('/app/chat');
  }, [schemeId]);
  const [updateUserChat] = useUpdateUserChatMutation({
    onCompleted: () => {
      setSaving(false);
      refetch();
    },
  });

  const handleMarkAsRead = (userChatId: string | undefined) => {
    if (userChatId) {
      setSaving(true);
      updateUserChat({
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
    }
  };

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
            name: SortOrder.Asc,
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

    console.log('chats', [
      ...existingData?.user.chats,
      res.createChat.members.find(
        (userChat) => userChat.chat.id === res.createChat.id
      ),
    ]);
    console.log(
      'chats2',
      existingData.user.chats.concat(
        res.createChat.members.filter(
          (userChat) => userChat.chat.id === res.createChat.id
        )
      )
    );

    store.writeQuery<UserChatsQuery>({
      query: UserChatsDocument,

      data: {
        user: {
          id: userId,
          chats:
            existingData?.user?.chats && existingData.user.chats.length > 0
              ? existingData.user.chats.concat(
                  res.createChat.members.filter(
                    (userChat) => userChat.chat.id === res.createChat.id
                  )
                )
              : res.createChat.members.filter(
                  (userChat) => userChat.chat.id === res.createChat.id
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
            name: SortOrder.Asc,
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
            name: SortOrder.Asc,
          },
        },
      },
    });

    if (existingData === null) return;
    if (
      existingData?.user?.chats === null ||
      existingData.user?.chats === undefined
    )
      return;

    store.writeQuery<UserChatsQuery>({
      query: UserChatsDocument,
      data: {
        user: {
          id: userId,
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
            name: SortOrder.Asc,
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
  };
};

export default useViewChat;
