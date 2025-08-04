import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateBlurFacesMutationVariables = Types.Exact<{
  faces: Array<Types.FaceInput> | Types.FaceInput;
  image: Types.BlurImageInput;
}>;


export type CreateBlurFacesMutation = { __typename?: 'Mutation', createBlurFaces?: { __typename?: 'Image', id?: string | null, optimised?: string | null, url?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, primary?: boolean | null, policeImage?: boolean | null } | null };


export const CreateBlurFacesDocument = gql`
    mutation CreateBlurFaces($faces: [FaceInput!]!, $image: BlurImageInput!) {
  createBlurFaces(faces: $faces, image: $image) {
    id
    optimised
    url
    position
    rotation
    primary
    policeImage
  }
}
    `;
export type CreateBlurFacesMutationFn = Apollo.MutationFunction<CreateBlurFacesMutation, CreateBlurFacesMutationVariables>;
export function useCreateBlurFacesMutation(baseOptions?: Apollo.MutationHookOptions<CreateBlurFacesMutation, CreateBlurFacesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBlurFacesMutation, CreateBlurFacesMutationVariables>(CreateBlurFacesDocument, options);
      }
export type CreateBlurFacesMutationHookResult = ReturnType<typeof useCreateBlurFacesMutation>;
export type CreateBlurFacesMutationResult = Apollo.MutationResult<CreateBlurFacesMutation>;
export type CreateBlurFacesMutationOptions = Apollo.BaseMutationOptions<CreateBlurFacesMutation, CreateBlurFacesMutationVariables>;