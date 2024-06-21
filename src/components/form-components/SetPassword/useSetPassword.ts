import { useState } from 'react';
import { useSetPasswordMutation } from './graphql/mutations/set-password.generated';
import { notification } from 'antd';
import { useIntl } from 'react-intl';

interface FormData {
  password: string;
}
interface Props {
  userId: string;
  onClose: () => void;
}
interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const useSetPassword = ({ userId, onClose }: Props): Return => {
  const [saving, setSaving] = useState(false);
  const intl = useIntl();
  const [updatePassword] = useSetPasswordMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The password has been successfully updated.',
        }),
        placement: 'bottomRight',
      });
      onClose();
    },
    onError: () => {
      setSaving(false);
      onClose();
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    void updatePassword({
      variables: {
        data: {
          id: userId || '',
          password: data.password,
        },
      },
    });
  };
  return { onSubmit, saving };
};

export default useSetPassword;
