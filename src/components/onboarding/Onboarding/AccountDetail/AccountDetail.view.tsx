import React from 'react';
import { useIntl } from 'react-intl';
import type { CurrentUserQuery } from 'graphql/generated';
import { Button, Card, Typography, Form, Row, Col, Input, Switch } from 'antd';

const { Title, Text } = Typography;

interface AccountData {
  fullName: string;
}

interface Props {
  onSubmit: (value: AccountData) => void;
  data: CurrentUserQuery | undefined;
  loading: boolean;
  saving: boolean;
}

const EditProfile = ({
  onSubmit,
  data,
  loading,
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
              id: 'mYx8sv',
            })}
          </Title>
          <Text>
            {intl.formatMessage({
              defaultMessage:
                'Please review your account details and correct any errors or fill in any missing information.',
              id: 'WKJjnj',
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
            fullName: data?.currentUser?.fullName,
            subscribedIncidentOnly: true,
            incidentEmail: false,
            incidentPush: true,
            subscribedOffenderOnly: true,
            offenderEmail: false,
            offenderPush: true,
            messagePush: true,
          }}
          onFinish={onSubmit}
        >
          <Row gutter={50}>
            <Col span={11}>
              <Form.Item
                name="fullName"
                label={intl.formatMessage({
                  defaultMessage: 'Full Name',
                  id: 'TemVby',
                })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      defaultMessage: 'Please enter a name for the user.',
                      id: 'CV8rPY',
                    }),
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20} style={{ marginTop: 20, marginBottom: 20 }}>
            <Col>
              <Title level={3}>
                {intl.formatMessage({
                  defaultMessage: 'Notification Options',
                  id: 'M/DKgW',
                })}
              </Title>
              <Text type="secondary">
                {intl.formatMessage({
                  defaultMessage:
                    'Choose which notifications you wish to receive and how you want to receive them.',
                  id: 'bYAgZW',
                })}
              </Text>
            </Col>
          </Row>

          <Title level={4} style={{ marginBottom: 0 }}>
            {intl.formatMessage({ defaultMessage: 'Incidents', id: 'mtr3R4' })}
          </Title>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage:
                'Only receive notifications for incidents that I report or follow',
              id: 'COmjwm',
            })}
            name="subscribedIncidentOnly"
            valuePropName="checked"
            style={{ margin: 5, marginLeft: 20 }}
          >
            <Switch disabled={saving} />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Push Notifications (Mobile App)',
              id: 'Tb4qgA',
            })}
            name="incidentPush"
            valuePropName="checked"
            style={{ margin: 5, marginLeft: 20 }}
          >
            <Switch disabled={saving} />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Email Notifications',
              id: '1V1nJ/',
            })}
            name="incidentEmail"
            valuePropName="checked"
            style={{ margin: 5, marginLeft: 20 }}
          >
            <Switch disabled={saving} />
          </Form.Item>

          <Title level={4} style={{ marginBottom: 0, marginTop: 20 }}>
            {intl.formatMessage({
              defaultMessage:
                'Offenders-- Receive notifications for new offenders',
              id: 'oihKBY',
            })}
          </Title>

          <Form.Item
            label={intl.formatMessage({
              defaultMessage:
                'Only receive notifications for offenders that I report or follow',
              id: 'kQtSa1',
            })}
            name="subscribedOffenderOnly"
            valuePropName="checked"
            style={{ margin: 5, marginLeft: 20 }}
          >
            <Switch disabled={saving} />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Push Notifications (Mobile App)',
              id: 'Tb4qgA',
            })}
            name="offenderPush"
            valuePropName="checked"
            style={{ margin: 5, marginLeft: 20 }}
          >
            <Switch disabled={saving} />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Email Notifications',
              id: '1V1nJ/',
            })}
            name="offenderEmail"
            valuePropName="checked"
            style={{ margin: 5, marginLeft: 20 }}
          >
            <Switch disabled={saving} />
          </Form.Item>

          <Title level={4}>
            {intl.formatMessage({ defaultMessage: 'Messages', id: 'hMzcSq' })}
          </Title>

          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Receive notifications for new messages',
              id: 'k3caZl',
            })}
            name="messagePush"
            valuePropName="checked"
            style={{ margin: 5, marginLeft: 20 }}
          >
            <Switch disabled={saving} style={{ marginLeft: 5 }} />
          </Form.Item>

          <Form.Item>
            <Row style={{ marginTop: 30 }} gutter={20} justify="end">
              <Col>
                <Button
                  disabled={saving}
                  loading={saving}
                  type="primary"
                  htmlType="submit"
                >
                  {intl.formatMessage({ defaultMessage: 'Next', id: '9+Ddtu' })}
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
