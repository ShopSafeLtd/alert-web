import { useState } from 'react';
import { useStoreState } from 'state';
import {
  UserChatsQuery,
  useUpdateUserChatMutation,
  useUserChatsQuery,
} from 'graphql/generated';

interface Props {
  onChangeId: (id: string) => void;
}
interface Return {
  data: UserChatsQuery | undefined;
  loading: boolean;
  saving: boolean;
  handleMarkAsRead: (value: string | undefined) => void;
}

const useChatSideList = ({ onChangeId }: Props): Return => {
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
    },
    onCompleted: ({ user }) => {
      if (user && user.chats.length > 0) {
        onChangeId(user.chats[0].id);
      }
    },
  });

  const [updateUserChat] = useUpdateUserChatMutation({
    onCompleted: () => {
      setSaving(false);
      refetch();
    },
  });

  const handleMarkAsRead = (userChatId: string | undefined) => {
    setSaving(true);
    if (userChatId) {
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
        // optimisticResponse: {
        //   updateUser: {
        //     id: userId,
        //     chats: data.user.chats.map((el) => ({
        //       id: el.id,
        //       newMessages: el.id === userChatId ? false : el.id,
        //       chat: el.chat,
        //     })),
        //   },
        // },
      });
    }
  };

  return {
    data,
    loading,
    saving,
    handleMarkAsRead,
  };
};

export default useChatSideList;
