import { gql } from "@apollo/client";

export const RestoreIncident = gql`
  mutation restoreIncident($id: String!, $recycledId: String!) {
    restoreIncident(where: { id: $id }, data: { id: $recycledId }) {
      id
      recycled
    }
  }
`;

export interface RestoreIncidentArgs {
  id: string;
  recycledId: string;
}

export interface RestoreIncidentRes {
  restoreIncident: {
    id: string;
    recycled: boolean;
  };
}
