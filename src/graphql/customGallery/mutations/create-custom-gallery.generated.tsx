import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateCustomGalleryMutationVariables = Types.Exact<{
  data: Types.CreateCustomGalleryInput;
}>;


export type CreateCustomGalleryMutation = { __typename?: 'Mutation', createCustomGallery: { __typename?: 'CustomGallery', id: string, name: string, description?: string | null, groups: Array<{ __typename?: 'Group', id: string }> } };


export const CreateCustomGalleryDocument = gql`
    mutation createCustomGallery($data: CreateCustomGalleryInput!) {
  createCustomGallery(data: $data) {
    id
    name
    description
    groups {
      id
    }
  }
}
    `;
export type CreateCustomGalleryMutationFn = Apollo.MutationFunction<CreateCustomGalleryMutation, CreateCustomGalleryMutationVariables>;
export function useCreateCustomGalleryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCustomGalleryMutation, CreateCustomGalleryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCustomGalleryMutation, CreateCustomGalleryMutationVariables>(CreateCustomGalleryDocument, options);
      }
export type CreateCustomGalleryMutationHookResult = ReturnType<typeof useCreateCustomGalleryMutation>;
export type CreateCustomGalleryMutationResult = Apollo.MutationResult<CreateCustomGalleryMutation>;
export type CreateCustomGalleryMutationOptions = Apollo.BaseMutationOptions<CreateCustomGalleryMutation, CreateCustomGalleryMutationVariables>;