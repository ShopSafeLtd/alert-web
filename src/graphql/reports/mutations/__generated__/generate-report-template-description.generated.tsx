import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GenerateReportTemplateDescriptionMutationVariables = Types.Exact<{
  reportTemplateName: Types.Scalars['String'];
  reportType?: Types.InputMaybe<Types.Scalars['String']>;
  userDescription?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GenerateReportTemplateDescriptionMutation = { __typename?: 'Mutation', generateReportTemplateDescription: string };


export const GenerateReportTemplateDescriptionDocument = gql`
    mutation GenerateReportTemplateDescription($reportTemplateName: String!, $reportType: String, $userDescription: String) {
  generateReportTemplateDescription(
    reportTemplateName: $reportTemplateName
    reportType: $reportType
    userDescription: $userDescription
  )
}
    `;
export type GenerateReportTemplateDescriptionMutationFn = Apollo.MutationFunction<GenerateReportTemplateDescriptionMutation, GenerateReportTemplateDescriptionMutationVariables>;
export function useGenerateReportTemplateDescriptionMutation(baseOptions?: Apollo.MutationHookOptions<GenerateReportTemplateDescriptionMutation, GenerateReportTemplateDescriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateReportTemplateDescriptionMutation, GenerateReportTemplateDescriptionMutationVariables>(GenerateReportTemplateDescriptionDocument, options);
      }
export type GenerateReportTemplateDescriptionMutationHookResult = ReturnType<typeof useGenerateReportTemplateDescriptionMutation>;
export type GenerateReportTemplateDescriptionMutationResult = Apollo.MutationResult<GenerateReportTemplateDescriptionMutation>;
export type GenerateReportTemplateDescriptionMutationOptions = Apollo.BaseMutationOptions<GenerateReportTemplateDescriptionMutation, GenerateReportTemplateDescriptionMutationVariables>;
