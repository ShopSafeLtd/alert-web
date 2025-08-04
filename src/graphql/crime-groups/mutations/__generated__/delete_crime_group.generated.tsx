import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteCrimeGroupMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeleteCrimeGroupMutation = { __typename?: 'Mutation', deleteCrimeGroup: { __typename?: 'CrimeGroup', id: string } };


export const DeleteCrimeGroupDocument = gql`
    mutation deleteCrimeGroup($id: String!) {
  deleteCrimeGroup(where: {id: $id}) {
    id
  }
}
    `;
export type DeleteCrimeGroupMutationFn = Apollo.MutationFunction<DeleteCrimeGroupMutation, DeleteCrimeGroupMutationVariables>;
export function useDeleteCrimeGroupMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCrimeGroupMutation, DeleteCrimeGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCrimeGroupMutation, DeleteCrimeGroupMutationVariables>(DeleteCrimeGroupDocument, options);
      }
export type DeleteCrimeGroupMutationHookResult = ReturnType<typeof useDeleteCrimeGroupMutation>;
export type DeleteCrimeGroupMutationResult = Apollo.MutationResult<DeleteCrimeGroupMutation>;
export type DeleteCrimeGroupMutationOptions = Apollo.BaseMutationOptions<DeleteCrimeGroupMutation, DeleteCrimeGroupMutationVariables>;