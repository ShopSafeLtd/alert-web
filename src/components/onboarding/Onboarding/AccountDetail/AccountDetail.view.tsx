import React from 'react';
import { CurrentUserQuery } from 'graphql/generated';
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
}: Props): JSX.Element => (
  <div className="list-view">
    <Row style={{ margin: 15 }}>
      <Col>
        <Title level={3}>Account Details</Title>
        <Text>
          Please review your account details and correct any errors or fill in
          any missing information.
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
              label="Full Name"
              rules={[
                {
                  required: true,
                  message: 'Please enter a name for the user.',
                },
              ]}
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20} style={{ marginTop: 20, marginBottom: 20 }}>
          <Col>
            <Title level={3}>Notification Options</Title>
            <Text type="secondary">
              Choose which notifications you wish to receive and how you want to
              receive them.
            </Text>
          </Col>
        </Row>

        <Title level={4} style={{ marginBottom: 0 }}>
          Incidents
        </Title>
        <Form.Item
          label="Only receive notifications for incidents that I report or follow"
          name="subscribedIncidentOnly"
          valuePropName="checked"
          style={{ margin: 5, marginLeft: 20 }}
        >
          <Switch disabled={saving} />
        </Form.Item>
        <Form.Item
          label="Push Notifications (Mobile App)"
          name="incidentPush"
          valuePropName="checked"
          style={{ margin: 5, marginLeft: 20 }}
        >
          <Switch disabled={saving} />
        </Form.Item>
        <Form.Item
          label="Email Notifications"
          name="incidentEmail"
          valuePropName="checked"
          style={{ margin: 5, marginLeft: 20 }}
        >
          <Switch disabled={saving} />
        </Form.Item>

        <Title level={4} style={{ marginBottom: 0, marginTop: 20 }}>
          Offenders-- Receive notifications for new offenders
        </Title>

        <Form.Item
          label="Only receive notifications for offenders that I report or follow"
          name="subscribedOffenderOnly"
          valuePropName="checked"
          style={{ margin: 5, marginLeft: 20 }}
        >
          <Switch disabled={saving} />
        </Form.Item>
        <Form.Item
          label="Push Notifications (Mobile App)"
          name="offenderPush"
          valuePropName="checked"
          style={{ margin: 5, marginLeft: 20 }}
        >
          <Switch disabled={saving} />
        </Form.Item>
        <Form.Item
          label="Email Notifications"
          name="offenderEmail"
          valuePropName="checked"
          style={{ margin: 5, marginLeft: 20 }}
        >
          <Switch disabled={saving} />
        </Form.Item>

        <Title level={4}>Messagess</Title>

        <Form.Item
          label="Receive notifications for new messages"
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
                Next
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  </div>
);

export default EditProfile;
