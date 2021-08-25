import { gql } from "@apollo/client";

export const DeleteTag = gql`
  mutation deleteTag($where: UniqueId!) {
    deleteTag(where: $where) {
      id
    }
  }
`;

export interface DeleteTagArgs {
  where: {
    id: string;
  };
}

export interface DeleteTagRes {
  deleteTag: {
    id: string;
  };
}
