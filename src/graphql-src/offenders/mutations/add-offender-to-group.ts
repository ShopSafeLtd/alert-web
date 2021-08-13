import { gql } from "@apollo/client";

export const AddOffenderToGroup = gql`
  mutation addToOffenderOnGroup($data: GroupUpdateInput!, $where: UniqueId!) {
    updateOffender(where: $where, data: $data) {
      id
      groups {
        id
        name
      }
    }
  }
`;

export interface AddOffenderToGroupsArgs {
  where: { id: string };
  data: { groups: { connect: { id: string } } };
}

export interface AddOffenderToGroupsRes {
  id: string;
  groups: {
    id: string;
    name: string;
  };
}
