import { gql } from "@apollo/client";

import { Role } from "../enums";
import { UserScheme, UserSchemeType } from "graphql-src/schemes/fragments";

export const CreateUserInDatabase = gql`
  mutation createUserInDatabase(
    $email: String!
    $fullName: String!
    $organisation: String!
    $scheme: UniqueId!
    $groups: [UniqueId]!
    $chats: [UniqueId]
    $address: AddressCreateWithoutUserInput!
    $currentScheme: String
    $role: Role!
  ) {
    createUserInDatabase(
      data: {
        email: $email
        fullName: $fullName
        organisation: $organisation
        role: $role
        scheme: $scheme
        groups: $groups
        chats: $chats
        address: $address
      }
    ) {
      id
      fullName
      organisation
      newUser
      disabled
      schemes(where: { scheme: { id: { equals: $currentScheme } } }) {
        ...UserScheme
      }
    }
  }
  ${UserScheme}
`;

export interface CreateUserInDatabaseArgs {
  email: string;
  fullName: string;
  organisation: string;
  role: Role;
  scheme: {
    id: string;
  };
  groups: {
    id: string;
  }[];
  chats?: {
    id: string;
  }[];
  addresses: {
    premises: string;
    building: string;
    street: string;
    townCity: string;
    county: string;
    postcode: string;
    primary: boolean;
  };
  currentScheme: string;
}

export interface CreateUserInDatabaseRes {
  createUser: {
    id: string;
    fullName: string;
    organisation: string;
    newUser: string;
    disabled: string;
    schemes: UserSchemeType;
  };
}
