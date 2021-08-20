import { gql } from "@apollo/client";

export const MessageContent = gql`
  fragment MessageContent on Message {
    id
    sent
    from {
      id
      fullName
      organisation
    }
    chat {
      id
      name
    }
    content
    createdAt
  }
`;

export interface MessageContentType {
  __typename: "Message";
  id: string;
  sent: boolean;
  from: {
    __typename: "User";
    id: string;
    fullName: string;
    organisation: string;
  };
  chat: {
    __typename: "Chat";
    id: string;
    name: string;
  };
  content: string;
  createdAt: string;
}
