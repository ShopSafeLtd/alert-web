import gql from "graphql-tag";

import { Role } from "graphql-src/users/enums";

export const UserScheme = gql`
  fragment UserScheme on UserScheme {
    id
    role
    schemeId
  }
`;

export interface UserSchemeType {
  __typename: "scheme";
  id: string;
  role: Role;
  schemeId: string;
}
