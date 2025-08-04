import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUserDisableMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.UserUpdateInput;
}>;


export type UpdateUserDisableMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, disabled: boolean } };


export const UpdateUserDisableDocument = gql`
    mutation updateUserDisable($where: UniqueId!, $data: UserUpdateInput!) {
  updateUser(where: $where, data: $data) {
    id
    disabled
  }
}
    `;
export type UpdateUserDisableMutationFn = Apollo.MutationFunction<UpdateUserDisableMutation, UpdateUserDisableMutationVariables>;
export function useUpdateUserDisableMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserDisableMutation, UpdateUserDisableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserDisableMutation, UpdateUserDisableMutationVariables>(UpdateUserDisableDocument, options);
      }
export type UpdateUserDisableMutationHookResult = ReturnType<typeof useUpdateUserDisableMutation>;
export type UpdateUserDisableMutationResult = Apollo.MutationResult<UpdateUserDisableMutation>;
export type UpdateUserDisableMutationOptions = Apollo.BaseMutationOptions<UpdateUserDisableMutation, UpdateUserDisableMutationVariables>;