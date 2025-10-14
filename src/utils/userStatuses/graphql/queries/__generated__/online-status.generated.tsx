import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UsersOnlineQueryVariables = Types.Exact<{
  where: Types.Scalars['String'];
}>;


export type UsersOnlineQuery = { __typename?: 'Query', usersOnline: Array<{ __typename?: 'UserOnline', userId: string, online: boolean }> };


export const UsersOnlineDocument = gql`
    query UsersOnline($where: String!) {
  usersOnline(where: $where) {
    userId
    online
  }
}
    `;
export function useUsersOnlineQuery(baseOptions: Apollo.QueryHookOptions<UsersOnlineQuery, UsersOnlineQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersOnlineQuery, UsersOnlineQueryVariables>(UsersOnlineDocument, options);
      }
export function useUsersOnlineLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersOnlineQuery, UsersOnlineQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersOnlineQuery, UsersOnlineQueryVariables>(UsersOnlineDocument, options);
        }
export type UsersOnlineQueryHookResult = ReturnType<typeof useUsersOnlineQuery>;
export type UsersOnlineLazyQueryHookResult = ReturnType<typeof useUsersOnlineLazyQuery>;
export type UsersOnlineQueryResult = Apollo.QueryResult<UsersOnlineQuery, UsersOnlineQueryVariables>;