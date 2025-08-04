import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SubscribeToOffenderMutationVariables = Types.Exact<{
  where: Types.OffenderWhereUniqueInput;
}>;


export type SubscribeToOffenderMutation = { __typename?: 'Mutation', subscribeToOffender?: { __typename?: 'Offender', id?: string | null, subscribed?: boolean | null } | null };


export const SubscribeToOffenderDocument = gql`
    mutation SubscribeToOffender($where: OffenderWhereUniqueInput!) {
  subscribeToOffender(where: $where) {
    id
    subscribed
  }
}
    `;
export type SubscribeToOffenderMutationFn = Apollo.MutationFunction<SubscribeToOffenderMutation, SubscribeToOffenderMutationVariables>;
export function useSubscribeToOffenderMutation(baseOptions?: Apollo.MutationHookOptions<SubscribeToOffenderMutation, SubscribeToOffenderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubscribeToOffenderMutation, SubscribeToOffenderMutationVariables>(SubscribeToOffenderDocument, options);
      }
export type SubscribeToOffenderMutationHookResult = ReturnType<typeof useSubscribeToOffenderMutation>;
export type SubscribeToOffenderMutationResult = Apollo.MutationResult<SubscribeToOffenderMutation>;
export type SubscribeToOffenderMutationOptions = Apollo.BaseMutationOptions<SubscribeToOffenderMutation, SubscribeToOffenderMutationVariables>;