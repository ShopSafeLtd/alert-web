import { useState } from 'react';
import {
  Role,
  SchemeGroupsQuery,
  SchemeChatsQuery,
  SortOrder,
  useCreateUserInDatabaseMutation,
  useInviteExistingUserMutation,
  useSchemeGroupsQuery,
  useSchemeChatsQuery,
  CreateUserInDatabaseMutation,
  useSearchUserQuery,
  InviteExistingUserMutation,
} from 'graphql/generated';
import { useStoreState } from 'state';
import { MutationUpdaterFn } from '@apollo/client';
import { Modal, notification, Form, FormInstance } from 'antd';

const { confirm } = Modal;
const { useForm } = Form;

interface FormData {
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
  update: MutationUpdaterFn<CreateUserInDatabaseMutation>;
  updateSearch: MutationUpdaterFn<InviteExistingUserMutation>;
}
interface Return {
  onSubmit: (value: FormData) => void;
  groupsData: SchemeGroupsQuery | undefined;
  groupsLoading: boolean;
  chatsData: SchemeChatsQuery | undefined;
  chatsLoading: boolean;
  saving: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValuesChange: (changedValues: any, values: FormData) => void;
  form: FormInstance<FormData>;
  existingUser: boolean;
}

const useAddUser = ({ onClose, update, updateSearch }: Props): Return => {
  const [form] = useForm<FormData>();

  const schemeId = useStoreState((state) => state.scheme.id);
  const [existingUser, setExistingUser] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState<string | null>(null);

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
              building: user.addresses[0].building || '',
              county: user.addresses[0].county || '',
              postcode: user.addresses[0].postcode || '',
              street: user.addresses[0].street || '',
              townCity: user.addresses[0].townCity || '',
              email: user.email,
              organisation: user.organisation,
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
      notification.error({
        message: 'error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
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
      notification.error({
        message: 'error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
    update: updateSearch,
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    if (existingUser && userData?.user) {
      inviteExistingUser({
        variables: {
          where: {
            id: userData.user.id,
          },
          data: {
            groups:
              data.groups.length > 0
                ? { connect: data.groups.map((id) => ({ id })) }
                : undefined,
            chats:
              data.chats.length > 0
                ? {
                    create: data.chats.map((id) => ({
                      newMessages: true,
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
            address: {
              postcode: data.postcode || '',
              street: data.street || '',
              townCity: data.townCity || '',
              building: data.building || '',
              county: data.county || '',
              primary: true,
            },
            email: data.email,
            fullName: data.fullName,
            groups: data.groups.map((id) => ({ id })),
            organisation: data.organisation,
            role: data.role,
            scheme: {
              id: schemeId,
            },
            chats: data.chats.map((id) => ({ id })),
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
  };
};

export default useAddUser;
