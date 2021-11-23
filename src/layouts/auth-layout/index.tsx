import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthViews from 'views/auth-views';
import { ScreenSizeUnsupported } from 'components/layout-components';

export const AuthLayout = () => {
  return (
    <ScreenSizeUnsupported>
      <div className="auth-container">
        <Switch>
          <Route path="" component={AuthViews} />
        </Switch>
      </div>
    </ScreenSizeUnsupported>
  );
};

export default AuthLayout;
