import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserParentRolesQueryVariables = Types.Exact<{
  where: Types.UserWhereUniqueInput;
  schemeWhere?: Types.InputMaybe<Types.UserSchemeWhereInput>;
}>;


export type UserParentRolesQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, fullName: string, schemes: Array<{ __typename?: 'UserScheme', id: string, schemeId: string, orignalPermissions?: { __typename?: 'CustomRole', id: string, parentId?: string | null } | null }> } };


export const UserParentRolesDocument = gql`
    query UserParentRoles($where: UserWhereUniqueInput!, $schemeWhere: UserSchemeWhereInput) {
  user(where: $where) {
    id
    fullName
    schemes(where: $schemeWhere) {
      id
      schemeId
      orignalPermissions {
        id
        parentId
      }
    }
  }
}
    `;
export function useUserParentRolesQuery(baseOptions: Apollo.QueryHookOptions<UserParentRolesQuery, UserParentRolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserParentRolesQuery, UserParentRolesQueryVariables>(UserParentRolesDocument, options);
      }
export function useUserParentRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserParentRolesQuery, UserParentRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserParentRolesQuery, UserParentRolesQueryVariables>(UserParentRolesDocument, options);
        }
export type UserParentRolesQueryHookResult = ReturnType<typeof useUserParentRolesQuery>;
export type UserParentRolesLazyQueryHookResult = ReturnType<typeof useUserParentRolesLazyQuery>;
export type UserParentRolesQueryResult = Apollo.QueryResult<UserParentRolesQuery, UserParentRolesQueryVariables>;