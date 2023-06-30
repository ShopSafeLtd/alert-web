import { useState } from 'react';
import { useStoreState } from 'state';
import type { GroupQuery } from 'graphql/generated';
import {
  Role,
  SortOrder,
  useListSchemeUsersQuery,
  useUpdateGroupMutation,
  useGroupQuery,
} from 'graphql/generated';
import { notification } from 'antd';
import type { SelectOptions } from 'types/DataType';

export interface FormData {
  name: string;
  description: string;
  users: string[];
  approvers: string[];
}
interface Props {
  onClose: () => void;
  groupId: string;
}
interface Return {
  onSubmit: (value: FormData) => void;
  data: GroupQuery | undefined;
  loading: boolean;
  usersData: SelectOptions[] | undefined;
  adminUsersData: SelectOptions[] | undefined;
  usersLoading: boolean;
  saving: boolean;
  selectedUsers: string[] | undefined;
  setSelectedUsers: (value: string[]) => void;
}

const useEditGroup = ({ onClose, groupId }: Props): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>();

  const { data: groupData, loading } = useGroupQuery({
    variables: {
      where: {
        id: groupId,
      },
    },
    onCompleted: ({ group }) =>
      setSelectedUsers(group?.users.map(({ id }) => id)),
  });

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
      schemesWhere: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
    },
  });

  const [updateGroup] = useUpdateGroupMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: 'Successfully Updated!',
        description: 'The group has been Updated! ',
        placement: 'bottomRight',
      });
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
    if (groupId)
      void updateGroup({
        variables: {
          where: {
            id: groupId,
          },
          data: {
            name: { set: data.name },
            description: { set: data.description },
            users: {
              set: data.users.map((id) => ({ id })),
            },
            approver:
              data.approvers && data.approvers.length > 0
                ? {
                    set: data.approvers.map((id) => ({ id })),
                  }
                : undefined,
          },
        },
      });
  };

  return {
    onSubmit,
    data: groupData,
    loading,
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

export default useEditGroup;
