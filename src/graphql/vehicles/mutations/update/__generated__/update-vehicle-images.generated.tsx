import type * as Types from '../../../../types';

import { gql } from '@apollo/client';
import { ImagesFragmentDoc } from '../../../../fragments/__generated__/images.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateVehicleImagesMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.VehicleUpdateInput;
}>;


export type UpdateVehicleImagesMutation = { __typename?: 'Mutation', updateVehicle: { __typename?: 'Vehicle', id: string, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, rotation: number, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }> } };


export const UpdateVehicleImagesDocument = gql`
    mutation updateVehicleImages($where: UniqueId!, $data: VehicleUpdateInput!) {
  updateVehicle(where: $where, data: $data) {
    id
    images {
      ...Images
    }
  }
}
    ${ImagesFragmentDoc}`;
export type UpdateVehicleImagesMutationFn = Apollo.MutationFunction<UpdateVehicleImagesMutation, UpdateVehicleImagesMutationVariables>;
export function useUpdateVehicleImagesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVehicleImagesMutation, UpdateVehicleImagesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVehicleImagesMutation, UpdateVehicleImagesMutationVariables>(UpdateVehicleImagesDocument, options);
      }
export type UpdateVehicleImagesMutationHookResult = ReturnType<typeof useUpdateVehicleImagesMutation>;
export type UpdateVehicleImagesMutationResult = Apollo.MutationResult<UpdateVehicleImagesMutation>;
export type UpdateVehicleImagesMutationOptions = Apollo.BaseMutationOptions<UpdateVehicleImagesMutation, UpdateVehicleImagesMutationVariables>;