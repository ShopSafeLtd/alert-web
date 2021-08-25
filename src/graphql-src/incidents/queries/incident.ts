import { gql } from "@apollo/client";
import { FullIncident, FullIncidentType } from "../fragments";

export const Incident = gql`
  query incident($where: IncidentWhereUniqueInput!) {
    incident(where: $where) {
      ...FullIncident
    }
  }
  ${FullIncident}
`;

export interface IncidentArgs {
  where: { id: string };
}

export interface IncidentRes {
  incident: FullIncidentType;
}
