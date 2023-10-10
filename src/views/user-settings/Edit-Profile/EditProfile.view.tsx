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
  Select,
  Skeleton,
  Switch,
  Typography,
} from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import type { SelectOptions } from 'types/DataType';
import type { FormData } from './useEditProfile';

const { Title, Paragraph } = Typography;

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  resetConfirm: () => void;
  data: CurrentUserQuery | undefined;
  loading: boolean;
  saving: boolean;
  groups: SelectOptions[] | undefined;
  userDefaultGroups: string[] | undefined;
}
const EditProfile = ({
  onSubmit,
  onClose,
  resetConfirm,
  data,
  loading,
  saving,
  groups,
  userDefaultGroups,
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
            defaultGroups: userDefaultGroups,
          }}
          onFinish={onSubmit}
        >
          <Card>
            <Title level={4} style={{ marginBottom: 20 }}>
              <FormattedMessage defaultMessage="User Details:" id="vewp8R" />
            </Title>
            <Row gutter={50}>
              <Col span={12}>
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
              <Col span={12}>
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
              <Col span={12}>
                <Form.Item
                  label={
                    <FormattedMessage
                      defaultMessage="Default Groups"
                      id="2KZp/e"
                    />
                  }
                  name="defaultGroups"
                >
                  <Select
                    disabled={saving}
                    mode="multiple"
                    maxTagCount={3}
                    options={groups}
                    optionFilterProp="label"
                    optionLabelProp="label"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Row align="bottom" style={{ marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                {intl.formatMessage({
                  defaultMessage: 'Notification Options',
                  id: 'M/DKgW',
                })}
              </Title>
            </Col>
            <Col>
              <Paragraph
                style={{ marginBottom: 1, marginLeft: 5 }}
                type="secondary"
                italic
              >
                {intl.formatMessage({
                  defaultMessage:
                    '- Choose which notifications you wish to receive and how you want to receive them.',
                  id: 'kC7OsV',
                })}
              </Paragraph>
            </Col>
          </Row>
          <Card>
            <Row align="bottom" style={{ marginBottom: 10 }}>
              <Col>
                <Title style={{ marginBottom: 0, fontSize: 16 }} level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'Incidents',
                    id: 'mtr3R4',
                  })}
                </Title>
              </Col>
              <Col>
                <Paragraph
                  style={{ marginBottom: 1, marginLeft: 5 }}
                  type="secondary"
                  italic
                >
                  {intl.formatMessage({
                    defaultMessage:
                      '- Receive notifications for new incidents.',
                    id: 'uj1HWM',
                  })}
                </Paragraph>
              </Col>
            </Row>

            <Row>
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
                  style={{ marginBottom: 0 }}
                >
                  <Switch disabled={saving} style={{ marginLeft: 5 }} />
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
                  style={{ marginBottom: 0 }}
                >
                  <Switch disabled={saving} style={{ marginLeft: 5 }} />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card>
            <Row align="bottom" style={{ marginBottom: 10 }}>
              <Col>
                <Title style={{ marginBottom: 0, fontSize: 16 }} level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'Offenders',
                    id: 'xb54TN',
                  })}
                </Title>
              </Col>
              <Col>
                <Paragraph
                  style={{ marginBottom: 1, marginLeft: 5 }}
                  type="secondary"
                  italic
                >
                  {intl.formatMessage({
                    defaultMessage:
                      '- Receive notifications for new offenders.',
                    id: 'hIVpY0',
                  })}
                </Paragraph>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Item
                  label={
                    <FormattedMessage
                      defaultMessage="Email Notifications"
                      id="1V1nJ/"
                    />
                  }
                  name="offenderEmail"
                  valuePropName="checked"
                  style={{ marginBottom: 0 }}
                >
                  <Switch disabled={saving} style={{ marginLeft: 5 }} />
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
                  style={{ marginBottom: 0 }}
                >
                  <Switch disabled={saving} style={{ marginLeft: 5 }} />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card>
            <Title level={4}>
              <FormattedMessage defaultMessage="Messagess" id="ek8734" />
            </Title>

            <Form.Item
              label={
                <FormattedMessage
                  defaultMessage="Receive notifications for new messages"
                  id="k3caZl"
                />
              }
              name="messagePush"
              valuePropName="checked"
              style={{ marginBottom: 0 }}
            >
              <Switch disabled={saving} style={{ marginLeft: 5 }} />
            </Form.Item>
          </Card>

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
    </div>
  );
};

export default EditProfile;
