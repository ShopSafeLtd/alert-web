import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EditReportTemplateQueryVariables = Types.Exact<{
  where: Types.ReportTemplateWhereUniqueInput;
}>;

export type EditReportTemplateQuery = {
  __typename?: 'Query';
  reportTemplate: {
    __typename?: 'ReportTemplate';
    id: string;
    name?: string | null;
    description?: string | null;
    groups: Array<{ __typename?: 'Group'; id: string; name: string }>;
  };
};

export const EditReportTemplateDocument = gql`
  query EditReportTemplate($where: ReportTemplateWhereUniqueInput!) {
    reportTemplate(where: $where) {
      id
      name
      description
      groups {
        id
        name
      }
    }
  }
`;
export function useEditReportTemplateQuery(
  baseOptions: Apollo.QueryHookOptions<
    EditReportTemplateQuery,
    EditReportTemplateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    EditReportTemplateQuery,
    EditReportTemplateQueryVariables
  >(EditReportTemplateDocument, options);
}
export function useEditReportTemplateLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EditReportTemplateQuery,
    EditReportTemplateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    EditReportTemplateQuery,
    EditReportTemplateQueryVariables
  >(EditReportTemplateDocument, options);
}
export type EditReportTemplateQueryHookResult = ReturnType<
  typeof useEditReportTemplateQuery
>;
export type EditReportTemplateLazyQueryHookResult = ReturnType<
  typeof useEditReportTemplateLazyQuery
>;
export type EditReportTemplateQueryResult = Apollo.QueryResult<
  EditReportTemplateQuery,
  EditReportTemplateQueryVariables
>;
