import { gql } from "@apollo/client";

export const UpdateGroup = gql`
  mutation updateGroup($where: UniqueId!, $data: GroupUpdateInput!) {
    updateGroup(where: $where, data: $data) {
      id
      name
      description
      users {
        id
      }
    }
  }
`;

export interface UpdateGroupArgs {
  where: { id: string };
  data: {
    name: { set: string };
    description: { set: string };
    users: {
      connect: {
        id: string;
      }[];
      disconnect: {
        id: string;
      }[];
    };
  };
}

export interface UpdateGroupRes {
  updateGroup: {
    id: string;
    name: string;
    description: string;
  };
}
