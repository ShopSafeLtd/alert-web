import React from 'react';
import View from './AccountDetail.view';
import useEditProfile from './useAccountDetail';

interface AccountData {
  fullName: string;
  organisation: string;
  postcode: string;
  street: string;
  townCity: string;
  building: string | null;
  county: string | null;
}
interface Props {
  update: (value: AccountData | undefined) => void;
  setCurrent: (value: number) => void;
}
const EditProfile = ({ setCurrent, update }: Props): JSX.Element => {
  const { onSubmit, data, loading, saving } = useEditProfile({
    setCurrent,
    update,
  });
  return (
    <View onSubmit={onSubmit} saving={saving} data={data} loading={loading} />
  );
};

export default EditProfile;
