import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ForcedPasswordSetMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type ForcedPasswordSetMutation = { __typename?: 'Mutation', forcedPasswordSet?: string | null };


export const ForcedPasswordSetDocument = gql`
    mutation ForcedPasswordSet {
  forcedPasswordSet
}
    `;
export type ForcedPasswordSetMutationFn = Apollo.MutationFunction<ForcedPasswordSetMutation, ForcedPasswordSetMutationVariables>;
export function useForcedPasswordSetMutation(baseOptions?: Apollo.MutationHookOptions<ForcedPasswordSetMutation, ForcedPasswordSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForcedPasswordSetMutation, ForcedPasswordSetMutationVariables>(ForcedPasswordSetDocument, options);
      }
export type ForcedPasswordSetMutationHookResult = ReturnType<typeof useForcedPasswordSetMutation>;
export type ForcedPasswordSetMutationResult = Apollo.MutationResult<ForcedPasswordSetMutation>;
export type ForcedPasswordSetMutationOptions = Apollo.BaseMutationOptions<ForcedPasswordSetMutation, ForcedPasswordSetMutationVariables>;