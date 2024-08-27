import Loading from 'components/shared-components/AntD/Loading';
import React, { Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import Terms from './components/Terms';

/* eslint-disable */

import { Card, Col, Row } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';

/* eslint-disable */

import { Alert, Button, Divider, Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { FacebookSVG, GoogleSVG } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/AntD/CustomIcon';
import { motion } from 'framer-motion';
import { useStoreActions, useStoreState } from 'state';
import { AUTH_PREFIX_PATH } from 'configs/AppConfig';

export interface Props {
  otherSignIn?: boolean;
  showForgetPassword?: boolean;
  extra?: any;
  allowRedirect: boolean;

  // eslint-disable-next-line react/no-unused-prop-types
  onForgetPasswordClick?(): void;
}

export const LoginForm = (props: Props): JSX.Element => {
  const navigate = useNavigate();

  const { otherSignIn, showForgetPassword, extra, allowRedirect } = props;

  // const { login } = useAuth();

  const loading = useStoreState((state) => state.auth.loading);
  const message = useStoreState((state) => state.auth.message);
  const showMessage = useStoreState((state) => state.auth.showMessage);
  const token = useStoreState((state) => state.auth.token);
  const redirect = useStoreState((state) => state.auth.redirect);

  const showLoading = useStoreActions((actions) => actions.auth.showLoading);
  const hideAuthMessage = useStoreActions(
    (actions) => actions.auth.hideAuthMessage
  );

  const onLogin = () => {
    showLoading();
    // login({
    //   email,
    //   password,
    // });
  };

  const onGoogleLogin = () => {
    showLoading();
  };

  const onFacebookLogin = () => {
    showLoading();
  };

  useEffect(() => {
    if (token !== null && allowRedirect) {
      navigate(redirect);
    }
    if (showMessage) {
      setTimeout(() => {
        hideAuthMessage();
      }, 3000);
    }
  });

  const onForgotPassword = () => {
    navigate(`${AUTH_PREFIX_PATH}/forgot-password`);
  };

  const onUserTerms = () => {
    navigate(`${AUTH_PREFIX_PATH}/user-terms`);
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
        <Alert type="error" showIcon message={message} />
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
            className="font-weight-normal cursor-pointer"
            style={{
              fontSize: '12px',
              textAlign: 'center',
              marginBottom: '12px',
            }}
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

const getRedirect = () => {
  const location = window.location.origin;
  if (location.includes('localhost')) {
    return location;
  }
  // if (location.includes('staging')) {
  //   return 'https://app.shopsafealert.co.uk/';
  // }
  return location;
};

const Login = (props: Props): JSX.Element => {
  const theme = useStoreState((state) => state.theme.currentTheme);
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const backgroundStyle = {
    background:
      theme === 'dark'
        ? 'linear-gradient(to right, #cb2d3e, #ef473b)'
        : 'linear-gradient(to right, #cb2d3e, #ef473a)',
  };
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      if (localStorage.getItem('logo')?.endsWith('.webp')) {
        loginWithRedirect({
          'ext-logo': localStorage.getItem('logo'),
          appState: { returnTo: window.location.pathname },
          redirectUri: getRedirect(),
        });
      } else {
        loginWithRedirect({
          appState: { returnTo: window.location.pathname },
          redirectUri: getRedirect(),
        });
      }
    }
  }, []);
  if (isLoading) return <Loading />;
  if (!isAuthenticated) return <Loading />;
  return (
    <div className="h-100" style={backgroundStyle}>
      <div className="container d-flex flex-column justify-content-center h-100">
        <Row justify="center">
          <Col xs={20} sm={20} md={20} lg={7}>
            <Card>
              <div className="my-4">
                <div className="text-center">
                  <img
                    className="img-fluid"
                    // eslint-disable-next-line no-constant-condition
                    src={`/img/${'dark' ? 'logo.png' : 'logo-white.png'}`}
                    alt=""
                  />
                  {/* <p style={{ marginTop: 15 }} >Don't have an account yet? <a href="/auth/register-1">Sign Up</a></p> */}
                </div>
                <Row justify="center">
                  <Col xs={24} sm={24} md={20} lg={20}>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    <LoginForm {...props} />
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

export const AppViews = (): JSX.Element => (
  <Suspense fallback={<Loading cover="page" />}>
    <Routes>
      <Route element={<Navigate to="login" />} index />
      <Route element={<Login allowRedirect />} path="login" />
      <Route element={<Terms />} path="user-terms" />
    </Routes>
  </Suspense>
);

export default AppViews;
