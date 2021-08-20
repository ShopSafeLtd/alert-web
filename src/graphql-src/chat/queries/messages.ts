import { gql } from "@apollo/client";
import { MessageContent, MessageContentType } from "../fragments";

export const Messages = gql`
  query messages($chat: String, $after: MessageWhereUniqueInput) {
    messages(
      where: { chat: { id: { equals: $chat } } }
      first: 30
      orderBy: { createdAt: asc }
      after: $after
    ) {
      ...MessageContent
    }
  }
  ${MessageContent}
`;

export interface MessagesArgs {
  chat: string;
  after?: { id: string };
}

export interface MessagesRes {
  messages: MessageContentType[];
}

export default Messages;
