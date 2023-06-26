import React from 'react';
import { Button, Card, Col, Form, Image, Input, Row, Typography } from 'antd';
import { useIntl } from 'react-intl';
import logo from '../../../images/icon-512.png';

const { Title, Text } = Typography;

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
          <Image width={50} src={logo} alt="ShopSafe Icon" />
        </Col>
        <Col>
          <Title style={{ marginTop: 5 }}>
            {intl.formatMessage({
              defaultMessage: 'Welcome to Alert!',
              id: 'tFNjGE',
            })}
          </Title>
        </Col>
      </Row>

      <Card style={{ minHeight: '100vh' }}>
        <Title level={3}>
          {intl.formatMessage({
            defaultMessage: 'Set Password',
            id: '9YK+Sa',
          })}
        </Title>
        <Text>
          {intl.formatMessage({
            defaultMessage:
              'Please set your password, you will use this to log into Alert in the future. It must contain upper and lower case letters, a number, and be at least 8 characters long.',
            id: 'bQvSz+',
          })}
        </Text>
        <Form onFinish={onSubmit} style={{ marginTop: 30 }}>
          <Row>
            <Col span={9}>
              <Form.Item
                name="password"
                label={intl.formatMessage({
                  defaultMessage: 'New Password',
                  id: 'Ev6SEF',
                })}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      defaultMessage: 'Please set a password for the account.',
                      id: '87+qJ4',
                    }),
                  },
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\dA-Za-z]{8,}$/,
                    message: intl.formatMessage({
                      defaultMessage:
                        'Password must contain upper and lower case letters, a number, and be at least 8 characters long.',
                      id: 'v0ZJr7',
                    }),
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Input Password',
                    id: 'nB3dy0',
                  })}
                  disabled={saving}
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label={intl.formatMessage({
                  defaultMessage: 'Confirm Password',
                  id: 'vfG+nh',
                })}
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      defaultMessage: 'Please confirm your password!',
                      id: 'CuXG65',
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
                            id: 'ou6i2r',
                          })
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password size="large" disabled={saving} />
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
                    id: '9YK+Sa',
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
