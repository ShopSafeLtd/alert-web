import React from "react";
import { Switch, Route } from "react-router";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import { default as Onboarding } from "old-components/users/onboard/Secondary/SecondaryOnboarding";

const SecondaryOnboarding = () => {
  return (
    <Switch>
      <Route path={`${APP_PREFIX_PATH}/onboarding`} component={Onboarding} />
    </Switch>
  );
};

export default SecondaryOnboarding;
