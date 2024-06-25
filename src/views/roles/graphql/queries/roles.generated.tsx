import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RolesQueryVariables = Types.Exact<{
  schemeId: Types.Scalars['String'];
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type RolesQuery = { __typename?: 'Query', roles: { __typename?: 'QueryRolesConnection', totalCount: number, edges: Array<{ __typename?: 'QueryRolesConnectionEdge', node: { __typename?: 'CustomRole', id: string, name: string, type: Types.Role, usersCount: number } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } };


export const RolesDocument = gql`
    query Roles($schemeId: String!, $skip: Int, $take: Int, $after: String, $first: Int) {
  roles(
    schemeId: $schemeId
    skip: $skip
    take: $take
    after: $after
    first: $first
  ) {
    totalCount
    edges {
      node {
        id
        name
        type
        usersCount
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;
export function useRolesQuery(baseOptions: Apollo.QueryHookOptions<RolesQuery, RolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RolesQuery, RolesQueryVariables>(RolesDocument, options);
      }
export function useRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RolesQuery, RolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RolesQuery, RolesQueryVariables>(RolesDocument, options);
        }
export type RolesQueryHookResult = ReturnType<typeof useRolesQuery>;
export type RolesLazyQueryHookResult = ReturnType<typeof useRolesLazyQuery>;
export type RolesQueryResult = Apollo.QueryResult<RolesQuery, RolesQueryVariables>;