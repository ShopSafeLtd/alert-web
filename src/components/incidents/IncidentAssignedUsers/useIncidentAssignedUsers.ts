import { useUpdateIncidentAssignedUsersMutation } from 'graphql/incidents/mutations/__generated__/update-incident-assigned-users.generated';
import { useState } from 'react';

interface Return {
  loading: boolean;
  modalVisible: boolean;
  onCloseModal: () => void;
  onOpenModal: () => void;
  onSaveUsers: (userIds: string[]) => Promise<void>;
}

const useIncidentAssignedUsers = (incidentId: string): Return => {
  const [modalVisible, setModalVisible] = useState(false);
  const [updateAssignedUsers, { loading }] =
    useUpdateIncidentAssignedUsersMutation();

  const onOpenModal = () => {
    setModalVisible(true);
  };

  const onCloseModal = () => {
    setModalVisible(false);
  };

  const onSaveUsers = async (userIds: string[]): Promise<void> => {
    await updateAssignedUsers({
      refetchQueries: ['ViewIncident'],
      variables: {
        data: {
          assignedUsers: {
            set: userIds.map((id) => ({ id })),
          },
        },
        where: { id: incidentId },
      },
    });
  };

  return {
    loading,
    modalVisible,
    onCloseModal,
    onOpenModal,
    onSaveUsers,
  };
};

export default useIncidentAssignedUsers;
