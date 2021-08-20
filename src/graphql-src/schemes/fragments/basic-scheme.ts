import gql from "graphql-tag";

import { Role } from "graphql-src/users/enums";

export const BasicScheme = gql`
  fragment BasicScheme on Scheme {
    id
    role
  }
`;

export interface BasicSchemeType {
  __typename: "scheme";
  id: string;
  role: Role;
  schemeId: string;
}
