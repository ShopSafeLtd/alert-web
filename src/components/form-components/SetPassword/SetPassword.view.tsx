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
            })}
            hasFeedback
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please set a password for the account.',
                }),
              },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\dA-Za-z]{8,}$/,
                message: intl.formatMessage({
                  defaultMessage:
                    'Password must contain upper and lower case letters, a number, and be at least 8 characters long.',
                }),
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder={intl.formatMessage({
                defaultMessage: 'Input Password',
              })}
              disabled={saving}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
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
              disabled={saving}
              placeholder={intl.formatMessage({
                defaultMessage: 'Confirm Password',
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
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default SetPassword;
