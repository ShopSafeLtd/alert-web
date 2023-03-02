import React from 'react';
import { useParams } from 'react-router-dom';
import View from './EditUser.view';
import useEditUser from './useEditUser';

interface Props {
  onClose: () => void;
}

const EditUser = ({ onClose }: Props): JSX.Element => {
  const userId = useParams().id || '';
  const {
    onSubmit,
    data,
    loading,
    groupsData,
    groupsLoading,
    chatsData,
    chatsLoading,
    saving,
    onSearchBusiness,
  } = useEditUser({
    onClose,
    userId,
  });
  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      data={data}
      loading={loading}
      groupsData={groupsData}
      groupsLoading={groupsLoading}
      chatsData={chatsData}
      chatsLoading={chatsLoading}
      saving={saving}
      onSearchBusiness={onSearchBusiness}
    />
  );
};

export default EditUser;
