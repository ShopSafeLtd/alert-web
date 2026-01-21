import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import { IncidentCardFragmentDoc } from '../../../../../../graphql/fragments/__generated__/incident-card.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IncidentRelaySimpleQueryVariables = Types.Exact<{
  order?: Types.InputMaybe<Array<Types.IncidentOrderByWithRelationInput> | Types.IncidentOrderByWithRelationInput>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  where?: Types.InputMaybe<Types.IncidentRelaySimpleInput>;
}>;


export type IncidentRelaySimpleQuery = { __typename?: 'Query', incidentRelaySimple: { __typename?: 'QueryIncidentRelaySimpleConnection', edges: Array<{ __typename?: 'QueryIncidentRelaySimpleConnectionEdge', node: { __typename?: 'Incident', approved?: boolean | null, draft: boolean, id: string, totalImages: number, priority: Types.IncidentPriority, customerRef?: string | null, newIncident: boolean, subject: string, reference?: number | null, policeRef?: string | null, dayTime: string, description: string, createdByUser: boolean, totalValue: number, totalRecoveredValue: number, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, status?: { __typename?: 'IncidentStatus', id: string, name: string, tooltip?: string | null } | null, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }>, images: Array<{ __typename?: 'Image', low?: string | null, optimised?: string | null, id: string, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, primary?: boolean | null }>, offenders: Array<{ __typename?: 'Offender', name?: string | null, id: string, images: Array<{ __typename?: 'Image', id: string, low?: string | null, optimised?: string | null, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null }> }>, business?: { __typename?: 'Business', id: string, name: string } | null, location?: { __typename?: 'Address', id: string, full: string } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } };


export const IncidentRelaySimpleDocument = gql`
    query IncidentRelaySimple($order: [IncidentOrderByWithRelationInput!], $first: Int, $after: String, $where: IncidentRelaySimpleInput) {
  incidentRelaySimple(order: $order, first: $first, after: $after, where: $where) {
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
    ${IncidentCardFragmentDoc}`;
export function useIncidentRelaySimpleQuery(baseOptions?: Apollo.QueryHookOptions<IncidentRelaySimpleQuery, IncidentRelaySimpleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IncidentRelaySimpleQuery, IncidentRelaySimpleQueryVariables>(IncidentRelaySimpleDocument, options);
      }
export function useIncidentRelaySimpleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IncidentRelaySimpleQuery, IncidentRelaySimpleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IncidentRelaySimpleQuery, IncidentRelaySimpleQueryVariables>(IncidentRelaySimpleDocument, options);
        }
export type IncidentRelaySimpleQueryHookResult = ReturnType<typeof useIncidentRelaySimpleQuery>;
export type IncidentRelaySimpleLazyQueryHookResult = ReturnType<typeof useIncidentRelaySimpleLazyQuery>;
export type IncidentRelaySimpleQueryResult = Apollo.QueryResult<IncidentRelaySimpleQuery, IncidentRelaySimpleQueryVariables>;