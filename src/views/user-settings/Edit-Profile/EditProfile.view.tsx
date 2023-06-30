import React from 'react';
import type { CurrentUserQuery } from 'graphql/generated';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  PageHeader,
  Row,
  Skeleton,
  Switch,
  Typography,
} from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

const { Title, Text } = Typography;

interface FormData {
  fullName: string;
  email: string;
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
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <PageHeader
        onBack={() => window.history.back()}
        title={intl.formatMessage({
          defaultMessage: 'Edit Account',
          id: 'wjB0LJ',
        })}
        subTitle={intl.formatMessage({
          defaultMessage:
            'Amend your account details and then press the save button to update them.',
          id: 'kfoYM1',
        })}
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={resetConfirm}
            disabled={saving}
          >
            <FormattedMessage defaultMessage="Reset Password" id="xl27nc" />
          </Button>,
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
              incidentEmail: data?.currentUser?.incidentEmail,
              incidentPush: data?.currentUser?.incidentPush,
              offenderEmail: data?.currentUser?.offenderEmail,
              offenderPush: data?.currentUser?.offenderPush,
              messagePush: data?.currentUser?.messagePush,
            }}
            onFinish={onSubmit}
          >
            <Title level={3} style={{ marginBottom: 15 }}>
              <FormattedMessage defaultMessage="User Details:" id="vewp8R" />
            </Title>
            <Row gutter={50}>
              <Col span={11}>
                <Form.Item
                  name="fullName"
                  label={
                    <FormattedMessage defaultMessage="Full Name" id="TemVby" />
                  }
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
              <Col span={11}>
                <Form.Item
                  name="email"
                  label={
                    <FormattedMessage
                      defaultMessage="Email Address"
                      id="xxQxLE"
                    />
                  }
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({
                        defaultMessage:
                          'Please enter a email address for the user.',
                        id: 'Jh9m4u',
                      }),
                    },
                  ]}
                >
                  <Input disabled={saving} type="email" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20} style={{ marginTop: 20, marginBottom: 20 }}>
              <Col>
                <Title level={3}>
                  <FormattedMessage
                    defaultMessage="Notification Options"
                    id="M/DKgW"
                  />
                </Title>
                <Text type="secondary">
                  <FormattedMessage
                    defaultMessage="Choose which notifications you wish to receive and how you want
                  to receive them."
                    id="9ZDz+Z"
                  />
                </Text>
              </Col>
            </Row>

            <Title level={4}>
              <FormattedMessage
                defaultMessage="Incidents--Receive notifications for new incidents"
                id="ZwQRld"
              />
            </Title>

            <Row gutter={20} style={{ margin: 20 }}>
              <Col span={15}>
                <Form.Item
                  label={
                    <FormattedMessage
                      defaultMessage="Email Notifications"
                      id="1V1nJ/"
                    />
                  }
                  name="incidentEmail"
                  valuePropName="checked"
                  style={{ margin: 5 }}
                >
                  <Switch disabled={saving} />
                </Form.Item>
                <Form.Item
                  label={
                    <FormattedMessage
                      defaultMessage="Push Notifications (Mobile App)"
                      id="Tb4qgA"
                    />
                  }
                  name="incidentPush"
                  valuePropName="checked"
                  style={{ margin: 5 }}
                >
                  <Switch disabled={saving} />
                </Form.Item>
              </Col>
            </Row>

            <Title level={4}>
              <FormattedMessage
                defaultMessage="Offenders- Receive notifications for new offenders"
                id="25PQ1b"
              />
            </Title>

            <Row gutter={20} style={{ margin: 20 }}>
              <Col span={15}>
                <Form.Item
                  label={
                    <FormattedMessage
                      defaultMessage="Email Notifications"
                      id="1V1nJ/"
                    />
                  }
                  name="offenderEmail"
                  valuePropName="checked"
                  style={{ margin: 5 }}
                >
                  <Switch disabled={saving} />
                </Form.Item>
                <Form.Item
                  label={
                    <FormattedMessage
                      defaultMessage="Push Notifications (Mobile App)"
                      id="Tb4qgA"
                    />
                  }
                  name="offenderPush"
                  valuePropName="checked"
                  style={{ margin: 5 }}
                >
                  <Switch disabled={saving} />
                </Form.Item>
              </Col>
            </Row>

            <Title level={4}>
              <FormattedMessage defaultMessage="Messagess" id="ek8734" />
            </Title>

            <Row gutter={20} style={{ margin: 20 }}>
              <Col span={15}>
                <Form.Item
                  label={
                    <FormattedMessage
                      defaultMessage="Receive notifications for new messages"
                      id="k3caZl"
                    />
                  }
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
                    <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
                  </Button>
                </Col>
                <Col>
                  <Button
                    disabled={saving}
                    loading={saving}
                    type="primary"
                    htmlType="submit"
                  >
                    <FormattedMessage defaultMessage="Save" id="jvo0vs" />
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default EditProfile;
