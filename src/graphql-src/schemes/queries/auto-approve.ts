import { gql } from "@apollo/client";

export const AutoApprove = gql`
  query scheme($where: SchemeWhereUniqueInput!) {
    scheme(where: $where) {
      id
      autoApproveIncidents
      autoApproveOffenders
    }
  }
`;

export interface AutoApproveArgs {
  where: {
    id: string;
  };
}

export interface AutoApproveRes {
  scheme: {
    id: string;
    autoApproveIncidents: boolean;
    autoApproveOffenders: boolean;
  };
}
