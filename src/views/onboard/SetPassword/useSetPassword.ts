import { useState } from 'react';
import { useCreateUserinAuth0Mutation } from 'graphql/generated';
import { notification } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';

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
  const [saving, setSaving] = useState(false);
  const [createUserInAuth0] = useCreateUserinAuth0Mutation({
    onCompleted: () => {
      setSaving(false);
      loginWithRedirect();
      notification.success({
        message: 'Successfully Created!',
        description: 'Your Password has been created! ',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
  });

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    createUserInAuth0({
      variables: {
        id: userId || '',
        password: data.password,
      },
    });
  };
  return {
    onSubmit,
    saving,
  };
};

export default useSetPassword;
