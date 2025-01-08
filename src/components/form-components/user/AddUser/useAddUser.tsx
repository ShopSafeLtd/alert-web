/* eslint-disable @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */
import type { MutationUpdaterFn } from '@apollo/client';
import type { FormInstance } from 'antd';
import type { CreateUserData, UserUpdateInput } from 'graphql/types';
import type { CreateUserInDatabaseMutation } from 'graphql/users/mutations/__generated__/create-user-in-databse.generated';
import type { InviteExistingUserMutation } from 'graphql/users/mutations/__generated__/invite-exiting-user.generated';
import type { BusinessData, SelectOptions } from 'types/DataType';

import { useUserRolesQuery } from '#/components/form-components/user/graphql/queries/__generated__/custom-roles.generated';
import { useGroupsContext } from '#/context/groups-context';
import { Form, Modal, notification } from 'antd';
import { useSchemeChatsQuery } from 'graphql/chats/queries/__generated__/scheme-chats.generated';
import { useSchemeQuery } from 'graphql/scheme/queries/__generated__/scheme.generated';
import { Model, SortOrder } from 'graphql/types';
import { useCreateUserInDatabaseMutation } from 'graphql/users/mutations/__generated__/create-user-in-databse.generated';
import { useInviteExistingUserMutation } from 'graphql/users/mutations/__generated__/invite-exiting-user.generated';
import { useSearchUserQuery } from 'graphql/users/queries/__generated__/search-user.generated';
import { useEffect, useState } from 'react';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

const { confirm } = Modal;
const { useForm } = Form;

export interface FormData {
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
  mobileNumber?: string;
  offenderEmail: boolean;
  offenderPush: boolean;
  publicName: boolean;
  reportToAllBusinesses: boolean;
  role: string;
  subscribedIncidentOnly: boolean;
  subscribedOffenderOnly: boolean;
}

interface Props {
  business?: {
    label: string;
    value: string;
  };
  onClose: () => void;
  update: MutationUpdaterFn<CreateUserInDatabaseMutation>;
  updateSearch: MutationUpdaterFn<InviteExistingUserMutation>;
}

interface Return {
  addBusinessVisible: boolean;
  availableRoles: SelectOptions[];
  chatsData: SelectOptions[] | undefined;
  chatsLoading: boolean;
  existingUser: boolean;
  form: FormInstance<FormData>;
  groupsData: SelectOptions[] | undefined;
  groupsLoading: boolean;
  onSubmit: (value: FormData) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValuesChange: (changedValues: any, values: FormData) => void;
  saving: boolean;
  schemeLoading: boolean;
  selectedGroups: string[] | undefined;
  selectedRole: string | undefined;
  setSelectedGroups: (value: string[]) => void;
  setSelectedRole: (value: string) => void;
  toggleAddBusinessVisible: () => void;
  updateNewBusinessData: (values: BusinessData) => void;
}

