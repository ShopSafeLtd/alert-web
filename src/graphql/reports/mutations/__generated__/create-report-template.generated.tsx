import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateReportTemplateMutationVariables = Types.Exact<{
  data: Types.ReportTemplateCreateInput;
}>;


export type CreateReportTemplateMutation = { __typename?: 'Mutation', createReportTemplate: { __typename?: 'ReportTemplate', id: string, metaData: Array<{ [key: string]: any }>, default: boolean, description?: string | null, name: string, type: Types.ReportType, reportGroup?: { __typename?: 'ReportGroup', id: string } | null, layout: Array<{ __typename?: 'ReportLayout', id: string, createdAt: Date, updatedAt: Date, h: number, w: number, x: number, y: number, maxW?: number | null, maxH?: number | null, minW?: number | null, minH?: number | null, static: boolean, moved: boolean, i: string }> } };

export type ReportTemplatesFragment = { __typename?: 'ReportTemplate', id: string, metaData: Array<{ [key: string]: any }>, default: boolean, description?: string | null, name: string, type: Types.ReportType, layout: Array<{ __typename?: 'ReportLayout', id: string, createdAt: Date, updatedAt: Date, h: number, w: number, x: number, y: number, maxW?: number | null, maxH?: number | null, minW?: number | null, minH?: number | null, static: boolean, moved: boolean, i: string }> };

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