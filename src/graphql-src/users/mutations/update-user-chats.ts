import { gql } from "@apollo/client";

export const UpdateUserChats = gql`
  mutation updateUser($where: UniqueId!, $data: UserUpdateInput!) {
    updateUser(where: $where, data: $data) {
      id
      chats {
        id
        chat {
          id
          name
        }
      }
    }
  }
`;

export interface UpdateUserChatsArgs {
  where: {
    id: string;
  };
  data: {
    chats: {
      create: {
        chat: {
          connect: { id: string };
        };
      }[];
      delete: { id: string }[];
    };
  };
}

export interface UpdateUserChatsRes {
  updateUser: {
    id: string;
    chats: {
      id: string;
      chat: {
        id: string;
        name: string;
      };
    };
  };
}
