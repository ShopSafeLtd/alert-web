import { gql } from "@apollo/client";
import { Role } from "graphql-src/users/enums";

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
    id: string;
    accessToken: string;
    fullName: string;
    email: string;
    organisation: string;
    newUser: boolean;
    schemes: {
      id: string;
      role: Role;
      scheme: {
        id: string;
        name: string;
        autoApproveIncidents: boolean;
        autoApproveOffenders: boolean;
      };
    }[];
  };
}

// id
// fullName
// email
// organisation
// newUser
// schemes {
//   id
//   role
//   scheme {
//     id
//     name
//     autoApproveIncidents
//     autoApproveOffenders
//   }
// }
