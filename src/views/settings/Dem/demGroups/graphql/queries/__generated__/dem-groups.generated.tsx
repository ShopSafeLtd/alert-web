import type * as Types from '../../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DemGroupsQueryVariables = Types.Exact<{
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Array<Types.DemGroupOrderByWithRelationInput> | Types.DemGroupOrderByWithRelationInput>;
  where?: Types.InputMaybe<Types.DemGroupWhereInput>;
}>;


export type DemGroupsQuery = { __typename?: 'Query', demGroups: { __typename?: 'QueryDemGroupsConnection', totalCount: number, edges: Array<{ __typename?: 'QueryDemGroupsConnectionEdge', node: { __typename?: 'DemGroup', id?: string | null, name?: string | null, demId?: string | null, totalDevices?: number | null, demDevices?: Array<{ __typename?: 'DemDevice', id?: string | null, name?: string | null }> | null } }> } };


export const DemGroupsDocument = gql`
    query DemGroups($skip: Int, $take: Int, $orderBy: [DemGroupOrderByWithRelationInput!], $where: DemGroupWhereInput) {
  demGroups(skip: $skip, take: $take, orderBy: $orderBy, where: $where) {
    totalCount
    edges {
      node {
        id
        name
        demId
        totalDevices
        demDevices {
          id
          name
        }
      }
    }
  }
}
    `;
export function useDemGroupsQuery(baseOptions?: Apollo.QueryHookOptions<DemGroupsQuery, DemGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DemGroupsQuery, DemGroupsQueryVariables>(DemGroupsDocument, options);
      }
export function useDemGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DemGroupsQuery, DemGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DemGroupsQuery, DemGroupsQueryVariables>(DemGroupsDocument, options);
        }
export type DemGroupsQueryHookResult = ReturnType<typeof useDemGroupsQuery>;
export type DemGroupsLazyQueryHookResult = ReturnType<typeof useDemGroupsLazyQuery>;
export type DemGroupsQueryResult = Apollo.QueryResult<DemGroupsQuery, DemGroupsQueryVariables>;