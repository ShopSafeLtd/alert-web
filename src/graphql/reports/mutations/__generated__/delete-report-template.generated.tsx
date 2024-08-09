import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteReportTemplateMutationVariables = Types.Exact<{
  where: Types.ReportTemplateWhereUniqueInput;
}>;


export type DeleteReportTemplateMutation = { __typename?: 'Mutation', deleteReportTemplate?: { __typename?: 'ReportTemplate', id: string, reportGroup: { __typename?: 'ReportGroup', id: string } } | null };


export const DeleteReportTemplateDocument = gql`
    mutation DeleteReportTemplate($where: ReportTemplateWhereUniqueInput!) {
  deleteReportTemplate(where: $where) {
    id
    reportGroup {
      id
    }
  }
}
    `;
export type DeleteReportTemplateMutationFn = Apollo.MutationFunction<DeleteReportTemplateMutation, DeleteReportTemplateMutationVariables>;
export function useDeleteReportTemplateMutation(baseOptions?: Apollo.MutationHookOptions<DeleteReportTemplateMutation, DeleteReportTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteReportTemplateMutation, DeleteReportTemplateMutationVariables>(DeleteReportTemplateDocument, options);
      }
export type DeleteReportTemplateMutationHookResult = ReturnType<typeof useDeleteReportTemplateMutation>;
export type DeleteReportTemplateMutationResult = Apollo.MutationResult<DeleteReportTemplateMutation>;
export type DeleteReportTemplateMutationOptions = Apollo.BaseMutationOptions<DeleteReportTemplateMutation, DeleteReportTemplateMutationVariables>;