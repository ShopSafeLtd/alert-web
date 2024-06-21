import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SchemeUsersQueryVariables = Types.Exact<{
  scheme?: Types.InputMaybe<Types.Scalars['String']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  orderByName?: Types.InputMaybe<Types.SortOrder>;
  orderByBusinesses?: Types.InputMaybe<Types.BusinessOrderByRelationAggregateInput>;
  orderByCreatedAt?: Types.InputMaybe<Types.SortOrder>;
  disabled?: Types.InputMaybe<Types.BoolFilter>;
  newUser?: Types.InputMaybe<Types.BoolFilter>;
  role?: Types.InputMaybe<Types.Role>;
  after?: Types.InputMaybe<Types.UserWhereUniqueInput>;
}>;

export type SchemeUsersQuery = {
  __typename?: 'Query';
  users: Array<{
    __typename?: 'User';
    id: string;
    fullName: string;
    newUser: boolean;
    disabled: boolean;
    businesses: Array<{
      __typename?: 'Business';
      id: string;
      name: string;
      fullName: string;
    }>;
    schemes: Array<{ __typename?: 'UserScheme'; id: string; role: Types.Role }>;
  }>;
};

export const SchemeUsersDocument = gql`
  query schemeUsers(
    $scheme: String
    $search: String
    $orderByName: SortOrder
    $orderByBusinesses: BusinessOrderByRelationAggregateInput
    $orderByCreatedAt: SortOrder
    $disabled: BoolFilter
    $newUser: BoolFilter
    $role: Role
    $after: UserWhereUniqueInput
  ) {
    users(
      where: {
        schemes: {
          some: {
            recycled: { equals: false }
            role: { equals: $role }
            scheme: { id: { equals: $scheme } }
          }
        }
        recycled: { equals: false }
        OR: [{ fullName: { contains: $search } }]
        disabled: $disabled
        newUser: $newUser
      }
      orderBy: {
        fullName: $orderByName
        businesses: $orderByBusinesses
        createdAt: $orderByCreatedAt
      }
      after: $after
    ) {
      id
      fullName
      businesses {
        id
        name
        fullName
      }
      newUser
      disabled
      schemes(where: { scheme: { id: { equals: $scheme } } }) {
        id
        role
      }
    }
  }
`;
export function useSchemeUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SchemeUsersQuery,
    SchemeUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemeUsersQuery, SchemeUsersQueryVariables>(
    SchemeUsersDocument,
    options
  );
}
export function useSchemeUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemeUsersQuery,
    SchemeUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemeUsersQuery, SchemeUsersQueryVariables>(
    SchemeUsersDocument,
    options
  );
}
export type SchemeUsersQueryHookResult = ReturnType<typeof useSchemeUsersQuery>;
export type SchemeUsersLazyQueryHookResult = ReturnType<
  typeof useSchemeUsersLazyQuery
>;
export type SchemeUsersQueryResult = Apollo.QueryResult<
  SchemeUsersQuery,
  SchemeUsersQueryVariables
>;
