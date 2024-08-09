import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CrimeGroupsSelectQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Array<Types.CrimeGroupsWhereOrder> | Types.CrimeGroupsWhereOrder>;
  where: Types.CrimeGroupsWhere;
  after?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type CrimeGroupsSelectQuery = { __typename?: 'Query', crimeGroups: { __typename?: 'QueryCrimeGroupsConnection', totalCount: number, edges: Array<{ __typename?: 'QueryCrimeGroupsConnectionEdge', node: { __typename?: 'CrimeGroup', id: string, alias?: string | null, reference?: number | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } };


export const CrimeGroupsSelectDocument = gql`
    query CrimeGroupsSelect($first: Int, $orderBy: [CrimeGroupsWhereOrder!], $where: CrimeGroupsWhere!, $after: String) {
  crimeGroups(first: $first, orderBy: $orderBy, where: $where, after: $after) {
    edges {
      node {
        id
        alias
        reference
      }
    }
    totalCount
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;
export function useCrimeGroupsSelectQuery(baseOptions: Apollo.QueryHookOptions<CrimeGroupsSelectQuery, CrimeGroupsSelectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CrimeGroupsSelectQuery, CrimeGroupsSelectQueryVariables>(CrimeGroupsSelectDocument, options);
      }
export function useCrimeGroupsSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CrimeGroupsSelectQuery, CrimeGroupsSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CrimeGroupsSelectQuery, CrimeGroupsSelectQueryVariables>(CrimeGroupsSelectDocument, options);
        }
export type CrimeGroupsSelectQueryHookResult = ReturnType<typeof useCrimeGroupsSelectQuery>;
export type CrimeGroupsSelectLazyQueryHookResult = ReturnType<typeof useCrimeGroupsSelectLazyQuery>;
export type CrimeGroupsSelectQueryResult = Apollo.QueryResult<CrimeGroupsSelectQuery, CrimeGroupsSelectQueryVariables>;