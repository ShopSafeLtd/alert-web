import { Alert, Modal, Radio, Typography } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

interface Business {
  id: string;
  name: string;
  totalUsers: number;
}

interface Props {
  businesses: Business[];
  loading: boolean;
  onCancel: () => void;
  onConfirm: (mainBusinessId: string) => void;
  visible: boolean;
}

const MergeBusinessesModal: React.FC<Props> = ({
  businesses,
  loading,
  onCancel,
  onConfirm,
  visible,
}) => {
  const intl = useIntl();
  const [mainBusinessId, setMainBusinessId] = useState<string | undefined>();

  const handleConfirm = () => {
    if (mainBusinessId) {
      onConfirm(mainBusinessId);
    }
  };

  const handleCancel = () => {
    setMainBusinessId(undefined);
    onCancel();
  };

  return (
    <Modal
      cancelText={intl.formatMessage({
        defaultMessage: 'Cancel',
      })}
      confirmLoading={loading}
      okButtonProps={{
        disabled: !mainBusinessId,
      }}
      okText={intl.formatMessage({
        defaultMessage: 'Merge Businesses',
      })}
      onCancel={handleCancel}
      onOk={handleConfirm}
      open={visible}
      title={intl.formatMessage(
        {
          defaultMessage: 'Merge {count} Businesses',
        },
        { count: businesses.length }
      )}
      width={600}
    >
      <Alert
        description={intl.formatMessage({
          defaultMessage:
            'This action cannot be undone. All data from the selected businesses will be merged into the main business, and the other businesses will be marked as recycled.',
        })}
        message={intl.formatMessage({
          defaultMessage: 'Warning: Irreversible Action',
        })}
        showIcon
        style={{ marginBottom: 24 }}
        type="warning"
      />

      <Typography.Paragraph strong>
        {intl.formatMessage({
          defaultMessage: 'Select the main business to keep:',
        })}
      </Typography.Paragraph>

      <Radio.Group
        onChange={(e) => setMainBusinessId(e.target.value as string)}
        style={{ width: '100%' }}
        value={mainBusinessId}
      >
        {businesses.map((business) => (
          <div key={business.id} style={{ marginBottom: 12 }}>
            <Radio value={business.id}>
              <strong>{business.name}</strong>
              <div style={{ color: '#666', marginLeft: 24, marginTop: 4 }}>
                {intl.formatMessage(
                  {
                    defaultMessage: '{count} users',
                  },
                  { count: business.totalUsers }
                )}
              </div>
            </Radio>
          </div>
        ))}
      </Radio.Group>

      <Alert
        description={
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>
              {intl.formatMessage({
                defaultMessage: 'Users from all businesses',
              })}
            </li>
            <li>
              {intl.formatMessage({
                defaultMessage: 'Locations',
              })}
            </li>
            <li>
              {intl.formatMessage({
                defaultMessage: 'Tags',
              })}
            </li>
            <li>
              {intl.formatMessage({
                defaultMessage: 'Content Groups',
              })}
            </li>
            <li>
              {intl.formatMessage({
                defaultMessage: 'Incidents',
              })}
            </li>
            <li>
              {intl.formatMessage({
                defaultMessage: 'Offenders and Vehicles',
              })}
            </li>
          </ul>
        }
        message={intl.formatMessage({
          defaultMessage:
            'The following will be merged into the main business:',
        })}
        showIcon
        style={{ marginTop: 24 }}
        type="info"
      />
    </Modal>
  );
};

export default MergeBusinessesModal;
