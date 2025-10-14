import type * as Types from '../../../../types';

import { gql } from '@apollo/client';
import { ImagesFragmentDoc } from '../../../../fragments/__generated__/images.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateIncidentImagesMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  images?: Types.InputMaybe<Types.ImageUpdateManyWithoutIncidentNestedInput>;
}>;


export type UpdateIncidentImagesMutation = { __typename?: 'Mutation', updateIncident: { __typename?: 'Incident', id: string, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, rotation: number, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }> } };


export const UpdateIncidentImagesDocument = gql`
    mutation UpdateIncidentImages($id: String!, $images: ImageUpdateManyWithoutIncidentNestedInput) {
  updateIncident(where: {id: $id}, data: {images: $images}) {
    id
    images {
      ...Images
    }
  }
}
    ${ImagesFragmentDoc}`;
export type UpdateIncidentImagesMutationFn = Apollo.MutationFunction<UpdateIncidentImagesMutation, UpdateIncidentImagesMutationVariables>;
export function useUpdateIncidentImagesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIncidentImagesMutation, UpdateIncidentImagesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIncidentImagesMutation, UpdateIncidentImagesMutationVariables>(UpdateIncidentImagesDocument, options);
      }
export type UpdateIncidentImagesMutationHookResult = ReturnType<typeof useUpdateIncidentImagesMutation>;
export type UpdateIncidentImagesMutationResult = Apollo.MutationResult<UpdateIncidentImagesMutation>;
export type UpdateIncidentImagesMutationOptions = Apollo.BaseMutationOptions<UpdateIncidentImagesMutation, UpdateIncidentImagesMutationVariables>;