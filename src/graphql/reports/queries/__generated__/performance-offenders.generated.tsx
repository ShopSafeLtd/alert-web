import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PerformanceOffendersQueryVariables = Types.Exact<{
  where: Types.UserContributionWhereInput;
}>;


export type PerformanceOffendersQuery = { __typename?: 'Query', offendersPerformance: { __typename?: 'ListOffenderPerformance', total: number, offenderPerformance: Array<{ __typename?: 'OffenderPerformance', primaryPhoto?: string | null, alertId: string, name: string, totalIncidents: number, totalLostValue: number, totalRecoveredValue: number, totalSuccessRate: number, lastIncidentDate?: Date | null, id: string, totalBulletins: number }> } };


export const PerformanceOffendersDocument = gql`
    query PerformanceOffenders($where: UserContributionWhereInput!) {
  offendersPerformance(where: $where) {
    total
    offenderPerformance {
      primaryPhoto
      alertId
      name
      totalIncidents
      totalLostValue
      totalRecoveredValue
      totalSuccessRate
      lastIncidentDate
      id
      totalBulletins
    }
  }
}
    `;
export function usePerformanceOffendersQuery(baseOptions: Apollo.QueryHookOptions<PerformanceOffendersQuery, PerformanceOffendersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PerformanceOffendersQuery, PerformanceOffendersQueryVariables>(PerformanceOffendersDocument, options);
      }
export function usePerformanceOffendersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PerformanceOffendersQuery, PerformanceOffendersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PerformanceOffendersQuery, PerformanceOffendersQueryVariables>(PerformanceOffendersDocument, options);
        }
export type PerformanceOffendersQueryHookResult = ReturnType<typeof usePerformanceOffendersQuery>;
export type PerformanceOffendersLazyQueryHookResult = ReturnType<typeof usePerformanceOffendersLazyQuery>;
export type PerformanceOffendersQueryResult = Apollo.QueryResult<PerformanceOffendersQuery, PerformanceOffendersQueryVariables>;