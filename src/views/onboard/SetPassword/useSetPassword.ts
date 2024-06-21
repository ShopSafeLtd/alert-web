import { useState } from 'react';

import type { FormInstance } from 'antd';
import { Form } from 'antd';

import { useUser } from '@clerk/clerk-react';
import { useStoreActions, useStoreState } from '#/state';
import { useForcedPasswordSetMutation } from '#/views/onboard/SetPassword/graphql/mutations/password-set.generated';

export interface FormData {
  current: string;
  password: string;
  confirm: string;
}

interface Return {
  onSubmit: () => void;
  saving: boolean;
  hasPassword: boolean;
  form: FormInstance<FormData>;
}
interface ClerkAPIError {
  message: string;
  longMessage: string;
  meta?: {
    paramName?: string;
  };
}
const useSetPassword = (): Return => {
  const [saving, setSaving] = useState(false);
  const { user } = useUser();
  const [form] = Form.useForm<FormData>();
  const { hasPassword, forcePasswordReset } = useStoreState(
    (state) => state.user
  );
  const { setPasswordSet } = useStoreActions((actions) => actions.user);
  const [passwordHasReset] = useForcedPasswordSetMutation();

  console.log(forcePasswordReset, 'forced');
  const onSubmit = () => {
    setSaving(true);
    form
      .validateFields()
      .then((values: { current: string; password: string }) => {
        user
          ?.updatePassword({
            currentPassword: hasPassword ? values.current : undefined,
            newPassword: values.password,
          })
          .then(() => {
            void passwordHasReset();
            setPasswordSet();
            form.resetFields();
            setSaving(false);
          })
          .catch((error: { errors: ClerkAPIError[] }) => {
            if (error.errors[0]?.meta?.paramName === 'current_password') {
              form.setFields([
                {
                  name: 'current',
                  errors: ['Current password is incorrect, please try again.'],
                },
              ]);
            } else {
              form.setFields([
                {
                  name: 'password',
                  errors: [error.errors[0].longMessage],
                },
              ]);
            }
            setSaving(false);
          });

        form.resetFields();
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      });
  };
  return {
    onSubmit,
    saving,
    hasPassword,
    form,
  };
};

export default useSetPassword;
