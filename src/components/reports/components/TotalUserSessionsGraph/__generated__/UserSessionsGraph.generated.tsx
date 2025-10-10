import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserSessionsGraphQueryVariables = Types.Exact<{
  where: Types.UserIncidentsCountGraphInput;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type UserSessionsGraphQuery = { __typename?: 'Query', userSessionsGraph: Array<{ __typename?: 'RadialValueGraph', label: string, data: Array<{ __typename?: 'Graph', label: string, value: number }> }> };


export const UserSessionsGraphDocument = gql`
    query UserSessionsGraph($where: UserIncidentsCountGraphInput!, $take: Int) {
  userSessionsGraph(where: $where, take: $take) {
    label
    data {
      label
      value
    }
  }
}
    `;
export function useUserSessionsGraphQuery(baseOptions: Apollo.QueryHookOptions<UserSessionsGraphQuery, UserSessionsGraphQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserSessionsGraphQuery, UserSessionsGraphQueryVariables>(UserSessionsGraphDocument, options);
      }
export function useUserSessionsGraphLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserSessionsGraphQuery, UserSessionsGraphQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserSessionsGraphQuery, UserSessionsGraphQueryVariables>(UserSessionsGraphDocument, options);
        }
export type UserSessionsGraphQueryHookResult = ReturnType<typeof useUserSessionsGraphQuery>;
export type UserSessionsGraphLazyQueryHookResult = ReturnType<typeof useUserSessionsGraphLazyQuery>;
export type UserSessionsGraphQueryResult = Apollo.QueryResult<UserSessionsGraphQuery, UserSessionsGraphQueryVariables>;