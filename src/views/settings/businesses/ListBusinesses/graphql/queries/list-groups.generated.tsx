import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListGroupsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.GroupWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.GroupOrderByWithRelationInput> | Types.GroupOrderByWithRelationInput>;
}>;


export type ListGroupsQuery = { __typename?: 'Query', groups: Array<{ __typename?: 'Group', id: string, name: string }> };


export const ListGroupsDocument = gql`
    query listGroups($where: GroupWhereInput, $orderBy: [GroupOrderByWithRelationInput!]) {
  groups(where: $where, orderBy: $orderBy) {
    id
    name
  }
}
    `;
export function useListGroupsQuery(baseOptions?: Apollo.QueryHookOptions<ListGroupsQuery, ListGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListGroupsQuery, ListGroupsQueryVariables>(ListGroupsDocument, options);
      }
export function useListGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListGroupsQuery, ListGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListGroupsQuery, ListGroupsQueryVariables>(ListGroupsDocument, options);
        }
export type ListGroupsQueryHookResult = ReturnType<typeof useListGroupsQuery>;
export type ListGroupsLazyQueryHookResult = ReturnType<typeof useListGroupsLazyQuery>;
export type ListGroupsQueryResult = Apollo.QueryResult<ListGroupsQuery, ListGroupsQueryVariables>;