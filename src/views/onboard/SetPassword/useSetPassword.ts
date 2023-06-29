import { useState } from 'react';
import { useCreateUserinAuth0Mutation } from 'graphql/generated';
import { notification } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';
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
        message: intl.formatMessage({
          defaultMessage: 'Successfully Created!',
          id: 'ocw1NP',
        }),
        description: intl.formatMessage({
          defaultMessage: 'Your Password has been created!',
          id: '1IvHmw',
        }),
        placement: 'bottomRight',
      });
      void loginWithRedirect();
    },
    onError: () => {
      setSaving(false);
      notification.error({
        message: intl.formatMessage({
          defaultMessage: 'Error!',
          id: 'DIDBlF',
        }),
        description: intl.formatMessage({
          defaultMessage: 'Whoops, there are some errors. Please try again.',
          id: 'tPB3Wl',
        }),
        placement: 'bottomRight',
      });
    },
  });

  const onSubmit = async (data: FormData) => {
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
