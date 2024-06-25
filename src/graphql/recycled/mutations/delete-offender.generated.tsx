import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteOffenderMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type DeleteOffenderMutation = { __typename?: 'Mutation', deleteOffender: { __typename?: 'Offender', id: string } };


export const DeleteOffenderDocument = gql`
    mutation deleteOffender($where: UniqueId!) {
  deleteOffender(where: $where) {
    id
  }
}
    `;
export type DeleteOffenderMutationFn = Apollo.MutationFunction<DeleteOffenderMutation, DeleteOffenderMutationVariables>;
export function useDeleteOffenderMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOffenderMutation, DeleteOffenderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOffenderMutation, DeleteOffenderMutationVariables>(DeleteOffenderDocument, options);
      }
export type DeleteOffenderMutationHookResult = ReturnType<typeof useDeleteOffenderMutation>;
export type DeleteOffenderMutationResult = Apollo.MutationResult<DeleteOffenderMutation>;
export type DeleteOffenderMutationOptions = Apollo.BaseMutationOptions<DeleteOffenderMutation, DeleteOffenderMutationVariables>;