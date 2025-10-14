import type * as Types from '../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ReportsCentreQueryVariables = Types.Exact<{
  where: Types.ReportsCentreWhereInput;
}>;


export type ReportsCentreQuery = { __typename?: 'Query', reportsCentre: Array<{ __typename?: 'ReportGroup', id: string, name: string, order: number, reports: Array<{ __typename?: 'ReportTemplate', id: string, name: string, description?: string | null, type: Types.ReportType }> }> };


export const ReportsCentreDocument = gql`
    query ReportsCentre($where: ReportsCentreWhereInput!) {
  reportsCentre(where: $where) {
    id
    name
    order
    reports {
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