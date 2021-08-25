import { gql } from "@apollo/client";
import { FullOffender, FullOffenderType } from "../fragments";

export const Offender = gql`
  query offender($where: OffenderWhereUniqueInput!) {
    offender(where: $where) {
      ...FullOffender
    }
  }
  ${FullOffender}
`;

export interface OffenderArgs {
  id: string;
}

export interface OffenderRes {
  offender: FullOffenderType;
}
