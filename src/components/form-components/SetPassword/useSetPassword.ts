import {
  useSetPasswordMutation
} from '#/components/form-components/SetPassword/graphql/mutations/__generated__/set-password.generated';
import { notification } from 'antd';
import { useState } from 'react';
import { useIntl } from 'react-intl';

interface FormData {
  password: string;
}
interface Props {
  onClose: () => void;
  userId: string;
}
interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const useSetPassword = ({ onClose, userId }: Props): Return => {
  const [saving, setSaving] = useState(false);
  const intl = useIntl();
  const [updatePassword] = useSetPasswordMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The password has been successfully updated.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
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
