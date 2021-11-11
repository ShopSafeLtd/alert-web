import React, { useEffect } from 'react';
import { Button, Form, Input, Divider, Alert } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { GoogleSVG, FacebookSVG } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStoreState, useStoreActions } from 'state';
import { useAuth } from 'hooks';
import { AUTH_PREFIX_PATH } from 'configs/AppConfig';

export interface Props {
  otherSignIn?: boolean;
  showForgetPassword?: boolean;
  onForgetPasswordClick?(): void;
  extra?: any;
  allowRedirect: boolean;
}

export const LoginForm = (props: Props) => {
  let history = useHistory();

  const { otherSignIn, showForgetPassword, extra, allowRedirect } = props;

  const { login } = useAuth();

  const loading = useStoreState((state) => state.auth.loading);
  const message = useStoreState((state) => state.auth.message);
  const showMessage = useStoreState((state) => state.auth.showMessage);
  const token = useStoreState((state) => state.auth.token);
  const redirect = useStoreState((state) => state.auth.redirect);

  const showLoading = useStoreActions((actions) => actions.auth.showLoading);
  const hideAuthMessage = useStoreActions(
    (actions) => actions.auth.hideAuthMessage
  );

  interface onLoginArgs {
    email: string;
    password: string;
  }

  const onLogin = ({ email, password }: onLoginArgs) => {
    showLoading();
    login({
      email,
      password,
    });
  };

  const onGoogleLogin = () => {
    showLoading();
  };

  const onFacebookLogin = () => {
    showLoading();
  };

  useEffect(() => {
    if (token !== null && allowRedirect) {
      history.push(redirect);
    }
    if (showMessage) {
      setTimeout(() => {
        hideAuthMessage();
      }, 3000);
    }
  });

  const onForgotPassword = () => {
    history.push(`${AUTH_PREFIX_PATH}/forgot-password`);
  };

  const onUserTerms = () => {
    history.push(`${AUTH_PREFIX_PATH}/user-terms`);
  };

  const renderOtherSignIn = (
    <div>
      <Divider>
        <span className="text-muted font-size-base font-weight-normal">
          or connect with
        </span>
      </Divider>
      <div className="d-flex justify-content-center">
        <Button
          onClick={() => onGoogleLogin()}
          className="mr-2"
          disabled={loading}
          icon={<CustomIcon svg={GoogleSVG} />}
        >
          Google
        </Button>
        <Button
          onClick={() => onFacebookLogin()}
          icon={<CustomIcon svg={FacebookSVG} />}
          disabled={loading}
        >
          Facebook
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: showMessage ? 1 : 0,
          marginBottom: showMessage ? 20 : 0,
        }}
      >
        <Alert type="error" showIcon message={message}></Alert>
      </motion.div>
      <Form layout="vertical" name="login-form" onFinish={onLogin}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Please input your email',
            },
            {
              type: 'email',
              message: 'Please enter a validate email!',
            },
          ]}
        >
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="password"
          label={
            <div
              className={`${
                showForgetPassword
                  ? 'd-flex justify-content-between w-100 align-items-center'
                  : ''
              }`}
            >
              <span>Password</span>
              {/* {showForgetPassword && (
                <span
                  onClick={() => onForgetPasswordClick}
                  className="cursor-pointer font-size-sm font-weight-normal text-muted"
                >
                  Forget Password?
                </span>
              )} */}
            </div>
          }
          rules={[
            {
              required: true,
              message: 'Please input your password',
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Sign In
          </Button>
        </Form.Item>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '12px',
          }}
        >
          <span
            onClick={onUserTerms}
            className="font-size-base font-weight-normal cursor-pointer"
          >
            By accessing Alert! you have entered into an Agreement to accept our
            Terms of Use and to specifically comply to the UK General Data
            Protection Regulations.
          </span>
        </div>
        <Divider>
          <span
            onClick={onForgotPassword}
            className="text-muted font-size-base font-weight-normal cursor-pointer"
          >
            Forgotten password?
          </span>
        </Divider>
        {otherSignIn ? renderOtherSignIn : null}
        {extra}
      </Form>
    </>
  );
};

export default LoginForm;
