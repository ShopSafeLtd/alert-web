import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import { ReportTemplatesFragmentDoc } from '../../mutations/__generated__/create-report-template.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TableReportQueryVariables = Types.Exact<{
  where: Types.UniqueId;
  schemeWhere: Types.SchemeWhereUniqueInput;
}>;


export type TableReportQuery = { __typename?: 'Query', tableReport: { __typename?: 'ReportTemplate', id?: string | null, metaData?: Array<{ [key: string]: any }> | null, default?: boolean | null, description?: string | null, name?: string | null, type?: Types.ReportType | null, layout?: Array<{ __typename?: 'ReportLayout', id?: string | null, createdAt?: Date | null, updatedAt?: Date | null, h?: number | null, w?: number | null, x?: number | null, y?: number | null, maxW?: number | null, maxH?: number | null, minW?: number | null, minH?: number | null, static?: boolean | null, moved?: boolean | null, i?: string | null }> | null }, scheme: { __typename?: 'Scheme', reportIcons: Array<{ __typename?: 'Image', optimisedPersisted?: string | null }> } };


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