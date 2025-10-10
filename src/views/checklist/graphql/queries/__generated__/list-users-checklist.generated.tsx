import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserListChecklistQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.UserWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.UserOrderByWithRelationInput> | Types.UserOrderByWithRelationInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type UserListChecklistQuery = { __typename?: 'Query', listUsers: { __typename?: 'ListUsers', users: Array<{ __typename?: 'User', id: string, fullName: string }> } };


export const UserListChecklistDocument = gql`
    query UserListChecklist($where: UserWhereInput, $orderBy: [UserOrderByWithRelationInput!], $take: Int, $skip: Int) {
  listUsers(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
    users {
      id
      fullName
    }
  }
}
    `;
export function useUserListChecklistQuery(baseOptions?: Apollo.QueryHookOptions<UserListChecklistQuery, UserListChecklistQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserListChecklistQuery, UserListChecklistQueryVariables>(UserListChecklistDocument, options);
      }
export function useUserListChecklistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserListChecklistQuery, UserListChecklistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserListChecklistQuery, UserListChecklistQueryVariables>(UserListChecklistDocument, options);
        }
export type UserListChecklistQueryHookResult = ReturnType<typeof useUserListChecklistQuery>;
export type UserListChecklistLazyQueryHookResult = ReturnType<typeof useUserListChecklistLazyQuery>;
export type UserListChecklistQueryResult = Apollo.QueryResult<UserListChecklistQuery, UserListChecklistQueryVariables>;