import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ApproveAiSuggestionMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type ApproveAiSuggestionMutation = { __typename?: 'Mutation', approveAiSuggestion?: { __typename?: 'AISuggestion', id: string } | null };


export const ApproveAiSuggestionDocument = gql`
    mutation ApproveAiSuggestion($where: UniqueId!) {
  approveAiSuggestion(where: $where) {
    id
  }
}
    `;
export type ApproveAiSuggestionMutationFn = Apollo.MutationFunction<ApproveAiSuggestionMutation, ApproveAiSuggestionMutationVariables>;
export function useApproveAiSuggestionMutation(baseOptions?: Apollo.MutationHookOptions<ApproveAiSuggestionMutation, ApproveAiSuggestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveAiSuggestionMutation, ApproveAiSuggestionMutationVariables>(ApproveAiSuggestionDocument, options);
      }
export type ApproveAiSuggestionMutationHookResult = ReturnType<typeof useApproveAiSuggestionMutation>;
export type ApproveAiSuggestionMutationResult = Apollo.MutationResult<ApproveAiSuggestionMutation>;
export type ApproveAiSuggestionMutationOptions = Apollo.BaseMutationOptions<ApproveAiSuggestionMutation, ApproveAiSuggestionMutationVariables>;