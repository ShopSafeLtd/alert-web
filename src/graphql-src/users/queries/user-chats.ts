import { gql } from "@apollo/client";

export const UserChats = gql`
  query user($id: String!, $scheme: String!) {
    user(where: { id: $id }) {
      id
      chats(where: { chat: { scheme: { id: { equals: $scheme } } } }) {
        id
        chat {
          id
          name
        }
      }
    }
  }
`;

export interface UserChatsArgs {
  id: string;
  scheme: string;
}

export interface UserChatsRes {
  user: {
    id: string;
    chats: {
      id: string;
      chat: {
        id: string;
      };
    }[];
  };
}
