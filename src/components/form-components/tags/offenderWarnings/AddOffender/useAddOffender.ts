import { useState } from 'react';
import {
  useCreateTagMutation,
  CreateTagMutation,
  Model,
} from 'graphql/generated';
import { useStoreState } from 'state';
import { notification } from 'antd';
import { MutationUpdaterFn } from '@apollo/client';

interface FormData {
  name: string;
  description: string;
}

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateTagMutation>;
}

interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
}
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const useAddOffender = ({ onClose, update }: Props): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);
  const [saving, setSaving] = useState(false);

  const openNotification = (type: NotificationType) => {
    if (type === 'success') {
      notification.success({
        message: 'Success!',
        description: 'The offender warning has been added! ',
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
  const [createTag] = useCreateTagMutation({
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
    createTag({
      variables: {
        data: {
          name: data.name,
          description: data.description || '',
          scheme: {
            connect: {
              id: schemeId,
            },
          },
          createdBy: { connect: { id: userId } },
          dataType: Model.Offender,
        },
      },
    });
  };

  return {
    onSubmit,
    saving,
  };
};
export default useAddOffender;
