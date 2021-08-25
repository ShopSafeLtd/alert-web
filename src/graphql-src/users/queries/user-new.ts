import { gql } from "@apollo/client";

export const UserNew = gql`
  query userNew($id: String!) {
    userNew(id: $id) {
      id
      email
      newUser
      hasAuth0Id
    }
  }
`;

export interface UserNewRes {
  userNew: {
    id: string;
    email: string;
    newUser: boolean;
    hasAuth0Id: boolean;
  } | null;
}

export interface UserNewArgs {
  id: string;
}
