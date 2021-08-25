import { gql } from "@apollo/client";
import { Location, LocationType } from "../../address/fragments";

export const UpdateUserDetails = gql`
  mutation updateUser($data: UserUpdateInput!, $where: UniqueId!) {
    updateUser(data: $data, where: $where) {
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

export interface UpdateUserDetailsArgs {
  data: {
    fullName: { set: string };
    organisation: { set: string };
    addresses: {
      update: {
        where: {
          id: string;
        };
        data: {
          premises: { set: string };
          building: { set: string };
          street: { set: string };
          townCity: { set: string };
          county: { set: string };
          postcode: { set: string };
        };
      };
    };
  };
  where: {
    id: string;
  };
}

export interface UpdateUserDetailsRes {
  updateUser: {
    id: string;
    fullName: string;
    addresses: LocationType[];
  };
}
