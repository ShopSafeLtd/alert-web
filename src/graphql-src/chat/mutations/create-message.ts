import { gql } from "@apollo/client";
import { MessageContent, MessageContentType } from "../fragments";

export const CreateMessage = gql`
  mutation createMessage($data: MessageCreateWithoutActionsInput!) {
    createMessage(data: $data) {
      ...MessageContent
    }
  }
  ${MessageContent}
`;

export interface CreateMessageArgs {
  data: {
    content: string;
    from: {
      connect: {
        id: string;
      };
    };
    scheme: {
      connect: {
        id: string;
      };
    };
    chat: {
      connect: {
        id: string;
      };
    };
  };
}

export interface CreateMessageRes {
  createMessage: MessageContentType;
}
