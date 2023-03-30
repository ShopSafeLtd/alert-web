import { useState } from 'react';
import { useStoreState } from 'state';
import type {
  Role,
  UserQuery,
  SchemeGroupsQuery,
  SchemeChatsQuery,
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
} from 'graphql/generated';
import {
  SortOrder,
  useSchemeGroupsQuery,
  useSchemeChatsQuery,
  useUserQuery,
  useUpdateUserMutation,
  SearchBusinessesDocument,
  QueryMode,
} from 'graphql/generated';
import { notification } from 'antd';
import { useApolloClient } from '@apollo/client';

interface FormData {
  fullName: string;
  email: string;
  business: {
    value: string;
    label: string;
  };
  role: Role;
  groups: string[];
  chats: string[];
  incidentEmail: boolean;
  incidentPush: boolean;
  subscribedIncidentOnly: boolean;
  subscribedOffenderOnly: boolean;
  messagePush: boolean;
  offenderEmail: boolean;
  offenderPush: boolean;
  publicName: boolean;
}
interface Props {
  onClose: () => void;
  userId: string;
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
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: React.ReactNode; value: string }[]>;
}

const useEditUser = ({ onClose, userId }: Props): Return => {
  const client = useApolloClient();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);

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
        name: SortOrder.Asc,
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
        name: SortOrder.Asc,
      },
    },
  });

  const [updateUser] = useUpdateUserMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Updated!',
        description: 'The user has been Updated! ',
        placement: 'bottomRight',
      });
      onClose();
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
    if (userId)
      updateUser({
        variables: {
          where: {
            id: userId,
          },
          data: {
            email: { set: data.email },
            fullName: { set: data.fullName },
            incidentEmail: { set: data.incidentEmail },
            incidentPush: { set: data.incidentPush },
            publicName: { set: data.publicName },
            subscribedIncidentOnly: { set: data.subscribedIncidentOnly },
            subscribedOffenderOnly: { set: data.subscribedOffenderOnly },
            messagePush: { set: data.messagePush },
            offenderEmail: { set: data.offenderEmail },
            offenderPush: { set: data.offenderPush },
            businesses: {
              connect: [
                {
                  id: data.business.value,
                },
              ],
            },
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
              connect: data.groups
                .filter(
                  (id) =>
                    !userData?.user?.groups.map((item) => item.id).includes(id)
                )
                .map((id) => ({ id })),
              disconnect: userData?.user?.groups
                .filter(
                  ({ id }) => !data.groups.map((item) => item).includes(id)
                )
                .map(({ id }) => ({ id })),
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
                .filter((userChat) => !data.chats.includes(userChat.chat.id))
                .map((userChat) => ({
                  id: userChat.id,
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

  const onSearchBusiness = async (value: string) => {
    if (value.length < 2) {
      return [];
    }
    return client
      .query<SearchBusinessesQuery, SearchBusinessesQueryVariables>({
        query: SearchBusinessesDocument,
        variables: {
          where: {
            name: {
              contains: value,
              mode: QueryMode.Insensitive,
            },
            schemes: {
              some: {
                id: {
                  equals: schemeId,
                },
              },
            },
          },
        },
      })
      .then((response) =>
        response.data.listBusinesses.businesses.length > 0
          ? response.data.listBusinesses.businesses.map((item) => ({
              label: item?.name || '',
              value: item?.id || '',
            }))
          : [
              {
                label: 'No results found',
                value: '',
                disabled: true,
              },
            ]
      );
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
    onSearchBusiness,
  };
};

export default useEditUser;