export const stringOrOption = (inputOb: SelectOptions | string) => {
  if (typeof inputOb === 'string') {
    return inputOb;
  }
  return inputOb.value;
};
const useAddUser = ({
  business,
  onClose,
  update,
  updateSearch,
}: Props): Return => {
  const [form] = useForm<FormData>();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [existingUser, setExistingUser] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState<null | string>(null);
  const [selectedRole, setSelectedRole] = useState<string>();
  const [selectedGroups, setSelectedGroups] = useState<string[]>();
  const [addBusinessVisible, setAddBusinessVisible] = useState(false);
  const [businessesData, setBusinessesData] = useState<BusinessData[]>([]);

  const [availableRoles, setAvailableRoles] = useState<SelectOptions[]>([]);

  const { data: rolesData, loading: rolesLoading } = useUserRolesQuery({
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

  useEffect(() => {
    if (business) {
      form.setFieldsValue({
        businesses: [business],
      });
    }
  }, [business]);

  const { data: userData } = useSearchUserQuery({
    onCompleted: ({ user }) => {
      if (user) {
        confirm({
          content: `A user with the email address ${user.email} already exists, do you want to invite ${user.fullName} to the scheme?`,
          onCancel() {
            form.setFieldsValue({
              email: '',
            });
          },
          onOk() {
            setExistingUser(true);
            setBusinessesData(
              user.businesses.map((el) => ({ ...el, isConnected: true }))
            );
            form.setFieldsValue({
              businesses:
                user.businesses && user.businesses.length > 0
                  ? user.businesses.map(({ id, name }) => ({
                      label: name,
                      value: id,
                    }))
                  : [],
              email: user.email ?? '',
              fullName: user.fullName,
              publicName: user.publicName,
              reportToAllBusinesses: user.reportToAllBusinesses ?? true,
            });
          },
          title: 'This user already exists',
        });
      }
    },
    skip: search === null,
    variables: {
      where: {
        email: search?.toLowerCase(),
      },
    },
  });

  const { loading: schemeLoading } = useSchemeQuery({
    onCompleted: (data) => {
      form.setFieldsValue({
        bulletinEmails: data.scheme?.defaultBulletinEmails,
        bulletinPush: data.scheme?.defaultBulletinPush,
        incidentEmail: data.scheme?.defaultIncidentEmail,
        incidentPush: data.scheme?.defaultIncidentPush,
        messagePush: data.scheme?.defaultMessagePush,
        offenderEmail: data.scheme?.defaultOffenderEmail,
        offenderPush: data.scheme?.defaultOffenderPush,
        subscribedIncidentOnly: data.scheme?.defaultSubscribedIncidentOnly,
        subscribedOffenderOnly: data.scheme?.defaultSubscribedOffenderOnly,
      });
    },
    variables: { where: { id: schemeId } },
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

  const [createUserInDatabase] = useCreateUserInDatabaseMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        description: 'The invitation has been sent! ',
        message: 'Successfully Invited!',
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
        description: 'The invitation has been sent! ',
        message: 'Successfully Invited!',
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
    const businessesValues: (SelectOptions | string)[] = data.businesses;
    const connectedBusinesses = businessesValues.filter(
      (value) =>
        !newBusinesses?.some(
          ({ id: newBusinessId }) => newBusinessId === stringOrOption(value)
        ) &&
        !updatedBusinesses?.some(
          ({ id: updatedBusinessId }) =>
            updatedBusinessId === stringOrOption(value)
        )
    );
    // const connectedBusinesses = (
    //   isStringArray(data.businesses)
    //     ? data.businesses
    //     : data.businesses.map((option) => option.value)
    // ).filter(
    //   (value) =>
    //     !newBusinesses?.some(
    //       ({ id: newBusinessId }) => newBusinessId === stringOrOption(value)
    //     ) &&
    //     !updatedBusinesses?.some(
    //       ({ id: updatedBusinessId }) =>
    //         updatedBusinessId === stringOrOption(value)
    //     )
    // );
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
              groups: el?.groups
                ? { connect: el?.groups?.map((id) => ({ id })) }
                : undefined,
              locations: {
                create:
                  el?.locations && el?.locations.length > 0
                    ? el?.locations.map((location) => ({
                        building: location.building,
                        county: location.county,
                        geoLat: location.geoLat,
                        geoLng: location.geoLng,
                        postcode: location.postcode || '',
                        street: location.street || '',
                        townCity: location.townCity || '',
                      }))
                    : undefined,
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
              locations: {
                create:
                  el?.locations && el?.locations.length > 0
                    ? el?.locations.map((location) => ({
                        building: location.building,
                        county: location.county,
                        geoLat: location.geoLat,
                        geoLng: location.geoLng,
                        postcode: location.postcode || '',
                        street: location.street || '',
                        townCity: location.townCity || '',
                      }))
                    : undefined,
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
          data: {
            approverGroups:
              data.approverGroups && data.approverGroups.length > 0
                ? { connect: data.approverGroups.map((id) => ({ id })) }
                : undefined,
            businesses: getExistingUserBusiness(),
            chats:
              data.chats.length > 0
                ? {
                    create: data.chats.map((id) => ({
                      chat: {
                        connect: { id },
                      },
                      newMessages: false,
                    })),
                  }
                : undefined,
            defaultGroups:
              data.defaultGroups && data.defaultGroups.length > 0
                ? { connect: data.defaultGroups.map((id) => ({ id })) }
                : undefined,
            groups: { connect: data.groups.map((id) => ({ id })) },
            schemes: {
              create: [
                {
                  permissions: {
                    connect: {
                      id: foundRole.id,
                    },
                  },
                  role: foundRole.type,
                  scheme: {
                    connect: { id: schemeId },
                  },
                },
              ],
            },
          },
          groupWhere: {
            scheme: {
              id: {
                equals: schemeId,
              },
            },
          },
          where: {
            id: userData.user.id,
          },
        },
      });
    } else {
      void createUserInDatabase({
        variables: {
          data: {
            approverGroups: data.approverGroups
              ? data.approverGroups.map((id) => ({ id }))
              : undefined,
            bulletinEmails: data.bulletinEmails,
            bulletinPush: data.bulletinPush,
            businesses: getBusiness(),
            chats: data.chats.map((id) => ({ id })),
            defaultGroups: data.defaultGroups
              ? data.defaultGroups.map((id) => ({ id }))
              : undefined,
            email: data.email,
            fullName: data.fullName,
            groups: data.groups.map((id) => ({ id })),
            incidentEmail: data.incidentEmail,
            incidentPush: data.incidentPush,
            messagePush: data.messagePush,
            mobileNumber: data.mobileNumber,
            offenderEmail: data.offenderEmail,
            offenderPush: data.offenderPush,
            publicName: data.publicName,
            reportToAllBusinesses: data.reportToAllBusinesses,
            role: foundRole.type,
            roleId: data.role,
            scheme: {
              id: schemeId,
            },
            subscribedIncidentOnly: data.subscribedIncidentOnly,
            subscribedOffenderOnly: data.subscribedOffenderOnly,
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
    existingUser,
    form,
    groupsData: groups,
    groupsLoading,
    onSubmit,
    onValuesChange,
    saving,
    schemeLoading: schemeLoading || rolesLoading,
    selectedGroups,
    selectedRole,
    setSelectedGroups,
    setSelectedRole,
    toggleAddBusinessVisible,
    updateNewBusinessData,
  };
};

export default useAddUser;
