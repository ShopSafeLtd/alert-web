import { gql } from "@apollo/client";

export const RecycleIncident = gql`
  mutation recycleIncident($id: String!) {
    recycleIncident(where: { id: $id }) {
      id
      recycled
    }
  }
`;

export interface RecycleIncidentArgs {
  id: string;
}

export interface RecycleIncidentRes {
  recycleIncident: {
    id: string;
    recycled: boolean;
  };
}
