import type * as Types from '../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UsersSelectQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.UserWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.UserOrderByWithRelationInput> | Types.UserOrderByWithRelationInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type UsersSelectQuery = { __typename?: 'Query', listUsers: { __typename?: 'ListUsers', total: number, users: Array<{ __typename?: 'User', id: string, fullName: string }> } };


export const UsersSelectDocument = gql`
    query usersSelect($where: UserWhereInput, $orderBy: [UserOrderByWithRelationInput!], $take: Int, $skip: Int) {
  listUsers(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
    users {
      id
      fullName
    }
    total
  }
}
    `;
export function useUsersSelectQuery(baseOptions?: Apollo.QueryHookOptions<UsersSelectQuery, UsersSelectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersSelectQuery, UsersSelectQueryVariables>(UsersSelectDocument, options);
      }
export function useUsersSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersSelectQuery, UsersSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersSelectQuery, UsersSelectQueryVariables>(UsersSelectDocument, options);
        }
export type UsersSelectQueryHookResult = ReturnType<typeof useUsersSelectQuery>;
export type UsersSelectLazyQueryHookResult = ReturnType<typeof useUsersSelectLazyQuery>;
export type UsersSelectQueryResult = Apollo.QueryResult<UsersSelectQuery, UsersSelectQueryVariables>;