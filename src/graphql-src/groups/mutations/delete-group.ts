import { gql } from "@apollo/client";

export const DeleteGroup = gql`
  mutation deleteGroup($id: String!) {
    deleteGroup(where: { id: $id }) {
      id
    }
  }
`;

export interface DeleteGroupArgs {
  id: string;
}

export interface DeleteGroupRes {
  deleteGroup: {
    id: string;
  };
}

export default DeleteGroup;
