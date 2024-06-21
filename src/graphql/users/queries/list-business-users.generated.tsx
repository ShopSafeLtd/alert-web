import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListBusinessUsersQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.UserWhereInput>;
  orderBy?: Types.InputMaybe<
    | Array<Types.UserOrderByWithRelationInput>
    | Types.UserOrderByWithRelationInput
  >;
  groupWhere?: Types.InputMaybe<Types.GroupWhereInput>;
}>;

export type ListBusinessUsersQuery = {
  __typename?: 'Query';
  users: Array<{
    __typename?: 'User';
    id: string;
    fullName: string;
    status?: Types.UserStatus | null;
    publicName: boolean;
    loginEvents: Array<{ __typename?: 'LoginEvent'; loginTime: Date }>;
    groups: Array<{ __typename?: 'Group'; id: string; name: string }>;
  }>;
};

export const ListBusinessUsersDocument = gql`
  query ListBusinessUsers(
    $where: UserWhereInput
    $orderBy: [UserOrderByWithRelationInput!]
    $groupWhere: GroupWhereInput
  ) {
    users(where: $where, orderBy: $orderBy) {
      id
      fullName
      status
      publicName
      loginEvents {
        loginTime
      }
      groups(where: $groupWhere) {
        id
        name
      }
    }
  }
`;
export function useListBusinessUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ListBusinessUsersQuery,
    ListBusinessUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ListBusinessUsersQuery,
    ListBusinessUsersQueryVariables
  >(ListBusinessUsersDocument, options);
}
export function useListBusinessUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListBusinessUsersQuery,
    ListBusinessUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ListBusinessUsersQuery,
    ListBusinessUsersQueryVariables
  >(ListBusinessUsersDocument, options);
}
export type ListBusinessUsersQueryHookResult = ReturnType<
  typeof useListBusinessUsersQuery
>;
export type ListBusinessUsersLazyQueryHookResult = ReturnType<
  typeof useListBusinessUsersLazyQuery
>;
export type ListBusinessUsersQueryResult = Apollo.QueryResult<
  ListBusinessUsersQuery,
  ListBusinessUsersQueryVariables
>;
