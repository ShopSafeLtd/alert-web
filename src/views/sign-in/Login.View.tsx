import { SignIn } from '@clerk/clerk-react';
import React from 'react';
import { dark } from '@clerk/themes';
import useStyles from '#/views/sign-in/Loading.styles';
import { useSearchParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import RouteWrapper from '#/navigation/utils/route-wrapper';

const LoginView = () => {
  const darkMode = localStorage.getItem('theme') === 'dark';
  const darkModeLogo = `${window.location.origin}/img/light-logo.svg`;
  const lightModeLogo = `${window.location.origin}/img/dark-logo.svg`;
  const lightModeCustomLogo = localStorage.getItem('logo');
  const darkModeCustomLogo = localStorage.getItem('logo-dark');

  const logo = darkMode
    ? darkModeCustomLogo || darkModeLogo
    : lightModeCustomLogo || lightModeLogo;

  const classes = useStyles();
  const [searchParams] = useSearchParams();

  const route = searchParams.get('rd');
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Sign-In',
      })}
    >
      <div className={classes.cover}>
        <div className={classes.position}>
          <SignIn
            routing="hash"
            appearance={{
              elements: {
                footerAction: { display: 'none' },
                logoBox: { height: '100px' },
                rootBox: {
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                },
                logoImage: {
                  height: '100%',
                  width: '100%',
                },
                formButtonPrimary: {
                  boxShadow: 'none !important',
                  fontSize: 14,
                  color: 'rgb(255, 255, 255)',
                  borderColor: 'rgb(222, 68, 54)',
                  background: 'rgb(222, 68, 54)',
                  backgroundColor: 'rgb(222, 68, 54)',
                  textTransform: 'none',
                  '&:hover, &:focus, &:active': {
                    color: 'rgb(255, 255, 255)',
                    borderColor: 'rgb(184, 42, 35)',
                    background: 'rgb(184, 42, 35)',
                    backgroundColor: 'rgb(184, 42, 35)',
                  },
                },
              },

              baseTheme: darkMode ? dark : undefined,
              layout: {
                logoImageUrl: logo,
                termsPageUrl: '/terms',
              },
            }}
            fallbackRedirectUrl={route}
          />
        </div>
      </div>
    </RouteWrapper>
  );
};

export default LoginView;
