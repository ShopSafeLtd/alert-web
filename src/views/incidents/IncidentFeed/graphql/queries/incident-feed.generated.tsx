import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { IncidentCardFragmentDoc } from '../../../../../graphql/fragments/incident-card.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IncidentsFeedQueryVariables = Types.Exact<{
  order?: Types.InputMaybe<Types.IncidentOrderByWithRelationInput>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  where?: Types.InputMaybe<Types.IncidentWhereInput>;
  schemeId: Types.Scalars['String'];
  approved?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;

export type IncidentsFeedQuery = {
  __typename?: 'Query';
  incidentsRelay: {
    __typename?: 'QueryIncidentsRelayConnection';
    edges: Array<{
      __typename?: 'QueryIncidentsRelayConnectionEdge';
      node: {
        __typename?: 'Incident';
        approved?: boolean | null;
        id: string;
        totalImages: number;
        priority: Types.IncidentPriority;
        customerRef?: string | null;
        subject?: string | null;
        reference?: number | null;
        policeRef?: string | null;
        dayTime: string;
        description: string;
        createdByUser: boolean;
        crimeTypes: Array<{ __typename?: 'Tag'; id: string; name: string }>;
        images: Array<{
          __typename?: 'Image';
          low?: string | null;
          id: string;
          rotation: number;
          position: Types.ImagePosition;
          primary?: boolean | null;
        }>;
        offenders: Array<{
          __typename?: 'Offender';
          name?: string | null;
          id: string;
        }>;
        business?: { __typename?: 'Business'; name: string } | null;
        location?: { __typename?: 'Address'; full: string } | null;
      };
    }>;
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      endCursor?: string | null;
    };
  };
};

export const IncidentsFeedDocument = gql`
  query IncidentsFeed(
    $order: IncidentOrderByWithRelationInput
    $search: String
    $first: Int
    $after: String
    $where: IncidentWhereInput
    $schemeId: String!
    $approved: Boolean
  ) {
    incidentsRelay(
      order: $order
      first: $first
      after: $after
      search: $search
      where: $where
      schemeId: $schemeId
      approved: $approved
    ) {
      edges {
        node {
          ...IncidentCard
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${IncidentCardFragmentDoc}
`;
export function useIncidentsFeedQuery(
  baseOptions: Apollo.QueryHookOptions<
    IncidentsFeedQuery,
    IncidentsFeedQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IncidentsFeedQuery, IncidentsFeedQueryVariables>(
    IncidentsFeedDocument,
    options
  );
}
export function useIncidentsFeedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IncidentsFeedQuery,
    IncidentsFeedQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IncidentsFeedQuery, IncidentsFeedQueryVariables>(
    IncidentsFeedDocument,
    options
  );
}
export type IncidentsFeedQueryHookResult = ReturnType<
  typeof useIncidentsFeedQuery
>;
export type IncidentsFeedLazyQueryHookResult = ReturnType<
  typeof useIncidentsFeedLazyQuery
>;
export type IncidentsFeedQueryResult = Apollo.QueryResult<
  IncidentsFeedQuery,
  IncidentsFeedQueryVariables
>;
