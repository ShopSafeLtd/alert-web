import { gql } from "@apollo/client";

export const UpdateAutoApprove = gql`
  mutation updateScheme($data: SchemeUpdateInput!, $where: UniqueId!) {
    updateScheme(where: $where, data: $data) {
      id
      autoApproveIncidents
      autoApproveOffenders
    }
  }
`;

export interface UpdateAutoApproveArgs {
  where: {
    id: string;
  };
  data: {
    autoApproveIncidents: { set: boolean };
    autoApproveOffenders: { set: boolean };
  };
}

export interface UpdateAutoApproveRes {
  updateScheme: {
    id: string;
    autoApproveIncidents: boolean;
    autoApproveOffenders: boolean;
  };
}
