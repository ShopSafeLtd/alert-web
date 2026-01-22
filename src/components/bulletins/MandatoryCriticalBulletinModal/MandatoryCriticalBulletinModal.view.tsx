import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Badge, Button, Card, List, Modal, Tag, Typography } from 'antd';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type {
  BulletinAcknowledgementStatus,
  PendingCriticalBulletin,
} from './types';

const { Paragraph, Text, Title } = Typography;

interface MandatoryCriticalBulletinModalProps {
  acknowledgementStatus: Record<string, BulletinAcknowledgementStatus>;
  allBulletinsAcknowledged: boolean;
  bulletins: PendingCriticalBulletin[];
  canProceed: boolean;
  currentBulletin: PendingCriticalBulletin | null;
  handleAcknowledge: (bulletinId: string) => Promise<void>;
  handleBulletinSelect: (bulletinId: string) => void;
  handleContinue: () => void;
  isAcknowledging: boolean;
  isCurrentBulletinAcknowledged: boolean;
  onComplete: () => void;
  visible: boolean;
}

const MandatoryCriticalBulletinModal: React.FC<
  MandatoryCriticalBulletinModalProps
> = ({
  acknowledgementStatus,
  allBulletinsAcknowledged,
  bulletins,
  canProceed,
  currentBulletin,
  handleAcknowledge,
  handleBulletinSelect,
  handleContinue,
  isAcknowledging,
  isCurrentBulletinAcknowledged,
  onComplete,
  visible,
}) => {
  const intl = useIntl();

  if (!visible || bulletins.length === 0) return null;

  const unacknowledgedCount = bulletins.filter(
    (b) => !acknowledgementStatus[b.id]?.isAcknowledged
  ).length;

  return (
    <Modal
      closable={false}
      footer={null}
      keyboard={false}
      maskClosable={false}
      open={visible}
      title={
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>
            <ExclamationCircleOutlined
              style={{ color: '#ff4d4f', marginRight: 8 }}
            />
            <FormattedMessage defaultMessage="Critical Bulletins" />
          </span>
          <Badge
            color={allBulletinsAcknowledged ? 'green' : 'red'}
            count={
              allBulletinsAcknowledged
                ? intl.formatMessage({ defaultMessage: 'All Acknowledged' })
                : intl.formatMessage(
                    {
                      defaultMessage: '{count} Pending',
                    },
                    {
                      count: unacknowledgedCount,
                    }
                  )
            }
          />
        </div>
      }
      width="90%"
    >
      <div style={{ display: 'flex', gap: 24, minHeight: '60vh' }}>
        {/* Bulletin List Sidebar - Only show when there are multiple bulletins */}
        {bulletins.length > 1 && (
          <div
            style={{
              borderRight: '1px solid #f0f0f0',
              minWidth: 280,
              paddingRight: 16,
            }}
          >
            <Title level={5}>
              <FormattedMessage defaultMessage="Bulletins Requiring Acknowledgement" />
            </Title>
            <List
              dataSource={bulletins}
              renderItem={(bulletin) => {
                const isAcknowledged =
                  acknowledgementStatus[bulletin.id]?.isAcknowledged;
                const isCurrent = currentBulletin?.id === bulletin.id;

                return (
                  <List.Item
                    onClick={() => handleBulletinSelect(bulletin.id)}
                    style={{
                      backgroundColor: isCurrent ? '#e6f7ff' : 'transparent',
                      border: isCurrent
                        ? '1px solid #1890ff'
                        : '1px solid transparent',
                      borderRadius: 4,
                      cursor: 'pointer',
                      marginBottom: 8,
                      padding: 12,
                    }}
                  >
                    <div style={{ width: '100%' }}>
                      <div
                        style={{
                          alignItems: 'center',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text strong style={{ fontSize: 13 }}>
                          {bulletin.title}
                        </Text>
                        {isAcknowledged && (
                          <CheckCircleOutlined
                            style={{ color: '#52c41a', fontSize: 16 }}
                          />
                        )}
                      </div>
                      {bulletin.criticalExpiry && (
                        <Text
                          style={{ color: '#ff4d4f', fontSize: 11 }}
                          type="secondary"
                        >
                          <FormattedMessage
                            defaultMessage="Expires {time}"
                            values={{
                              time: formatDistanceToNow(
                                new Date(bulletin.criticalExpiry),
                                { addSuffix: true }
                              ),
                            }}
                          />
                        </Text>
                      )}
                    </div>
                  </List.Item>
                );
              }}
              size="small"
            />
          </div>
        )}

        {/* Bulletin Content */}
        <div style={{ flex: 1 }}>
          {currentBulletin ? (
            <Card
              extra={
                <Tag color="red">
                  <ExclamationCircleOutlined style={{ marginRight: 4 }} />
                  <FormattedMessage defaultMessage="CRITICAL" />
                </Tag>
              }
              title={currentBulletin.title}
            >
              {currentBulletin.previewImage && (
                <img
                  alt={currentBulletin.title}
                  src={currentBulletin.previewImage}
                  style={{ marginBottom: 16, maxWidth: '100%' }}
                />
              )}

              {currentBulletin.previewText && (
                <Paragraph>{currentBulletin.previewText}</Paragraph>
              )}

              <div style={{ marginTop: 16 }}>
                <Text type="secondary">
                  <FormattedMessage
                    defaultMessage="Posted by {author} on {date}"
                    values={{
                      author: currentBulletin.createdBy.fullName,
                      date: new Date(
                        currentBulletin.createdAt
                      ).toLocaleDateString(),
                    }}
                  />
                </Text>
              </div>

              {currentBulletin.criticalExpiry && (
                <div style={{ marginTop: 8 }}>
                  <Text style={{ color: '#ff4d4f' }}>
                    <ExclamationCircleOutlined style={{ marginRight: 4 }} />
                    <FormattedMessage
                      defaultMessage="This bulletin expires {time}"
                      values={{
                        time: formatDistanceToNow(
                          new Date(currentBulletin.criticalExpiry),
                          { addSuffix: true }
                        ),
                      }}
                    />
                  </Text>
                </div>
              )}

              <div style={{ marginTop: 24 }}>
                <Button
                  disabled={isCurrentBulletinAcknowledged}
                  icon={<CheckCircleOutlined />}
                  loading={isAcknowledging}
                  onClick={() => {
                    void handleAcknowledge(currentBulletin.id).then(() => {
                      // If there's only one bulletin, close the modal after acknowledging
                      if (bulletins.length === 1) {
                        onComplete();
                      }
                    });
                  }}
                  type="primary"
                >
                  {isCurrentBulletinAcknowledged ? (
                    <FormattedMessage defaultMessage="Acknowledged" />
                  ) : (
                    <FormattedMessage defaultMessage="Acknowledge & Continue" />
                  )}
                </Button>
              </div>
            </Card>
          ) : (
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
              }}
            >
              <Text type="secondary">
                <FormattedMessage defaultMessage="Select a bulletin to view" />
              </Text>
            </div>
          )}
        </div>
      </div>

      {/* Footer with Continue Button */}
      <div
        style={{
          alignItems: 'center',
          borderTop: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 24,
          paddingTop: 16,
        }}
      >
        <Text>
          {allBulletinsAcknowledged ? (
            <FormattedMessage defaultMessage="All critical bulletins have been acknowledged. You may now continue." />
          ) : (
            <FormattedMessage
              defaultMessage="Please acknowledge all {count} critical bulletins to continue."
              values={{ count: unacknowledgedCount }}
            />
          )}
        </Text>
        <Button
          disabled={!canProceed}
          onClick={handleContinue}
          size="large"
          type="primary"
        >
          <FormattedMessage defaultMessage="Continue to App" />
        </Button>
      </div>
    </Modal>
  );
};

export default MandatoryCriticalBulletinModal;
