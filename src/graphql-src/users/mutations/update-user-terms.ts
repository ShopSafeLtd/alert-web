import { gql } from "@apollo/client";

export const UpdateUserTerms = gql`
  mutation updateUser($data: UserUpdateInput!, $where: UniqueId!) {
    updateUser(where: $where, data: $data) {
      id
      termsSigned
      newUser
    }
  }
`;

export interface UpdateUserTermsArgs {
  where: {
    id: string;
  };
  data: {
    termsSigned?: { set: boolean };
    newUser?: { set: boolean };
  };
}

export interface UpdateUserTermsRes {
  updateUser: {
    id: string;
    newUser: boolean;
    termsSigned: boolean;
  };
}
