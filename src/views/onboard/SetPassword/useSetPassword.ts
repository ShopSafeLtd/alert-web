import type { FormInstance } from 'antd';

import { useStoreActions, useStoreState } from '#/state';
import { useForcedPasswordSetMutation } from '#/views/onboard/SetPassword/graphql/mutations/__generated__/password-set.generated';
import { useUser } from '@clerk/clerk-react';
import { Form } from 'antd';
import { useState } from 'react';

export interface FormData {
  confirm: string;
  current: string;
  password: string;
}

interface Return {
  form: FormInstance<FormData>;
  hasPassword: boolean;
  onSubmit: () => void;
  saving: boolean;
}
interface ClerkAPIError {
  longMessage: string;
  message: string;
  meta?: {
    paramName?: string;
  };
}
const useSetPassword = (): Return => {
  const [saving, setSaving] = useState(false);
  const { user } = useUser();
  const [form] = Form.useForm<FormData>();
  const { forcePasswordReset, hasPassword } = useStoreState(
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
                  errors: ['Current password is incorrect, please try again.'],
                  name: 'current',
                },
              ]);
            } else {
              form.setFields([
                {
                  errors: [error.errors[0].longMessage],
                  name: 'password',
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
    form,
    hasPassword,
    onSubmit,
    saving,
  };
};

export default useSetPassword;
