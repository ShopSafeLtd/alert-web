import { SignedIn, SignedOut, SignIn, SignOutButton } from '@clerk/clerk-react';
import React from 'react';
import { dark } from '@clerk/themes';

const SignInView = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const redirectUrl = queryParams.get('redirectUrl');
  const darkMode = localStorage.getItem('theme') === 'dark';
  const darkModeLogo = `${window.location.origin}/img/light-logo.svg`;
  const lightModeLogo = `${window.location.origin}/img/dark-logo.svg`;
  const logo =
    localStorage.getItem('logo') ||
    (window.location.origin
      ? darkMode
        ? darkModeLogo
        : lightModeLogo
      : undefined);

  console.log(window.location.origin);
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      <SignedOut>
        <SignIn
          routing="path"
          path="/sign-in"
          fallbackRedirectUrl={redirectUrl || '/app/dashboard'}
          appearance={{
            elements: {
              footerAction: { display: 'none' },
              logoBox: { height: '100px' },
              rootBox: {
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              },
            },
            baseTheme: darkMode ? dark : undefined,
            layout: {
              logoImageUrl: logo,
            },
          }}
        />
      </SignedOut>
      <SignedIn>
        <SignOutButton redirectUrl={'/sign-in'} />
      </SignedIn>
    </div>
  );
};

export default SignInView;
