import type * as Types from '../../../../types.js';

import { gql } from '@apollo/client';
import { ImagesFragmentDoc } from '../../../../fragments/__generated__/images.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateIncidentVehiclesMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  vehicles?: Types.InputMaybe<Types.VehicleUpdateManyWithoutIncidentsInput>;
}>;


export type UpdateIncidentVehiclesMutation = { __typename?: 'Mutation', updateIncident?: { __typename?: 'Incident', id?: string | null, vehicles: Array<{ __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }> }> } | null };


export const UpdateIncidentVehiclesDocument = gql`
    mutation UpdateIncidentVehicles($id: String!, $vehicles: VehicleUpdateManyWithoutIncidentsInput) {
  updateIncident(where: {id: $id}, data: {vehicles: $vehicles}) {
    id
    vehicles {
      id
      reference
      colour
      model
      make
      registration
      images(take: 1) {
        ...Images
      }
    }
  }
}
    ${ImagesFragmentDoc}`;
export type UpdateIncidentVehiclesMutationFn = Apollo.MutationFunction<UpdateIncidentVehiclesMutation, UpdateIncidentVehiclesMutationVariables>;
export function useUpdateIncidentVehiclesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIncidentVehiclesMutation, UpdateIncidentVehiclesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIncidentVehiclesMutation, UpdateIncidentVehiclesMutationVariables>(UpdateIncidentVehiclesDocument, options);
      }
export type UpdateIncidentVehiclesMutationHookResult = ReturnType<typeof useUpdateIncidentVehiclesMutation>;
export type UpdateIncidentVehiclesMutationResult = Apollo.MutationResult<UpdateIncidentVehiclesMutation>;
export type UpdateIncidentVehiclesMutationOptions = Apollo.BaseMutationOptions<UpdateIncidentVehiclesMutation, UpdateIncidentVehiclesMutationVariables>;