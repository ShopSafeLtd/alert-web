import type { FormInstance } from 'antd';
import type { PhoneNumber } from 'antd-phone-input';
import type { UserUpdateInput } from 'graphql/types';
import type { UserQuery } from 'graphql/user/queries/__generated__/user.generated';
import type { BusinessData, SelectOptions } from 'types/DataType';

import {
  generatePhoneNumber,
  stringOrOption,
} from '#/components/form-components/user/AddUser/useAddUser';
import { useUserRolesQuery } from '#/components/form-components/user/graphql/queries/__generated__/custom-roles.generated';
import { useGroupsContext } from '#/context/groups-context';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Form, notification } from 'antd';
import { useSchemeChatsQuery } from 'graphql/chats/queries/__generated__/scheme-chats.generated';
import { Model, SortOrder } from 'graphql/types';
import { useUpdateUserMutation } from 'graphql/user/mutation/__generated__/update_user.generated';
import { useUserQuery } from 'graphql/user/queries/__generated__/user.generated';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

export interface FormData {
  activityEmail: boolean;
  activityPush: boolean;
  approverGroups: string[];
  bulletinEmails: boolean;
  bulletinPush: boolean;
  businesses: SelectOptions[] | string[];
  chats: string[];
  defaultGroups: string[];
  email?: string;
  fullName: string;
  groups: string[];
  incidentEmail: boolean;
  incidentPush: boolean;
  messagePush: boolean;
  mobileNumber?: PhoneNumber;
  offenderEmail: boolean;
  offenderPush: boolean;
  publicName: boolean;
  reportToAllBusinesses: boolean;
  role: string;
  subscribedIncidentOnly: boolean;
  subscribedOffenderOnly: boolean;
}
interface Props {
  onClose: () => void;
  userId: string;
}
interface Return {
  addBusinessVisible: boolean;
  availableRoles: SelectOptions[];
  chatsData: SelectOptions[] | undefined;
  chatsLoading: boolean;
  data: UserQuery | undefined;
  form: FormInstance<FormData>;
  groupsData: SelectOptions[] | undefined;
  groupsLoading: boolean;

  loading: boolean;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  selectedGroups: string[] | undefined;
  selectedRole: string | undefined;
  setSelectedGroups: (value: string[]) => void;
  setSelectedRole: (value: string) => void;
  toggleAddBusinessVisible: () => void;
  updateNewBusinessData: (values: BusinessData) => void;
}

const { useForm } = Form;

