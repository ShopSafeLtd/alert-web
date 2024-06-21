import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RecycleOffenderMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;

export type RecycleOffenderMutation = {
  __typename?: 'Mutation';
  recycleOffender: { __typename?: 'Offender'; id: string };
};

export const RecycleOffenderDocument = gql`
  mutation recycleOffender($where: UniqueId!) {
    recycleOffender(where: $where) {
      id
    }
  }
`;
export type RecycleOffenderMutationFn = Apollo.MutationFunction<
  RecycleOffenderMutation,
  RecycleOffenderMutationVariables
>;
export function useRecycleOffenderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RecycleOffenderMutation,
    RecycleOffenderMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RecycleOffenderMutation,
    RecycleOffenderMutationVariables
  >(RecycleOffenderDocument, options);
}
export type RecycleOffenderMutationHookResult = ReturnType<
  typeof useRecycleOffenderMutation
>;
export type RecycleOffenderMutationResult =
  Apollo.MutationResult<RecycleOffenderMutation>;
export type RecycleOffenderMutationOptions = Apollo.BaseMutationOptions<
  RecycleOffenderMutation,
  RecycleOffenderMutationVariables
>;
