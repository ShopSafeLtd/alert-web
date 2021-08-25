import { gql } from "@apollo/client";

export const RestoreOffender = gql`
  mutation restoreOffender($id: String!, $recycledId: String!) {
    restoreOffender(where: { id: $id }, data: { id: $recycledId }) {
      id
      recycled
    }
  }
`;

export interface RestoreOffenderArgs {
  id: string;
  recycledId: string;
}

export interface RestoreOffenderRes {
  restoreOffender: {
    id: string;
    recycled: boolean;
  };
}
