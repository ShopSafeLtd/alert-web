import { useState } from 'react';
import {
  useCreateChatMutation,
  CreateChatMutation,
  ListSchemeUsersQuery,
  useListSchemeUsersQuery,
  SortOrder,
} from 'graphql/generated';

import { useStoreState } from 'state';
import { MutationUpdaterFn } from '@apollo/client';
import { notification } from 'antd';

interface FormData {
  name: string;
  description: string;
}
interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateChatMutation>;
}
interface Return {
  onSubmit: (value: FormData) => void;
  usersData: ListSchemeUsersQuery | undefined;
  usersLoading: boolean;
  saving: boolean;
}

const useAddChat = ({ onClose, update }: Props): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);

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
  const [CreateChat] = useCreateChatMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: 'Successfully Added!',
        description: 'The Chat Group has been added! ',
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
    update,
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    CreateChat({
      variables: {
        data: {
          name: data.name,
          description: data.description || '',
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
export default useAddChat;
