import { gql } from "@apollo/client";

import { Location, LocationType } from "graphql-src/address/fragments";

export const UserDetails = gql`
  query user($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      fullName
      organisation
      email
      newUser
      disabled
      status
      addresses(where: { primary: { equals: true } }) {
        ...Location
      }
    }
  }
  ${Location}
`;

export interface UserDetailsArgs {
  where: {
    id?: string;
    email?: string;
    auth0Id?: string;
  };
}

export interface UserDetailsRes {
  user: {
    id: string;
    fullName: string;
    organisation: string;
    email: string;
    newUser: boolean;
    disabled: boolean;
    status: string;
    addresses: LocationType[];
  };
}
