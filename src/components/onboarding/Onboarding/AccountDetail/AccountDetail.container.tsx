import React from 'react';

import type { AccountData } from './useAccountDetail';

import View from './AccountDetail.view';
import useEditProfile from './useAccountDetail';

interface Props {
  accountDetail: AccountData | undefined;
  update: (value: AccountData | undefined) => void;
}

const EditProfile = ({ accountDetail, update }: Props): JSX.Element => {
  const { data, loading, onSubmit } = useEditProfile({
    accountDetail,
    update,
  });
  return (
    <View data={data} loading={loading} onSubmit={onSubmit} saving={false} />
  );
};

export default EditProfile;
