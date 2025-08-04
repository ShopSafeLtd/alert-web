import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import { ReportTemplatesFragmentDoc } from './create-report-template.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateReportTemplateMutationVariables = Types.Exact<{
  data: Types.ReportTemplateUpdateInput;
  where: Types.ReportTemplateWhereUniqueInput;
}>;


export type UpdateReportTemplateMutation = { __typename?: 'Mutation', updateReportTemplate: { __typename?: 'ReportTemplate', description?: string | null, id: string, metaData: Array<{ [key: string]: any }>, default: boolean, name: string, type: Types.ReportType, layout: Array<{ __typename?: 'ReportLayout', id: string, createdAt: Date, updatedAt: Date, h: number, w: number, x: number, y: number, maxW?: number | null, maxH?: number | null, minW?: number | null, minH?: number | null, static: boolean, moved: boolean, i: string }> } };


export const UpdateReportTemplateDocument = gql`
    mutation UpdateReportTemplate($data: ReportTemplateUpdateInput!, $where: ReportTemplateWhereUniqueInput!) {
  updateReportTemplate(data: $data, where: $where) {
    ...ReportTemplates
    description
  }
}
    ${ReportTemplatesFragmentDoc}`;
export type UpdateReportTemplateMutationFn = Apollo.MutationFunction<UpdateReportTemplateMutation, UpdateReportTemplateMutationVariables>;
export function useUpdateReportTemplateMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReportTemplateMutation, UpdateReportTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateReportTemplateMutation, UpdateReportTemplateMutationVariables>(UpdateReportTemplateDocument, options);
      }
export type UpdateReportTemplateMutationHookResult = ReturnType<typeof useUpdateReportTemplateMutation>;
export type UpdateReportTemplateMutationResult = Apollo.MutationResult<UpdateReportTemplateMutation>;
export type UpdateReportTemplateMutationOptions = Apollo.BaseMutationOptions<UpdateReportTemplateMutation, UpdateReportTemplateMutationVariables>;