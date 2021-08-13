import { gql } from "@apollo/client";

export const UpdatePassword = gql`
  mutation updatePassword(
    $id: String!
    $currentPassword: String!
    $newPassword: String!
  ) {
    updatePassword(
      data: {
        id: $id
        currentPassword: $currentPassword
        newPassword: $newPassword
      }
    ) {
      id
    }
  }
`;

export interface UpdatePasswordArgs {
  id: string;
  currentPassword: string;
  newPassword: string;
}

export interface UpdatePasswordRes {
  updatePassword: {
    id: string;
  };
}
