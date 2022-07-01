import { useState } from 'react';
import { useStoreState } from 'state';
import {
  Role,
  UserQuery,
  SchemeGroupsQuery,
  SchemeChatsQuery,
  SortOrder,
  useSchemeGroupsQuery,
  useSchemeChatsQuery,
  useUserQuery,
  useUpdateUserMutation,
} from 'graphql/generated';
import { notification } from 'antd';
import { useParams } from 'react-router-dom';

interface FormData {
  // id: string;
  fullName: string;
  email: string;
  organisation: string;
  role: Role;
  postcode: string;
  street: string;
  townCity: string;
  building: string;
  county: string;
  groups: string[];
  chats: string[];
}
interface Props {
  onClose: () => void;
  // update: MutationUpdaterFn<UpdateUserMutation>;
}
interface Return {
  onSubmit: (value: FormData) => void;
  data: UserQuery | undefined;
  loading: boolean;
  groupsData: SchemeGroupsQuery | undefined;
  groupsLoading: boolean;
  chatsData: SchemeChatsQuery | undefined;
  chatsLoading: boolean;
  saving: boolean;
}
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const useEditUser = ({ onClose }: Props): Return => {
  const userId = useParams().id;
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

  const { data: userData, loading } = useUserQuery({
    variables: {
      where: {
        id: userId,
      },

      groupWhere: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
      chatWhere: {
        chat: {
          scheme: {
            id: {
              equals: schemeId,
            },
          },
        },
      },
      schemeWhere: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
    },
  });

  const { data: groupsData, loading: groupsLoading } = useSchemeGroupsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
      orderBy: {
        name: SortOrder.Desc,
      },
    },
  });

  const { data: chatsData, loading: chatsLoading } = useSchemeChatsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
      orderBy: {
        name: SortOrder.Desc,
      },
    },
  });

  const [updateUser] = useUpdateUserMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      openNotification('success');
    },
    onError: () => {
      openNotification('error');
    },
    // update,
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    if (userId)
      updateUser({
        variables: {
          where: {
            id: userId,
          },
          data: {
            addresses: {
              update: [
                {
                  data: {
                    postcode: { set: data.postcode || '' },
                    street: { set: data.street || '' },
                    townCity: { set: data.townCity || '' },
                    building: { set: data.building || '' },
                    county: { set: data.county || '' },
                  },
                  where: {
                    id: userData?.user?.addresses[0].id,
                  },
                },
              ],
            },
            email: { set: data.email },
            fullName: { set: data.fullName },
            organisation: { set: data.organisation },
            schemes: {
              update: [
                {
                  data: {
                    role: { set: data.role },
                  },
                  where: {
                    id: userData?.user?.schemes[0].id,
                  },
                },
              ],
            },
            groups: {
              set: data.groups.map((id) => ({ id })),
            },
            chats: {
              create: data.chats
                .filter(
                  (chatId) =>
                    !userData?.user?.chats
                      .map((userChat) => userChat.chat.id)
                      .includes(chatId)
                )
                .map((chatId) => ({
                  chat: {
                    connect: {
                      id: chatId,
                    },
                  },
                  newMessages: true,
                })),
              delete: userData?.user?.chats
                .filter((chat) => !data.chats.includes(chat.chat.id))
                .map((chat) => ({
                  id: chat.id,
                })),
            },
          },
          groupWhere: {
            scheme: {
              id: {
                equals: schemeId,
              },
            },
          },
          chatWhere: {
            chat: {
              scheme: {
                id: {
                  equals: schemeId,
                },
              },
            },
          },
        },
      });
  };

  return {
    onSubmit,
    data: userData,
    loading,
    groupsData,
    groupsLoading,
    chatsData,
    chatsLoading,
    saving,
    // onValuesChange,
    // form,
  };
};

export default useEditUser;
