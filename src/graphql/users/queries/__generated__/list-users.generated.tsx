import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListUsersQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.UserWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.UserOrderByWithRelationInput> | Types.UserOrderByWithRelationInput>;
  groupWhere?: Types.InputMaybe<Types.GroupWhereInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type ListUsersQuery = { __typename?: 'Query', listUsers: { __typename?: 'ListUsers', total: number, users: Array<{ __typename?: 'User', id: string, fullName: string, firstLetter: string, origName: string, origFirstLetter: string, email: string, publicName: boolean, reportToAllBusinesses?: boolean | null, status?: Types.UserStatus | null, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }> }> } };


export const ListUsersDocument = gql`
    query ListUsers($where: UserWhereInput, $orderBy: [UserOrderByWithRelationInput!], $groupWhere: GroupWhereInput, $take: Int, $skip: Int) {
  listUsers(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
    users {
      id
      fullName
      firstLetter
      origName
      origFirstLetter
      email
      publicName
      reportToAllBusinesses
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
export function useListUsersQuery(baseOptions?: Apollo.QueryHookOptions<ListUsersQuery, ListUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, options);
      }
export function useListUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListUsersQuery, ListUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, options);
        }
export type ListUsersQueryHookResult = ReturnType<typeof useListUsersQuery>;
export type ListUsersLazyQueryHookResult = ReturnType<typeof useListUsersLazyQuery>;
export type ListUsersQueryResult = Apollo.QueryResult<ListUsersQuery, ListUsersQueryVariables>;