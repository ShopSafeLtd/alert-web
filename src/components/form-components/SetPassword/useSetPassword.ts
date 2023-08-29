import { useState } from 'react';
import { useSetPasswordMutation } from 'graphql/generated';
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
          id: 'w5Yfkf',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The password has been successfully updated.',
          id: 'ueGWXg',
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

  const onSubmit = async (data: FormData) => {
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
  return {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSubmit,
    saving,
  };
};

export default useSetPassword;
