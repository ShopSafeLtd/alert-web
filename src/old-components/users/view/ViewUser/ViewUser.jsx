import React from 'react';
import MediaQuery from 'react-responsive';
import { useQuery } from '@apollo/react-hooks';

import ViewUserDesktop from '../desktop/ViewUserDesktop/ViewUserDesktop';
import ViewUserMobile from '../mobile/ViewUserMobile/ViewUserMobile';

import UserQuery from '../../../../graphql/users/queries/User';
import Auth0UserQuery from '../../../../graphql/users/queries/Auth0User';

const ViewUser = ({
  match: {
    params: { id }
  },
  history,
  setStatusBar,
  setTitle,
  setMultiAppBar,
  setBackLinkTo,
  setNavbarAction,
  setActions,
  toggleNotificationBar,
  currentUser
}) => {
  // queries
  const { data: user, loading: userLoading } = useQuery(UserQuery, {
    variables: {
      id,
      schemeId: window.localStorage.getItem('currentScheme')
    },
    fetchPolicy: 'cache-and-network'
  });
  const { data: auth0User } = useQuery(Auth0UserQuery, {
    variables: {
      id
    },
    fetchPolicy: 'cache-and-network'
  });
  return (
    <MediaQuery minDeviceWidth={1024}>
      {matches =>
        matches ? (
          <ViewUserDesktop
            userId={id}
            user={!!user ? user.user : {}}
            auth0User={auth0User || {}}
            setStatusBar={setStatusBar}
            isCurrent={currentUser === id}
            history={history}
          />
        ) : (
          <ViewUserMobile
            setTitle={setTitle}
            setMultiAppBar={setMultiAppBar}
            user={!!user ? user.user : {}}
            userLoading={userLoading}
            auth0User={auth0User || {}}
            setBackLinkTo={setBackLinkTo}
            setNavbarAction={setNavbarAction}
            setActions={setActions}
            toggleNotificationBar={toggleNotificationBar}
            isCurrent={currentUser === id}
            history={history}
          />
        )
      }
    </MediaQuery>
  );
};

export default ViewUser;
