import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MergeOffendersMutationVariables = Types.Exact<{
  data: Types.MergeOffendersInput;
}>;

export type MergeOffendersMutation = {
  __typename?: 'Mutation';
  mergeOffender: { __typename?: 'Offender'; id: string };
};

export const MergeOffendersDocument = gql`
  mutation MergeOffenders($data: MergeOffendersInput!) {
    mergeOffender(data: $data) {
      id
    }
  }
`;
export type MergeOffendersMutationFn = Apollo.MutationFunction<
  MergeOffendersMutation,
  MergeOffendersMutationVariables
>;
export function useMergeOffendersMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MergeOffendersMutation,
    MergeOffendersMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    MergeOffendersMutation,
    MergeOffendersMutationVariables
  >(MergeOffendersDocument, options);
}
export type MergeOffendersMutationHookResult = ReturnType<
  typeof useMergeOffendersMutation
>;
export type MergeOffendersMutationResult =
  Apollo.MutationResult<MergeOffendersMutation>;
export type MergeOffendersMutationOptions = Apollo.BaseMutationOptions<
  MergeOffendersMutation,
  MergeOffendersMutationVariables
>;
