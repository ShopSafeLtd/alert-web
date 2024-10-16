import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LinkIncidentIncidentsQueryVariables = Types.Exact<{
  order?: Types.InputMaybe<Types.IncidentOrderByWithRelationInput>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  where?: Types.InputMaybe<Types.IncidentWhereInput>;
  schemeId: Types.Scalars['String'];
  approved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type LinkIncidentIncidentsQuery = { __typename?: 'Query', incidentsRelay: { __typename?: 'QueryIncidentsRelayConnection', totalCount: number, edges: Array<{ __typename?: 'QueryIncidentsRelayConnectionEdge', node: { __typename?: 'Incident', id: string, reference?: number | null, date: Date, dayTime: string, description: string, subject: string, totalImages: number, policeRef?: string | null, totalRecoveredValue: number, totalValue: number, location?: { __typename?: 'Address', id: string, full: string } | null, business?: { __typename?: 'Business', id: string, name: string } | null, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null }> } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } };


export const LinkIncidentIncidentsDocument = gql`
    query LinkIncidentIncidents($order: IncidentOrderByWithRelationInput, $search: String, $first: Int, $after: String, $where: IncidentWhereInput, $schemeId: String!, $approved: Boolean, $skip: Int, $take: Int) {
  incidentsRelay(
    order: $order
    first: $first
    after: $after
    search: $search
    where: $where
    schemeId: $schemeId
    approved: $approved
    skip: $skip
    take: $take
  ) {
    edges {
      node {
        id
        reference
        date
        dayTime
        description
        subject
        totalImages
        policeRef
        totalRecoveredValue
        totalValue
        location {
          id
          full
        }
        business {
          id
          name
        }
        offenders {
          id
          name
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    totalCount
  }
}
    `;
export function useLinkIncidentIncidentsQuery(baseOptions: Apollo.QueryHookOptions<LinkIncidentIncidentsQuery, LinkIncidentIncidentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LinkIncidentIncidentsQuery, LinkIncidentIncidentsQueryVariables>(LinkIncidentIncidentsDocument, options);
      }
export function useLinkIncidentIncidentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LinkIncidentIncidentsQuery, LinkIncidentIncidentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LinkIncidentIncidentsQuery, LinkIncidentIncidentsQueryVariables>(LinkIncidentIncidentsDocument, options);
        }
export type LinkIncidentIncidentsQueryHookResult = ReturnType<typeof useLinkIncidentIncidentsQuery>;
export type LinkIncidentIncidentsLazyQueryHookResult = ReturnType<typeof useLinkIncidentIncidentsLazyQuery>;
export type LinkIncidentIncidentsQueryResult = Apollo.QueryResult<LinkIncidentIncidentsQuery, LinkIncidentIncidentsQueryVariables>;