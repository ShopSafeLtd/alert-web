import { UserAddOutlined } from '@ant-design/icons';
import { Avatar, Button, Tooltip, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import AssignUsersModal from './AssignUsersModal.view';

interface User {
  fullName: string;
  id: string;
}

interface Props {
  assignedUsers: User[];
  editRights: boolean;
  loading: boolean;
  modalVisible: boolean;
  onCloseModal: () => void;
  onOpenModal: () => void;
  onSaveUsers: (userIds: string[]) => Promise<void>;
}

const getInitials = (fullName: string): string =>
  fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

const IncidentAssignedUsers = ({
  assignedUsers,
  editRights,
  loading,
  modalVisible,
  onCloseModal,
  onOpenModal,
  onSaveUsers,
}: Props): JSX.Element => {
  const intl = useIntl();

  if (!editRights) {
    // Read-only view
    if (assignedUsers.length === 0) {
      return (
        <Typography.Text type="secondary">
          {intl.formatMessage({ defaultMessage: 'Unassigned' })}
        </Typography.Text>
      );
    }

    return (
      <Avatar.Group maxCount={3} size="small">
        {assignedUsers.map((user) => (
          <Tooltip key={user.id} title={user.fullName}>
            <Avatar style={{ backgroundColor: '#1890ff' }}>
              {getInitials(user.fullName)}
            </Avatar>
          </Tooltip>
        ))}
      </Avatar.Group>
    );
  }

  // Editable view
  return (
    <>
      {assignedUsers.length === 0 ? (
        <Button
          icon={<UserAddOutlined />}
          onClick={onOpenModal}
          size="small"
          type="dashed"
        >
          {intl.formatMessage({ defaultMessage: 'Assign Users' })}
        </Button>
      ) : (
        <div onClick={onOpenModal} style={{ cursor: 'pointer' }}>
          <Avatar.Group maxCount={3} size="small">
            {assignedUsers.map((user) => (
              <Tooltip key={user.id} title={user.fullName}>
                <Avatar style={{ backgroundColor: '#1890ff' }}>
                  {getInitials(user.fullName)}
                </Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
        </div>
      )}

      <AssignUsersModal
        assignedUsers={assignedUsers}
        loading={loading}
        onCancel={onCloseModal}
        onSave={onSaveUsers}
        visible={modalVisible}
      />
    </>
  );
};

export default IncidentAssignedUsers;
