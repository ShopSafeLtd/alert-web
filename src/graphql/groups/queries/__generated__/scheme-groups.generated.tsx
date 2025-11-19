import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SchemeGroupsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.GroupWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.GroupOrderByWithRelationInput> | Types.GroupOrderByWithRelationInput>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type SchemeGroupsQuery = { __typename?: 'Query', groups: Array<{ __typename?: 'Group', id: string, name: string, description?: string | null, usersCount: number, businessesCount: number, scheme: { __typename?: 'Scheme', id: string, name: string }, approver: Array<{ __typename?: 'User', id: string, fullName: string }> }> };


export const SchemeGroupsDocument = gql`
    query schemeGroups($where: GroupWhereInput, $orderBy: [GroupOrderByWithRelationInput!], $skip: Int, $take: Int) {
  groups(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {
    id
    name
    description
    usersCount
    businessesCount
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