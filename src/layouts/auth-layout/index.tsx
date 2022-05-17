import React from "react";
import AuthViews from "navigation/auth-views";
import { useStoreState } from "state";
import { ScreenSizeUnsupported } from "components/layout-components";
import { Navigate } from "react-router-dom";

export const AuthLayout = () => {
  const loggedIn = useStoreState((state) => state.auth.loggedIn);
  return loggedIn ? (
    <Navigate to="/app" />
  ) : (
    <ScreenSizeUnsupported>
      <div className="auth-container">
        <AuthViews />
      </div>
    </ScreenSizeUnsupported>
  );
};

export default AuthLayout;
