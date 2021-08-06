import React from 'react'
import { Switch, Route } from 'react-router'
import Feed from 'old-components/incidents/feed/AlertFeedQuery/AlertFeedQuery'
import Add from 'old-components/incidents/add/AddIncident/AddIncident'
import Edit from 'old-components/incidents/edit/EditIncident/EditIncident'
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const Incidents = () => {
  console.log('runs')
  return <Switch>
    <Route path={`${APP_PREFIX_PATH}/incidents`} exact component={Feed} />
    <Route path={`${APP_PREFIX_PATH}/incidents/add`} component={Add} />
    <Route path={`${APP_PREFIX_PATH}/incidents/edit/:id`} component={Edit} />
  </Switch>
}

export default Incidents