import { gql } from "@apollo/client";

export const Auth0User = gql`
  query auth0User($id: String!) {
    auth0User(id: $id) {
      lastLogin
      loginCount
    }
  }
`;

export interface Auth0UserArgs {
  id: string;
}

export interface Auth0UserRes {
  auth0User: {
    lastLogin: string;
    loginCount: string;
  };
}
