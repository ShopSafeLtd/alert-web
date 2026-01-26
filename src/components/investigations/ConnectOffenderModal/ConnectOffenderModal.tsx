import type { CascadeOptions } from 'types/investigations';

import { Modal, Typography } from 'antd';
import CascadeOptionsCheckbox from 'components/investigations/CascadeOptionsCheckbox';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

interface ConnectOffenderModalProps {
  loading?: boolean;
  offender: {
    id: string;
    name: string;
    reference?: number;
  } | null;
  onCancel: () => void;
  onConfirm: (cascadeOptions: CascadeOptions) => void;
  visible: boolean;
}

const ConnectOffenderModal: React.FC<ConnectOffenderModalProps> = ({
  loading = false,
  offender,
  onCancel,
  onConfirm,
  visible,
}) => {
  const intl = useIntl();
  const [cascadeOptions, setCascadeOptions] = useState<CascadeOptions>({
    connectCrimeGroups: false,
    connectIncidents: false,
    connectVehicles: false,
  });

  // Reset cascade options when modal opens/closes
  useEffect(() => {
    if (!visible) {
      setCascadeOptions({
        connectCrimeGroups: false,
        connectIncidents: false,
        connectVehicles: false,
      });
    }
  }, [visible]);

  const handleConfirm = () => {
    onConfirm(cascadeOptions);
  };

  return (
    <Modal
      cancelText={intl.formatMessage({
        defaultMessage: 'Cancel',
      })}
      confirmLoading={loading}
      okText={intl.formatMessage({
        defaultMessage: 'Add to Investigation',
      })}
      onCancel={onCancel}
      onOk={handleConfirm}
      open={visible}
      title={intl.formatMessage(
        {
          defaultMessage: 'Add {name} to Investigation',
        },
        {
          name: offender?.name || '',
        }
      )}
      width={600}
    >
      <div style={{ marginBottom: 16 }}>
        <Typography.Text>
          {intl.formatMessage({
            defaultMessage:
              'Choose which related data to automatically connect to the investigation:',
          })}
        </Typography.Text>
      </div>
      <CascadeOptionsCheckbox
        disabled={loading}
        layout="vertical"
        onChange={setCascadeOptions}
        value={cascadeOptions}
      />
    </Modal>
  );
};

export default ConnectOffenderModal;
