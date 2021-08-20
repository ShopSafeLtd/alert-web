import { gql } from "@apollo/client";

export const SendInvite = gql`
  mutation sendInvite($id: String!) {
    sendInvite(user: $id) {
      id
      newUser
    }
  }
`;

export interface SendInviteArgs {
  id: string;
}

export interface SendInviteRes {
  sendInvite: {
    id: string;
    newUser: boolean;
  };
}
