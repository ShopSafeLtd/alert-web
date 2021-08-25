import { gql } from "@apollo/client";
import { SortOrder } from "graphql-src/types";

export const RecycledItems = gql`
  query recycledItems(
    $schemeId: String!
    $search: String
    $order: RecycledItemOrderByInput
    $first: Int
    $after: String
    $dataType: [String!]
  ) {
    recycledItems(
      schemeId: $schemeId
      search: $search
      order: $order
      first: $first
      after: $after
      dataType: $dataType
    ) {
      id
      deletedAt
      deletedBy {
        id
        fullName
        organisation
      }
      expiresAt
      incident {
        id
        createdBy {
          id
          fullName
          organisation
        }
        date
        location {
          id
          full
        }
        recycled
        subject
      }
      offender {
        id
        gender
        incidents {
          id
          date
          location {
            id
            full
          }
        }
        name
        race
        recycled
      }
      scheme {
        id
      }
      systemTask
    }
  }
`;

export interface RecycledItemsArgs {
  schemeId: string;
  search?: string;
  order?: SortOrder;
  first?: number;
  after?: string;
  dataType?: string[];
}

export interface RecycledItemsRes {
  recycledItems: {
    id: string;
    deletedAt: string;
    deletedBy: string;
    expiresAt: string;
    incident: any[];
    offender: any[];
    scheme: any;
    systemTask: boolean;
  }[];
}
