import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteCustomGalleryMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeleteCustomGalleryMutation = { __typename?: 'Mutation', deleteCustomGallery: { __typename?: 'CustomGallery', id: string } };


export const DeleteCustomGalleryDocument = gql`
    mutation deleteCustomGallery($id: String!) {
  deleteCustomGallery(where: {id: $id}) {
    id
  }
}
    `;
export type DeleteCustomGalleryMutationFn = Apollo.MutationFunction<DeleteCustomGalleryMutation, DeleteCustomGalleryMutationVariables>;
export function useDeleteCustomGalleryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCustomGalleryMutation, DeleteCustomGalleryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCustomGalleryMutation, DeleteCustomGalleryMutationVariables>(DeleteCustomGalleryDocument, options);
      }
export type DeleteCustomGalleryMutationHookResult = ReturnType<typeof useDeleteCustomGalleryMutation>;
export type DeleteCustomGalleryMutationResult = Apollo.MutationResult<DeleteCustomGalleryMutation>;
export type DeleteCustomGalleryMutationOptions = Apollo.BaseMutationOptions<DeleteCustomGalleryMutation, DeleteCustomGalleryMutationVariables>;