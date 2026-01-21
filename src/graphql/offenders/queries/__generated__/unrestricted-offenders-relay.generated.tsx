import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UnrestrictedOffendersRelayQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  orderBy?: Types.InputMaybe<Types.OffenderOrderByWithRelationInput>;
  where: Types.UnrestrictedOffenderRelayInput;
}>;


export type UnrestrictedOffendersRelayQuery = { __typename?: 'Query', unrestrictedOffendersRelay: { __typename?: 'QueryUnrestrictedOffendersRelayConnection', totalCount: number, edges: Array<{ __typename?: 'QueryUnrestrictedOffendersRelayConnectionEdge', cursor: string, node: { __typename?: 'Offender', id: string, name?: string | null, reference?: number | null, gender?: Types.Gender | null, race?: Types.Race | null, age?: Types.Age | null, build?: Types.Build | null, dateOfBirth?: Date | null, totalIncidents: number, totalValue: number, knownFor: Array<string>, latestIncident?: { __typename?: 'Incident', id: string, date: Date } | null, targetedBusinesses?: Array<{ __typename?: 'Business', id: string, name: string }> | null, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, position: Types.ImagePosition, rotation: number }> } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };


export const UnrestrictedOffendersRelayDocument = gql`
    query unrestrictedOffendersRelay($first: Int, $after: String, $orderBy: OffenderOrderByWithRelationInput, $where: UnrestrictedOffenderRelayInput!) {
  unrestrictedOffendersRelay(
    first: $first
    after: $after
    orderBy: $orderBy
    where: $where
  ) {
    edges {
      cursor
      node {
        id
        name
        reference
        gender
        race
        age
        build
        dateOfBirth
        totalIncidents
        totalValue
        latestIncident {
          id
          date
        }
        knownFor
        targetedBusinesses {
          id
          name
        }
        images(take: 1) {
          id
          optimised
          position
          rotation
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    totalCount
  }
}
    `;
export function useUnrestrictedOffendersRelayQuery(baseOptions: Apollo.QueryHookOptions<UnrestrictedOffendersRelayQuery, UnrestrictedOffendersRelayQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UnrestrictedOffendersRelayQuery, UnrestrictedOffendersRelayQueryVariables>(UnrestrictedOffendersRelayDocument, options);
      }
export function useUnrestrictedOffendersRelayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UnrestrictedOffendersRelayQuery, UnrestrictedOffendersRelayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UnrestrictedOffendersRelayQuery, UnrestrictedOffendersRelayQueryVariables>(UnrestrictedOffendersRelayDocument, options);
        }
export type UnrestrictedOffendersRelayQueryHookResult = ReturnType<typeof useUnrestrictedOffendersRelayQuery>;
export type UnrestrictedOffendersRelayLazyQueryHookResult = ReturnType<typeof useUnrestrictedOffendersRelayLazyQuery>;
export type UnrestrictedOffendersRelayQueryResult = Apollo.QueryResult<UnrestrictedOffendersRelayQuery, UnrestrictedOffendersRelayQueryVariables>;