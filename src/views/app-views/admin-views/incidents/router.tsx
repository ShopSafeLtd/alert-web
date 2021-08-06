import React from 'react'
import { Switch, Route } from 'react-router'
import Feed from 'old-components/incidents/feed/AlertFeedQuery/AlertFeedQuery'
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const Incidents = () => {
  console.log('runs')
  return <Switch>
    <Route path={`${APP_PREFIX_PATH}/incidents`} exact component={Feed} />
  </Switch>
}

export default Incidents