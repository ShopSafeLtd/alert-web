import UsersSelect from '#/components/form-components/UsersSelect/UsersSelect.view';
import { Form, Modal, message } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface User {
  fullName: string;
  id: string;
}

interface Props {
  assignedUsers: User[];
  loading: boolean;
  onCancel: () => void;
  onSave: (userIds: string[]) => Promise<void>;
  visible: boolean;
}

const AssignUsersModal = ({
  assignedUsers,
  loading,
  onCancel,
  onSave,
  visible,
}: Props): JSX.Element => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const handleSave = async () => {
    try {
      const values = (await form.validateFields()) as { userIds?: string[] };
      await onSave(values.userIds || []);
      void message.success(
        intl.formatMessage({
          defaultMessage: 'Assigned users updated successfully',
        })
      );
      onCancel();
    } catch {
      void message.error(
        intl.formatMessage({
          defaultMessage: 'Failed to update assigned users',
        })
      );
    }
  };

  return (
    <Modal
      confirmLoading={loading}
      okText={intl.formatMessage({ defaultMessage: 'Save' })}
      onCancel={onCancel}
      onOk={() => {
        void handleSave();
      }}
      open={visible}
      title={intl.formatMessage({ defaultMessage: 'Assign Users to Incident' })}
    >
      <Form
        form={form}
        initialValues={{
          userIds: assignedUsers.map((user) => user.id),
        }}
        layout="vertical"
      >
        <Form.Item
          label={intl.formatMessage({ defaultMessage: 'Assigned Users' })}
          name="userIds"
        >
          <UsersSelect
            mode="multiple"
            placeholder={intl.formatMessage({
              defaultMessage: 'Select users to assign',
            })}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AssignUsersModal;
