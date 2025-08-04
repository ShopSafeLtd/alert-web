import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UnsubscribeFromOffenderMutationVariables = Types.Exact<{
  where: Types.OffenderWhereUniqueInput;
}>;


export type UnsubscribeFromOffenderMutation = { __typename?: 'Mutation', unsubscribeFromOffender?: { __typename?: 'Offender', id?: string | null, subscribed?: boolean | null } | null };


export const UnsubscribeFromOffenderDocument = gql`
    mutation UnsubscribeFromOffender($where: OffenderWhereUniqueInput!) {
  unsubscribeFromOffender(where: $where) {
    id
    subscribed
  }
}
    `;
export type UnsubscribeFromOffenderMutationFn = Apollo.MutationFunction<UnsubscribeFromOffenderMutation, UnsubscribeFromOffenderMutationVariables>;
export function useUnsubscribeFromOffenderMutation(baseOptions?: Apollo.MutationHookOptions<UnsubscribeFromOffenderMutation, UnsubscribeFromOffenderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnsubscribeFromOffenderMutation, UnsubscribeFromOffenderMutationVariables>(UnsubscribeFromOffenderDocument, options);
      }
export type UnsubscribeFromOffenderMutationHookResult = ReturnType<typeof useUnsubscribeFromOffenderMutation>;
export type UnsubscribeFromOffenderMutationResult = Apollo.MutationResult<UnsubscribeFromOffenderMutation>;
export type UnsubscribeFromOffenderMutationOptions = Apollo.BaseMutationOptions<UnsubscribeFromOffenderMutation, UnsubscribeFromOffenderMutationVariables>;