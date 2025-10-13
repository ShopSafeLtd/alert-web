import React from 'react';

import View from './ManageChatMember.view';
import useManageChat from './useManageChatMember';

interface Props {
  chatId: string;
  onClose: () => void;
}

const ManageChat = ({ chatId, onClose }: Props): JSX.Element => {
  const {
    addMember,
    addMemberUpdate,
    deleteConfirm,
    loading,
    membersData,
    onSubmit,
    saving,
    toggleAddMember,
    usersData,
  } = useManageChat({
    chatId,
    onClose,
  });

  return (
    <View
      addMember={addMember}
      addMemberUpdate={addMemberUpdate}
      deleteConfirm={deleteConfirm}
      loading={loading}
      membersData={membersData}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving}
      toggleAddMember={toggleAddMember}
      usersData={usersData}
    />
  );
};

export default ManageChat;
