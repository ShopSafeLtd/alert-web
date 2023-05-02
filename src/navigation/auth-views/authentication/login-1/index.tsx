import React, { useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import { useStoreState } from 'state';
import { useAuth0 } from '@auth0/auth0-react';
import type { Props } from '../../components/LoginForm';
import { LoginForm } from '../../components/LoginForm';
import Loading from '../../../../components/loading';

const getRedirect = () => {
  const location = window.location.origin;
  if (location.includes('localhost')) {
    return location;
  }
  if (location.includes('staging')) {
    return 'https://app.shopsafealert.co.uk/';
  }
  return location;
};

const LoginOne = (props: Props): JSX.Element => {
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
          redirectUri: getRedirect(),
        });
      } else {
        loginWithRedirect({
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

export default LoginOne;
