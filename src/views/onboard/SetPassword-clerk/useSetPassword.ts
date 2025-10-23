import type { FormInstance } from 'antd';
import { Form } from 'antd';

import {
  currentUserAtom,
  setHasPasswordAtom,
} from '#/providers/UserProvider/UserProvider';
import { useStoreActions } from '#/state';
import { useUser } from '@clerk/clerk-react';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';

import { useForcedPasswordSetMutation } from './graphql/mutations/__generated__/password-set.generated';
import { useSetAtom } from 'jotai';

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
  const forcePasswordReset = useAtomValue(currentUserAtom)?.forcePasswordReset;
  const hasPassword = useAtomValue(currentUserAtom)?.hasPassword ?? true;
  const setHasPassword = useSetAtom(setHasPasswordAtom);

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
            setHasPassword(true);
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
