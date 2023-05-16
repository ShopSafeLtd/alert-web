import React from 'react';
import { useParams } from 'react-router-dom';
import View from './EditUser.view';
import useEditUser from './useEditUser';

interface Props {
  onClose: () => void;
  id?: string | undefined;
}

const EditUser = ({ onClose, id }: Props): JSX.Element => {
  const userId = useParams().id || id || '';
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
    selectedRole,
    setSelectedRole,
    selectedGroups,
    setSelectedGroups,
    addBusinessVisible,
    toggleAddBusinessVisible,
    updateNewBusinessData,
    form,
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
      selectedRole={selectedRole}
      setSelectedRole={setSelectedRole}
      selectedGroups={selectedGroups}
      setSelectedGroups={setSelectedGroups}
      addBusinessVisible={addBusinessVisible}
      toggleAddBusinessVisible={toggleAddBusinessVisible}
      updateNewBusinessData={updateNewBusinessData}
      form={form}
    />
  );
};

export default EditUser;
