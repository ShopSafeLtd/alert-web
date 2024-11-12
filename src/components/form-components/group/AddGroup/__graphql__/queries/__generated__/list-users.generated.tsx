import type * as Types from '../../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListUsersToAddQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.UserWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.UserOrderByWithRelationInput> | Types.UserOrderByWithRelationInput>;
  after?: Types.InputMaybe<Types.UserWhereUniqueInput>;
}>;


export type ListUsersToAddQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, fullName: string }> };


export const ListUsersToAddDocument = gql`
    query ListUsersToAdd($where: UserWhereInput, $orderBy: [UserOrderByWithRelationInput!], $after: UserWhereUniqueInput) {
  users(where: $where, orderBy: $orderBy, after: $after) {
    id
    fullName
  }
}
    `;
export function useListUsersToAddQuery(baseOptions?: Apollo.QueryHookOptions<ListUsersToAddQuery, ListUsersToAddQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListUsersToAddQuery, ListUsersToAddQueryVariables>(ListUsersToAddDocument, options);
      }
export function useListUsersToAddLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListUsersToAddQuery, ListUsersToAddQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListUsersToAddQuery, ListUsersToAddQueryVariables>(ListUsersToAddDocument, options);
        }
export type ListUsersToAddQueryHookResult = ReturnType<typeof useListUsersToAddQuery>;
export type ListUsersToAddLazyQueryHookResult = ReturnType<typeof useListUsersToAddLazyQuery>;
export type ListUsersToAddQueryResult = Apollo.QueryResult<ListUsersToAddQuery, ListUsersToAddQueryVariables>;