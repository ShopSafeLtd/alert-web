import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SubscribeToInvestigationMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type SubscribeToInvestigationMutation = { __typename?: 'Mutation', subscribeToInvestigation: { __typename?: 'Investigation', id: string, subscribed: boolean } };


export const SubscribeToInvestigationDocument = gql`
    mutation SubscribeToInvestigation($where: UniqueId!) {
  subscribeToInvestigation(where: $where) {
    id
    subscribed
  }
}
    `;
export type SubscribeToInvestigationMutationFn = Apollo.MutationFunction<SubscribeToInvestigationMutation, SubscribeToInvestigationMutationVariables>;
export function useSubscribeToInvestigationMutation(baseOptions?: Apollo.MutationHookOptions<SubscribeToInvestigationMutation, SubscribeToInvestigationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubscribeToInvestigationMutation, SubscribeToInvestigationMutationVariables>(SubscribeToInvestigationDocument, options);
      }
export type SubscribeToInvestigationMutationHookResult = ReturnType<typeof useSubscribeToInvestigationMutation>;
export type SubscribeToInvestigationMutationResult = Apollo.MutationResult<SubscribeToInvestigationMutation>;
export type SubscribeToInvestigationMutationOptions = Apollo.BaseMutationOptions<SubscribeToInvestigationMutation, SubscribeToInvestigationMutationVariables>;