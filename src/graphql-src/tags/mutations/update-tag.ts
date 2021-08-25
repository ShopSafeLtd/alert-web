import { gql } from "@apollo/client";

export const UpdateTag = gql`
  mutation updateTag($where: UniqueId!, $data: TagUpdateInput!) {
    updateTag(where: $where, data: $data) {
      id
      name
      description
    }
  }
`;

export interface UpdateTagArgs {
  where: {
    id: string;
  };
  data: {
    name: { set: string };
    description: { set: string };
  };
}

export interface UpdateTagRes {
  updateTag: {
    id: string;
    name: string;
    description: string;
  };
}
