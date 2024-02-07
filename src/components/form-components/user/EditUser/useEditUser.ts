import { useState } from 'react';
import { useStoreState } from 'state';
import type {
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
  UserQuery,
  UserUpdateInput,
} from 'graphql/generated';
import {
  Model,
  QueryMode,
  SearchBusinessesDocument,
  SortOrder,
  useSchemeChatsQuery,
  useSchemeGroupsQuery,
  useUpdateUserMutation,
  useUserQuery,
  useUserRolesQuery,
} from 'graphql/generated';
import type { FormInstance } from 'antd';
import { Form, notification } from 'antd';
import { useApolloClient } from '@apollo/client';
import type { BusinessData, SelectOptions } from 'types/DataType';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';

export interface FormData {
  fullName: string;
  email: string;
  businesses: SelectOptions[];
  role: string;
  groups: string[];
  approverGroups: string[];
  defaultGroups: string[];
  chats: string[];
  incidentEmail: boolean;
  incidentPush: boolean;
  bulletinEmails: boolean;
  bulletinPush: boolean;
  subscribedIncidentOnly: boolean;
  subscribedOffenderOnly: boolean;
  messagePush: boolean;
  offenderEmail: boolean;
  offenderPush: boolean;
  publicName: boolean;
  reportToAllBusinesses: boolean;
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
  selectedRole: string | undefined;
  setSelectedRole: (value: string) => void;
  availableRoles: SelectOptions[];
  selectedGroups: string[] | undefined;
  setSelectedGroups: (value: string[]) => void;
  form: FormInstance<FormData>;
  addBusinessVisible: boolean;
  toggleAddBusinessVisible: () => void;
  updateNewBusinessData: (values: BusinessData) => void;
}

const { useForm } = Form;

const useEditUser = ({ onClose, userId }: Props): Return => {
  const client = useApolloClient();
  const intl = useIntl();
  const [form] = useForm<FormData>();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>();
  const [selectedGroups, setSelectedGroups] = useState<string[]>();
  const [addBusinessVisible, setAddBusinessVisible] = useState(false);
  const [businessesData, setBusinessesData] = useState<BusinessData[]>([]);
  const [availableRoles, setAvailableRoles] = useState<SelectOptions[]>([]);

  const { data: rolesData, loading: rolesLoading } = useUserRolesQuery({
    variables: {
      schemeId,
    },
    skip: !schemeId,
    onCompleted: ({ roles }) => {
      const rolesFormatted = roles.edges.map(({ node: role }) => ({
        label: role.name,
        value: role.id,
      }));
      setAvailableRoles(rolesFormatted);
    },
  });

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
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
          id: 'w5Yfkf',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The user has been updated.',
          id: 'm0wU41',
        }),
        placement: 'bottomRight',
      });
      onClose();
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);

    if (userId) {
      const disconnectGroupsId = userData?.user?.groups
        .filter(({ id }) => !data.groups.map((item) => item).includes(id))
        .map(({ id }) => id);
      const getBusiness = (): UserUpdateInput['businesses'] => {
        if (data.businesses) {
          const businessIds = new Set(
            data.businesses.map(({ value }) => value)
          );

          const newBusinesses = businessesData
            ?.filter(({ isNew }) => isNew)
            .filter(({ id }) => businessIds.has(id));

          const connectedBusinesses = data.businesses.filter(
            ({ value }) =>
              !newBusinesses?.some(
                ({ id: newBusinessId }) => newBusinessId === value
              )
          );
          const disconnectedBusinesses = userData?.user?.businesses.filter(
            ({ id }) => !businessIds.has(id)
          );
          return {
            disconnect:
              disconnectedBusinesses && disconnectedBusinesses.length > 0
                ? disconnectedBusinesses.map(({ id }) => ({ id }))
                : undefined,
            connect:
              connectedBusinesses && connectedBusinesses.length > 0
                ? connectedBusinesses.map(({ value }) => ({ id: value }))
                : undefined,
            create:
              newBusinesses && newBusinesses.length > 0
                ? newBusinesses.map((el) => ({
                    name: el.name,
                    siteNumber: el.siteNumber,
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
                    tags: {
                      connect:
                        el.tags && el.tags.length > 0
                          ? el.tags.map((id) => ({ id }))
                          : undefined,
                      create:
                        el.newTags && el.newTags.length > 0
                          ? el.newTags.map((value) => ({
                              name: value.name,
                              description: value.description || '',
                              schemes: {
                                connect: value.schemes.map((id) => ({ id })),
                              },
                              createdBy: { connect: { id: value.createdById } },
                              dataType: Model.Business,
                            }))
                          : undefined,
                    },
                    groups: el?.groups
                      ? { connect: el?.groups?.map((id) => ({ id })) }
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
          };
        }
        return {
          connect: undefined,
          create: undefined,
          disconnect:
            userData?.user?.businesses && userData?.user?.businesses.length > 0
              ? userData?.user?.businesses.map(({ id }) => ({ id }))
              : undefined,
        };
      };

      const foundRole = rolesData?.roles.edges.find(
        ({ node: role }) => role.id === data.role
      )?.node;
      if (!foundRole) {
        return;
      }
      void updateUser({
        variables: {
          where: {
            id: userId,
          },
          data: {
            email: { set: data.email },
            fullName: { set: data.fullName },
            incidentEmail: { set: data.incidentEmail },
            incidentPush: { set: data.incidentPush },
            bulletinEmails: { set: data.bulletinEmails },
            bulletinPush: { set: data.bulletinPush },
            publicName: { set: data.publicName },
            reportToAllBusinesses: { set: data.reportToAllBusinesses },
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
                    role: { set: foundRole.type },
                    permissions: {
                      connect: {
                        id: foundRole.id,
                      },
                    },
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
              disconnect:
                disconnectGroupsId && disconnectGroupsId.length > 0
                  ? disconnectGroupsId?.map((id) => ({ id }))
                  : undefined,
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
                        !data.approverGroups.map((item) => item).includes(id) ||
                        disconnectGroupsId?.includes(id)
                    )
                    .map(({ id }) => ({ id })),
                }
              : undefined,
            defaultGroups: data.defaultGroups
              ? {
                  connect: data.defaultGroups
                    .filter(
                      (id) =>
                        !userData?.user?.defaultGroups
                          .map((item) => item.id)
                          .includes(id)
                    )
                    .map((id) => ({ id })),
                  disconnect: userData?.user?.defaultGroups
                    .filter(
                      ({ id }) =>
                        !data.defaultGroups.map((item) => item).includes(id) ||
                        disconnectGroupsId?.includes(id)
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
                label: intl.formatMessage({
                  defaultMessage: 'No results found',
                  id: 'hX5PAb',
                }),
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const selectedBusinesses = form.getFieldValue('businesses');
    form.setFieldsValue({
      businesses: [
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        ...(selectedBusinesses && selectedBusinesses.length > 0
          ? selectedBusinesses
          : []),
        { value: values.id, label: values.name },
      ],
    });
    setBusinessesData([...businessesData, { ...values, isNew: true }]);
  };
  return {
    onSubmit,
    data: userData,
    loading: loading || rolesLoading,
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
    availableRoles,
  };
};

export default useEditUser;
