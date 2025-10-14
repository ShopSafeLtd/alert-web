import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SchemeGroupsSelectQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.UserGroupsReplayWhere>;
}>;


export type SchemeGroupsSelectQuery = { __typename?: 'Query', userGroupRelay: { __typename?: 'QueryUserGroupRelayConnection', totalCount: number, edges: Array<{ __typename?: 'QueryUserGroupRelayConnectionEdge', node: { __typename?: 'Group', id: string, name: string, scheme: { __typename?: 'Scheme', id: string, name: string } } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } };


export const SchemeGroupsSelectDocument = gql`
    query schemeGroupsSelect($where: UserGroupsReplayWhere) {
  userGroupRelay(where: $where) {
    edges {
      node {
        id
        name
        scheme {
          id
          name
        }
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
export function useSchemeGroupsSelectQuery(baseOptions?: Apollo.QueryHookOptions<SchemeGroupsSelectQuery, SchemeGroupsSelectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SchemeGroupsSelectQuery, SchemeGroupsSelectQueryVariables>(SchemeGroupsSelectDocument, options);
      }
export function useSchemeGroupsSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SchemeGroupsSelectQuery, SchemeGroupsSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SchemeGroupsSelectQuery, SchemeGroupsSelectQueryVariables>(SchemeGroupsSelectDocument, options);
        }
export type SchemeGroupsSelectQueryHookResult = ReturnType<typeof useSchemeGroupsSelectQuery>;
export type SchemeGroupsSelectLazyQueryHookResult = ReturnType<typeof useSchemeGroupsSelectLazyQuery>;
export type SchemeGroupsSelectQueryResult = Apollo.QueryResult<SchemeGroupsSelectQuery, SchemeGroupsSelectQueryVariables>;