import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OffenderTableReportQueryVariables = Types.Exact<{
  where: Types.OffenderTableWhereInput;
}>;


export type OffenderTableReportQuery = { __typename?: 'Query', offenderTableReport: { __typename?: 'ListOffenderPerformance', total: number, offenderPerformance: Array<{ __typename?: 'OffenderPerformance', alertId: string, id: string, lastIncidentDate?: Date | null, name: string, totalBulletins: number, totalIncidents: number, totalLostValue: number, totalRecoveredValue: number, totalSuccessRate: number, primaryPhoto?: string | null }> } };


export const OffenderTableReportDocument = gql`
    query OffenderTableReport($where: OffenderTableWhereInput!) {
  offenderTableReport(where: $where) {
    total
    offenderPerformance {
      alertId
      id
      lastIncidentDate
      name
      totalBulletins
      totalIncidents
      totalLostValue
      totalRecoveredValue
      totalSuccessRate
      primaryPhoto
    }
  }
}
    `;
export function useOffenderTableReportQuery(baseOptions: Apollo.QueryHookOptions<OffenderTableReportQuery, OffenderTableReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OffenderTableReportQuery, OffenderTableReportQueryVariables>(OffenderTableReportDocument, options);
      }
export function useOffenderTableReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OffenderTableReportQuery, OffenderTableReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OffenderTableReportQuery, OffenderTableReportQueryVariables>(OffenderTableReportDocument, options);
        }
export type OffenderTableReportQueryHookResult = ReturnType<typeof useOffenderTableReportQuery>;
export type OffenderTableReportLazyQueryHookResult = ReturnType<typeof useOffenderTableReportLazyQuery>;
export type OffenderTableReportQueryResult = Apollo.QueryResult<OffenderTableReportQuery, OffenderTableReportQueryVariables>;