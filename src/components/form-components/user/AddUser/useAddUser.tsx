/* eslint-disable @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from 'react';
import type {
  CreateUserInDatabaseMutation,
  InviteExistingUserMutation,
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
  Role,
  UserUpdateInput,
  CreateUserData,
} from 'graphql/generated';
import {
  Model,
  QueryMode,
  SearchBusinessesDocument,
  SortOrder,
  useCreateUserInDatabaseMutation,
  useInviteExistingUserMutation,
  useSchemeChatsQuery,
  useSchemeGroupsQuery,
  useSchemeQuery,
  useSearchUserQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';
import type { MutationUpdaterFn } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import type { FormInstance } from 'antd';
import { Form, Modal, notification } from 'antd';
import type { BusinessData, SelectOptions } from 'types/DataType';
import errorNotification from 'types/mutation_notifications/error_notification';

const { confirm } = Modal;
const { useForm } = Form;

export interface FormData {
  fullName: string;
  email: string;
  businesses: SelectOptions[];
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
  reportToAllBusinesses: boolean;
  approverGroups: string[];
  defaultGroups: string[];
}

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateUserInDatabaseMutation>;
  updateSearch: MutationUpdaterFn<InviteExistingUserMutation>;
  business?: {
    value: string;
    label: string;
  };
}

interface Return {
  onSubmit: (value: FormData) => void;
  groupsData: SelectOptions[] | undefined;
  groupsLoading: boolean;
  chatsData: SelectOptions[] | undefined;
  chatsLoading: boolean;
  schemeLoading: boolean;
  saving: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValuesChange: (changedValues: any, values: FormData) => void;
  form: FormInstance<FormData>;
  existingUser: boolean;
  // onSearchBusiness: (
  //   value: string
  // ) => Promise<{ label: React.ReactNode; value: string }[]>;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: string; value: string; location?: string }[]>;
  selectedRole: Role | undefined;
  setSelectedRole: (value: Role) => void;
  selectedGroups: string[] | undefined;
  setSelectedGroups: (value: string[]) => void;
  addBusinessVisible: boolean;
  toggleAddBusinessVisible: () => void;
  updateNewBusinessData: (values: BusinessData) => void;
}

const useAddUser = ({
  onClose,
  update,
  updateSearch,
  business,
}: Props): Return => {
  const client = useApolloClient();
  const [form] = useForm<FormData>();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [existingUser, setExistingUser] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role>();
  const [selectedGroups, setSelectedGroups] = useState<string[]>();
  const [addBusinessVisible, setAddBusinessVisible] = useState(false);
  const [businessesData, setBusinessesData] = useState<BusinessData[]>([]);

  useEffect(() => {
    if (business)
      form.setFieldsValue({
        businesses: [business],
      });
  }, [business]);

  const { data: userData } = useSearchUserQuery({
    variables: {
      where: {
        email: search?.toLowerCase(),
      },
    },
    skip: search === null,
    onCompleted: ({ user }) => {
      if (user) {
        confirm({
          title: 'This user already exists',
          content: `A user with the email address ${user.email} already exists, do you want to invite ${user.fullName} to the scheme?`,
          onOk() {
            setExistingUser(true);
            setBusinessesData(
              user.businesses.map((el) => ({ ...el, isConnected: true }))
            );
            form.setFieldsValue({
              fullName: user.fullName,
              email: user.email,
              publicName: user.publicName,
              reportToAllBusinesses: user.reportToAllBusinesses,
              businesses:
                user.businesses && user.businesses.length > 0
                  ? user.businesses.map(({ id, name }) => ({
                      value: id,
                      label: name,
                    }))
                  : [],
            });
          },
          onCancel() {
            form.setFieldsValue({
              email: '',
            });
          },
        });
      }
    },
  });

  const { loading: schemeLoading } = useSchemeQuery({
    variables: { where: { id: schemeId } },
    onCompleted: (data) => {
      form.setFieldsValue({
        incidentEmail: data.scheme?.defaultIncidentEmail,
        incidentPush: data.scheme?.defaultIncidentPush,
        messagePush: data.scheme?.defaultMessagePush,
        offenderEmail: data.scheme?.defaultOffenderEmail,
        offenderPush: data.scheme?.defaultOffenderPush,
        subscribedIncidentOnly: data.scheme?.defaultSubscribedIncidentOnly,
        subscribedOffenderOnly: data.scheme?.defaultSubscribedOffenderOnly,
      });
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

  const [createUserInDatabase] = useCreateUserInDatabaseMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Invited!',
        description: 'The invitation has been sent! ',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update,
  });

  const [inviteExistingUser] = useInviteExistingUserMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Invited!',
        description: 'The invitation has been sent! ',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update: updateSearch,
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);

    const businessIds = new Set(data.businesses.map(({ value }) => value));
    const newBusinesses = businessesData
      ?.filter(({ isNew }) => isNew)
      .filter(({ id }) => [...businessIds].includes(id));
    const updatedBusinesses = businessesData
      ?.filter(({ isConnected }) => isConnected)
      .filter(({ id }) => [...businessIds].includes(id));
    const connectedBusinesses = data.businesses.filter(
      ({ value }) =>
        !newBusinesses?.some(
          ({ id: newBusinessId }) => newBusinessId === value
        ) &&
        !updatedBusinesses?.some(
          ({ id: updatedBusinessId }) => updatedBusinessId === value
        )
    );
    const getExistingUserBusiness = (): UserUpdateInput['businesses'] => ({
      connect:
        connectedBusinesses && connectedBusinesses.length > 0
          ? connectedBusinesses.map(({ value }) => ({ id: value }))
          : undefined,
      update:
        updatedBusinesses && updatedBusinesses.length > 0
          ? updatedBusinesses.map((el) => ({
              where: {
                id: el.id,
              },
              data: {
                schemes: {
                  connect: [
                    {
                      id: schemeId,
                    },
                  ],
                },
              },
            }))
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
    });
    const getBusiness = (): CreateUserData['businesses'] => ({
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

    if (existingUser && userData?.user) {
      void inviteExistingUser({
        variables: {
          where: {
            id: userData.user.id,
          },
          data: {
            groups: { connect: data.groups.map((id) => ({ id })) },
            approverGroups:
              data.approverGroups && data.approverGroups.length > 0
                ? { connect: data.approverGroups.map((id) => ({ id })) }
                : undefined,
            defaultGroups:
              data.defaultGroups && data.defaultGroups.length > 0
                ? { connect: data.defaultGroups.map((id) => ({ id })) }
                : undefined,
            chats:
              data.chats.length > 0
                ? {
                    create: data.chats.map((id) => ({
                      newMessages: false,
                      chat: {
                        connect: { id },
                      },
                    })),
                  }
                : undefined,
            schemes: {
              create: [
                {
                  role: data.role,
                  scheme: {
                    connect: { id: schemeId },
                  },
                },
              ],
            },
            businesses: getExistingUserBusiness(),
          },
          groupWhere: {
            scheme: {
              id: {
                equals: schemeId,
              },
            },
          },
        },
      });
    } else {
      void createUserInDatabase({
        variables: {
          data: {
            email: data.email,
            fullName: data.fullName,
            groups: data.groups.map((id) => ({ id })),
            approverGroups: data.approverGroups
              ? data.approverGroups.map((id) => ({ id }))
              : undefined,
            defaultGroups: data.defaultGroups
              ? data.defaultGroups.map((id) => ({ id }))
              : undefined,
            role: data.role,
            publicName: data.publicName,
            reportToAllBusinesses: data.reportToAllBusinesses,
            incidentEmail: data.incidentEmail,
            incidentPush: data.incidentPush,
            messagePush: data.messagePush,
            offenderEmail: data.offenderEmail,
            offenderPush: data.offenderPush,
            subscribedIncidentOnly: data.subscribedIncidentOnly,
            subscribedOffenderOnly: data.subscribedOffenderOnly,
            scheme: {
              id: schemeId,
            },
            chats: data.chats.map((id) => ({ id })),
            businesses: getBusiness(),
          },
          groupWhere: {
            scheme: {
              id: {
                equals: schemeId,
              },
            },
          },
        },
      });
    }
    onClose();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onValuesChange = (changedValues: any) => {
    if (changedValues.email) setSearch(changedValues.email);
    // if(changedValues.business)
  };

  const onSearchBusiness = async (value: string) =>
    client
      .query<SearchBusinessesQuery, SearchBusinessesQueryVariables>({
        query: SearchBusinessesDocument,
        variables: {
          where: {
            schemes: {
              some: {
                id: {
                  equals: schemeId,
                },
              },
            },
            name: {
              contains: value,
              mode: QueryMode.Insensitive,
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
    onValuesChange,
    form,
    existingUser,
    onSearchBusiness,
    schemeLoading,
    selectedRole,
    setSelectedRole,
    selectedGroups,
    setSelectedGroups,
    addBusinessVisible,
    toggleAddBusinessVisible,
    updateNewBusinessData,
  };
};

export default useAddUser;
