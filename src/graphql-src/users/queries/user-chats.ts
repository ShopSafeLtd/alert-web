import { gql } from "@apollo/client";

export const UserChats = gql`
  query user($where: UserWhereUniqueInput!, $scheme: String!) {
    user(where: $where) {
      id
      chats(where: { chat: { scheme: { id: { equals: $scheme } } } }) {
        id
        newMessages
        chat {
          id
          name
          firstLetter
          messages {
            id
            content
            from {
              id
              fullName
            }
          }
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
      newMessages: boolean;
      chat: {
        id: string;
        name: string;
        firstLetter: string;
        messages: {
          id: string;
          content: string;
          from: {
            id: string;
            fullName: string;
          };
        };
      };
    }[];
  };
}
