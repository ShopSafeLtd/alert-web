import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GenerateTrainingVideoUploadUrlMutationVariables = Types.Exact<{
  schemeId: Types.Scalars['String'];
  filename: Types.Scalars['String'];
}>;


export type GenerateTrainingVideoUploadUrlMutation = { __typename?: 'Mutation', generateTrainingVideoUploadUrl: string };


export const GenerateTrainingVideoUploadUrlDocument = gql`
    mutation GenerateTrainingVideoUploadUrl($schemeId: String!, $filename: String!) {
  generateTrainingVideoUploadUrl(schemeId: $schemeId, filename: $filename)
}
    `;
export type GenerateTrainingVideoUploadUrlMutationFn = Apollo.MutationFunction<GenerateTrainingVideoUploadUrlMutation, GenerateTrainingVideoUploadUrlMutationVariables>;
export function useGenerateTrainingVideoUploadUrlMutation(baseOptions?: Apollo.MutationHookOptions<GenerateTrainingVideoUploadUrlMutation, GenerateTrainingVideoUploadUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateTrainingVideoUploadUrlMutation, GenerateTrainingVideoUploadUrlMutationVariables>(GenerateTrainingVideoUploadUrlDocument, options);
      }
export type GenerateTrainingVideoUploadUrlMutationHookResult = ReturnType<typeof useGenerateTrainingVideoUploadUrlMutation>;
export type GenerateTrainingVideoUploadUrlMutationResult = Apollo.MutationResult<GenerateTrainingVideoUploadUrlMutation>;
export type GenerateTrainingVideoUploadUrlMutationOptions = Apollo.BaseMutationOptions<GenerateTrainingVideoUploadUrlMutation, GenerateTrainingVideoUploadUrlMutationVariables>;