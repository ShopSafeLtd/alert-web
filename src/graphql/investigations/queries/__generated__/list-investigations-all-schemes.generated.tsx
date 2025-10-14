import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InvestigationRelayQueryVariables = Types.Exact<{
  where: Types.InvestigationRelayWhereInput;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Types.InvestigationRelayOrderInput>;
}>;


export type InvestigationRelayQuery = { __typename?: 'Query', investigationRelay: { __typename?: 'QueryInvestigationRelayConnection', totalCount: number, edges: Array<{ __typename?: 'QueryInvestigationRelayConnectionEdge', node: { __typename?: 'Investigation', id: string, name: string, description?: string | null, status: Types.InvestigationStatus, createdAt: Date, closedAt?: Date | null, reference?: number | null, groups: Array<{ __typename?: 'Group', id: string, name: string }> } }> } };


export const InvestigationRelayDocument = gql`
    query InvestigationRelay($where: investigationRelayWhereInput!, $take: Int, $skip: Int, $orderBy: investigationRelayOrderInput) {
  investigationRelay(where: $where, take: $take, skip: $skip, orderBy: $orderBy) {
    totalCount
    edges {
      node {
        id
        name
        description
        status
        createdAt
        closedAt
        reference
        groups {
          id
          name
        }
      }
    }
  }
}
    `;
export function useInvestigationRelayQuery(baseOptions: Apollo.QueryHookOptions<InvestigationRelayQuery, InvestigationRelayQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InvestigationRelayQuery, InvestigationRelayQueryVariables>(InvestigationRelayDocument, options);
      }
export function useInvestigationRelayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InvestigationRelayQuery, InvestigationRelayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InvestigationRelayQuery, InvestigationRelayQueryVariables>(InvestigationRelayDocument, options);
        }
export type InvestigationRelayQueryHookResult = ReturnType<typeof useInvestigationRelayQuery>;
export type InvestigationRelayLazyQueryHookResult = ReturnType<typeof useInvestigationRelayLazyQuery>;
export type InvestigationRelayQueryResult = Apollo.QueryResult<InvestigationRelayQuery, InvestigationRelayQueryVariables>;