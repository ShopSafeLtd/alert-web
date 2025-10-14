import type * as Types from '../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InvestigationTableReportQueryVariables = Types.Exact<{
  where: Types.InvestigationTableWhereInput;
}>;


export type InvestigationTableReportQuery = { __typename?: 'Query', investigationTableReport: { __typename?: 'ListInvestigationPerformance', total: number, investigationPerformance: Array<{ __typename?: 'InvestigationPerformance', id: string, alertId: string, name: string, status: Types.InvestigationStatus, totalIncidents: number, totalOffenders: number, totalValue: number, totalRecoveredValue?: number | null, totalSuccessRate?: number | null, createdAt: Date, closedAt?: Date | null }> } };


export const InvestigationTableReportDocument = gql`
    query InvestigationTableReport($where: InvestigationTableWhereInput!) {
  investigationTableReport(where: $where) {
    total
    investigationPerformance {
      id
      alertId
      name
      status
      totalIncidents
      totalOffenders
      totalValue
      totalRecoveredValue
      totalSuccessRate
      createdAt
      closedAt
    }
  }
}
    `;
export function useInvestigationTableReportQuery(baseOptions: Apollo.QueryHookOptions<InvestigationTableReportQuery, InvestigationTableReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InvestigationTableReportQuery, InvestigationTableReportQueryVariables>(InvestigationTableReportDocument, options);
      }
export function useInvestigationTableReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InvestigationTableReportQuery, InvestigationTableReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InvestigationTableReportQuery, InvestigationTableReportQueryVariables>(InvestigationTableReportDocument, options);
        }
export type InvestigationTableReportQueryHookResult = ReturnType<typeof useInvestigationTableReportQuery>;
export type InvestigationTableReportLazyQueryHookResult = ReturnType<typeof useInvestigationTableReportLazyQuery>;
export type InvestigationTableReportQueryResult = Apollo.QueryResult<InvestigationTableReportQuery, InvestigationTableReportQueryVariables>;