import { SignIn } from '@clerk/clerk-react';
import React from 'react';
import { dark } from '@clerk/themes';

const SignInView = () => {
  const darkMode = localStorage.getItem('theme') === 'dark';
  const darkModeLogo = 'https://app.shopsafealert.co.uk/img/light-logo.svg';
  const lightModeLogo = 'https://app.shopsafealert.co.uk/img/dark-logo.svg';
  const logo =
    localStorage.getItem('logo') || darkMode ? darkModeLogo : lightModeLogo;
  return (
    <SignIn
      routing="path"
      path="/sign-in"
      appearance={{
        elements: {
          footerAction: { display: 'none' },
        },
        baseTheme: darkMode ? dark : undefined,
        layout: {
          logoImageUrl: logo,
        },
      }}
    />
  );
};

export default SignInView;
