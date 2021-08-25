import { gql } from "@apollo/client";

export const CreateUserInAuth0 = gql`
  mutation createUserinAuth0($id: String!, $password: String!) {
    createUserInAuth0(id: $id, password: $password) {
      message
    }
  }
`;

export interface CreateUserInAuth0Args {
  id: string;
  password: string;
}

export interface CreateUserInAuth0Res {
  createUserInAuth0: {
    message: string;
  } | null;
}
