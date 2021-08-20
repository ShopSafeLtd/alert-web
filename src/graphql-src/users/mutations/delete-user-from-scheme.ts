import { gql } from "@apollo/client";

export const DeleteUserFromScheme = gql`
  mutation deleteUserFromScheme($id: String!, $scheme: String!) {
    deleteUserFromScheme(id: $id, scheme: $scheme) {
      id
    }
  }
`;

export interface DeleteUserFromSchemeArgs {
  id: string;
  scheme: string;
}

export interface DeleteUserFromSchemeRes {
  deleteUserFromScheme: {
    __typename: string;
    id: string;
    chats?: [];
    groups?: [];
    schemes?: [];
  };
}
