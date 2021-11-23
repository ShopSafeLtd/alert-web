import { gql } from '@apollo/client';

export const VerifyUser = gql`
  mutation verifyUser($id: String!, $password: String!) {
    verifyUser(data: { id: $id, password: $password }) {
      id
      fullName
      email
      access_token
      id_token
      organisation
      newUser
    }
  }
`;

export interface VerifyUserArgs {
  id: string;
  password: string;
}

export interface VerifyUserRes {
  verifyUser: {
    id: string;
    access_token: string;
    id_token: string;
    fullName: string;
    email: string;
    organisation: string;
    newUser: boolean;
  };
}
