import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AvailRolesQueryVariables = Types.Exact<{
  schemeId: Types.Scalars['String'];
}>;


export type AvailRolesQuery = { __typename?: 'Query', roles: { __typename?: 'QueryRolesConnection', totalCount: number, edges: Array<{ __typename?: 'QueryRolesConnectionEdge', node: { __typename?: 'CustomRole', id: string, name: string } }> } };


export const AvailRolesDocument = gql`
    query AvailRoles($schemeId: String!) {
  roles(schemeId: $schemeId) {
    totalCount
    edges {
      node {
        id
        name
      }
    }
  }
}
    `;
export function useAvailRolesQuery(baseOptions: Apollo.QueryHookOptions<AvailRolesQuery, AvailRolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AvailRolesQuery, AvailRolesQueryVariables>(AvailRolesDocument, options);
      }
export function useAvailRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AvailRolesQuery, AvailRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AvailRolesQuery, AvailRolesQueryVariables>(AvailRolesDocument, options);
        }
export type AvailRolesQueryHookResult = ReturnType<typeof useAvailRolesQuery>;
export type AvailRolesLazyQueryHookResult = ReturnType<typeof useAvailRolesLazyQuery>;
export type AvailRolesQueryResult = Apollo.QueryResult<AvailRolesQuery, AvailRolesQueryVariables>;