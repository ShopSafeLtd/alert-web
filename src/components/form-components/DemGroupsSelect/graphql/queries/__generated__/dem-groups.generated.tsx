import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DemGroupsSelectQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.DemGroupWhereInput>;
}>;


export type DemGroupsSelectQuery = { __typename?: 'Query', demGroups: { __typename?: 'QueryDemGroupsConnection', totalCount: number, edges: Array<{ __typename?: 'QueryDemGroupsConnectionEdge', node: { __typename?: 'DemGroup', id: string, name: string } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } };


export const DemGroupsSelectDocument = gql`
    query demGroupsSelect($where: DemGroupWhereInput) {
  demGroups(where: $where) {
    edges {
      node {
        id
        name
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
export function useDemGroupsSelectQuery(baseOptions?: Apollo.QueryHookOptions<DemGroupsSelectQuery, DemGroupsSelectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DemGroupsSelectQuery, DemGroupsSelectQueryVariables>(DemGroupsSelectDocument, options);
      }
export function useDemGroupsSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DemGroupsSelectQuery, DemGroupsSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DemGroupsSelectQuery, DemGroupsSelectQueryVariables>(DemGroupsSelectDocument, options);
        }
export type DemGroupsSelectQueryHookResult = ReturnType<typeof useDemGroupsSelectQuery>;
export type DemGroupsSelectLazyQueryHookResult = ReturnType<typeof useDemGroupsSelectLazyQuery>;
export type DemGroupsSelectQueryResult = Apollo.QueryResult<DemGroupsSelectQuery, DemGroupsSelectQueryVariables>;