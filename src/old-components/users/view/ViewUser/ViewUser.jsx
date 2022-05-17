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
import { useParams } from "react-router-dom";

const ViewUser = () => {
  const params = useParams()
  const schemeId = useStoreState((state) => state.scheme.id);
  const { data: user } = useQuery(User, {
    variables: {
      where: {
        id: params.id,
      },
      scheme: schemeId,
    },
    fetchPolicy: "cache-and-network",
  });

  const { data: auth0User } = useQuery(Auth0User, {
    variables: {
      id: params.id,
    },
  });

  return (
    <ViewUserDesktop
      userId={params.id}
      user={!!user ? user.user : {}}
      auth0User={auth0User || {}}
    />
  );
};

export default ViewUser;
