import React from 'react';
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
import { EditPasswordButton } from '#/components/Password/OwnPasswordChange.view';
import type { CurrentUserQuery } from '#/hooks/user/queries/current-user.generated';

const { Title, Paragraph } = Typography;

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  data: CurrentUserQuery | undefined;
  loading: boolean;
  saving: boolean;
  groups: SelectOptions[] | undefined;
  userDefaultGroups: string[] | undefined;
}
const EditProfile = ({
  onSubmit,
  onClose,
  data,
  loading,
  saving,
  groups,
  userDefaultGroups,
}: Props): JSX.Element => {
  const intl = useIntl();

  const schemes = data?.currentUser?.schemes.map(({ scheme }) => ({
    label: scheme.name,
    value: scheme.id,
  }));

  return (
    <div className="list-view">
      <>
        <PageHeader
          onBack={() => window.history.back()}
          title={intl.formatMessage({
            defaultMessage: 'Edit Account',
          })}
          subTitle={intl.formatMessage({
            defaultMessage:
              'Amend your account details and then press the save button to update them.',
          })}
          extra={[<EditPasswordButton key="editPassword" saving={saving} />]}
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
              bulletinEmails: data?.currentUser?.bulletinEmails,
              bulletinPush: data?.currentUser?.bulletinPush,
              messagePush: data?.currentUser?.messagePush,
              defaultGroups: userDefaultGroups,
              defaultScheme: data?.currentUser?.defaultScheme,
            }}
            onFinish={onSubmit}
          >
            <Card>
              <Title level={4} style={{ marginBottom: 20 }}>
                <FormattedMessage defaultMessage="User Details:" />
              </Title>
              <Row gutter={50}>
                <Col span={12}>
                  <Form.Item
                    name="fullName"
                    label={<FormattedMessage defaultMessage="Full Name" />}
                    rules={[
                      {
                        required: true,
                        message: intl.formatMessage({
                          defaultMessage: 'Please enter a name for the user.',
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
                    label={<FormattedMessage defaultMessage="Email Address" />}
                    rules={[
                      {
                        required: true,
                        message: intl.formatMessage({
                          defaultMessage:
                            'Please enter a email address for the user.',
                        }),
                      },
                    ]}
                  >
                    <Input disabled={saving} type="email" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={<FormattedMessage defaultMessage="Default Groups" />}
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
                <Col span={12}>
                  <Form.Item
                    label={<FormattedMessage defaultMessage="Default Scheme" />}
                    name="defaultScheme"
                  >
                    <Select
                      disabled={saving}
                      options={schemes}
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
                    })}
                  </Paragraph>
                </Col>
              </Row>

              <Row>
                <Col span={15}>
                  <Form.Item
                    label={
                      <FormattedMessage defaultMessage="Email Notifications" />
                    }
                    name="incidentEmail"
                    valuePropName="checked"
                    style={{ marginBottom: 0 }}
                  >
                    <Switch disabled={saving} style={{ marginLeft: 5 }} />
                  </Form.Item>
                  <Form.Item
                    label={
                      <FormattedMessage defaultMessage="Push Notifications (Mobile App)" />
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
                    })}
                  </Paragraph>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Item
                    label={
                      <FormattedMessage defaultMessage="Email Notifications" />
                    }
                    name="offenderEmail"
                    valuePropName="checked"
                    style={{ marginBottom: 0 }}
                  >
                    <Switch disabled={saving} style={{ marginLeft: 5 }} />
                  </Form.Item>
                  <Form.Item
                    label={
                      <FormattedMessage defaultMessage="Push Notifications (Mobile App)" />
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
              <Row align="bottom" style={{ marginBottom: 10 }}>
                <Col>
                  <Title style={{ marginBottom: 0, fontSize: 16 }} level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Bulletins',
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
                        '- Receive notifications for new bulletins.',
                    })}
                  </Paragraph>
                </Col>
              </Row>

              <Row>
                <Col span={15}>
                  <Form.Item
                    label={
                      <FormattedMessage defaultMessage="Email Notifications" />
                    }
                    name="bulletinEmails"
                    valuePropName="checked"
                    style={{ marginBottom: 0 }}
                  >
                    <Switch disabled={saving} style={{ marginLeft: 5 }} />
                  </Form.Item>
                  <Form.Item
                    label={
                      <FormattedMessage defaultMessage="Push Notifications (Mobile App)" />
                    }
                    name="bulletinPush"
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
                <FormattedMessage defaultMessage="Messagess" />
              </Title>

              <Form.Item
                label={
                  <FormattedMessage defaultMessage="Receive notifications for new messages" />
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
                    <FormattedMessage defaultMessage="Cancel" />
                  </Button>
                </Col>
                <Col>
                  <Button
                    disabled={saving}
                    loading={saving}
                    type="primary"
                    htmlType="submit"
                  >
                    <FormattedMessage defaultMessage="Save" />
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        )}
      </>
    </div>
  );
};

export default EditProfile;
