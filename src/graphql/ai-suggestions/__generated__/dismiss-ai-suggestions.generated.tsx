import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DismissAiSuggestionMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type DismissAiSuggestionMutation = { __typename?: 'Mutation', dismissAiSuggestion?: { __typename?: 'AISuggestion', id: string } | null };


export const DismissAiSuggestionDocument = gql`
    mutation DismissAiSuggestion($where: UniqueId!) {
  dismissAiSuggestion(where: $where) {
    id
  }
}
    `;
export type DismissAiSuggestionMutationFn = Apollo.MutationFunction<DismissAiSuggestionMutation, DismissAiSuggestionMutationVariables>;
export function useDismissAiSuggestionMutation(baseOptions?: Apollo.MutationHookOptions<DismissAiSuggestionMutation, DismissAiSuggestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DismissAiSuggestionMutation, DismissAiSuggestionMutationVariables>(DismissAiSuggestionDocument, options);
      }
export type DismissAiSuggestionMutationHookResult = ReturnType<typeof useDismissAiSuggestionMutation>;
export type DismissAiSuggestionMutationResult = Apollo.MutationResult<DismissAiSuggestionMutation>;
export type DismissAiSuggestionMutationOptions = Apollo.BaseMutationOptions<DismissAiSuggestionMutation, DismissAiSuggestionMutationVariables>;