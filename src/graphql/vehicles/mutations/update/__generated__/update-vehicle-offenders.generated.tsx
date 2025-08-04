import type * as Types from '../../../../types.js';

import { gql } from '@apollo/client';
import { OffendersFragmentDoc } from '../../../../fragments/__generated__/offenders.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateVehicleOffendersMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.VehicleUpdateInput;
}>;


export type UpdateVehicleOffendersMutation = { __typename?: 'Mutation', updateVehicle?: { __typename?: 'Vehicle', id?: string | null, offenders: Array<{ __typename?: 'Offender', id?: string | null, reference?: number | null, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified?: boolean | null, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, primary?: boolean | null, policeImage?: boolean | null, isFace?: boolean | null, offenders: Array<{ __typename?: 'Offender', id?: string | null, name?: string | null }> }> }> } | null };


export const UpdateVehicleOffendersDocument = gql`
    mutation updateVehicleOffenders($where: UniqueId!, $data: VehicleUpdateInput!) {
  updateVehicle(where: $where, data: $data) {
    id
    offenders {
      ...Offenders
      images(take: 1) {
        id
        url
        optimised
        card
        position
        rotation
        primary
        policeImage
        isFace
        offenders {
          id
          name
        }
      }
    }
  }
}
    ${OffendersFragmentDoc}`;
export type UpdateVehicleOffendersMutationFn = Apollo.MutationFunction<UpdateVehicleOffendersMutation, UpdateVehicleOffendersMutationVariables>;
export function useUpdateVehicleOffendersMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVehicleOffendersMutation, UpdateVehicleOffendersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVehicleOffendersMutation, UpdateVehicleOffendersMutationVariables>(UpdateVehicleOffendersDocument, options);
      }
export type UpdateVehicleOffendersMutationHookResult = ReturnType<typeof useUpdateVehicleOffendersMutation>;
export type UpdateVehicleOffendersMutationResult = Apollo.MutationResult<UpdateVehicleOffendersMutation>;
export type UpdateVehicleOffendersMutationOptions = Apollo.BaseMutationOptions<UpdateVehicleOffendersMutation, UpdateVehicleOffendersMutationVariables>;