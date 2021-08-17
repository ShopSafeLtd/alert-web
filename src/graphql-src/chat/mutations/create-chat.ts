import { gql } from "@apollo/client";

export const CreateChat = gql`
  mutation createChat($data: ChatCreateInput!) {
    createChat(data: $data) {
      id
      name
      description
    }
  }
`;

export interface CreateChatArgs {
  data: {
    name: string;
    description: string;
    scheme: {
      connect: {
        id: string;
      };
    };
    members: {
      create: {
        user: {
          connect: { id: string };
        };
      }[];
    };
  };
}

export interface CreateChatRes {
  createChat: {
    id: string;
    name: string;
    description: string;
    members: {
      id: string;
      user: {
        id: string;
        fullName: string;
        organisation: string;
      };
    }[];
  };
}
