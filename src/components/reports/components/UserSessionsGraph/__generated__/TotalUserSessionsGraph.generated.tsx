import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TotalUserSessionsGraphQueryVariables = Types.Exact<{
  where: Types.UserIncidentsCountGraphInput;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type TotalUserSessionsGraphQuery = { __typename?: 'Query', totalUserSessionsGraph: Array<{ __typename?: 'Graph', label: string, value: number }> };


export const TotalUserSessionsGraphDocument = gql`
    query TotalUserSessionsGraph($where: UserIncidentsCountGraphInput!, $take: Int) {
  totalUserSessionsGraph(where: $where, take: $take) {
    label
    value
  }
}
    `;
export function useTotalUserSessionsGraphQuery(baseOptions: Apollo.QueryHookOptions<TotalUserSessionsGraphQuery, TotalUserSessionsGraphQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TotalUserSessionsGraphQuery, TotalUserSessionsGraphQueryVariables>(TotalUserSessionsGraphDocument, options);
      }
export function useTotalUserSessionsGraphLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TotalUserSessionsGraphQuery, TotalUserSessionsGraphQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TotalUserSessionsGraphQuery, TotalUserSessionsGraphQueryVariables>(TotalUserSessionsGraphDocument, options);
        }
export type TotalUserSessionsGraphQueryHookResult = ReturnType<typeof useTotalUserSessionsGraphQuery>;
export type TotalUserSessionsGraphLazyQueryHookResult = ReturnType<typeof useTotalUserSessionsGraphLazyQuery>;
export type TotalUserSessionsGraphQueryResult = Apollo.QueryResult<TotalUserSessionsGraphQuery, TotalUserSessionsGraphQueryVariables>;