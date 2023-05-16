import { useState } from 'react';
import type { SelectOptions } from 'types/DataType';
import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateTodoMutation } from 'graphql/generated';
import {
  Role,
  SortOrder,
  useCreateTodoMutation,
  useListSchemeUsersQuery,
} from 'graphql/generated';
import errorNotification from 'types/error_notification';
import { notification } from 'antd';
import { useStoreState } from 'state';

export interface FormData {
  name: string;
  description: string;
  dueDate: Date;
  assignedUsers: string[];
}

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateTodoMutation>;
}

interface Return {
  onSubmit: (value: FormData) => void;
  adminUsersData: SelectOptions[] | undefined;
  usersLoading: boolean;
  saving: boolean;
}

const useAddTodo = ({ update, onClose }: Props): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);

  const [saving, setSaving] = useState(false);

  const { data: usersData, loading: usersLoading } = useListSchemeUsersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        schemes: {
          some: {
            AND: [
              {
                scheme: {
                  id: {
                    equals: schemeId,
                  },
                },
              },
              {
                role: {
                  in: [Role.SchemeAdmin, Role.ShopsafeAdmin],
                },
              },
            ],
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

  const [createTodo] = useCreateTodoMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: 'Successfully Added!',
        description: 'The todo has been added! ',
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
    createTodo({
      variables: {
        data: {
          name: data.name,
          description: data.description,
          assignedUsers:
            data.assignedUsers && data.assignedUsers.length > 0
              ? { connect: data.assignedUsers.map((id) => ({ id })) }
              : undefined,
          dueDate: data.dueDate,
          completed: false,
          createdBy: { connect: { id: userId } },
          schemes: {
            connect: [
              {
                id: schemeId,
              },
            ],
          },
        },
      },
    });
  };

  return {
    onSubmit,
    saving,
    adminUsersData: usersData?.users.map((user) => ({
      value: user.id,
      label: user.fullName,
    })),
    usersLoading,
  };
};
export default useAddTodo;
