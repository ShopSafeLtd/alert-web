import type * as Types from '../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IncidentTableReportQueryVariables = Types.Exact<{
  where: Types.IncidentTableWhereInput;
}>;


export type IncidentTableReportQuery = { __typename?: 'Query', incidentTableReport: { __typename?: 'ListIncidentPerformance', total: number, incidentPerformance: Array<{ __typename?: 'IncidentPerformance', alertId: string, id: string, date: Date, createdAt: Date, subject: string, totalBulletins: number, totalOffenders: number, totalLostValue: number, totalRecoveredValue: number, totalSuccessRate: number, primaryPhoto?: string | null }> } };


export const IncidentTableReportDocument = gql`
    query IncidentTableReport($where: IncidentTableWhereInput!) {
  incidentTableReport(where: $where) {
    total
    incidentPerformance {
      alertId
      id
      date
      createdAt
      subject
      totalBulletins
      totalOffenders
      totalLostValue
      totalRecoveredValue
      totalSuccessRate
      primaryPhoto
    }
  }
}
    `;
export function useIncidentTableReportQuery(baseOptions: Apollo.QueryHookOptions<IncidentTableReportQuery, IncidentTableReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IncidentTableReportQuery, IncidentTableReportQueryVariables>(IncidentTableReportDocument, options);
      }
export function useIncidentTableReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IncidentTableReportQuery, IncidentTableReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IncidentTableReportQuery, IncidentTableReportQueryVariables>(IncidentTableReportDocument, options);
        }
export type IncidentTableReportQueryHookResult = ReturnType<typeof useIncidentTableReportQuery>;
export type IncidentTableReportLazyQueryHookResult = ReturnType<typeof useIncidentTableReportLazyQuery>;
export type IncidentTableReportQueryResult = Apollo.QueryResult<IncidentTableReportQuery, IncidentTableReportQueryVariables>;