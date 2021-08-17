import { gql } from "@apollo/client";

import { Role } from "../enums";

export const ViewUser = gql`
  query user($id: String!) {
    user(where: { id: $id }) {
      id
      fullName
      organisation
      email
      newUser
      disabled
      status
      addresses(where: { primary: { equals: true } }) {
        id
        premises
        townCity
        street
        building
        county
        postcode
      }
      groups {
        id
        name
        scheme {
          id
        }
      }
      chats {
        id
        chat {
          id
          name
          scheme {
            id
          }
        }
      }
      schemes {
        id
        role
        schemeId
      }
    }
  }
`;

export interface ViewUserArgs {
  id: string;
}

export interface ViewUserRes {
  user: {
    id: string;
    fullName: string;
    organisation: string;
    email: string;
    newUser: boolean;
    disabled: boolean;
    status: string;
    addresses: {
      id: string;
      premises: string;
      townCity: string;
      street: string;
      building: string;
      county: string;
      postcode: string;
    }[];
    groups: {
      id: string;
      name: string;
    }[];
    chats: {
      id: string;
      chat: {
        id: string;
        name: string;
      };
    }[];
    schemes: {
      id: string;
      role: Role;
      schemeId: string;
    }[];
  };
}
