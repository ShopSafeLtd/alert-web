import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MarkTrainingVideoCompleteMutationVariables = Types.Exact<{
  trainingVideoId: Types.Scalars['String'];
}>;


export type MarkTrainingVideoCompleteMutation = { __typename?: 'Mutation', markTrainingVideoComplete: { __typename?: 'TrainingVideoCompletion', id: string, trainingVideoId: string, userId: string, completedAt: Date } };


export const MarkTrainingVideoCompleteDocument = gql`
    mutation MarkTrainingVideoComplete($trainingVideoId: String!) {
  markTrainingVideoComplete(trainingVideoId: $trainingVideoId) {
    id
    trainingVideoId
    userId
    completedAt
  }
}
    `;
export type MarkTrainingVideoCompleteMutationFn = Apollo.MutationFunction<MarkTrainingVideoCompleteMutation, MarkTrainingVideoCompleteMutationVariables>;
export function useMarkTrainingVideoCompleteMutation(baseOptions?: Apollo.MutationHookOptions<MarkTrainingVideoCompleteMutation, MarkTrainingVideoCompleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkTrainingVideoCompleteMutation, MarkTrainingVideoCompleteMutationVariables>(MarkTrainingVideoCompleteDocument, options);
      }
export type MarkTrainingVideoCompleteMutationHookResult = ReturnType<typeof useMarkTrainingVideoCompleteMutation>;
export type MarkTrainingVideoCompleteMutationResult = Apollo.MutationResult<MarkTrainingVideoCompleteMutation>;
export type MarkTrainingVideoCompleteMutationOptions = Apollo.BaseMutationOptions<MarkTrainingVideoCompleteMutation, MarkTrainingVideoCompleteMutationVariables>;