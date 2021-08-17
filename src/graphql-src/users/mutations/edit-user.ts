import { gql } from "@apollo/client";

import { Role } from "../enums";

export const EditUser = gql`
  mutation editUser(
    $id: String!
    $fullName: StringFieldUpdateOperationsInput
    $organisation: StringFieldUpdateOperationsInput
    $email: StringFieldUpdateOperationsInput
    $addresses: AddressUpdateManyWithoutUserInput
    $scheme: String
    $schemes: UserSchemeUpdateManyWithoutUserInput
  ) {
    updateUser(
      where: { id: $id }
      data: {
        fullName: $fullName
        organisation: $organisation
        email: $email
        addresses: $addresses
        schemes: $schemes
      }
    ) {
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

export interface EditUserArgs {
  id: string;
  fullName: { set: string };
  organisation: { set: string };
  email: { set: string };
  scheme: string;
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
}

export interface EditUserRes {
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
