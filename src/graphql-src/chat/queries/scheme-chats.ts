import { gql } from "@apollo/client";
import { SortOrder } from "graphql-src/types";

export const SchemeChats = gql`
  query schemeChats(
    $where: ChatWhereInput
    $orderBy: [ChatOrderByWithRelationInput!]
    $after: ChatWhereUniqueInput
  ) {
    chats(where: $where, orderBy: $orderBy, after: $after) {
      id
      name
      members {
        id
      }
    }
  }
`;

export interface SchemeChatsArgs {
  where: {
    scheme: { id: { equals: string } };
  };
  orderBy: {
    orderByName?: SortOrder;
    orderByCreatedAt?: SortOrder;
  };
  after?: string;
}

export interface SchemeChatsRes {
  chats: {
    id: string;
    name: string;
    members: {
      id: string;
    }[];
  }[];
}
