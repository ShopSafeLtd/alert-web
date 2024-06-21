import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UnsubscribeToCrimeGroupMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;

export type UnsubscribeToCrimeGroupMutation = {
  __typename?: 'Mutation';
  unsubscribeToCrimeGroup: {
    __typename?: 'CrimeGroup';
    id: string;
    subscribed: boolean;
  };
};

export const UnsubscribeToCrimeGroupDocument = gql`
  mutation UnsubscribeToCrimeGroup($where: UniqueId!) {
    unsubscribeToCrimeGroup(where: $where) {
      id
      subscribed
    }
  }
`;
export type UnsubscribeToCrimeGroupMutationFn = Apollo.MutationFunction<
  UnsubscribeToCrimeGroupMutation,
  UnsubscribeToCrimeGroupMutationVariables
>;
export function useUnsubscribeToCrimeGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UnsubscribeToCrimeGroupMutation,
    UnsubscribeToCrimeGroupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UnsubscribeToCrimeGroupMutation,
    UnsubscribeToCrimeGroupMutationVariables
  >(UnsubscribeToCrimeGroupDocument, options);
}
export type UnsubscribeToCrimeGroupMutationHookResult = ReturnType<
  typeof useUnsubscribeToCrimeGroupMutation
>;
export type UnsubscribeToCrimeGroupMutationResult =
  Apollo.MutationResult<UnsubscribeToCrimeGroupMutation>;
export type UnsubscribeToCrimeGroupMutationOptions = Apollo.BaseMutationOptions<
  UnsubscribeToCrimeGroupMutation,
  UnsubscribeToCrimeGroupMutationVariables
>;
