import { gql } from "@apollo/client";

export const UpdateChat = gql`
  mutation updateChat($where: UniqueId!, $data: ChatUpdateInput!) {
    updateChat(where: $where, data: $data) {
      id
      name
      description
    }
  }
`;

export interface UpdateChatArgs {
  where: {
    id: string;
  };
  data: {
    name?: { set: string };
    description?: { set: string };
    members?: {
      create: {
        user: {
          connect: {
            id: string;
          };
        };
      }[];
      delete: {
        id: string;
      }[];
    };
  };
}

export interface UpdateChatRes {
  updateChat: {
    id: string;
    name: string;
    description: string;
  };
}
