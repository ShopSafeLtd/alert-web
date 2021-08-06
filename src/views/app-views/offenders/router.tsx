import React from 'react'
import { Switch, Route } from 'react-router'
import { APP_PREFIX_PATH } from 'configs/AppConfig'
import Feed from 'old-components/offenders/feed/OffenderFeedQuery/OffenderFeedQuery'

const Offenders = () => {
  return <Switch>
    <Route path={`${APP_PREFIX_PATH}/offenders`} exact component={Feed} />
    
  </Switch>
}

export default Offenders