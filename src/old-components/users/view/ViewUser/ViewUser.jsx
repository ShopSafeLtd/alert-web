import React from "react";
// import MediaQuery from "react-responsive";
// import { useQuery } from "@apollo/react-hooks";
import { useQuery } from "@apollo/client";

import { useStoreState } from "state";
import ViewUserDesktop from "../desktop/ViewUserDesktop/ViewUserDesktop";
// import ViewUserMobile from "../mobile/ViewUserMobile/ViewUserMobile";

// import UserQuery from "../../../../graphql/users/queries/User";
// import Auth0UserQuery from "../../../../graphql/users/queries/Auth0User";
import { User } from "graphql-src/users/queries";
import { Auth0User } from "graphql-src/users/queries";

const ViewUser = ({
  match: {
    params: { id },
  },
  history,
  setStatusBar,
  setTitle,
  setMultiAppBar,
  setBackLinkTo,
  setNavbarAction,
  setActions,
  toggleNotificationBar,
  currentUser,
}) => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const { data: user } = useQuery(User, {
    variables: {
      where: {
        id,
      },
      scheme: schemeId,
    },
    fetchPolicy: "cache-and-network",
  });

  const { data: auth0User } = useQuery(Auth0User, {
    variables: {
      id,
    },
  });

  return (
    // <MediaQuery minDeviceWidth={1024}>
    //   {matches =>
    //     matches ? (
    <ViewUserDesktop
      userId={id}
      user={!!user ? user.user : {}}
      auth0User={auth0User || {}}
      setStatusBar={setStatusBar}
      isCurrent={currentUser === id}
      history={history}
    />
    // ) : (
    //   <ViewUserMobile
    //     setTitle={setTitle}
    //     setMultiAppBar={setMultiAppBar}
    //     user={!!user ? user.user : {}}
    //     userLoading={userLoading}
    //     auth0User={auth0User || {}}
    //     setBackLinkTo={setBackLinkTo}
    //     setNavbarAction={setNavbarAction}
    //     setActions={setActions}
    //     toggleNotificationBar={toggleNotificationBar}
    //     isCurrent={currentUser === id}
    //     history={history}
    //   />
    // )
    //   }
    // </MediaQuery>
  );
};

export default ViewUser;
