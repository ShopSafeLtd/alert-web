/* eslint-disable @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from 'react';
import { useStoreState } from 'state';
import type { MutationUpdaterFn } from '@apollo/client';
import type { FormInstance } from 'antd';
import { Form, Modal, notification } from 'antd';
import type { BusinessData, SelectOptions } from 'types/DataType';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useGroupsContext } from '#/context/groups-context';
import type { CreateUserInDatabaseMutation } from 'graphql/users/mutations/create-user-in-databse.generated';
import { useCreateUserInDatabaseMutation } from 'graphql/users/mutations/create-user-in-databse.generated';
import type { InviteExistingUserMutation } from 'graphql/users/mutations/invite-exiting-user.generated';
import { useInviteExistingUserMutation } from 'graphql/users/mutations/invite-exiting-user.generated';
import { useUserRolesQuery } from '#/components/form-components/user/graphql/queries/custom-roles.generated';
import { useSearchUserQuery } from 'graphql/users/queries/search-user.generated';
import { useSchemeQuery } from 'graphql/scheme/queries/scheme.generated';
import { useSchemeChatsQuery } from 'graphql/chats/queries/scheme-chats.generated';
import type { CreateUserData, UserUpdateInput } from 'graphql/types';
import { Model, SortOrder } from 'graphql/types';

const { confirm } = Modal;
const { useForm } = Form;

export interface FormData {
  fullName: string;
  email: string;
  businesses: string[] | SelectOptions[];
  role: string;
  groups: string[];
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
  selectedRole: string | undefined;
  setSelectedRole: (value: string) => void;
  selectedGroups: string[] | undefined;
  setSelectedGroups: (value: string[]) => void;
  addBusinessVisible: boolean;
  toggleAddBusinessVisible: () => void;
  updateNewBusinessData: (values: BusinessData) => void;
  availableRoles: SelectOptions[];
}

export const stringOrOption = (inputOb: string | SelectOptions) => {
  if (typeof inputOb === 'string') {
    return inputOb;
  }
  return inputOb.value;
};

const useAddUser = ({
  onClose,
  update,
  updateSearch,
  business,
}: Props): Return => {
  const [form] = useForm<FormData>();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [existingUser, setExistingUser] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState<string | null>(null);
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

  useEffect(() => {
    if (business) {
      form.setFieldsValue({
        businesses: [business],
      });
    }
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
        bulletinEmails: data.scheme?.defaultBulletinEmails,
        bulletinPush: data.scheme?.defaultBulletinPush,
        messagePush: data.scheme?.defaultMessagePush,
        offenderEmail: data.scheme?.defaultOffenderEmail,
        offenderPush: data.scheme?.defaultOffenderPush,
        subscribedIncidentOnly: data.scheme?.defaultSubscribedIncidentOnly,
        subscribedOffenderOnly: data.scheme?.defaultSubscribedOffenderOnly,
      });
    },
  });

  const { groups, groupsLoading } = useGroupsContext();

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

    const businessIds = new Set(
      data.businesses.map((value) => stringOrOption(value))
    );
    const newBusinesses = businessesData
      ?.filter(({ isNew }) => isNew)
      .filter(({ id }) => [...businessIds].includes(id));
    const updatedBusinesses = businessesData
      ?.filter(({ isConnected }) => isConnected)
      .filter(({ id }) => [...businessIds].includes(id));
    const connectedBusinesses = data.businesses.filter(
      (value) =>
        !newBusinesses?.some(
          ({ id: newBusinessId }) => newBusinessId === stringOrOption(value)
        ) &&
        !updatedBusinesses?.some(
          ({ id: updatedBusinessId }) =>
            updatedBusinessId === stringOrOption(value)
        )
    );
    const getExistingUserBusiness = (): UserUpdateInput['businesses'] => ({
      connect:
        connectedBusinesses && connectedBusinesses.length > 0
          ? connectedBusinesses.map((value) => ({ id: stringOrOption(value) }))
          : undefined,
      // ?????
      // update:
      //   updatedBusinesses && updatedBusinesses.length > 0
      //     ? updatedBusinesses.map((el) => ({
      //         where: {
      //           id: el.id,
      //         },
      //         data: {
      //           schemes: {
      //             connect: [
      //               {
      //                 id: schemeId,
      //               },
      //             ],
      //           },
      //         },
      //       }))
      //     : undefined,
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
                create:
                  el?.locations && el?.locations.length > 0
                    ? el?.locations.map((location) => ({
                        building: location.building,
                        county: location.county,
                        postcode: location.postcode || '',
                        street: location.street || '',
                        townCity: location.townCity || '',
                        geoLat: location.geoLat,
                        geoLng: location.geoLng,
                      }))
                    : undefined,
              },
              // locations: {
              //   create: [
              //     {
              //       building: el.locations[0].building || null,
              //       county: el.locations[0].county || null,
              //       postcode: el.locations[0].postcode || '',
              //       street: el.locations[0].street || '',
              //       townCity: el.locations[0].townCity || '',
              //     },
              //   ],
              // },
            }))
          : undefined,
    });
    const getBusiness = (): CreateUserData['businesses'] => ({
      connect:
        connectedBusinesses && connectedBusinesses.length > 0
          ? connectedBusinesses.map((value) => ({ id: stringOrOption(value) }))
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
                create:
                  el?.locations && el?.locations.length > 0
                    ? el?.locations.map((location) => ({
                        building: location.building,
                        county: location.county,
                        postcode: location.postcode || '',
                        street: location.street || '',
                        townCity: location.townCity || '',
                        geoLat: location.geoLat,
                        geoLng: location.geoLng,
                      }))
                    : undefined,
              },
            }))
          : undefined,
    });

    const foundRole = rolesData?.roles.edges.find(
      ({ node: role }) => role.id === data.role
    )?.node;
    if (!foundRole) {
      return;
    }

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
                  role: foundRole.type,
                  permissions: {
                    connect: {
                      id: foundRole.id,
                    },
                  },
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
            role: foundRole.type,
            roleId: data.role,
            publicName: data.publicName,
            reportToAllBusinesses: data.reportToAllBusinesses,
            incidentEmail: data.incidentEmail,
            incidentPush: data.incidentPush,
            messagePush: data.messagePush,
            offenderEmail: data.offenderEmail,
            offenderPush: data.offenderPush,
            bulletinEmails: data.bulletinEmails,
            bulletinPush: data.bulletinPush,
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
    groupsData: groups,
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
    schemeLoading: schemeLoading || rolesLoading,
    selectedRole,
    setSelectedRole,
    selectedGroups,
    setSelectedGroups,
    addBusinessVisible,
    toggleAddBusinessVisible,
    updateNewBusinessData,
    availableRoles,
  };
};

export default useAddUser;
