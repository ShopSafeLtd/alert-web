import { gql } from "@apollo/client";
import { Role } from "../enums";

export const InviteExistingUser = gql`
  mutation inviteExistingUser($data: UserUpdateInput!, $where: UniqueId!) {
    inviteExistingUser(data: $data, where: $where) {
      id
    }
  }
`;

export interface InviteExistingUserArgs {
  where: {
    id: string;
  };
  data: {
    chats?: {
      create: {
        chat: {
          connect: {
            id: string;
          };
        };
        newMessages: boolean;
      }[];
    };
    groups?: {
      connect: {
        id: string;
      }[];
    };
    schemes: {
      create: {
        scheme: {
          connect: {
            id: string;
          };
        };
        role: Role;
      }[];
    };
  };
}

export interface InviteExistingUserRes {
  inviteExistingUser: {
    __typename: string;
    id: string;
    groups?: { id: string }[];
    chats?: { id: string }[];
    schemes?: { id: string; role: Role; schemeId: string }[];
  };
}
