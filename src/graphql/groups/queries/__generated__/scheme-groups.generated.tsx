import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SchemeGroupsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.GroupWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.GroupOrderByWithRelationInput> | Types.GroupOrderByWithRelationInput>;
}>;


export type SchemeGroupsQuery = { __typename?: 'Query', groups: Array<{ __typename?: 'Group', id: string, name: string, description?: string | null, scheme: { __typename?: 'Scheme', id: string, name: string }, approver: Array<{ __typename?: 'User', id: string, fullName: string }> }> };


export const SchemeGroupsDocument = gql`
    query schemeGroups($where: GroupWhereInput, $orderBy: [GroupOrderByWithRelationInput!]) {
  groups(where: $where, orderBy: $orderBy) {
    id
    name
    description
    scheme {
      id
      name
    }
    approver {
      id
      fullName
    }
  }
}
    `;
export function useSchemeGroupsQuery(baseOptions?: Apollo.QueryHookOptions<SchemeGroupsQuery, SchemeGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SchemeGroupsQuery, SchemeGroupsQueryVariables>(SchemeGroupsDocument, options);
      }
export function useSchemeGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SchemeGroupsQuery, SchemeGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SchemeGroupsQuery, SchemeGroupsQueryVariables>(SchemeGroupsDocument, options);
        }
export type SchemeGroupsQueryHookResult = ReturnType<typeof useSchemeGroupsQuery>;
export type SchemeGroupsLazyQueryHookResult = ReturnType<typeof useSchemeGroupsLazyQuery>;
export type SchemeGroupsQueryResult = Apollo.QueryResult<SchemeGroupsQuery, SchemeGroupsQueryVariables>;