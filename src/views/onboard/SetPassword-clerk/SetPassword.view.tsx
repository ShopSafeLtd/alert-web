import type { FormInstance } from 'antd';

import Logo from '#/components/layout-components/AntD/navigation/Logo';
import { Button, Card, Col, Form, Input, Row, Typography } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const { Text, Title } = Typography;

interface FormData {
  password: string;
}

interface Props {
  form: FormInstance<FormData>;
  hasPassword: boolean;
  onSubmit: () => void;
  saving: boolean;
}
const SetPassword = ({
  form,
  hasPassword,
  onSubmit,
  saving,
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
        <Form form={form} onFinish={onSubmit} style={{ marginTop: 30 }}>
          <Row>
            <Col span={8}>
              <Form.Item
                hasFeedback
                hidden={!hasPassword}
                label={<FormattedMessage defaultMessage="Current Password" />}
                labelCol={{ span: 8 }}
                name="current"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please input your current password!',
                    }),
                    required: hasPassword,
                  },
                ]}
              >
                <Input.Password
                  allowClear
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Current Password',
                  })}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                hasFeedback
                label={intl.formatMessage({
                  defaultMessage: 'New Password',
                })}
                labelCol={{ span: 8 }}
                name="password"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please input a new password!',
                    }),
                    required: true,
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
                  allowClear
                  disabled={saving}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Input Password',
                  })}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                dependencies={['password']}
                hasFeedback
                label={intl.formatMessage({
                  defaultMessage: 'Confirm Password',
                })}
                labelCol={{ span: 8 }}
                name="confirm"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please confirm your password!',
                    }),
                    required: true,
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
                  allowClear
                  disabled={saving}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Confirm Password',
                  })}
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Row gutter={20} justify="end" style={{ marginTop: 30 }}>
              <Col>
                <Button
                  disabled={saving}
                  htmlType="submit"
                  loading={saving}
                  type="primary"
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
