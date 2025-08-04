import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LinkInvestigationsQueryVariables = Types.Exact<{
  where: Types.InvestigationRelayWhereInput;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Types.InvestigationRelayOrderInput>;
}>;


export type LinkInvestigationsQuery = { __typename?: 'Query', investigationRelay: { __typename?: 'QueryInvestigationRelayConnection', totalCount: number, edges: Array<{ __typename?: 'QueryInvestigationRelayConnectionEdge', node: { __typename?: 'Investigation', id: string, name: string, status: Types.InvestigationStatus, createdAt: Date, reference?: number | null, closedAt?: Date | null } }> } };


export const LinkInvestigationsDocument = gql`
    query LinkInvestigations($where: investigationRelayWhereInput!, $take: Int, $skip: Int, $orderBy: investigationRelayOrderInput) {
  investigationRelay(where: $where, take: $take, skip: $skip, orderBy: $orderBy) {
    totalCount
    edges {
      node {
        id
        name
        status
        createdAt
        reference
        closedAt
      }
    }
  }
}
    `;
export function useLinkInvestigationsQuery(baseOptions: Apollo.QueryHookOptions<LinkInvestigationsQuery, LinkInvestigationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LinkInvestigationsQuery, LinkInvestigationsQueryVariables>(LinkInvestigationsDocument, options);
      }
export function useLinkInvestigationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LinkInvestigationsQuery, LinkInvestigationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LinkInvestigationsQuery, LinkInvestigationsQueryVariables>(LinkInvestigationsDocument, options);
        }
export type LinkInvestigationsQueryHookResult = ReturnType<typeof useLinkInvestigationsQuery>;
export type LinkInvestigationsLazyQueryHookResult = ReturnType<typeof useLinkInvestigationsLazyQuery>;
export type LinkInvestigationsQueryResult = Apollo.QueryResult<LinkInvestigationsQuery, LinkInvestigationsQueryVariables>;