const useEditUser = ({ onClose, userId }: Props): Return => {
  const intl = useIntl();
  const [form] = useForm<FormData>();
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const [saving, setSaving] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>();
  const [selectedGroups, setSelectedGroups] = useState<string[]>();
  const [addBusinessVisible, setAddBusinessVisible] = useState(false);
  const [businessesData, setBusinessesData] = useState<BusinessData[]>([]);
  const [availableRoles, setAvailableRoles] = useState<SelectOptions[]>([]);

  const { data: rolesData, loading: rolesLoading } = useUserRolesQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: ({ roles }) => {
      const rolesFormatted = roles.edges.map(({ node: role }) => ({
        label: role.name,
        value: role.id,
      }));
      setAvailableRoles(rolesFormatted);
    },
    skip: !schemeId,
    variables: {
      schemeId,
    },
  });

  const { data: userData, loading } = useUserQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: ({ user }) => {
      setSelectedRole(user?.schemes[0]?.role);
      setSelectedGroups(user?.groups.map(({ id }) => id));
    },
    variables: {
      chatWhere: {
        chat: {
          scheme: {
            id: {
              equals: schemeId,
            },
          },
        },
      },
      groupWhere: {
        scheme: {
          id: {
            equals: schemeId,
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
      where: {
        id: userId,
      },
    },
  });

  const { groups, groupsLoading } = useGroupsContext();

  const { data: chatsData, loading: chatsLoading } = useSchemeChatsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: {
        name: SortOrder.Asc,
      },
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
    },
  });

  const [updateUser] = useUpdateUserMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The user has been updated.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
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
            data.businesses.map((value: SelectOptions | string) =>
              stringOrOption(value)
            )
          );

          const newBusinesses = businessesData
            ?.filter(({ isNew }) => isNew)
            .filter(({ id }) => businessIds.has(id));

          const connectedBusinesses = data.businesses.filter(
            (value) =>
              !newBusinesses?.some(
                ({ id: newBusinessId }) =>
                  newBusinessId === stringOrOption(value)
              )
          );
          const disconnectedBusinesses = userData?.user?.businesses.filter(
            ({ id }) => !businessIds.has(id)
          );
          return {
            connect:
              connectedBusinesses && connectedBusinesses.length > 0
                ? connectedBusinesses.map((value) => ({
                    id: stringOrOption(value),
                  }))
                : undefined,
            create:
              newBusinesses && newBusinesses.length > 0
                ? newBusinesses.map((el) => ({
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
                    name: el.name,
                    parent: el.parent
                      ? {
                          connect: {
                            id: el.parent.id,
                          },
                        }
                      : undefined,
                    publicName: el.publicName || false,
                    schemes: {
                      connect: [
                        {
                          id: schemeId,
                        },
                      ],
                    },
                    siteNumber: el.siteNumber,
                    tags: {
                      connect:
                        el.tags && el.tags.length > 0
                          ? el.tags.map((id) => ({ id }))
                          : undefined,
                      create:
                        el.newTags && el.newTags.length > 0
                          ? el.newTags.map((value) => ({
                              createdBy: { connect: { id: value.createdById } },
                              dataType: Model.Business,
                              description: value.description || '',
                              name: value.name,
                              schemes: {
                                connect: value.schemes.map((id) => ({ id })),
                              },
                            }))
                          : undefined,
                    },
                  }))
                : undefined,
            disconnect:
              disconnectedBusinesses && disconnectedBusinesses.length > 0
                ? disconnectedBusinesses.map(({ id }) => ({ id }))
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
      const findScheme = userData?.user?.schemes.find(
        (el) => el.schemeId === schemeId
      );
      const foundRole = rolesData?.roles.edges.find(
        ({ node: role }) => role.id === data.role
      )?.node;
      if (!foundRole || !findScheme) {
        return;
      }
      void updateUser({
        variables: {
          chatWhere: {
            chat: {
              scheme: {
                id: {
                  equals: schemeId,
                },
              },
            },
          },
          data: {
            activityEmail: { set: data.activityEmail },
            activityPush: { set: data.activityPush },
            ...(data.approverGroups
              ? (() => {
                  const approverGroupsToConnect = data.approverGroups
                    .filter(
                      (id) =>
                        !userData?.user?.approverGroups
                          .map((item) => item.id)
                          .includes(id)
                    )
                    .map((id) => ({ id }));

                  const approverGroupsToDisconnect =
                    userData?.user?.approverGroups
                      ?.filter(
                        ({ id }) =>
                          !data.approverGroups
                            .map((item) => item)
                            .includes(id) || disconnectGroupsId?.includes(id)
                      )
                      .map(({ id }) => ({ id })) ?? [];

                  if (
                    approverGroupsToConnect.length > 0 ||
                    approverGroupsToDisconnect.length > 0
                  ) {
                    return {
                      approverGroups: {
                        ...(approverGroupsToConnect.length > 0 && {
                          connect: approverGroupsToConnect,
                        }),
                        ...(approverGroupsToDisconnect.length > 0 && {
                          disconnect: approverGroupsToDisconnect,
                        }),
                      },
                    };
                  }
                  return {};
                })()
              : {}),
            bulletinEmails: { set: data.bulletinEmails },
            bulletinPush: { set: data.bulletinPush },
            businesses: getBusiness(),
            ...(() => {
              const chatsToCreate = data.chats
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
                }));

              const chatsToDelete =
                userData?.user?.chats
                  ?.filter((userChat) => !data.chats.includes(userChat.chat.id))
                  .map((userChat) => ({
                    id: userChat.id,
                  })) ?? [];

              // Only include chats if there are changes
              if (chatsToCreate.length > 0 || chatsToDelete.length > 0) {
                return {
                  chats: {
                    ...(chatsToCreate.length > 0 && { create: chatsToCreate }),
                    ...(chatsToDelete.length > 0 && { delete: chatsToDelete }),
                  },
                };
              }
              return {};
            })(),
            ...(data.defaultGroups
              ? (() => {
                  const defaultGroupsToConnect = data.defaultGroups
                    .filter(
                      (id) =>
                        !userData?.user?.defaultGroups
                          .map((item) => item.id)
                          .includes(id)
                    )
                    .map((id) => ({ id }));

                  const defaultGroupsToDisconnect =
                    userData?.user?.defaultGroups
                      ?.filter(
                        ({ id }) =>
                          !data.defaultGroups
                            .map((item) => item)
                            .includes(id) || disconnectGroupsId?.includes(id)
                      )
                      .map(({ id }) => ({ id })) ?? [];

                  if (
                    defaultGroupsToConnect.length > 0 ||
                    defaultGroupsToDisconnect.length > 0
                  ) {
                    return {
                      defaultGroups: {
                        ...(defaultGroupsToConnect.length > 0 && {
                          connect: defaultGroupsToConnect,
                        }),
                        ...(defaultGroupsToDisconnect.length > 0 && {
                          disconnect: defaultGroupsToDisconnect,
                        }),
                      },
                    };
                  }
                  return {};
                })()
              : {}),
            email: data.email ? { set: data.email } : undefined,
            fullName: { set: data.fullName },
            ...(() => {
              const groupsToConnect = data.groups
                .filter(
                  (id) =>
                    !userData?.user?.groups.map((item) => item.id).includes(id)
                )
                .map((id) => ({ id }));

              const groupsToDisconnect =
                disconnectGroupsId && disconnectGroupsId.length > 0
                  ? disconnectGroupsId?.map((id) => ({ id }))
                  : [];

              if (groupsToConnect.length > 0 || groupsToDisconnect.length > 0) {
                return {
                  groups: {
                    ...(groupsToConnect.length > 0 && {
                      connect: groupsToConnect,
                    }),
                    ...(groupsToDisconnect.length > 0 && {
                      disconnect: groupsToDisconnect,
                    }),
                  },
                };
              }
              return {};
            })(),
            incidentEmail: { set: data.incidentEmail },
            incidentPush: { set: data.incidentPush },
            messagePush: { set: data.messagePush },
            mobileNumber: generatePhoneNumber(data.mobileNumber)
              ? { set: generatePhoneNumber(data.mobileNumber) || '' }
              : undefined,
            offenderEmail: { set: data.offenderEmail },
            offenderPush: { set: data.offenderPush },
            publicName: { set: data.publicName },
            reportToAllBusinesses: { set: data.reportToAllBusinesses },
            schemes: {
              update: [
                {
                  data: {
                    activityEmail: { set: data.activityEmail },
                    activityPush: { set: data.activityPush },
                    bulletinEmails: { set: data.bulletinEmails },
                    bulletinPush: { set: data.bulletinPush },
                    fullName: { set: data.fullName },
                    incidentEmail: { set: data.incidentEmail },
                    incidentPush: { set: data.incidentPush },
                    messagePush: { set: data.messagePush },
                    offenderEmail: { set: data.offenderEmail },
                    offenderPush: { set: data.offenderPush },
                    permissions: {
                      connect: {
                        id: foundRole.id,
                      },
                    },
                    publicName: { set: data.publicName },
                    reportToAllBusinesses: { set: data.reportToAllBusinesses },
                    role: { set: foundRole.type },
                    subscribedIncidentOnly: {
                      set: data.subscribedIncidentOnly,
                    },
                    subscribedOffenderOnly: {
                      set: data.subscribedOffenderOnly,
                    },
                  },
                  where: {
                    id: findScheme.id,
                  },
                },
              ],
            },
            subscribedIncidentOnly: { set: data.subscribedIncidentOnly },
            subscribedOffenderOnly: { set: data.subscribedOffenderOnly },
          },
          groupWhere: {
            scheme: {
              id: {
                equals: schemeId,
              },
            },
          },
          where: {
            id: userId,
          },
        },
      });
    }
  };

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
        { label: values.name, value: values.id },
      ],
    });
    setBusinessesData([...businessesData, { ...values, isNew: true }]);
  };
  return {
    addBusinessVisible,
    availableRoles,
    chatsData: chatsData?.chats.map((chat) => ({
      label: chat.name,
      value: chat.id,
    })),
    chatsLoading,
    data: userData,
    form,
    groupsData: groups,
    groupsLoading,

    loading: loading || rolesLoading,
    onSubmit,
    saving,
    selectedGroups,
    selectedRole,
    setSelectedGroups,
    setSelectedRole,
    toggleAddBusinessVisible,
    updateNewBusinessData,
  };
};

export default useEditUser;
