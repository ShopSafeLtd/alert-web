import { useAuth0 } from '@auth0/auth0-react';
import { notification } from 'antd';
import { useCreateUserinAuth0Mutation } from 'graphql/auth/mutations/__generated__/create_user_in_auth0.generated';
import { useState } from 'react';
import { useIntl } from 'react-intl';

interface FormData {
  password: string;
}
interface Props {
  userId: string;
}
interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const useSetPassword = ({ userId }: Props): Return => {
  const { loginWithRedirect } = useAuth0();
  const intl = useIntl();
  const [saving, setSaving] = useState(false);
  const [createUserInAuth0] = useCreateUserinAuth0Mutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'Your Password has been created!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Created!',
        }),
        placement: 'bottomRight',
      });
      void loginWithRedirect();
    },
    onError: () => {
      setSaving(false);
      notification.error({
        description: intl.formatMessage({
          defaultMessage: 'Whoops, there are some errors. Please try again.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Error!',
        }),
        placement: 'bottomRight',
      });
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    void createUserInAuth0({
      variables: {
        id: userId || '',
        password: data.password,
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
