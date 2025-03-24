import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { useUser } from '@clerk/clerk-react';
import { Button, Form, Input, Modal } from 'antd';
import { useAtomValue } from 'jotai/index';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface ClerkAPIError {
  longMessage: string;
  message: string;
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
  const currentUser = useAtomValue(currentUserAtom);
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
            currentPassword: currentUser?.hasPassword
              ? values.current
              : undefined,
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
                  errors: ['Current password is incorrect, please try again.'],
                  name: 'current',
                },
              ]);
            } else {
              form.setFields([
                {
                  errors: [error.errors[0].longMessage],
                  name: 'password',
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
        confirmLoading={confirmLoading}
        maskClosable
        onCancel={handleCancel}
        onOk={handleOk}
        open={open}
        title={intl.formatMessage({
          defaultMessage: 'Reset Password',
        })}
      >
        <Form form={form}>
          <Form.Item
            hasFeedback
            hidden={!currentUser?.hasPassword}
            label={<FormattedMessage defaultMessage="Current Password" />}
            labelCol={{ span: 8 }}
            name="current"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please input your current password!',
                }),
                required: currentUser?.hasPassword,
              },
            ]}
          >
            <Input.Password allowClear />
          </Form.Item>
          <Form.Item
            hasFeedback
            label={<FormattedMessage defaultMessage="Password" />}
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
            <Input.Password allowClear />
          </Form.Item>

          <Form.Item
            dependencies={['password']}
            hasFeedback
            label={<FormattedMessage defaultMessage="Confirm Password" />}
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
            <Input.Password allowClear />
          </Form.Item>
        </Form>
      </Modal>
      <Button disabled={saving} key="1234" onClick={showModal} type="primary">
        {currentUser?.hasPassword ? (
          <FormattedMessage defaultMessage="Change Password" />
        ) : (
          <FormattedMessage defaultMessage="Set Password" />
        )}
      </Button>
    </>
  );
};
