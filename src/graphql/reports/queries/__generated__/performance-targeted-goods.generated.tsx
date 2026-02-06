import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PerformanceTargetedGoodsQueryVariables = Types.Exact<{
  where: Types.UserContributionWhereInput;
}>;


export type PerformanceTargetedGoodsQuery = { __typename?: 'Query', targetedGoods: { __typename?: 'ListTargetedGoods', total: number, targetedGoods: Array<{ __typename?: 'TargetedGood', alertId: string, name: string, totalIncidents: number, totalOffenders: number, totalLostValue: number, totalRecoveredValue: number, totalSuccessRate: number, averageLossValue: number }> } };


export const PerformanceTargetedGoodsDocument = gql`
    query PerformanceTargetedGoods($where: UserContributionWhereInput!) {
  targetedGoods(where: $where) {
    targetedGoods {
      alertId
      name
      totalIncidents
      totalOffenders
      totalLostValue
      totalRecoveredValue
      totalSuccessRate
      averageLossValue
    }
    total
  }
}
    `;
export function usePerformanceTargetedGoodsQuery(baseOptions: Apollo.QueryHookOptions<PerformanceTargetedGoodsQuery, PerformanceTargetedGoodsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PerformanceTargetedGoodsQuery, PerformanceTargetedGoodsQueryVariables>(PerformanceTargetedGoodsDocument, options);
      }
export function usePerformanceTargetedGoodsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PerformanceTargetedGoodsQuery, PerformanceTargetedGoodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PerformanceTargetedGoodsQuery, PerformanceTargetedGoodsQueryVariables>(PerformanceTargetedGoodsDocument, options);
        }
export type PerformanceTargetedGoodsQueryHookResult = ReturnType<typeof usePerformanceTargetedGoodsQuery>;
export type PerformanceTargetedGoodsLazyQueryHookResult = ReturnType<typeof usePerformanceTargetedGoodsLazyQuery>;
export type PerformanceTargetedGoodsQueryResult = Apollo.QueryResult<PerformanceTargetedGoodsQuery, PerformanceTargetedGoodsQueryVariables>;