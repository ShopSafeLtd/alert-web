import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddTodoUsersQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.UserWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.UserOrderByWithRelationInput> | Types.UserOrderByWithRelationInput>;
  after?: Types.InputMaybe<Types.UserWhereUniqueInput>;
}>;


export type AddTodoUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, fullName: string }> };


export const AddTodoUsersDocument = gql`
    query AddTodoUsers($where: UserWhereInput, $orderBy: [UserOrderByWithRelationInput!], $after: UserWhereUniqueInput) {
  users(where: $where, orderBy: $orderBy, after: $after) {
    id
    fullName
  }
}
    `;
export function useAddTodoUsersQuery(baseOptions?: Apollo.QueryHookOptions<AddTodoUsersQuery, AddTodoUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AddTodoUsersQuery, AddTodoUsersQueryVariables>(AddTodoUsersDocument, options);
      }
export function useAddTodoUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AddTodoUsersQuery, AddTodoUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AddTodoUsersQuery, AddTodoUsersQueryVariables>(AddTodoUsersDocument, options);
        }
export type AddTodoUsersQueryHookResult = ReturnType<typeof useAddTodoUsersQuery>;
export type AddTodoUsersLazyQueryHookResult = ReturnType<typeof useAddTodoUsersLazyQuery>;
export type AddTodoUsersQueryResult = Apollo.QueryResult<AddTodoUsersQuery, AddTodoUsersQueryVariables>;