import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserRolesQueryVariables = Types.Exact<{
  schemeId: Types.Scalars['String'];
}>;


export type UserRolesQuery = { __typename?: 'Query', roles: { __typename?: 'QueryRolesConnection', edges: Array<{ __typename?: 'QueryRolesConnectionEdge', node: { __typename?: 'CustomRole', type: Types.Role, id: string, name: string } }> } };


export const UserRolesDocument = gql`
    query UserRoles($schemeId: String!) {
  roles(schemeId: $schemeId) {
    edges {
      node {
        type
        id
        name
      }
    }
  }
}
    `;
export function useUserRolesQuery(baseOptions: Apollo.QueryHookOptions<UserRolesQuery, UserRolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserRolesQuery, UserRolesQueryVariables>(UserRolesDocument, options);
      }
export function useUserRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserRolesQuery, UserRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserRolesQuery, UserRolesQueryVariables>(UserRolesDocument, options);
        }
export type UserRolesQueryHookResult = ReturnType<typeof useUserRolesQuery>;
export type UserRolesLazyQueryHookResult = ReturnType<typeof useUserRolesLazyQuery>;
export type UserRolesQueryResult = Apollo.QueryResult<UserRolesQuery, UserRolesQueryVariables>;