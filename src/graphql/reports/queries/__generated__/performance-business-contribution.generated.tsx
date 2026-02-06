import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PerformanceBusinessContributionQueryVariables = Types.Exact<{
  where: Types.UserContributionWhereInput;
  businessContributionSkip?: Types.InputMaybe<Types.Scalars['Int']>;
  businessContributionTake?: Types.InputMaybe<Types.Scalars['Int']>;
  businessContributionOrderBy?: Types.InputMaybe<Types.BusinessContributionOrderByInput>;
}>;


export type PerformanceBusinessContributionQuery = { __typename?: 'Query', businessContribution: { __typename?: 'ListBusinessContribution', total: number, businessContributions: Array<{ __typename?: 'BusinessContributions', name: string, totalUsers: number, totalIncidents: number, totalOffenders: number, totalUpdates: number, totalMessages: number, totalLogins: number, totalSuccessRate: number, totalRecoveredValue: number, totalLostValue: number, mostCommonGoodLost?: string | null, highestTotalValueGoodLost?: number | null, averageLossValue?: number | null }> } };


export const PerformanceBusinessContributionDocument = gql`
    query PerformanceBusinessContribution($where: UserContributionWhereInput!, $businessContributionSkip: Int, $businessContributionTake: Int, $businessContributionOrderBy: BusinessContributionOrderByInput) {
  businessContribution(
    where: $where
    skip: $businessContributionSkip
    take: $businessContributionTake
    orderBy: $businessContributionOrderBy
  ) {
    businessContributions {
      name
      totalUsers
      totalIncidents
      totalOffenders
      totalUpdates
      totalMessages
      totalLogins
      totalSuccessRate
      totalRecoveredValue
      totalLostValue
      mostCommonGoodLost
      highestTotalValueGoodLost
      averageLossValue
    }
    total
  }
}
    `;
export function usePerformanceBusinessContributionQuery(baseOptions: Apollo.QueryHookOptions<PerformanceBusinessContributionQuery, PerformanceBusinessContributionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PerformanceBusinessContributionQuery, PerformanceBusinessContributionQueryVariables>(PerformanceBusinessContributionDocument, options);
      }
export function usePerformanceBusinessContributionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PerformanceBusinessContributionQuery, PerformanceBusinessContributionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PerformanceBusinessContributionQuery, PerformanceBusinessContributionQueryVariables>(PerformanceBusinessContributionDocument, options);
        }
export type PerformanceBusinessContributionQueryHookResult = ReturnType<typeof usePerformanceBusinessContributionQuery>;
export type PerformanceBusinessContributionLazyQueryHookResult = ReturnType<typeof usePerformanceBusinessContributionLazyQuery>;
export type PerformanceBusinessContributionQueryResult = Apollo.QueryResult<PerformanceBusinessContributionQuery, PerformanceBusinessContributionQueryVariables>;