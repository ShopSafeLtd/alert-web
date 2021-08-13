import React from "react";
import { Switch, Route } from "react-router";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import Feed from "old-components/offenders/feed/OffenderFeedQuery/OffenderFeedQuery";
import Add from "../../../old-components/offenders/add/AddOffender/AddOffender";
import Edit from "../../../old-components/offenders/edit/EditOffender/EditOffender";

const Offenders = () => {
  return (
    <Switch>
      <Route path={`${APP_PREFIX_PATH}/offenders`} exact component={Feed} />
      <Route path={`${APP_PREFIX_PATH}/offenders/add`} component={Add} />
      <Route path={`${APP_PREFIX_PATH}/offenders/edit/:id`} component={Edit} />
    </Switch>
  );
};

export default Offenders;
