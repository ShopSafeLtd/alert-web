import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TotalLossQueryVariables = Types.Exact<{
  where: Types.DashboardInput;
}>;


export type TotalLossQuery = { __typename?: 'Query', totalLoss: number };


export const TotalLossDocument = gql`
    query TotalLoss($where: DashboardInput!) {
  totalLoss(where: $where)
}
    `;
export function useTotalLossQuery(baseOptions: Apollo.QueryHookOptions<TotalLossQuery, TotalLossQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TotalLossQuery, TotalLossQueryVariables>(TotalLossDocument, options);
      }
export function useTotalLossLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TotalLossQuery, TotalLossQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TotalLossQuery, TotalLossQueryVariables>(TotalLossDocument, options);
        }
export type TotalLossQueryHookResult = ReturnType<typeof useTotalLossQuery>;
export type TotalLossLazyQueryHookResult = ReturnType<typeof useTotalLossLazyQuery>;
export type TotalLossQueryResult = Apollo.QueryResult<TotalLossQuery, TotalLossQueryVariables>;