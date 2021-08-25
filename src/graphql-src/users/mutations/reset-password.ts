import { gql } from "@apollo/client";

export const ResetPassword = gql`
  mutation resetPassword($email: String!) {
    resetPassword(data: { email: $email }) {
      message
    }
  }
`;

export interface ResetPasswordArgs {
  email: string;
}

export interface ResetPasswordRes {
  resetPassword: {
    message: string;
  };
}
