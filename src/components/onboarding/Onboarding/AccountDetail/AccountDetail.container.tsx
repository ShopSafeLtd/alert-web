import React from 'react';
import View from './AccountDetail.view';
import type { AccountData } from './useAccountDetail';
import useEditProfile from './useAccountDetail';

interface Props {
  update: (value: AccountData | undefined) => void;
  accountDetail: AccountData | undefined;
}

const EditProfile = ({ update, accountDetail }: Props): JSX.Element => {
  const { onSubmit, data, loading } = useEditProfile({
    update,
    accountDetail,
  });
  return (
    <View onSubmit={onSubmit} saving={false} data={data} loading={loading} />
  );
};

export default EditProfile;
