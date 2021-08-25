import { gql } from "@apollo/client";

import { Role } from "../enums";

export const UpdateUser = gql`
  mutation updateUser(
    $where: UniqueId!
    $data: UserUpdateInput!
    $scheme: String
  ) {
    updateUser(where: $where, data: $data) {
      id
      fullName
      organisation
      email
      schemes(where: { scheme: { id: { equals: $scheme } } }) {
        id
        role
      }
      addresses(where: { primary: { equals: true } }) {
        id
        premises
        building
        street
        townCity
        county
        postcode
      }
    }
  }
`;

export interface UpdateUserArgs {
  where: {
    id: string;
  };
  data: {
    fullName: { set: string };
    organisation: { set: string };
    email: { set: string };
    schemes: {
      update: {
        where: {
          id: string;
        };
        data: {
          role: { set: Role };
        };
      };
    };
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
  scheme: string;
}

export interface UpdateUserRes {
  updateUser: {
    id: string;
    fullName: string;
    organisation: string;
    email: string;
    schemes: {
      id: string;
      role: Role;
    }[];
    addresses: {
      id: string;
      premises: string;
      building: string;
      street: string;
      townCity: string;
      county: string;
      postcode: string;
    }[];
  };
}
