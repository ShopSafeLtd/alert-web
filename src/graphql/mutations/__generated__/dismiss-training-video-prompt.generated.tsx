import type * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DismissTrainingVideoPromptMutationVariables = Types.Exact<{
  trainingVideoId: Types.Scalars['String'];
}>;


export type DismissTrainingVideoPromptMutation = { __typename?: 'Mutation', dismissTrainingVideoPrompt: boolean };


export const DismissTrainingVideoPromptDocument = gql`
    mutation DismissTrainingVideoPrompt($trainingVideoId: String!) {
  dismissTrainingVideoPrompt(trainingVideoId: $trainingVideoId)
}
    `;
export type DismissTrainingVideoPromptMutationFn = Apollo.MutationFunction<DismissTrainingVideoPromptMutation, DismissTrainingVideoPromptMutationVariables>;
export function useDismissTrainingVideoPromptMutation(baseOptions?: Apollo.MutationHookOptions<DismissTrainingVideoPromptMutation, DismissTrainingVideoPromptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DismissTrainingVideoPromptMutation, DismissTrainingVideoPromptMutationVariables>(DismissTrainingVideoPromptDocument, options);
      }
export type DismissTrainingVideoPromptMutationHookResult = ReturnType<typeof useDismissTrainingVideoPromptMutation>;
export type DismissTrainingVideoPromptMutationResult = Apollo.MutationResult<DismissTrainingVideoPromptMutation>;
export type DismissTrainingVideoPromptMutationOptions = Apollo.BaseMutationOptions<DismissTrainingVideoPromptMutation, DismissTrainingVideoPromptMutationVariables>;