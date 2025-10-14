import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import { ReportTemplatesFragmentDoc } from '../../mutations/__generated__/create-report-template.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TableReportQueryVariables = Types.Exact<{
  where: Types.UniqueId;
  schemeWhere: Types.SchemeWhereUniqueInput;
}>;


export type TableReportQuery = { __typename?: 'Query', tableReport: { __typename?: 'ReportTemplate', id: string, metaData: Array<{ [key: string]: any }>, default: boolean, description?: string | null, name: string, type: Types.ReportType, layout: Array<{ __typename?: 'ReportLayout', id: string, createdAt: Date, updatedAt: Date, h: number, w: number, x: number, y: number, maxW?: number | null, maxH?: number | null, minW?: number | null, minH?: number | null, static: boolean, moved: boolean, i: string }> }, scheme: { __typename?: 'Scheme', reportIcons: Array<{ __typename?: 'Image', optimisedPersisted?: string | null }> } };


export const TableReportDocument = gql`
    query TableReport($where: UniqueId!, $schemeWhere: SchemeWhereUniqueInput!) {
  tableReport(where: $where) {
    ...ReportTemplates
  }
  scheme(where: $schemeWhere) {
    reportIcons {
      optimisedPersisted
    }
  }
}
    ${ReportTemplatesFragmentDoc}`;
export function useTableReportQuery(baseOptions: Apollo.QueryHookOptions<TableReportQuery, TableReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TableReportQuery, TableReportQueryVariables>(TableReportDocument, options);
      }
export function useTableReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TableReportQuery, TableReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TableReportQuery, TableReportQueryVariables>(TableReportDocument, options);
        }
export type TableReportQueryHookResult = ReturnType<typeof useTableReportQuery>;
export type TableReportLazyQueryHookResult = ReturnType<typeof useTableReportLazyQuery>;
export type TableReportQueryResult = Apollo.QueryResult<TableReportQuery, TableReportQueryVariables>;