import RouteWrapper from '#/navigation/utils/route-wrapper';
import useStyles from '#/views/sign-in/Loading.styles';
import { SignIn } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import React from 'react';
import { useIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';

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

  const jdshield = 'https://app.jdshield.com/app/dashboard';
  const rdOverwrite =
    !window.location.host.includes('jdshield') &&
    route?.includes('jdshield.com')
      ? jdshield
      : route;

  if (window.location.host.includes('jdshield')) {
    window.location.replace(
      `https://app.shopsafe.io/sign-in?rd=${encodeURIComponent(jdshield)}`
    );
  }

  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Sign-In',
      })}
    >
      <div className={classes.cover}>
        <div className={classes.position}>
          <SignIn
            appearance={{
              baseTheme: darkMode ? dark : undefined,

              elements: {
                footerAction: { display: 'none' },
                formButtonPrimary: {
                  '&:hover, &:focus, &:active': {
                    background: 'rgb(184, 42, 35)',
                    backgroundColor: 'rgb(184, 42, 35)',
                    borderColor: 'rgb(184, 42, 35)',
                    color: 'rgb(255, 255, 255)',
                  },
                  background: 'rgb(222, 68, 54)',
                  backgroundColor: 'rgb(222, 68, 54)',
                  borderColor: 'rgb(222, 68, 54)',
                  boxShadow: 'none !important',
                  color: 'rgb(255, 255, 255)',
                  fontSize: 14,
                  textTransform: 'none',
                },
                logoBox: { height: '100px' },
                logoImage: {
                  height: '100%',
                  width: '100%',
                },
                rootBox: {
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                },
              },
              layout: {
                logoImageUrl: logo,
                termsPageUrl: '/terms',
              },
            }}
            fallbackRedirectUrl={rdOverwrite}
            routing="hash"
          />
        </div>
      </div>
    </RouteWrapper>
  );
};

export default LoginView;
