import { gql } from "@apollo/client";

import { Location, LocationType } from "../../address/fragments";
import { UserScheme, UserSchemeType } from "graphql-src/schemes/fragments";

export const UserByEmail = gql`
  query userByEmail($email: String!) {
    userByEmail(email: $email) {
      id
      fullName
      organisation
      email
      disabled
      status
      schemes {
        ...UserScheme
      }
      addresses(where: { primary: { equals: true } }) {
        ...Location
      }
    }
  }
  ${UserScheme}
  ${Location}
`;

export interface UserByEmailArgs {
  email: string;
}

export interface UserByEmailRes {
  userByEmail: {
    id: string;
    fullName: string;
    organisation: string;
    email: string;
    newUser: boolean;
    disabled: boolean;
    status: string;
    schemes: UserSchemeType[];
    addresses: LocationType[];
  };
}
