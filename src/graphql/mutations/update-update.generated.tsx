import type * as Types from '../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUpdateMutationVariables = Types.Exact<{
  where: Types.UpdateWhereUniqueInput;
  data: Types.UpdateUpdateDataInput;
}>;

export type UpdateUpdateMutation = {
  __typename?: 'Mutation';
  updateUpdate: { __typename?: 'Update'; id: string; text?: string | null };
};

export const UpdateUpdateDocument = gql`
  mutation UpdateUpdate(
    $where: UpdateWhereUniqueInput!
    $data: UpdateUpdateDataInput!
  ) {
    updateUpdate(where: $where, data: $data) {
      id
      text
    }
  }
`;
export type UpdateUpdateMutationFn = Apollo.MutationFunction<
  UpdateUpdateMutation,
  UpdateUpdateMutationVariables
>;
export function useUpdateUpdateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUpdateMutation,
    UpdateUpdateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateUpdateMutation,
    UpdateUpdateMutationVariables
  >(UpdateUpdateDocument, options);
}
export type UpdateUpdateMutationHookResult = ReturnType<
  typeof useUpdateUpdateMutation
>;
export type UpdateUpdateMutationResult =
  Apollo.MutationResult<UpdateUpdateMutation>;
export type UpdateUpdateMutationOptions = Apollo.BaseMutationOptions<
  UpdateUpdateMutation,
  UpdateUpdateMutationVariables
>;
