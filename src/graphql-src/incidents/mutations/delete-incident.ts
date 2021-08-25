import { gql } from "@apollo/client";

export const DeleteIncident = gql`
  mutation deleteIncident($where: UniqueId!) {
    deleteIncident(where: $where) {
      id
    }
  }
`;

export interface DeleteIncidentArgs {
  where: {
    id: string;
  };
}

export interface DeleteIncidentRes {
  deleteIncident: {
    id: string;
  };
}
