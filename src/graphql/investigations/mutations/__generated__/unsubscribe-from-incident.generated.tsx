import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UnsubscribeToInvestigationMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type UnsubscribeToInvestigationMutation = { __typename?: 'Mutation', unsubscribeToInvestigation?: { __typename?: 'Investigation', id?: string | null, subscribed?: boolean | null } | null };


export const UnsubscribeToInvestigationDocument = gql`
    mutation UnsubscribeToInvestigation($where: UniqueId!) {
  unsubscribeToInvestigation(where: $where) {
    id
    subscribed
  }
}
    `;
export type UnsubscribeToInvestigationMutationFn = Apollo.MutationFunction<UnsubscribeToInvestigationMutation, UnsubscribeToInvestigationMutationVariables>;
export function useUnsubscribeToInvestigationMutation(baseOptions?: Apollo.MutationHookOptions<UnsubscribeToInvestigationMutation, UnsubscribeToInvestigationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnsubscribeToInvestigationMutation, UnsubscribeToInvestigationMutationVariables>(UnsubscribeToInvestigationDocument, options);
      }
export type UnsubscribeToInvestigationMutationHookResult = ReturnType<typeof useUnsubscribeToInvestigationMutation>;
export type UnsubscribeToInvestigationMutationResult = Apollo.MutationResult<UnsubscribeToInvestigationMutation>;
export type UnsubscribeToInvestigationMutationOptions = Apollo.BaseMutationOptions<UnsubscribeToInvestigationMutation, UnsubscribeToInvestigationMutationVariables>;