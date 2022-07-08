import { useState } from 'react';
import {
  useCreateGroupMutation,
  CreateGroupMutation,
  ListSchemeUsersQuery,
  useListSchemeUsersQuery,
  SortOrder,
} from 'graphql/generated';
import { notification } from 'antd';
import { useStoreState } from 'state';
import { MutationUpdaterFn } from '@apollo/client';

interface FormData {
  name: string;
  description: string;
}

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateGroupMutation>;
}

interface Return {
  onSubmit: (value: FormData) => void;
  usersData: ListSchemeUsersQuery | undefined;
  usersLoading: boolean;
  saving: boolean;
}
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const useAddGroup = ({ onClose, update }: Props): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);

  const openNotification = (type: NotificationType) => {
    if (type === 'success') {
      notification.success({
        message: 'Success!',
        description: 'The Group has been added! ',
        placement: 'bottomRight',
      });
    } else if (type === 'error') {
      notification.error({
        message: 'error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    }
  };
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

  const [createGroup] = useCreateGroupMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      openNotification('success');
    },
    onError: () => {
      setSaving(false);
      openNotification('error');
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
    usersData,
    usersLoading,
    saving,
  };
};
export default useAddGroup;
