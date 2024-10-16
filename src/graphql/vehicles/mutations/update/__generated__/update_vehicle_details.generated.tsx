import type * as Types from '../../../../types.js';

import { gql } from '@apollo/client';
import { ImagesFragmentDoc } from '../../../../fragments/__generated__/images.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateVehicleDetailsMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.VehicleUpdateInput;
  groupsWhere?: Types.InputMaybe<Types.GroupWhereInput>;
}>;


export type UpdateVehicleDetailsMutation = { __typename?: 'Mutation', updateVehicle: { __typename?: 'Vehicle', id: string, make?: string | null, model?: string | null, registration?: string | null, reference?: number | null, updatedAt: Date, colour?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }>, customGalleries: Array<{ __typename?: 'CustomGallery', id: string, name: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }> } };


export const UpdateVehicleDetailsDocument = gql`
    mutation updateVehicleDetails($where: UniqueId!, $data: VehicleUpdateInput!, $groupsWhere: GroupWhereInput) {
  updateVehicle(where: $where, data: $data) {
    id
    make
    model
    registration
    reference
    images {
      ...Images
    }
    customGalleries {
      id
      name
    }
    groups(where: $groupsWhere) {
      id
      name
    }
    updatedAt
    colour
  }
}
    ${ImagesFragmentDoc}`;
export type UpdateVehicleDetailsMutationFn = Apollo.MutationFunction<UpdateVehicleDetailsMutation, UpdateVehicleDetailsMutationVariables>;
export function useUpdateVehicleDetailsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVehicleDetailsMutation, UpdateVehicleDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVehicleDetailsMutation, UpdateVehicleDetailsMutationVariables>(UpdateVehicleDetailsDocument, options);
      }
export type UpdateVehicleDetailsMutationHookResult = ReturnType<typeof useUpdateVehicleDetailsMutation>;
export type UpdateVehicleDetailsMutationResult = Apollo.MutationResult<UpdateVehicleDetailsMutation>;
export type UpdateVehicleDetailsMutationOptions = Apollo.BaseMutationOptions<UpdateVehicleDetailsMutation, UpdateVehicleDetailsMutationVariables>;