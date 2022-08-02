import { useState } from 'react';
import { useStoreState } from 'state';
import {
  GroupQuery,
  SortOrder,
  useListSchemeUsersQuery,
  useUpdateGroupMutation,
  ListSchemeUsersQuery,
  useGroupQuery,
} from 'graphql/generated';
import { notification } from 'antd';
import { useParams } from 'react-router-dom';

interface FormData {
  name: string;
  description: string;
  users: string[];
}
interface Props {
  onClose: () => void;
}
interface Return {
  onSubmit: (value: FormData) => void;
  data: GroupQuery | undefined;
  loading: boolean;
  usersData: ListSchemeUsersQuery | undefined;
  usersLoading: boolean;
  saving: boolean;
}

const useEditGroup = ({ onClose }: Props): Return => {
  const groupId = useParams().id;
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);

  const { data: groupData, loading } = useGroupQuery({
    variables: {
      where: {
        id: groupId,
      },
    },
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
        fullName: SortOrder.Desc,
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
      updateGroup({
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
          },
        },
      });
  };

  return {
    onSubmit,
    data: groupData,
    loading,
    usersData,
    usersLoading,
    saving,
  };
};

export default useEditGroup;
