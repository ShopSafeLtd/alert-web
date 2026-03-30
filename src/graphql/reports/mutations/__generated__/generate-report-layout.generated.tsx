import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GenerateReportLayoutMutationVariables = Types.Exact<{
  reportType: Types.ReportType;
  instructions?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GenerateReportLayoutMutation = { __typename?: 'Mutation', generateReportLayout: { __typename?: 'GeneratedReportLayoutResult', layout: Array<{ [key: string]: any }>, metaData: Array<{ [key: string]: any }> } };


export const GenerateReportLayoutDocument = gql`
    mutation GenerateReportLayout($reportType: ReportType!, $instructions: String) {
  generateReportLayout(reportType: $reportType, instructions: $instructions) {
    layout
    metaData
  }
}
    `;
export type GenerateReportLayoutMutationFn = Apollo.MutationFunction<GenerateReportLayoutMutation, GenerateReportLayoutMutationVariables>;
export function useGenerateReportLayoutMutation(baseOptions?: Apollo.MutationHookOptions<GenerateReportLayoutMutation, GenerateReportLayoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateReportLayoutMutation, GenerateReportLayoutMutationVariables>(GenerateReportLayoutDocument, options);
      }
export type GenerateReportLayoutMutationHookResult = ReturnType<typeof useGenerateReportLayoutMutation>;
export type GenerateReportLayoutMutationResult = Apollo.MutationResult<GenerateReportLayoutMutation>;
export type GenerateReportLayoutMutationOptions = Apollo.BaseMutationOptions<GenerateReportLayoutMutation, GenerateReportLayoutMutationVariables>;