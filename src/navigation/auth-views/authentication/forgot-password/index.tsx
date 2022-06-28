/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Card, Row, Col, Form, Input, Button, message, Divider } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { AUTH_PREFIX_PATH } from 'configs/AppConfig';
import { useMutation } from '@apollo/client';
import {
  ResetPassword,
  ResetPasswordArgs,
  ResetPasswordRes,
} from 'graphql-src/users/mutations';
import { useStoreState } from 'state';

const ForgotPassword = (): JSX.Element => {
  const theme = useStoreState((state) => state.theme.currentTheme);
  const backgroundStyle = {
    background:
      theme === 'dark'
        ? 'linear-gradient(to right, #cb2d3e, #ef473a)'
        : 'linear-gradient(to right, #cb2d3e, #ef473a)',
    // backgroundImage: "url(/img/others/img-17.jpg)",
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "cover",
  };

  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [resetPassword] = useMutation<ResetPasswordRes, ResetPasswordArgs>(
    ResetPassword
  );

  const onSend = ({ email }: { email: string }) => {
    setLoading(true);
    resetPassword({
      variables: {
        email,
      },
    });
    setTimeout(() => {
      setLoading(false);
      message.success('New password has been sent to your email!');
    }, 1500);
  };

  const onBack = () => {
    navigate(`${AUTH_PREFIX_PATH}/login`);
  };

  return (
    <div className="h-100" style={backgroundStyle}>
      <div className="container d-flex flex-column justify-content-center h-100">
        <Row justify="center">
          <Col xs={20} sm={20} md={20} lg={9}>
            <Card>
              <div className="my-2">
                <div className="text-center">
                  <img className="img-fluid" src="/img/logo.png" alt="" />
                  <h3 className="mt-3 font-weight-bold">Forgot Password?</h3>
                  <p className="mb-4">Enter your Email to reset password</p>
                </div>
                <Row justify="center">
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <Form
                      form={form}
                      layout="vertical"
                      name="forget-password"
                      onFinish={onSend}
                    >
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your email address',
                          },
                          {
                            type: 'email',
                            message: 'Please enter a validate email!',
                          },
                        ]}
                      >
                        <Input
                          placeholder="Email Address"
                          prefix={<MailOutlined className="text-primary" />}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          loading={loading}
                          type="primary"
                          htmlType="submit"
                          block
                        >
                          {loading ? 'Sending' : 'Send'}
                        </Button>
                      </Form.Item>
                    </Form>
                    <Divider>
                      <span
                        onClick={onBack}
                        className="text-muted font-size-base font-weight-normal cursor-pointer"
                      >
                        Back to login
                      </span>
                    </Divider>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ForgotPassword;
