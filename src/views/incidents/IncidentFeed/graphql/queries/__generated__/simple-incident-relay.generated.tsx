import type * as Types from '../../../../../../graphql/types.js';

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


export type IncidentRelaySimpleQuery = { __typename?: 'Query', incidentRelaySimple?: { __typename?: 'QueryIncidentRelaySimpleConnection', edges: Array<{ __typename?: 'QueryIncidentRelaySimpleConnectionEdge', node: { __typename?: 'Incident', approved?: boolean | null, id?: string | null, totalImages?: number | null, priority: Types.IncidentPriority, customerRef?: string | null, subject?: string | null, reference?: number | null, policeRef?: string | null, dayTime: string, description?: string | null, createdByUser?: boolean | null, crimeTypes?: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> | null, images: Array<{ __typename?: 'Image', low?: string | null, id?: string | null, rotation?: number | null, position?: Types.ImagePosition | null, primary?: boolean | null }>, offenders: Array<{ __typename?: 'Offender', name?: string | null, id?: string | null }>, business?: { __typename?: 'Business', name?: string | null } | null, location?: { __typename?: 'Address', full?: string | null } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };


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