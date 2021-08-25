import { gql } from "@apollo/client";

export const DeleteChat = gql`
  mutation deleteChat($id: String!) {
    deleteChat(where: { id: $id }) {
      id
    }
  }
`;

export interface DeleteChatArg {
  id: string;
}

export interface DeleteChatRes {
  deleteChat: {
    id: string;
  };
}

export default DeleteChat;
