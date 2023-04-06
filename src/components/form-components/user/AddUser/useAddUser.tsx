import React, { useEffect, useState } from 'react';
import type {
  CreateUserInDatabaseMutation,
  InviteExistingUserMutation,
  Role,
  SchemeChatsQuery,
  SchemeGroupsQuery,
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
} from 'graphql/generated';
import {
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
import { Form, Modal, notification, Typography } from 'antd';

const { confirm } = Modal;
const { useForm } = Form;

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
  update: MutationUpdaterFn<CreateUserInDatabaseMutation>;
  updateSearch: MutationUpdaterFn<InviteExistingUserMutation>;
  business?: {
    value: string;
    label: string;
  };
}

interface Return {
  onSubmit: (value: FormData) => void;
  groupsData: SchemeGroupsQuery | undefined;
  groupsLoading: boolean;
  chatsData: SchemeChatsQuery | undefined;
  chatsLoading: boolean;
  schemeLoading: boolean;
  saving: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValuesChange: (changedValues: any, values: FormData) => void;
  form: FormInstance<FormData>;
  existingUser: boolean;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: React.ReactNode; value: string }[]>;
}

const errorNotification = () =>
  notification.error({
    message: 'Error!',
    description: 'Whoops, there are some errors. Please try again. ',
    placement: 'bottomRight',
  });

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

  useEffect(() => {
    form.setFieldsValue({
      business,
    });
  }, [business]);

  const { data: userData } = useSearchUserQuery({
    variables: {
      where: {
        email: search,
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
            form.setFieldsValue({
              fullName: user.fullName,
              email: user.email,
              publicName: user.publicName,
              business,
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
      onClose();
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
      onClose();
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
    console.log(data, {
      email: data.email,
      fullName: data.fullName,
      groups: data.groups.map((id) => ({ id })),
      role: data.role,
      publicName: data.publicName,
      scheme: {
        id: schemeId,
      },
      chats: data.chats.map((id) => ({ id })),
      businesses: [
        {
          id: data.business.value,
        },
      ],
    });

    if (existingUser && userData?.user) {
      inviteExistingUser({
        variables: {
          where: {
            id: userData.user.id,
          },
          data: {
            groups: { connect: data.groups.map((id) => ({ id })) },
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
      createUserInDatabase({
        variables: {
          data: {
            email: data.email,
            fullName: data.fullName,
            groups: data.groups.map((id) => ({ id })),
            role: data.role,
            publicName: data.publicName,
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
            businesses: [
              {
                id: data.business.value,
              },
            ],
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
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onValuesChange = (changedValues: any) => {
    if (changedValues.email) setSearch(changedValues.email);
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
          },
        },
      })
      .then((response) =>
        response.data.listBusinesses.businesses.length > 0
          ? response.data.listBusinesses.businesses.map((item) => ({
              label: (
                <div>
                  <Typography.Text>{item?.name}</Typography.Text>
                  {item?.locations[0] && (
                    <Typography.Paragraph
                      type="secondary"
                      style={{ fontSize: 13, margin: 0 }}
                    >
                      {item?.locations[0]?.full}
                    </Typography.Paragraph>
                  )}
                </div>
              ) as React.ReactNode,
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
    groupsData,
    groupsLoading,
    chatsData,
    chatsLoading,
    saving,
    onValuesChange,
    form,
    existingUser,
    onSearchBusiness,
    schemeLoading,
  };
};

export default useAddUser;
