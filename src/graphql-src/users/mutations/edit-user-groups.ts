import { gql } from "@apollo/client";

export const EditUserGroups = gql`
  mutation updateUser($id: String!, $groups: GroupUpdateManyWithoutUsersInput) {
    updateUser(where: { id: $id }, data: { groups: $groups }) {
      id
      groups {
        id
        name
      }
    }
  }
`;

export interface EditUserGroupsArgs {
  id: string;
  groups: {
    connect: { id: string }[];
    disconnect: { id: string }[];
  };
}

export interface EditUserGroupsRes {
  updateUser: {
    id: string;
    groups: {
      id: string;
      name: string;
    };
  };
}
