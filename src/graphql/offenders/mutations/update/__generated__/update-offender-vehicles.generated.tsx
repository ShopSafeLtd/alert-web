import type * as Types from '../../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateOffenderVehiclesMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  vehicles?: Types.InputMaybe<Types.VehicleUpdateManyWithoutOffenderNestedInput>;
}>;


export type UpdateOffenderVehiclesMutation = { __typename?: 'Mutation', updateOffender: { __typename?: 'Offender', id: string, vehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, position: Types.ImagePosition, rotation: number, policeImage?: boolean | null, primary?: boolean | null, optimised?: string | null }> }> } };


export const UpdateOffenderVehiclesDocument = gql`
    mutation UpdateOffenderVehicles($id: String!, $vehicles: VehicleUpdateManyWithoutOffenderNestedInput) {
  updateOffender(where: {id: $id}, data: {vehicles: $vehicles}) {
    id
    vehicles {
      id
      reference
      colour
      model
      make
      registration
      images(take: 1) {
        id
        url
        position
        rotation
        policeImage
        primary
        optimised
      }
    }
  }
}
    `;
export type UpdateOffenderVehiclesMutationFn = Apollo.MutationFunction<UpdateOffenderVehiclesMutation, UpdateOffenderVehiclesMutationVariables>;
export function useUpdateOffenderVehiclesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOffenderVehiclesMutation, UpdateOffenderVehiclesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOffenderVehiclesMutation, UpdateOffenderVehiclesMutationVariables>(UpdateOffenderVehiclesDocument, options);
      }
export type UpdateOffenderVehiclesMutationHookResult = ReturnType<typeof useUpdateOffenderVehiclesMutation>;
export type UpdateOffenderVehiclesMutationResult = Apollo.MutationResult<UpdateOffenderVehiclesMutation>;
export type UpdateOffenderVehiclesMutationOptions = Apollo.BaseMutationOptions<UpdateOffenderVehiclesMutation, UpdateOffenderVehiclesMutationVariables>;