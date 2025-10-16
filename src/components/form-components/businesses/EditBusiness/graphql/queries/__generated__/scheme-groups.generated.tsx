import type * as Types from '../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SchemeGroupsSelectFilterQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.GroupWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.GroupOrderByWithRelationInput> | Types.GroupOrderByWithRelationInput>;
}>;


export type SchemeGroupsSelectFilterQuery = { __typename?: 'Query', groups: Array<{ __typename?: 'Group', id: string, name: string, description?: string | null }> };


export const SchemeGroupsSelectFilterDocument = gql`
    query SchemeGroupsSelectFilter($where: GroupWhereInput, $orderBy: [GroupOrderByWithRelationInput!]) {
  groups(where: $where, orderBy: $orderBy) {
    id
    name
    description
  }
}
    `;
export function useSchemeGroupsSelectFilterQuery(baseOptions?: Apollo.QueryHookOptions<SchemeGroupsSelectFilterQuery, SchemeGroupsSelectFilterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SchemeGroupsSelectFilterQuery, SchemeGroupsSelectFilterQueryVariables>(SchemeGroupsSelectFilterDocument, options);
      }
export function useSchemeGroupsSelectFilterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SchemeGroupsSelectFilterQuery, SchemeGroupsSelectFilterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SchemeGroupsSelectFilterQuery, SchemeGroupsSelectFilterQueryVariables>(SchemeGroupsSelectFilterDocument, options);
        }
export type SchemeGroupsSelectFilterQueryHookResult = ReturnType<typeof useSchemeGroupsSelectFilterQuery>;
export type SchemeGroupsSelectFilterLazyQueryHookResult = ReturnType<typeof useSchemeGroupsSelectFilterLazyQuery>;
export type SchemeGroupsSelectFilterQueryResult = Apollo.QueryResult<SchemeGroupsSelectFilterQuery, SchemeGroupsSelectFilterQueryVariables>;