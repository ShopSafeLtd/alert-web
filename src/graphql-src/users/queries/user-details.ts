import { gql } from "@apollo/client";
import { Location, LocationType } from "../../address/fragments";

export const UserDetails = gql`
  {
    currentUser {
      id
      fullName
      organisation
      addresses(where: { primary: { equals: true } }) {
        ...Location
      }
    }
  }
  ${Location}
`;

export interface UserDetailsRes {
  currentUser: {
    id: string;
    fullName: string;
    organisation: string;
    addresses: LocationType[];
  };
}
