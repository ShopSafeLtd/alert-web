import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteUpdateMutationVariables = Types.Exact<{
  where: Types.UpdateWhereUnique;
}>;


export type DeleteUpdateMutation = { __typename?: 'Mutation', deleteUpdate: { __typename?: 'Update', id: string, replyToId?: string | null } };


export const DeleteUpdateDocument = gql`
    mutation DeleteUpdate($where: UpdateWhereUnique!) {
  deleteUpdate(where: $where) {
    id
    replyToId
  }
}
    `;
export type DeleteUpdateMutationFn = Apollo.MutationFunction<DeleteUpdateMutation, DeleteUpdateMutationVariables>;
export function useDeleteUpdateMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUpdateMutation, DeleteUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUpdateMutation, DeleteUpdateMutationVariables>(DeleteUpdateDocument, options);
      }
export type DeleteUpdateMutationHookResult = ReturnType<typeof useDeleteUpdateMutation>;
export type DeleteUpdateMutationResult = Apollo.MutationResult<DeleteUpdateMutation>;
export type DeleteUpdateMutationOptions = Apollo.BaseMutationOptions<DeleteUpdateMutation, DeleteUpdateMutationVariables>;