import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PerformanceCrimeGroupsInvestigationsQueryVariables = Types.Exact<{
  where: Types.UserContributionWhereInput;
}>;


export type PerformanceCrimeGroupsInvestigationsQuery = { __typename?: 'Query', crimeGroupPerformance: { __typename?: 'ListCrimeGroupPerformance', total: number, crimeGroupPerformance: Array<{ __typename?: 'CrimeGroupPerformance', totalSuccessRate: number, totalRecoveredValue: number, totalOffenders: number, totalLostValue: number, totalIncidents: number, lastIncident?: Date | null, alias: string, alertId: string }> }, investigationPerformance: { __typename?: 'ListInvestigationPerformance', total: number, investigationPerformance: Array<{ __typename?: 'InvestigationPerformance', id: string, alertId: string, name: string, status: Types.InvestigationStatus, totalIncidents: number, totalOffenders: number, totalValue: number, createdAt: Date, closedAt?: Date | null }> } };


export const PerformanceCrimeGroupsInvestigationsDocument = gql`
    query PerformanceCrimeGroupsInvestigations($where: UserContributionWhereInput!) {
  crimeGroupPerformance(where: $where) {
    crimeGroupPerformance {
      totalSuccessRate
      totalRecoveredValue
      totalOffenders
      totalLostValue
      totalIncidents
      lastIncident
      alias
      alertId
    }
    total
  }
  investigationPerformance(where: $where) {
    total
    investigationPerformance {
      id
      alertId
      name
      status
      totalIncidents
      totalOffenders
      totalValue
      createdAt
      closedAt
    }
  }
}
    `;
export function usePerformanceCrimeGroupsInvestigationsQuery(baseOptions: Apollo.QueryHookOptions<PerformanceCrimeGroupsInvestigationsQuery, PerformanceCrimeGroupsInvestigationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PerformanceCrimeGroupsInvestigationsQuery, PerformanceCrimeGroupsInvestigationsQueryVariables>(PerformanceCrimeGroupsInvestigationsDocument, options);
      }
export function usePerformanceCrimeGroupsInvestigationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PerformanceCrimeGroupsInvestigationsQuery, PerformanceCrimeGroupsInvestigationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PerformanceCrimeGroupsInvestigationsQuery, PerformanceCrimeGroupsInvestigationsQueryVariables>(PerformanceCrimeGroupsInvestigationsDocument, options);
        }
export type PerformanceCrimeGroupsInvestigationsQueryHookResult = ReturnType<typeof usePerformanceCrimeGroupsInvestigationsQuery>;
export type PerformanceCrimeGroupsInvestigationsLazyQueryHookResult = ReturnType<typeof usePerformanceCrimeGroupsInvestigationsLazyQuery>;
export type PerformanceCrimeGroupsInvestigationsQueryResult = Apollo.QueryResult<PerformanceCrimeGroupsInvestigationsQuery, PerformanceCrimeGroupsInvestigationsQueryVariables>;