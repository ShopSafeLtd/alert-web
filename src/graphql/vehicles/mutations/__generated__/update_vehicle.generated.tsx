import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateVehicleMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.VehicleUpdateInput;
}>;


export type UpdateVehicleMutation = { __typename?: 'Mutation', updateVehicle: { __typename?: 'Vehicle', id: string, make?: string | null, model?: string | null, registration?: string | null, reference?: number | null, updatedAt: Date, colour?: string | null, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, url?: string | null, position: Types.ImagePosition, rotation: number, policeImage?: boolean | null, primary?: boolean | null }>, customGalleries: Array<{ __typename?: 'CustomGallery', id: string, name: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, incidents: Array<{ __typename?: 'Incident', id: string, subject: string }>, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null }>, crimeGroup: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null }> } };


export const UpdateVehicleDocument = gql`
    mutation updateVehicle($where: UniqueId!, $data: VehicleUpdateInput!) {
  updateVehicle(where: $where, data: $data) {
    id
    make
    model
    registration
    reference
    images {
      id
      optimised
      url
      position
      rotation
      policeImage
      rotation
      primary
    }
    customGalleries {
      id
      name
    }
    groups {
      id
      name
    }
    incidents {
      id
      subject
    }
    offenders {
      id
      name
    }
    updatedAt
    colour
    crimeGroup {
      id
      reference
    }
  }
}
    `;
export type UpdateVehicleMutationFn = Apollo.MutationFunction<UpdateVehicleMutation, UpdateVehicleMutationVariables>;
export function useUpdateVehicleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVehicleMutation, UpdateVehicleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVehicleMutation, UpdateVehicleMutationVariables>(UpdateVehicleDocument, options);
      }
export type UpdateVehicleMutationHookResult = ReturnType<typeof useUpdateVehicleMutation>;
export type UpdateVehicleMutationResult = Apollo.MutationResult<UpdateVehicleMutation>;
export type UpdateVehicleMutationOptions = Apollo.BaseMutationOptions<UpdateVehicleMutation, UpdateVehicleMutationVariables>;