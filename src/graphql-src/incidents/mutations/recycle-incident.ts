import { gql } from "@apollo/client";

export const RecycleIncident = gql`
  mutation recycleIncident($where: UniqueId!) {
    recycleIncident(where: $where) {
      id
      recycled
    }
  }
`;

export interface RecycleIncidentArgs {
  where: {
    id: string;
  };
}

export interface RecycleIncidentRes {
  recycleIncident: {
    id: string;
    recycled: boolean;
  };
}
