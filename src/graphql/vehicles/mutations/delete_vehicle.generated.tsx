import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteVehicleMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type DeleteVehicleMutation = {
  __typename?: 'Mutation';
  deleteVehicle: { __typename?: 'Vehicle'; id: string };
};

export const DeleteVehicleDocument = gql`
  mutation deleteVehicle($id: String!) {
    deleteVehicle(where: { id: $id }) {
      id
    }
  }
`;
export type DeleteVehicleMutationFn = Apollo.MutationFunction<
  DeleteVehicleMutation,
  DeleteVehicleMutationVariables
>;
export function useDeleteVehicleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteVehicleMutation,
    DeleteVehicleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteVehicleMutation,
    DeleteVehicleMutationVariables
  >(DeleteVehicleDocument, options);
}
export type DeleteVehicleMutationHookResult = ReturnType<
  typeof useDeleteVehicleMutation
>;
export type DeleteVehicleMutationResult =
  Apollo.MutationResult<DeleteVehicleMutation>;
export type DeleteVehicleMutationOptions = Apollo.BaseMutationOptions<
  DeleteVehicleMutation,
  DeleteVehicleMutationVariables
>;
