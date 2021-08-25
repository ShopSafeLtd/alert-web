import { gql } from "@apollo/client";

export const RecycleOffender = gql`
  mutation recycleOffender($where: UniqueId!) {
    recycleOffender(where: $where) {
      id
    }
  }
`;

export interface RecycleOffenderArgs {
  id: string;
}

export interface RecycleOffenderRes {
  recycleOffender: {
    id: string;
  };
}
