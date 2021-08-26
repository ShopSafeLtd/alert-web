import { gql } from "@apollo/client";

export const ApproveOffender = gql`
  mutation approveOffender($where: UniqueId!, $data: ApproveIncidentData!) {
    approveOffender(where: $where, data: $data) {
      id
      approved
      groups {
        id
        name
      }
    }
  }
`;

export interface ApproveOffenderArgs {
  wehre: {
    id: string;
  };
  data: {
    groups: {
      connect?: { id: string }[];
      disconnect?: { id: string }[];
    };
  };
}

export interface ApproveOffenderRes {
  offender: {
    id: string;
    approved: boolean;
    groups: {
      id: string;
      name: string;
    }[];
  };
}
