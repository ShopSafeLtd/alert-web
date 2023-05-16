import { useState } from 'react';
import { useStoreState } from 'state';
import type {
  Role,
  UserQuery,
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
  UserUpdateInput,
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
import type { FormInstance } from 'antd';
import { notification } from 'antd';
import { useApolloClient } from '@apollo/client';
import type { BusinessData, SelectOptions } from 'types/DataType';
import { useForm } from 'antd/lib/form/Form';

export interface FormData {
  fullName: string;
  email: string;
  businesses: SelectOptions[];
  role: Role;
  groups: string[];
  approverGroups: string[];
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
  groupsData: SelectOptions[] | undefined;
  groupsLoading: boolean;
  chatsData: SelectOptions[] | undefined;
  chatsLoading: boolean;
  saving: boolean;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: string; value: string; location?: string }[]>;
  selectedRole: Role | undefined;
  setSelectedRole: (value: Role) => void;
  selectedGroups: string[] | undefined;
  setSelectedGroups: (value: string[]) => void;
  form: FormInstance<FormData>;
  addBusinessVisible: boolean;
  toggleAddBusinessVisible: () => void;
  updateNewBusinessData: (values: BusinessData) => void;
}

const useEditUser = ({ onClose, userId }: Props): Return => {
  const client = useApolloClient();
  const [form] = useForm<FormData>();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>();
  const [selectedGroups, setSelectedGroups] = useState<string[]>();
  const [addBusinessVisible, setAddBusinessVisible] = useState(false);
  const [businessesData, setBusinessesData] = useState<BusinessData[]>([]);

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
    onCompleted: ({ user }) => {
      setSelectedRole(user?.schemes[0].role);
      setSelectedGroups(user?.groups.map(({ id }) => id));
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

    if (userId) {
      const businessIds = new Set(data.businesses.map(({ value }) => value));
      const newBusinesses = businessesData
        ?.filter(({ isNew }) => isNew)
        .filter(({ id }) => [...businessIds].includes(id));

      const connectedBusinesses = data.businesses.filter(
        ({ value }) =>
          !newBusinesses?.some(
            ({ id: newBusinessId }) => newBusinessId === value
          )
      );
      const getBusiness = (): UserUpdateInput['businesses'] => ({
        connect:
          connectedBusinesses && connectedBusinesses.length > 0
            ? connectedBusinesses.map(({ value }) => ({ id: value }))
            : undefined,
        create:
          newBusinesses && newBusinesses.length > 0
            ? newBusinesses.map((el) => ({
                name: el.name,
                publicName: el.publicName || false,
                schemes: {
                  connect: [
                    {
                      id: schemeId,
                    },
                  ],
                },
                parent: el.parent
                  ? {
                      connect: {
                        id: el.parent.id,
                      },
                    }
                  : undefined,
                locations: {
                  create: [
                    {
                      building: el.locations[0].building || null,
                      county: el.locations[0].county || null,
                      postcode: el.locations[0].postcode || '',
                      street: el.locations[0].street || '',
                      townCity: el.locations[0].townCity || '',
                    },
                  ],
                },
              }))
            : undefined,
      });
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
            businesses: getBusiness(),
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
            approverGroups: data.approverGroups
              ? {
                  connect: data.approverGroups
                    .filter(
                      (id) =>
                        !userData?.user?.approverGroups
                          .map((item) => item.id)
                          .includes(id)
                    )
                    .map((id) => ({ id })),
                  disconnect: userData?.user?.approverGroups
                    .filter(
                      ({ id }) =>
                        !data.approverGroups.map((item) => item).includes(id)
                    )
                    .map(({ id }) => ({ id })),
                }
              : undefined,
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
    }
  };

  const onSearchBusiness = async (value: string) =>
    client
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
          ? [...response.data.listBusinesses.businesses, ...businessesData].map(
              (item) => ({
                label: item.name || '',
                value: item?.id || '',
                location: item?.locations[0].full || '',
              })
            )
          : [
              {
                label: 'No results found',
                value: '',
                disabled: true,
              },
            ]
      );
  const toggleAddBusinessVisible = () => {
    setAddBusinessVisible(!addBusinessVisible);
  };
  const updateNewBusinessData = (values: BusinessData) => {
    setAddBusinessVisible(false);
    const selectedBusinesses = form.getFieldValue('businesses');
    form.setFieldsValue({
      businesses: [
        ...selectedBusinesses,
        { value: values.id, label: values.name },
      ],
    });
    setBusinessesData([...businessesData, { ...values, isNew: true }]);
  };
  return {
    onSubmit,
    data: userData,
    loading,
    groupsData: groupsData?.groups.map((group) => ({
      value: group.id,
      label: group.name,
    })),
    groupsLoading,
    chatsData: chatsData?.chats.map((chat) => ({
      value: chat.id,
      label: chat.name,
    })),
    chatsLoading,
    saving,
    onSearchBusiness,
    selectedRole,
    setSelectedRole,
    selectedGroups,
    setSelectedGroups,
    form,
    addBusinessVisible,
    toggleAddBusinessVisible,
    updateNewBusinessData,
  };
};

export default useEditUser;
