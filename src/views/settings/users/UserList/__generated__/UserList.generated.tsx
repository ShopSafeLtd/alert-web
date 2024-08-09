import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserListQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.UserWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.UserOrderByWithRelationInput> | Types.UserOrderByWithRelationInput>;
  groupWhere?: Types.InputMaybe<Types.GroupWhereInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type UserListQuery = { __typename?: 'Query', listUsers: { __typename?: 'ListUsers', total: number, users: Array<{ __typename?: 'User', id: string, fullName: string, email: string, status?: Types.UserStatus | null, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }> }> } };


export const UserListDocument = gql`
    query UserList($where: UserWhereInput, $orderBy: [UserOrderByWithRelationInput!], $groupWhere: GroupWhereInput, $take: Int, $skip: Int) {
  listUsers(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
    users {
      id
      fullName
      email
      businesses {
        id
        name
        fullName
      }
      status
      groups(where: $groupWhere) {
        id
        name
      }
    }
    total
  }
}
    `;
export function useUserListQuery(baseOptions?: Apollo.QueryHookOptions<UserListQuery, UserListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserListQuery, UserListQueryVariables>(UserListDocument, options);
      }
export function useUserListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserListQuery, UserListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserListQuery, UserListQueryVariables>(UserListDocument, options);
        }
export type UserListQueryHookResult = ReturnType<typeof useUserListQuery>;
export type UserListLazyQueryHookResult = ReturnType<typeof useUserListLazyQuery>;
export type UserListQueryResult = Apollo.QueryResult<UserListQuery, UserListQueryVariables>;