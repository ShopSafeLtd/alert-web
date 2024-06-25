import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SubscribeToCrimeGroupMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type SubscribeToCrimeGroupMutation = { __typename?: 'Mutation', subscribeToCrimeGroup: { __typename?: 'CrimeGroup', id: string, subscribed: boolean } };


export const SubscribeToCrimeGroupDocument = gql`
    mutation SubscribeToCrimeGroup($where: UniqueId!) {
  subscribeToCrimeGroup(where: $where) {
    id
    subscribed
  }
}
    `;
export type SubscribeToCrimeGroupMutationFn = Apollo.MutationFunction<SubscribeToCrimeGroupMutation, SubscribeToCrimeGroupMutationVariables>;
export function useSubscribeToCrimeGroupMutation(baseOptions?: Apollo.MutationHookOptions<SubscribeToCrimeGroupMutation, SubscribeToCrimeGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubscribeToCrimeGroupMutation, SubscribeToCrimeGroupMutationVariables>(SubscribeToCrimeGroupDocument, options);
      }
export type SubscribeToCrimeGroupMutationHookResult = ReturnType<typeof useSubscribeToCrimeGroupMutation>;
export type SubscribeToCrimeGroupMutationResult = Apollo.MutationResult<SubscribeToCrimeGroupMutation>;
export type SubscribeToCrimeGroupMutationOptions = Apollo.BaseMutationOptions<SubscribeToCrimeGroupMutation, SubscribeToCrimeGroupMutationVariables>;