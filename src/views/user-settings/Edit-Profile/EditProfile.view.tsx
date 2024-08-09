import type { CurrentUserQuery } from '#/hooks/user/queries/__generated__/current-user.generated';
import type { SelectOptions } from 'types/DataType';

import { EditPasswordButton } from '#/components/Password/OwnPasswordChange.view';
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
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type { FormData } from './useEditProfile';

const { Paragraph, Title } = Typography;

interface Props {
  data: CurrentUserQuery | undefined;
  groups: SelectOptions[] | undefined;
  loading: boolean;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  userDefaultGroups: string[] | undefined;
}
const EditProfile = ({
  data,
  groups,
  loading,
  onClose,
  onSubmit,
  saving,
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
          extra={[<EditPasswordButton key="editPassword" saving={saving} />]}
          onBack={() => window.history.back()}
          subTitle={intl.formatMessage({
            defaultMessage:
              'Amend your account details and then press the save button to update them.',
          })}
          title={intl.formatMessage({
            defaultMessage: 'Edit Account',
          })}
        />

        {loading ? (
          <Skeleton />
        ) : (
          <Form
            initialValues={{
              bulletinEmails: data?.currentUser?.bulletinEmails,
              bulletinPush: data?.currentUser?.bulletinPush,
              defaultGroups: userDefaultGroups,
              defaultScheme: data?.currentUser?.defaultScheme,
              email: data?.currentUser?.email,
              fullName: data?.currentUser?.fullName,
              incidentEmail: data?.currentUser?.incidentEmail,
              incidentPush: data?.currentUser?.incidentPush,
              messagePush: data?.currentUser?.messagePush,
              offenderEmail: data?.currentUser?.offenderEmail,
              offenderPush: data?.currentUser?.offenderPush,
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
                    label={<FormattedMessage defaultMessage="Full Name" />}
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
                <Col span={12}>
                  <Form.Item
                    label={<FormattedMessage defaultMessage="Email Address" />}
                    name="email"
                    rules={[
                      {
                        message: intl.formatMessage({
                          defaultMessage:
                            'Please enter a email address for the user.',
                        }),
                        required: true,
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
                      maxTagCount={3}
                      mode="multiple"
                      optionFilterProp="label"
                      optionLabelProp="label"
                      options={groups}
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
                      optionFilterProp="label"
                      optionLabelProp="label"
                      options={schemes}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Row align="bottom" style={{ marginBottom: 20 }}>
              <Col>
                <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                  {intl.formatMessage({
                    defaultMessage: 'Notification Options',
                  })}
                </Title>
              </Col>
              <Col>
                <Paragraph
                  italic
                  style={{ marginBottom: 1, marginLeft: 5 }}
                  type="secondary"
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
                  <Title level={4} style={{ fontSize: 16, marginBottom: 0 }}>
                    {intl.formatMessage({
                      defaultMessage: 'Incidents',
                    })}
                  </Title>
                </Col>
                <Col>
                  <Paragraph
                    italic
                    style={{ marginBottom: 1, marginLeft: 5 }}
                    type="secondary"
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
                    style={{ marginBottom: 0 }}
                    valuePropName="checked"
                  >
                    <Switch disabled={saving} style={{ marginLeft: 5 }} />
                  </Form.Item>
                  <Form.Item
                    label={
                      <FormattedMessage defaultMessage="Push Notifications (Mobile App)" />
                    }
                    name="incidentPush"
                    style={{ marginBottom: 0 }}
                    valuePropName="checked"
                  >
                    <Switch disabled={saving} style={{ marginLeft: 5 }} />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Card>
              <Row align="bottom" style={{ marginBottom: 10 }}>
                <Col>
                  <Title level={4} style={{ fontSize: 16, marginBottom: 0 }}>
                    {intl.formatMessage({
                      defaultMessage: 'Offenders',
                    })}
                  </Title>
                </Col>
                <Col>
                  <Paragraph
                    italic
                    style={{ marginBottom: 1, marginLeft: 5 }}
                    type="secondary"
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
                    style={{ marginBottom: 0 }}
                    valuePropName="checked"
                  >
                    <Switch disabled={saving} style={{ marginLeft: 5 }} />
                  </Form.Item>
                  <Form.Item
                    label={
                      <FormattedMessage defaultMessage="Push Notifications (Mobile App)" />
                    }
                    name="offenderPush"
                    style={{ marginBottom: 0 }}
                    valuePropName="checked"
                  >
                    <Switch disabled={saving} style={{ marginLeft: 5 }} />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Card>
              <Row align="bottom" style={{ marginBottom: 10 }}>
                <Col>
                  <Title level={4} style={{ fontSize: 16, marginBottom: 0 }}>
                    {intl.formatMessage({
                      defaultMessage: 'Bulletins',
                    })}
                  </Title>
                </Col>
                <Col>
                  <Paragraph
                    italic
                    style={{ marginBottom: 1, marginLeft: 5 }}
                    type="secondary"
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
                    style={{ marginBottom: 0 }}
                    valuePropName="checked"
                  >
                    <Switch disabled={saving} style={{ marginLeft: 5 }} />
                  </Form.Item>
                  <Form.Item
                    label={
                      <FormattedMessage defaultMessage="Push Notifications (Mobile App)" />
                    }
                    name="bulletinPush"
                    style={{ marginBottom: 0 }}
                    valuePropName="checked"
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
                style={{ marginBottom: 0 }}
                valuePropName="checked"
              >
                <Switch disabled={saving} style={{ marginLeft: 5 }} />
              </Form.Item>
            </Card>

            <Form.Item>
              <Row gutter={20} justify="end" style={{ marginTop: 30 }}>
                <Col>
                  <Button disabled={saving} onClick={onClose}>
                    <FormattedMessage defaultMessage="Cancel" />
                  </Button>
                </Col>
                <Col>
                  <Button
                    disabled={saving}
                    htmlType="submit"
                    loading={saving}
                    type="primary"
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
