import React from 'react';
import { CurrentUserQuery } from 'graphql/generated';
import {
  Button,
  PageHeader,
  Card,
  Typography,
  Skeleton,
  Form,
  Row,
  Col,
  Input,
  Switch,
} from 'antd';
// import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

interface FormData {
  fullName: string;
  email: string;
  organisation: string;
  postcode: string;
  street: string;
  townCity: string;
  building: string;
  county: string;
  incidentEmail: boolean;
  incidentPush: boolean;
  offenderEmail: boolean;
  offenderPush: boolean;
  messagePush: boolean;
}

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  resetConfirm: () => void;
  data: CurrentUserQuery | undefined;
  loading: boolean;
  saving: boolean;
}
const EditProfile = ({
  onSubmit,
  onClose,
  resetConfirm,
  data,
  loading,
  saving,
}: Props): JSX.Element => (
  <div className="list-view">
    <PageHeader
      onBack={() => window.history.back()}
      title="Edit Account"
      subTitle="Amend your account details and then press the save button to update them."
      extra={[
        // <Link to="reset-password">
        <Button type="primary" onClick={resetConfirm} disabled={saving}>
          Reset Password
        </Button>,
        // </Link>,
      ]}
    />
    <Card>
      {loading ? (
        <Skeleton />
      ) : (
        <Form
          initialValues={{
            fullName: data?.currentUser?.fullName,
            email: data?.currentUser?.email,
            organisation: data?.currentUser?.organisation,
            postcode: data?.currentUser?.addresses[0].postcode || '',
            street: data?.currentUser?.addresses[0].street || '',
            townCity: data?.currentUser?.addresses[0].townCity || '',
            building: data?.currentUser?.addresses[0].building || '',
            county: data?.currentUser?.addresses[0].county || '',
            incidentEmail: data?.currentUser?.incidentEmail,
            incidentPush: data?.currentUser?.incidentPush,
            offenderEmail: data?.currentUser?.offenderEmail,
            offenderPush: data?.currentUser?.offenderPush,
            messagePush: data?.currentUser?.messagePush,
          }}
          onFinish={onSubmit}
        >
          <Title level={4} style={{ marginBottom: 15 }}>
            User Details:
          </Title>
          <Row gutter={60}>
            <Col span={8}>
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
            <Col span={8}>
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a email address for the user.',
                  },
                ]}
              >
                <Input disabled={saving} type="email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={60}>
            <Col span={8}>
              <Form.Item
                name="organisation"
                label="Organisation"
                rules={[
                  {
                    required: true,
                    message: 'Please enter an organisation for the user.',
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>

          <Title level={4} style={{ marginBottom: 15 }}>
            User Address:
          </Title>
          <Row gutter={60}>
            <Col span={8}>
              <Form.Item name="building" label="Building">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="street" label="Street">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={60}>
            <Col span={8}>
              <Form.Item name="townCity" label="Town City">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="county" label="County">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={60}>
            <Col span={8}>
              <Form.Item name="postcode" label="Postcode">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20} style={{ marginTop: 40, marginBottom: 20 }}>
            <Col>
              <Title level={3}>Notification Options</Title>
              <Text type="secondary">
                Choose which notifications you wish to receive and how you want
                to receive them.
              </Text>
            </Col>
          </Row>

          <Title level={4}>
            Incidents--Receive notifications for new incidents
          </Title>

          <Row gutter={20} style={{ margin: 20 }}>
            <Col span={15}>
              <Form.Item
                label="Email Notifications"
                name="incidentEmail"
                valuePropName="checked"
                style={{ margin: 5 }}
              >
                <Switch disabled={saving} />
              </Form.Item>
              <Form.Item
                label="Push Notifications (Mobile App)"
                name="incidentPush"
                valuePropName="checked"
                style={{ margin: 5 }}
              >
                <Switch disabled={saving} />
              </Form.Item>
            </Col>
          </Row>

          <Title level={4}>
            Offenders-- Receive notifications for new offenders
          </Title>

          <Row gutter={20} style={{ margin: 20 }}>
            <Col span={15}>
              <Form.Item
                label="Email Notifications"
                name="offenderEmail"
                valuePropName="checked"
                style={{ margin: 5 }}
              >
                <Switch disabled={saving} />
              </Form.Item>
              <Form.Item
                label="Push Notifications (Mobile App)"
                name="offenderPush"
                valuePropName="checked"
                style={{ margin: 5 }}
              >
                <Switch disabled={saving} />
              </Form.Item>
            </Col>
          </Row>

          <Title level={4}>Messagess</Title>

          <Row gutter={20} style={{ margin: 20 }}>
            <Col span={15}>
              <Form.Item
                label="Receive notifications for new messages"
                name="messagePush"
                valuePropName="checked"
              >
                <Switch disabled={saving} style={{ marginLeft: 5 }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Row style={{ marginTop: 30 }} gutter={20} justify="end">
              <Col>
                <Button disabled={saving} onClick={onClose}>
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button
                  disabled={saving}
                  loading={saving}
                  type="primary"
                  htmlType="submit"
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      )}
    </Card>
  </div>
);

export default EditProfile;
