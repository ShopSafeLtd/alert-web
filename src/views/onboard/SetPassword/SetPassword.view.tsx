import { Button, Card, Col, Form, Image, Input, Row, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import logo from '../../../images/icon-512.png';

const { Text, Title } = Typography;

interface FormData {
  password: string;
}

interface Props {
  onSubmit: (value: FormData) => void;
  saving: boolean;
}
const SetPassword = ({ onSubmit, saving }: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <Row gutter={10} style={{ margin: 8 }}>
        <Col>
          <Image alt="ShopSafe Icon" src={logo} width={50} />
        </Col>
        <Col>
          <Title style={{ marginTop: 5 }}>
            {intl.formatMessage({
              defaultMessage: 'Welcome to Alert!',
            })}
          </Title>
        </Col>
      </Row>

      <Card style={{ minHeight: '100vh' }}>
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
        <Form onFinish={onSubmit} style={{ marginTop: 30 }}>
          <Row>
            <Col span={9}>
              <Form.Item
                hasFeedback
                label={intl.formatMessage({
                  defaultMessage: 'New Password',
                })}
                name="password"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please set a password for the account.',
                    }),
                    required: true,
                  },
                  {
                    message: intl.formatMessage({
                      defaultMessage:
                        'Password must contain upper and lower case letters, a number, and be at least 8 characters long.',
                    }),
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\dA-Za-z]{8,}$/,
                  },
                ]}
              >
                <Input.Password
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
                name="confirmPassword"
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
                <Input.Password disabled={saving} size="large" />
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
