import { gql } from "@apollo/client";

export const UpdateUserChats = gql`
  mutation updateUser($where: UniqueId!, $data: UserUpdateInput!) {
    updateUser(where: $where, data: $data) {
      id
      chats {
        id
        newMessages
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
      update: {
        where: {
          id: string;
        };
        data: {
          newMessages: { set: boolean };
        };
      };
    };
  };
}

export interface UpdateUserChatsRes {
  updateUser: {
    id: string;
    chats: {
      id: string;
      newMessages: boolean;
      chat: {
        id: string;
        name: string;
      };
    };
  };
}
