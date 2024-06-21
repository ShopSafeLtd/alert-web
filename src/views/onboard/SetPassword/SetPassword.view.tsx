import React from 'react';
import type { FormInstance } from 'antd';
import { Button, Card, Col, Form, Input, Row, Typography } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import Logo from '#/components/layout-components/AntD/navigation/Logo';

const { Title, Text } = Typography;

interface FormData {
  password: string;
}

interface Props {
  onSubmit: () => void;
  saving: boolean;
  hasPassword: boolean;
  form: FormInstance<FormData>;
}
const SetPassword = ({
  onSubmit,
  saving,
  hasPassword,
  form,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <Row gutter={10} style={{ margin: 8 }}>
        <Col>
          <Logo logoType="default" />
        </Col>
        <Col style={{ alignSelf: 'flex-end' }}>
          <Title style={{ marginTop: 5 }}>
            {intl.formatMessage({
              defaultMessage: 'Welcome to Alert!',
            })}
          </Title>
        </Col>
      </Row>

      <Card>
        <Title level={3}>
          {intl.formatMessage({
            defaultMessage: 'Set Password',
          })}
        </Title>
        <Text>
          {intl.formatMessage({
            defaultMessage:
              'Please set your password, you will use this to log into Alert in the future. It must contain upper and lower case letters, a number, and be at least 8 characters long.',
          })}
        </Text>
        <Form onFinish={onSubmit} style={{ marginTop: 30 }} form={form}>
          <Row>
            <Col span={8}>
              <Form.Item
                labelCol={{ span: 8 }}
                name="current"
                hidden={!hasPassword}
                label={<FormattedMessage defaultMessage="Current Password" />}
                rules={[
                  {
                    required: hasPassword,
                    message: intl.formatMessage({
                      defaultMessage: 'Please input your current password!',
                    }),
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  size="large"
                  allowClear
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Current Password',
                  })}
                />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 8 }}
                name="password"
                label={intl.formatMessage({
                  defaultMessage: 'New Password',
                })}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      defaultMessage: 'Please input a new password!',
                    }),
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value: string) {
                      // check against current password
                      if (value === getFieldValue('current')) {
                        return Promise.reject(
                          new Error(
                            intl.formatMessage({
                              defaultMessage:
                                'The new password must be different from the current password!',
                            })
                          )
                        );
                      }
                      if (value.length < 8) {
                        return Promise.reject(
                          new Error(
                            intl.formatMessage({
                              defaultMessage:
                                'Password must be at least 8 characters!',
                            })
                          )
                        );
                      }

                      if (
                        !/[A-Z]/.test(value) ||
                        !/[a-z]/.test(value) ||
                        !/\d/.test(value)
                      ) {
                        return Promise.reject(
                          new Error(
                            intl.formatMessage({
                              defaultMessage:
                                'Password must contain at least one uppercase letter, one lowercase letter, and one number!',
                            })
                          )
                        );
                      }

                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          intl.formatMessage({
                            defaultMessage:
                              'The two passwords that you entered do not match!',
                          })
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Input Password',
                  })}
                  disabled={saving}
                  allowClear
                />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 8 }}
                name="confirm"
                label={intl.formatMessage({
                  defaultMessage: 'Confirm Password',
                })}
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      defaultMessage: 'Please confirm your password!',
                    }),
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          intl.formatMessage({
                            defaultMessage:
                              'The two passwords that you entered do not match!',
                          })
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  allowClear
                  disabled={saving}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Confirm Password',
                  })}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Row style={{ marginTop: 30 }} gutter={20} justify="end">
              <Col>
                <Button
                  disabled={saving}
                  loading={saving}
                  type="primary"
                  htmlType="submit"
                >
                  {intl.formatMessage({
                    defaultMessage: 'Set Password',
                  })}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SetPassword;
