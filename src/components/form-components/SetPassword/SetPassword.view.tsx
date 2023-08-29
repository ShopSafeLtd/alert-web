import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { useIntl } from 'react-intl';

interface FormData {
  password: string;
}

interface Props {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  onClose: () => void;
}
const SetPassword = ({ onSubmit, saving, onClose }: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <Form onFinish={onSubmit} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      <Row>
        <Col span={24}>
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
            <Input.Password
              size="large"
              disabled={saving}
              placeholder={intl.formatMessage({
                defaultMessage: 'Confirm Password',
                id: 'vfG+nh',
              })}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Row style={{ marginTop: 30 }} gutter={20} justify="end">
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({
                defaultMessage: 'Cancel',
                id: '47FYwb',
              })}
            </Button>
          </Col>
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
  );
};

export default SetPassword;
