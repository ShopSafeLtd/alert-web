import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import { VehiclesFragmentDoc } from '../../../fragments/vehicles.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateInvestigationVehiclesMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  vehicleIds?: Types.InputMaybe<
    | Array<Types.InputMaybe<Types.Scalars['String']>>
    | Types.InputMaybe<Types.Scalars['String']>
  >;
  disconnectVehicleIds?: Types.InputMaybe<
    | Array<Types.InputMaybe<Types.Scalars['String']>>
    | Types.InputMaybe<Types.Scalars['String']>
  >;
}>;

export type UpdateInvestigationVehiclesMutation = {
  __typename?: 'Mutation';
  updateInvestigation: {
    __typename?: 'Investigation';
    id: string;
    vehicles: Array<{
      __typename?: 'Vehicle';
      id: string;
      reference?: number | null;
      colour?: string | null;
      model?: string | null;
      make?: string | null;
      registration?: string | null;
    }>;
  };
};

export const UpdateInvestigationVehiclesDocument = gql`
  mutation UpdateInvestigationVehicles(
    $id: String!
    $vehicleIds: [String]
    $disconnectVehicleIds: [String]
  ) {
    updateInvestigation(
      where: { id: $id }
      data: {
        vehicleIds: $vehicleIds
        disconnectVehicleIds: $disconnectVehicleIds
      }
    ) {
      id
      vehicles {
        ...Vehicles
      }
    }
  }
  ${VehiclesFragmentDoc}
`;
export type UpdateInvestigationVehiclesMutationFn = Apollo.MutationFunction<
  UpdateInvestigationVehiclesMutation,
  UpdateInvestigationVehiclesMutationVariables
>;
export function useUpdateInvestigationVehiclesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateInvestigationVehiclesMutation,
    UpdateInvestigationVehiclesMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateInvestigationVehiclesMutation,
    UpdateInvestigationVehiclesMutationVariables
  >(UpdateInvestigationVehiclesDocument, options);
}
export type UpdateInvestigationVehiclesMutationHookResult = ReturnType<
  typeof useUpdateInvestigationVehiclesMutation
>;
export type UpdateInvestigationVehiclesMutationResult =
  Apollo.MutationResult<UpdateInvestigationVehiclesMutation>;
export type UpdateInvestigationVehiclesMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateInvestigationVehiclesMutation,
    UpdateInvestigationVehiclesMutationVariables
  >;
