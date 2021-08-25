import { gql } from "@apollo/client";

export const UpdateUserDisabled = gql`
  mutation updateUser($data: UserUpdateInput!, $where: UniqueId!) {
    updateUser(where: $where, data: $data) {
      id
      disabled
    }
  }
`;

export interface UpdateUserDisabledArgs {
  where: {
    id: string;
  };
  data: {
    disabled: { set: boolean };
  };
}

export interface UpdateUserDisabledRes {
  updateUser: {
    id: string;
    disabled: boolean;
  };
}
