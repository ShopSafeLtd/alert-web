import { useState } from 'react';

import { notification } from 'antd';
import { useIntl } from 'react-intl';
import {
  useSetPasswordMutation
} from '#/components/form-components/SetPassword/graphql/mutations/__generated__/set-password.generated';

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
