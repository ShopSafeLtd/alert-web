import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface FormData {
  password: string;
}

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}
const SetPassword = ({ onClose, onSubmit, saving }: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <Form labelCol={{ span: 8 }} onFinish={onSubmit} wrapperCol={{ span: 16 }}>
      <Row>
        <Col span={24}>
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
            <Input.Password
              disabled={saving}
              placeholder={intl.formatMessage({
                defaultMessage: 'Confirm Password',
              })}
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Row gutter={20} justify="end" style={{ marginTop: 30 }}>
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
  );
};

export default SetPassword;
