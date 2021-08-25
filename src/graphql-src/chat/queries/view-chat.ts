import { gql } from "@apollo/client";

export const ViewChat = gql`
  query chat($where: ChatWhereUniqueInput!) {
    chat(where: $where) {
      id
      name
      description
      members {
        id
        user {
          id
          fullName
          organisation
        }
      }
    }
  }
`;

export interface ViewChatArgs {
  where: {
    id: string;
  };
}

export interface ViewChatRes {
  chat: {
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
