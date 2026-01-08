import type * as Types from '../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UsersSelectQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.UserWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.UserOrderByWithRelationInput> | Types.UserOrderByWithRelationInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  schemesWhere?: Types.InputMaybe<Types.UserSchemeWhereInput>;
}>;


export type UsersSelectQuery = { __typename?: 'Query', listUsers: { __typename?: 'ListUsers', total: number, users: Array<{ __typename?: 'User', id: string, fullName: string, schemes: Array<{ __typename?: 'UserScheme', id: string, role: Types.Role }> }> } };


export const UsersSelectDocument = gql`
    query usersSelect($where: UserWhereInput, $orderBy: [UserOrderByWithRelationInput!], $take: Int, $skip: Int, $schemesWhere: UserSchemeWhereInput) {
  listUsers(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
    users {
      id
      fullName
      schemes(where: $schemesWhere) {
        id
        role
      }
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