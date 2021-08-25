import { gql } from "@apollo/client";

export const UpdateUserGroups = gql`
  mutation updateUser($data: UserUpdateInput!, $where: UniqueId!) {
    updateUser(where: $where, data: $data) {
      id
      groups {
        id
        name
      }
    }
  }
`;

export interface UpdateUserGroupsArgs {
  where: {
    id: string;
  };
  data: {
    groups: {
      connect: { id: string }[];
      disconnect: { id: string }[];
    };
  };
}

export interface UpdateUserGroupsRes {
  updateUser: {
    id: string;
    groups: {
      id: string;
      name: string;
    };
  };
}
