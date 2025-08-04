import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateSimpleVehicleMutationVariables = Types.Exact<{
  data: Types.CreateVehicleDataInput;
}>;


export type CreateSimpleVehicleMutation = { __typename?: 'Mutation', createVehicle?: { __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, policeImage?: boolean | null, primary?: boolean | null, position?: Types.ImagePosition | null, rotation?: number | null, optimised?: string | null }> } | null };


export const CreateSimpleVehicleDocument = gql`
    mutation CreateSimpleVehicle($data: CreateVehicleDataInput!) {
  createVehicle(data: $data) {
    id
    reference
    colour
    model
    make
    registration
    images(take: 1) {
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
export type CreateSimpleVehicleMutationFn = Apollo.MutationFunction<CreateSimpleVehicleMutation, CreateSimpleVehicleMutationVariables>;
export function useCreateSimpleVehicleMutation(baseOptions?: Apollo.MutationHookOptions<CreateSimpleVehicleMutation, CreateSimpleVehicleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSimpleVehicleMutation, CreateSimpleVehicleMutationVariables>(CreateSimpleVehicleDocument, options);
      }
export type CreateSimpleVehicleMutationHookResult = ReturnType<typeof useCreateSimpleVehicleMutation>;
export type CreateSimpleVehicleMutationResult = Apollo.MutationResult<CreateSimpleVehicleMutation>;
export type CreateSimpleVehicleMutationOptions = Apollo.BaseMutationOptions<CreateSimpleVehicleMutation, CreateSimpleVehicleMutationVariables>;