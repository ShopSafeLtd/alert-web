import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import { ReportTemplatesFragmentDoc } from '../../mutations/__generated__/create-report-template.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SchemeReportDetailsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.GroupWhereInput>;
  schemeWhere: Types.SchemeWhereUniqueInput;
  orderBy?: Types.InputMaybe<Array<Types.GroupOrderByWithRelationInput> | Types.GroupOrderByWithRelationInput>;
  reportTemplatesWhere?: Types.InputMaybe<Types.ReportTemplateWhereInput>;
}>;


export type SchemeReportDetailsQuery = { __typename?: 'Query', groups: Array<{ __typename?: 'Group', id: string, name: string, description?: string | null, approver: Array<{ __typename?: 'User', id?: string | null, fullName: string }> }>, scheme: { __typename?: 'Scheme', reportIcons: Array<{ __typename?: 'Image', optimisedPersisted?: string | null }>, reportTemplates: Array<{ __typename?: 'ReportTemplate', id?: string | null, metaData?: Array<{ [key: string]: any }> | null, default?: boolean | null, description?: string | null, name?: string | null, type?: Types.ReportType | null, layout?: Array<{ __typename?: 'ReportLayout', id?: string | null, createdAt?: Date | null, updatedAt?: Date | null, h?: number | null, w?: number | null, x?: number | null, y?: number | null, maxW?: number | null, maxH?: number | null, minW?: number | null, minH?: number | null, static?: boolean | null, moved?: boolean | null, i?: string | null }> | null }> } };


export const SchemeReportDetailsDocument = gql`
    query SchemeReportDetails($where: GroupWhereInput, $schemeWhere: SchemeWhereUniqueInput!, $orderBy: [GroupOrderByWithRelationInput!], $reportTemplatesWhere: ReportTemplateWhereInput) {
  groups(where: $where, orderBy: $orderBy) {
    id
    name
    description
    approver {
      id
      fullName
    }
  }
  scheme(where: $schemeWhere) {
    reportIcons {
      optimisedPersisted
    }
    reportTemplates(where: $reportTemplatesWhere) {
      ...ReportTemplates
    }
  }
}
    ${ReportTemplatesFragmentDoc}`;
export function useSchemeReportDetailsQuery(baseOptions: Apollo.QueryHookOptions<SchemeReportDetailsQuery, SchemeReportDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SchemeReportDetailsQuery, SchemeReportDetailsQueryVariables>(SchemeReportDetailsDocument, options);
      }
export function useSchemeReportDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SchemeReportDetailsQuery, SchemeReportDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SchemeReportDetailsQuery, SchemeReportDetailsQueryVariables>(SchemeReportDetailsDocument, options);
        }
export type SchemeReportDetailsQueryHookResult = ReturnType<typeof useSchemeReportDetailsQuery>;
export type SchemeReportDetailsLazyQueryHookResult = ReturnType<typeof useSchemeReportDetailsLazyQuery>;
export type SchemeReportDetailsQueryResult = Apollo.QueryResult<SchemeReportDetailsQuery, SchemeReportDetailsQueryVariables>;