import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpsertPermissionMutationVariables = Types.Exact<{
  data: Types.UpsertRole;
}>;

export type UpsertPermissionMutation = {
  __typename?: 'Mutation';
  upsertPermission: { __typename?: 'CustomRole'; id: string };
};

export const UpsertPermissionDocument = gql`
  mutation UpsertPermission($data: UpsertRole!) {
    upsertPermission(data: $data) {
      id
    }
  }
`;
export type UpsertPermissionMutationFn = Apollo.MutationFunction<
  UpsertPermissionMutation,
  UpsertPermissionMutationVariables
>;
export function useUpsertPermissionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpsertPermissionMutation,
    UpsertPermissionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpsertPermissionMutation,
    UpsertPermissionMutationVariables
  >(UpsertPermissionDocument, options);
}
export type UpsertPermissionMutationHookResult = ReturnType<
  typeof useUpsertPermissionMutation
>;
export type UpsertPermissionMutationResult =
  Apollo.MutationResult<UpsertPermissionMutation>;
export type UpsertPermissionMutationOptions = Apollo.BaseMutationOptions<
  UpsertPermissionMutation,
  UpsertPermissionMutationVariables
>;
