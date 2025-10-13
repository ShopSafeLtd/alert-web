import type { AccountData } from '#/components/onboarding/Onboarding/AccountDetail/useAccountDetail';

import { Button, Card, Col, Form, Input, Row, Switch, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

const { Text, Title } = Typography;

interface Props {
  data: AccountData;
  loading: boolean;
  onSubmit: (value: AccountData) => void;
  saving: boolean;
}

const EditProfile = ({
  data,
  loading,
  onSubmit,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <div className="list-view">
      <Row style={{ margin: 15 }}>
        <Col>
          <Title level={3}>
            {intl.formatMessage({
              defaultMessage: 'Account Details',
            })}
          </Title>
          <Text>
            {intl.formatMessage({
              defaultMessage:
                'Please review your account details and correct any errors or fill in any missing information.',
            })}
          </Text>
        </Col>
      </Row>
      <Card
        bordered={false}
        loading={loading}
        // title="Account Details"
        style={{ width: '98%' }}
      >
        <Form
          initialValues={{
            ...data,
          }}
          onFinish={onSubmit}
        >
          <Row gutter={50}>
            <Col span={11}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Full Name',
                })}
                name="fullName"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please enter a name for the user.',
                    }),
                    required: true,
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20} style={{ marginBottom: 20, marginTop: 20 }}>
            <Col>
              <Title level={3}>
                {intl.formatMessage({
                  defaultMessage: 'Notification Options',
                })}
              </Title>
              <Text type="secondary">
                {intl.formatMessage({
                  defaultMessage:
                    'Choose which notifications you wish to receive and how you want to receive them.',
                })}
              </Text>
            </Col>
          </Row>

          <Title level={4} style={{ marginBottom: 0 }}>
            {intl.formatMessage({ defaultMessage: 'Incidents' })}
          </Title>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage:
                'Only receive notifications for incidents that I report or follow',
            })}
            name="subscribedIncidentOnly"
            style={{ margin: 5, marginLeft: 20 }}
            valuePropName="checked"
          >
            <Switch disabled={saving} />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Push Notifications (Mobile App)',
            })}
            name="incidentPush"
            style={{ margin: 5, marginLeft: 20 }}
            valuePropName="checked"
          >
            <Switch disabled={saving} />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Email Notifications',
            })}
            name="incidentEmail"
            style={{ margin: 5, marginLeft: 20 }}
            valuePropName="checked"
          >
            <Switch disabled={saving} />
          </Form.Item>

          <Title level={4} style={{ marginBottom: 0, marginTop: 20 }}>
            {intl.formatMessage({
              defaultMessage:
                'Offenders-- Receive notifications for new offenders',
            })}
          </Title>

          <Form.Item
            label={intl.formatMessage({
              defaultMessage:
                'Only receive notifications for offenders that I report or follow',
            })}
            name="subscribedOffenderOnly"
            style={{ margin: 5, marginLeft: 20 }}
            valuePropName="checked"
          >
            <Switch disabled={saving} />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Push Notifications (Mobile App)',
            })}
            name="offenderPush"
            style={{ margin: 5, marginLeft: 20 }}
            valuePropName="checked"
          >
            <Switch disabled={saving} />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Email Notifications',
            })}
            name="offenderEmail"
            style={{ margin: 5, marginLeft: 20 }}
            valuePropName="checked"
          >
            <Switch disabled={saving} />
          </Form.Item>

          <Title level={4}>
            {intl.formatMessage({ defaultMessage: 'Messages' })}
          </Title>

          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Receive notifications for new messages',
            })}
            name="messagePush"
            style={{ margin: 5, marginLeft: 20 }}
            valuePropName="checked"
          >
            <Switch disabled={saving} style={{ marginLeft: 5 }} />
          </Form.Item>

          <Form.Item>
            <Row gutter={20} justify="end" style={{ marginTop: 30 }}>
              <Col>
                <Button
                  disabled={saving}
                  htmlType="submit"
                  loading={saving}
                  type="primary"
                >
                  {intl.formatMessage({ defaultMessage: 'Next' })}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditProfile;
