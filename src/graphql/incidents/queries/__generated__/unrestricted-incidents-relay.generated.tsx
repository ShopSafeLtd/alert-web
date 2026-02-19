import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UnrestrictedIncidentsRelayQueryVariables = Types.Exact<{
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Types.IncidentOrderByWithRelationInput>;
  where: Types.UnrestrictedIncidentRelayInput;
}>;


export type UnrestrictedIncidentsRelayQuery = { __typename?: 'Query', unrestrictedIncidentsRelay: { __typename?: 'QueryUnrestrictedIncidentsRelayConnection', totalCount: number, edges: Array<{ __typename?: 'QueryUnrestrictedIncidentsRelayConnectionEdge', node: { __typename?: 'Incident', id: string, subject: string, dayTime: string, reference?: number | null, policeRef?: string | null, business?: { __typename?: 'Business', id: string, name: string } | null, location?: { __typename?: 'Address', id: string, full: string } | null, incidentItems: Array<{ __typename?: 'IncidentItem', value?: number | null, recoveredValue?: number | null }>, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null }> }> } }> } };


export const UnrestrictedIncidentsRelayDocument = gql`
    query unrestrictedIncidentsRelay($take: Int, $skip: Int, $orderBy: IncidentOrderByWithRelationInput, $where: UnrestrictedIncidentRelayInput!) {
  unrestrictedIncidentsRelay(
    take: $take
    skip: $skip
    orderBy: $orderBy
    where: $where
  ) {
    edges {
      node {
        id
        subject
        dayTime
        reference
        policeRef
        business {
          id
          name
        }
        location {
          id
          full
        }
        incidentItems {
          value
          recoveredValue
        }
        offenders {
          id
          name
          images(take: 1) {
            id
            optimised
          }
        }
      }
    }
    totalCount
  }
}
    `;
export function useUnrestrictedIncidentsRelayQuery(baseOptions: Apollo.QueryHookOptions<UnrestrictedIncidentsRelayQuery, UnrestrictedIncidentsRelayQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UnrestrictedIncidentsRelayQuery, UnrestrictedIncidentsRelayQueryVariables>(UnrestrictedIncidentsRelayDocument, options);
      }
export function useUnrestrictedIncidentsRelayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UnrestrictedIncidentsRelayQuery, UnrestrictedIncidentsRelayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UnrestrictedIncidentsRelayQuery, UnrestrictedIncidentsRelayQueryVariables>(UnrestrictedIncidentsRelayDocument, options);
        }
export type UnrestrictedIncidentsRelayQueryHookResult = ReturnType<typeof useUnrestrictedIncidentsRelayQuery>;
export type UnrestrictedIncidentsRelayLazyQueryHookResult = ReturnType<typeof useUnrestrictedIncidentsRelayLazyQuery>;
export type UnrestrictedIncidentsRelayQueryResult = Apollo.QueryResult<UnrestrictedIncidentsRelayQuery, UnrestrictedIncidentsRelayQueryVariables>;