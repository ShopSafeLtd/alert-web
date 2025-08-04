import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateReportTemplateMutationVariables = Types.Exact<{
  data: Types.ReportTemplateCreateInput;
}>;


export type CreateReportTemplateMutation = { __typename?: 'Mutation', createReportTemplate: { __typename?: 'ReportTemplate', id?: string | null, metaData?: Array<{ [key: string]: any }> | null, default?: boolean | null, description?: string | null, name?: string | null, type?: Types.ReportType | null, reportGroup?: { __typename?: 'ReportGroup', id?: string | null } | null, layout?: Array<{ __typename?: 'ReportLayout', id?: string | null, createdAt?: Date | null, updatedAt?: Date | null, h?: number | null, w?: number | null, x?: number | null, y?: number | null, maxW?: number | null, maxH?: number | null, minW?: number | null, minH?: number | null, static?: boolean | null, moved?: boolean | null, i?: string | null }> | null } };

export type ReportTemplatesFragment = { __typename?: 'ReportTemplate', id?: string | null, metaData?: Array<{ [key: string]: any }> | null, default?: boolean | null, description?: string | null, name?: string | null, type?: Types.ReportType | null, layout?: Array<{ __typename?: 'ReportLayout', id?: string | null, createdAt?: Date | null, updatedAt?: Date | null, h?: number | null, w?: number | null, x?: number | null, y?: number | null, maxW?: number | null, maxH?: number | null, minW?: number | null, minH?: number | null, static?: boolean | null, moved?: boolean | null, i?: string | null }> | null };

export const ReportTemplatesFragmentDoc = gql`
    fragment ReportTemplates on ReportTemplate {
  id
  metaData
  default
  description
  layout {
    id
    createdAt
    updatedAt
    h
    w
    x
    y
    maxW
    maxH
    minW
    minH
    static
    moved
    i
  }
  name
  type
}
    `;
export const CreateReportTemplateDocument = gql`
    mutation CreateReportTemplate($data: ReportTemplateCreateInput!) {
  createReportTemplate(data: $data) {
    ...ReportTemplates
    reportGroup {
      id
    }
  }
}
    ${ReportTemplatesFragmentDoc}`;
export type CreateReportTemplateMutationFn = Apollo.MutationFunction<CreateReportTemplateMutation, CreateReportTemplateMutationVariables>;
export function useCreateReportTemplateMutation(baseOptions?: Apollo.MutationHookOptions<CreateReportTemplateMutation, CreateReportTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReportTemplateMutation, CreateReportTemplateMutationVariables>(CreateReportTemplateDocument, options);
      }
export type CreateReportTemplateMutationHookResult = ReturnType<typeof useCreateReportTemplateMutation>;
export type CreateReportTemplateMutationResult = Apollo.MutationResult<CreateReportTemplateMutation>;
export type CreateReportTemplateMutationOptions = Apollo.BaseMutationOptions<CreateReportTemplateMutation, CreateReportTemplateMutationVariables>;