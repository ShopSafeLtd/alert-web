import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteShoeMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeleteShoeMutation = { readonly __typename?: 'Mutation', readonly deleteShoe: { readonly __typename?: 'Shoe', readonly id: string, readonly status: Types.ShoeStatus } };


export const DeleteShoeDocument = gql`
    mutation deleteShoe($id: String!) {
  deleteShoe(where: {id: $id}) {
    id
    status
  }
}
    `;
export type DeleteShoeMutationFn = Apollo.MutationFunction<DeleteShoeMutation, DeleteShoeMutationVariables>;
export function useDeleteShoeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteShoeMutation, DeleteShoeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteShoeMutation, DeleteShoeMutationVariables>(DeleteShoeDocument, options);
      }
export type DeleteShoeMutationHookResult = ReturnType<typeof useDeleteShoeMutation>;
export type DeleteShoeMutationResult = Apollo.MutationResult<DeleteShoeMutation>;
export type DeleteShoeMutationOptions = Apollo.BaseMutationOptions<DeleteShoeMutation, DeleteShoeMutationVariables>;