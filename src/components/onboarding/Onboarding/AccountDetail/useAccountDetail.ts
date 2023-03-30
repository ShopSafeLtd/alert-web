import { useState } from 'react';
import type { CurrentUserQuery } from 'graphql/generated';
import { useCurrentUserQuery } from 'graphql/generated';
import { useNavigate } from 'react-router-dom';

interface AccountData {
  fullName: string;
}
interface Props {
  update: (value: AccountData | undefined) => void;
  setCurrent: (value: number) => void;
}
interface Return {
  onSubmit: (value: AccountData) => void;
  data: CurrentUserQuery | undefined;
  loading: boolean;
  saving: boolean;
}

const useEditUser = ({ update, setCurrent }: Props): Return => {
  setCurrent(0);
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const onSubmit = (data: AccountData) => {
    setSaving(true);
    update(data);
    navigate('/app/onboarding/terms-conditions');
    setSaving(false);
  };

  const { data: userData, loading } = useCurrentUserQuery({
    fetchPolicy: 'cache-and-network',
  });

  return {
    onSubmit,
    data: userData,
    loading,
    saving,
  };
};

export default useEditUser;
