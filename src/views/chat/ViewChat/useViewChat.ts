import { useState } from 'react';
import { useStoreState } from 'state';
import {
  SortOrder,
  UserChatsQuery,
  useUpdateUserChatMutation,
  useUserChatsQuery,
} from 'graphql/generated';

interface Return {
  currentId: string;
  data: UserChatsQuery | undefined;
  loading: boolean;
  saving: boolean;
  handleMarkAsRead: (value: string | undefined) => void;
}

const useViewChat = (): Return => {
  const [currentId, setCurrentId] = useState('');
  const userId = useStoreState((state) => state.user.id);
  const schemeId = useStoreState((state) => state.scheme.id);
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
          name: SortOrder.Desc,
        },
      },
    },
    onCompleted: ({ user }) => {
      if (user && user.chats.length > 0) {
        setCurrentId(user.chats[0].chat.id);
      }
    },
  });

  const [updateUserChat] = useUpdateUserChatMutation({
    onCompleted: () => {
      setSaving(false);
      // ???
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

  return {
    data,
    loading,
    saving,
    handleMarkAsRead,
    currentId,
  };
};

export default useViewChat;
