import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCustomGalleryMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.CustomGalleryUpdateInput;
}>;


export type UpdateCustomGalleryMutation = { __typename?: 'Mutation', updateCustomGallery: { __typename?: 'CustomGallery', id: string, name: string, description?: string | null, groups: Array<{ __typename?: 'Group', id: string }> } };


export const UpdateCustomGalleryDocument = gql`
    mutation updateCustomGallery($where: UniqueId!, $data: CustomGalleryUpdateInput!) {
  updateCustomGallery(where: $where, data: $data) {
    id
    name
    description
    groups {
      id
    }
  }
}
    `;
export type UpdateCustomGalleryMutationFn = Apollo.MutationFunction<UpdateCustomGalleryMutation, UpdateCustomGalleryMutationVariables>;
export function useUpdateCustomGalleryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCustomGalleryMutation, UpdateCustomGalleryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCustomGalleryMutation, UpdateCustomGalleryMutationVariables>(UpdateCustomGalleryDocument, options);
      }
export type UpdateCustomGalleryMutationHookResult = ReturnType<typeof useUpdateCustomGalleryMutation>;
export type UpdateCustomGalleryMutationResult = Apollo.MutationResult<UpdateCustomGalleryMutation>;
export type UpdateCustomGalleryMutationOptions = Apollo.BaseMutationOptions<UpdateCustomGalleryMutation, UpdateCustomGalleryMutationVariables>;