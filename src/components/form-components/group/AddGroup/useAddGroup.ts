import { useState } from 'react';
import type { CreateGroupMutation } from 'graphql/generated';
import {
  Role,
  useCreateGroupMutation,
  useListSchemeUsersQuery,
  SortOrder,
} from 'graphql/generated';
import { notification } from 'antd';
import { useStoreState } from 'state';
import type { MutationUpdaterFn } from '@apollo/client';
import type { SelectOptions } from 'types/DataType';
import errorNotification from 'types/error_notification';

export interface FormData {
  name: string;
  description: string;
  users: string[];
  approvers: string[];
}

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateGroupMutation>;
}

interface Return {
  onSubmit: (value: FormData) => void;
  usersData: SelectOptions[] | undefined;
  usersLoading: boolean;
  adminUsersData: SelectOptions[] | undefined;
  saving: boolean;
  selectedUsers: string[] | undefined;
  setSelectedUsers: (value: string[]) => void;
}

const useAddGroup = ({ onClose, update }: Props): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>();

  const { data: usersData, loading: usersLoading } = useListSchemeUsersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        schemes: {
          some: {
            scheme: {
              id: {
                equals: schemeId,
              },
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
      orderBy: {
        fullName: SortOrder.Asc,
      },
    },
  });

  const [createGroup] = useCreateGroupMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: 'Successfully Added!',
        description: 'The group has been added! ',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update,
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    createGroup({
      variables: {
        data: {
          name: data.name,
          description: data.description,
          users: { connect: data.users.map((id) => ({ id })) },
          approver:
            data.approvers && data.approvers.length > 0
              ? { connect: data.approvers.map((id) => ({ id })) }
              : undefined,
          scheme: {
            connect: {
              id: schemeId,
            },
          },
        },
      },
    });
  };

  return {
    onSubmit,
    usersData: usersData?.users.map((user) => ({
      value: user.id,
      label: user.fullName,
    })),
    adminUsersData: usersData?.users
      .filter((user) => user.schemes[0].role === Role.SchemeAdmin)
      .map((user) => ({
        value: user.id,
        label: user.fullName,
      })),
    usersLoading,
    saving,
    selectedUsers,
    setSelectedUsers,
  };
};
export default useAddGroup;
