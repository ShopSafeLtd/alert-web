import { gql } from "@apollo/client";
import { FullIncident, FullIncidentType } from "../fragments";

export const IncidentFeed = gql`
  query IncidentFeed(
    $schemeId: String!
    $search: String
    $order: IncidentOrderByInput
    $first: Int
    $cursor: String
    $crimeTypes: [String!]
  ) {
    incidentFeed(
      schemeId: $schemeId
      order: $order
      first: $first
      after: $cursor
      crimeTypes: $crimeTypes
      search: $search
    ) {
      ...FullIncident
    }
  }
  ${FullIncident}
`;

export interface IncidentFeedArgs {
  schemeId: string;
  search: string;
  order: {
    createdAt: "asc" | "desc";
  };
  first: number;
  cursor?: string;
  crimeTypes?: string[];
}

export interface IncidentFeedRes {
  incidentFeed: FullIncidentType[];
}
