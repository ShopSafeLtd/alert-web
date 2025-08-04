import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateSimpleVehicleMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.VehicleUpdateInput;
}>;


export type UpdateSimpleVehicleMutation = { __typename?: 'Mutation', updateVehicle?: { __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, policeImage?: boolean | null, primary?: boolean | null, position?: Types.ImagePosition | null, rotation?: number | null, optimised?: string | null }> } | null };


export const UpdateSimpleVehicleDocument = gql`
    mutation updateSimpleVehicle($where: UniqueId!, $data: VehicleUpdateInput!) {
  updateVehicle(where: $where, data: $data) {
    id
    reference
    colour
    model
    make
    registration
    images {
      id
      url
      policeImage
      primary
      position
      rotation
      optimised
    }
  }
}
    `;
export type UpdateSimpleVehicleMutationFn = Apollo.MutationFunction<UpdateSimpleVehicleMutation, UpdateSimpleVehicleMutationVariables>;
export function useUpdateSimpleVehicleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSimpleVehicleMutation, UpdateSimpleVehicleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSimpleVehicleMutation, UpdateSimpleVehicleMutationVariables>(UpdateSimpleVehicleDocument, options);
      }
export type UpdateSimpleVehicleMutationHookResult = ReturnType<typeof useUpdateSimpleVehicleMutation>;
export type UpdateSimpleVehicleMutationResult = Apollo.MutationResult<UpdateSimpleVehicleMutation>;
export type UpdateSimpleVehicleMutationOptions = Apollo.BaseMutationOptions<UpdateSimpleVehicleMutation, UpdateSimpleVehicleMutationVariables>;