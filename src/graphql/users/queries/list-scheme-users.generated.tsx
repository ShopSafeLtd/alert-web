import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListSchemeUsersQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.UserWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.UserOrderByWithRelationInput> | Types.UserOrderByWithRelationInput>;
  after?: Types.InputMaybe<Types.UserWhereUniqueInput>;
  groupWhere?: Types.InputMaybe<Types.GroupWhereInput>;
  schemesWhere?: Types.InputMaybe<Types.UserSchemeWhereInput>;
}>;


export type ListSchemeUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, fullName: string, firstLetter: string, origName: string, origFirstLetter: string, email: string, publicName: boolean, reportToAllBusinesses: boolean, status?: Types.UserStatus | null, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, schemes: Array<{ __typename?: 'UserScheme', id: string, role: Types.Role, scheme: { __typename?: 'Scheme', id: string } }>, approverGroups: Array<{ __typename?: 'Group', id: string, name: string }> }> };


export const ListSchemeUsersDocument = gql`
    query ListSchemeUsers($where: UserWhereInput, $orderBy: [UserOrderByWithRelationInput!], $after: UserWhereUniqueInput, $groupWhere: GroupWhereInput, $schemesWhere: UserSchemeWhereInput) {
  users(where: $where, orderBy: $orderBy, after: $after) {
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
    schemes(where: $schemesWhere) {
      id
      role
      scheme {
        id
      }
    }
    approverGroups(where: $groupWhere) {
      id
      name
    }
  }
}
    `;
export function useListSchemeUsersQuery(baseOptions?: Apollo.QueryHookOptions<ListSchemeUsersQuery, ListSchemeUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListSchemeUsersQuery, ListSchemeUsersQueryVariables>(ListSchemeUsersDocument, options);
      }
export function useListSchemeUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListSchemeUsersQuery, ListSchemeUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListSchemeUsersQuery, ListSchemeUsersQueryVariables>(ListSchemeUsersDocument, options);
        }
export type ListSchemeUsersQueryHookResult = ReturnType<typeof useListSchemeUsersQuery>;
export type ListSchemeUsersLazyQueryHookResult = ReturnType<typeof useListSchemeUsersLazyQuery>;
export type ListSchemeUsersQueryResult = Apollo.QueryResult<ListSchemeUsersQuery, ListSchemeUsersQueryVariables>;