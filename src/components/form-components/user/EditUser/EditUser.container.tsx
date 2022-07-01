import React from 'react';
import View from './EditUser.view';
import useEditUser from './useEditUser';

interface Props {
  onClose: () => void;
}

const EditUser = ({ onClose }: Props) => {
  const {
    onSubmit,
    data,
    loading,
    groupsData,
    groupsLoading,
    chatsData,
    chatsLoading,
    saving,
  } = useEditUser({
    onClose,
    // update,
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
    />
  );
};

export default EditUser;
