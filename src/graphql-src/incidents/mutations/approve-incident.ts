import { gql } from "@apollo/client";

export const ApproveIncident = gql`
  mutation approveIncident($where: UniqueId!, $data: ApproveIncidentData!) {
    approveIncident(where: $where, data: $data) {
      id
      approved
      groups {
        id
        name
      }
    }
  }
`;

export interface ApproveIncidentProps {
  where: {
    id: string;
  };
  data: {
    groups: {
      connect?: { id: string }[];
      disconnect?: { id: string }[];
    };
  };
}

export interface ApproveIncidentRes {
  incident: {
    id: string;
    approved: boolean;
    groups: {
      id: string;
      name: string;
    }[];
  };
}
