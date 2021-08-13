import { gql } from "@apollo/client";

export const RecycleOffender = gql`
  mutation recycleOffender($id: String!) {
    recycleOffender(where: { id: $id }) {
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
