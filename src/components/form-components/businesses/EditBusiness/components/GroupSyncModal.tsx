import { Alert, Modal, Radio } from 'antd';
import { GroupSyncStrategy } from 'graphql/types';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

interface Props {
  businessName: string;
  onCancel: () => void;
  onConfirm: (strategy: GroupSyncStrategy) => void;
  visible: boolean;
}

const GroupSyncModal: React.FC<Props> = ({
  businessName,
  onCancel,
  onConfirm,
  visible,
}) => {
  const intl = useIntl();
  const [strategy, setStrategy] = useState<GroupSyncStrategy>(
    GroupSyncStrategy.Merge
  );

  const handleConfirm = () => {
    onConfirm(strategy);
  };

  return (
    <Modal
      cancelText={intl.formatMessage({
        defaultMessage: 'Skip',
      })}
      okText={intl.formatMessage({
        defaultMessage: 'Sync Groups',
      })}
      onCancel={onCancel}
      onOk={handleConfirm}
      open={visible}
      title={intl.formatMessage({
        defaultMessage: 'Sync Groups to Related Entities?',
      })}
      width={600}
    >
      <p>
        {intl.formatMessage(
          {
            defaultMessage:
              "You've changed the groups for {businessName}. Would you like to sync these group changes to related incidents, offenders, and vehicles?",
          },
          { businessName: <strong>{businessName}</strong> }
        )}
      </p>

      <div style={{ marginBottom: 16, marginTop: 24 }}>
        <Radio.Group
          onChange={(e) => setStrategy(e.target.value as GroupSyncStrategy)}
          style={{ width: '100%' }}
          value={strategy}
        >
          <div style={{ marginBottom: 12 }}>
            <Radio value={GroupSyncStrategy.Merge}>
              <strong>
                {intl.formatMessage({
                  defaultMessage: 'Merge (Recommended)',
                })}
              </strong>
              <div style={{ color: '#666', marginLeft: 24, marginTop: 4 }}>
                {intl.formatMessage({
                  defaultMessage: 'Add new groups while keeping existing ones',
                })}
              </div>
            </Radio>
          </div>
          <div>
            <Radio value={GroupSyncStrategy.Replace}>
              <strong>
                {intl.formatMessage({
                  defaultMessage: 'Replace',
                })}
              </strong>
              <div style={{ color: '#666', marginLeft: 24, marginTop: 4 }}>
                {intl.formatMessage({
                  defaultMessage: 'Replace all groups with business groups',
                })}
              </div>
            </Radio>
          </div>
        </Radio.Group>
      </div>

      {strategy === GroupSyncStrategy.Replace && (
        <Alert
          message={intl.formatMessage({
            defaultMessage:
              "This will remove any groups on entities that aren't in the business groups",
          })}
          showIcon
          style={{ marginTop: 16 }}
          type="warning"
        />
      )}
    </Modal>
  );
};

export default GroupSyncModal;
