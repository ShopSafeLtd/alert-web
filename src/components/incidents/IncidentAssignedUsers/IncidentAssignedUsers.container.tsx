import React from 'react';

import View from './IncidentAssignedUsers.view';
import useIncidentAssignedUsers from './useIncidentAssignedUsers';

interface User {
  fullName: string;
  id: string;
}

interface Props {
  assignedUsers: User[];
  editRights: boolean;
  incidentId: string;
}

const IncidentAssignedUsers = ({
  assignedUsers,
  editRights,
  incidentId,
}: Props) => {
  const { loading, modalVisible, onCloseModal, onOpenModal, onSaveUsers } =
    useIncidentAssignedUsers(incidentId);

  return (
    <View
      assignedUsers={assignedUsers}
      editRights={editRights}
      loading={loading}
      modalVisible={modalVisible}
      onCloseModal={onCloseModal}
      onOpenModal={onOpenModal}
      onSaveUsers={onSaveUsers}
    />
  );
};

export default IncidentAssignedUsers;
