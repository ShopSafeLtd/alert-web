import type * as Types from '../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ReportsCentreQueryVariables = Types.Exact<{
  where: Types.ReportsCentreWhereInput;
}>;


export type ReportsCentreQuery = { __typename?: 'Query', reportsCentre: { __typename?: 'ReportsCentre', businessReports: Array<{ __typename?: 'ReportTemplate', id: string, name?: string | null, description?: string | null, type: Types.ReportType }>, crimeGroupReports: Array<{ __typename?: 'ReportTemplate', id: string, name?: string | null, description?: string | null, type: Types.ReportType }>, offenderReports: Array<{ __typename?: 'ReportTemplate', id: string, name?: string | null, description?: string | null, type: Types.ReportType }>, summaryReports: Array<{ __typename?: 'ReportTemplate', id: string, name?: string | null, description?: string | null, type: Types.ReportType }> } };


export const ReportsCentreDocument = gql`
    query ReportsCentre($where: ReportsCentreWhereInput!) {
  reportsCentre(where: $where) {
    businessReports {
      id
      name
      description
      type
    }
    crimeGroupReports {
      id
      name
      description
      type
    }
    offenderReports {
      id
      name
      description
      type
    }
    summaryReports {
      id
      name
      description
      type
    }
  }
}
    `;
export function useReportsCentreQuery(baseOptions: Apollo.QueryHookOptions<ReportsCentreQuery, ReportsCentreQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReportsCentreQuery, ReportsCentreQueryVariables>(ReportsCentreDocument, options);
      }
export function useReportsCentreLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportsCentreQuery, ReportsCentreQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReportsCentreQuery, ReportsCentreQueryVariables>(ReportsCentreDocument, options);
        }
export type ReportsCentreQueryHookResult = ReturnType<typeof useReportsCentreQuery>;
export type ReportsCentreLazyQueryHookResult = ReturnType<typeof useReportsCentreLazyQuery>;
export type ReportsCentreQueryResult = Apollo.QueryResult<ReportsCentreQuery, ReportsCentreQueryVariables>;