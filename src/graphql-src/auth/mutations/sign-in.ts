import { gql } from "@apollo/client";

export const SignIn = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(data: { email: $email, password: $password }) {
      accessToken
      refreshToken
    }
  }
`;

export interface SignInArgs {
  email: string;
  password: string;
}

export interface SignInRes {
  signIn: {
    refreshToken: string;
    accessToken: string;
  };
}
