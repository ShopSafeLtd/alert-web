import React from 'react';
import { useParams } from 'react-router-dom';

import View from './EditUser.view';
import useEditUser from './useEditUser';

interface Props {
  id?: string | undefined;
  onClose: () => void;
}

const EditUser = ({ id, onClose }: Props): JSX.Element => {
  const userId = useParams().id || id || '';
  const {
    addBusinessVisible,
    availableRoles,
    chatsData,
    chatsLoading,
    data,
    form,
    groupsData,
    groupsLoading,

    loading,
    onSubmit,
    saving,
    selectedGroups,
    selectedRole,
    setSelectedGroups,
    setSelectedRole,
    toggleAddBusinessVisible,
    updateNewBusinessData,
  } = useEditUser({
    onClose,
    userId,
  });
  return (
    <View
      addBusinessVisible={addBusinessVisible}
      availableRoles={availableRoles}
      chatsData={chatsData}
      chatsLoading={chatsLoading}
      data={data}
      form={form}
      groupsData={groupsData}
      groupsLoading={groupsLoading}
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving}
      selectedGroups={selectedGroups}
      selectedRole={selectedRole}
      setSelectedGroups={setSelectedGroups}
      setSelectedRole={setSelectedRole}
      toggleAddBusinessVisible={toggleAddBusinessVisible}
      updateNewBusinessData={updateNewBusinessData}
    />
  );
};

export default EditUser;
