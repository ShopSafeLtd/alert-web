import { FormattedMessage, useIntl } from 'react-intl';
import { useUser } from '@clerk/clerk-react';
import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useStoreState } from '#/state';

interface ClerkAPIError {
  message: string;
  longMessage: string;
  meta?: {
    paramName?: string;
  };
}

export const EditPasswordButton = ({ saving }: { saving?: boolean }) => {
  const intl = useIntl();

  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const { hasPassword } = useStoreState((state) => state.user);
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values: { current: string; password: string }) => {
        user
          ?.updatePassword({
            currentPassword: hasPassword ? values.current : undefined,
            newPassword: values.password,
          })
          .then(() => {
            form.resetFields();
            setConfirmLoading(false);
            setOpen(false);
          })
          .catch((error: { errors: ClerkAPIError[] }) => {
            setConfirmLoading(false);
            if (error.errors[0]?.meta?.paramName === 'current_password') {
              form.setFields([
                {
                  name: 'current',
                  errors: ['Current password is incorrect, please try again.'],
                },
              ]);
            } else {
              form.setFields([
                {
                  name: 'password',
                  errors: [error.errors[0].longMessage],
                },
              ]);
            }
          });

        form.resetFields();
      })
      .catch((error) => {
        console.log('Validate Failed:', error);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  return (
    <>
      <Modal
        title={intl.formatMessage({
          defaultMessage: 'Reset Password',
        })}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        maskClosable
      >
        <Form form={form}>
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
            <Input.Password allowClear />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 8 }}
            name="password"
            label={<FormattedMessage defaultMessage="Password" />}
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
            hasFeedback
          >
            <Input.Password allowClear />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 8 }}
            name="confirm"
            label={<FormattedMessage defaultMessage="Confirm Password" />}
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
            <Input.Password allowClear />
          </Form.Item>
        </Form>
      </Modal>
      <Button key="1234" type="primary" onClick={showModal} disabled={saving}>
        {hasPassword ? (
          <FormattedMessage defaultMessage="Change Password" />
        ) : (
          <FormattedMessage defaultMessage="Set Password" />
        )}
      </Button>
    </>
  );
};
