import { gql } from "@apollo/client";
import { FullOffender, FullOffenderType } from "../fragments";

export const EditOffender = gql`
  query offender($id: String!) {
    offender(where: { id: $id }) {
      ...FullOffender
    }
  }
  ${FullOffender}
`;

export interface EditOffenderArgs {
  id: string;
}

export interface EditOffenderRes {
  offender: FullOffenderType;
}
