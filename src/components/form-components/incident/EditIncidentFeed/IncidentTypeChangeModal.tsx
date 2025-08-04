import { Modal } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  onCancel: () => void;
  onConfirm: () => void;
  visible: boolean;
}

const IncidentTypeChangeModal: React.FC<Props> = ({
  onCancel,
  onConfirm,
  visible,
}) => {
  const intl = useIntl();

  return (
    <Modal
      cancelText={intl.formatMessage({
        defaultMessage: 'Cancel',
      })}
      okText={intl.formatMessage({
        defaultMessage: 'Continue',
      })}
      onCancel={onCancel}
      onOk={onConfirm}
      open={visible}
      title={intl.formatMessage({
        defaultMessage: 'Change Incident Type',
      })}
    >
      <p>
        {intl.formatMessage({
          defaultMessage:
            'By changing the incident type, any existing custom questions and their answers will be cleared and replaced with the custom questions for the new incident type.',
        })}
      </p>
      <p>
        {intl.formatMessage({
          defaultMessage: 'Are you sure you want to continue?',
        })}
      </p>
    </Modal>
  );
};

export default IncidentTypeChangeModal;
