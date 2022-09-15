import React from 'react';
import View from './ManageChatMember.view';
import useManageChat from './ManageChatMember';

interface Props {
  onClose: () => void;
  chatId: string;
}

const ManageChat = ({ onClose, chatId }: Props): JSX.Element => {
  const {
    onSubmit,
    addMemberUpdate,
    loading,
    usersData,
    saving,
    addMember,
    toggleAddMember,
    membersData,
    deleteConfirm,
  } = useManageChat({
    onClose,
    chatId,
  });
  console.log('usersData', usersData);

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      addMemberUpdate={addMemberUpdate}
      loading={loading}
      usersData={usersData}
      saving={saving}
      addMember={addMember}
      toggleAddMember={toggleAddMember}
      membersData={membersData}
      deleteConfirm={deleteConfirm}
    />
  );
};

export default ManageChat;
