import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ActivityUsersSelectQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.UserWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.UserOrderByWithRelationInput> | Types.UserOrderByWithRelationInput>;
  after?: Types.InputMaybe<Types.UserWhereUniqueInput>;
}>;


export type ActivityUsersSelectQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id?: string | null, fullName: string }> };


export const ActivityUsersSelectDocument = gql`
    query ActivityUsersSelect($where: UserWhereInput, $orderBy: [UserOrderByWithRelationInput!], $after: UserWhereUniqueInput) {
  users(where: $where, orderBy: $orderBy, after: $after) {
    id
    fullName
  }
}
    `;
export function useActivityUsersSelectQuery(baseOptions?: Apollo.QueryHookOptions<ActivityUsersSelectQuery, ActivityUsersSelectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActivityUsersSelectQuery, ActivityUsersSelectQueryVariables>(ActivityUsersSelectDocument, options);
      }
export function useActivityUsersSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivityUsersSelectQuery, ActivityUsersSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActivityUsersSelectQuery, ActivityUsersSelectQueryVariables>(ActivityUsersSelectDocument, options);
        }
export type ActivityUsersSelectQueryHookResult = ReturnType<typeof useActivityUsersSelectQuery>;
export type ActivityUsersSelectLazyQueryHookResult = ReturnType<typeof useActivityUsersSelectLazyQuery>;
export type ActivityUsersSelectQueryResult = Apollo.QueryResult<ActivityUsersSelectQuery, ActivityUsersSelectQueryVariables>;