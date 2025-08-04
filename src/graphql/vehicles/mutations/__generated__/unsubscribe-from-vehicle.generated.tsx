import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UnsubscribeToVehicleMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type UnsubscribeToVehicleMutation = { __typename?: 'Mutation', unsubscribeToVehicle?: { __typename?: 'Vehicle', id?: string | null, subscribed?: boolean | null } | null };


export const UnsubscribeToVehicleDocument = gql`
    mutation UnsubscribeToVehicle($where: UniqueId!) {
  unsubscribeToVehicle(where: $where) {
    id
    subscribed
  }
}
    `;
export type UnsubscribeToVehicleMutationFn = Apollo.MutationFunction<UnsubscribeToVehicleMutation, UnsubscribeToVehicleMutationVariables>;
export function useUnsubscribeToVehicleMutation(baseOptions?: Apollo.MutationHookOptions<UnsubscribeToVehicleMutation, UnsubscribeToVehicleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnsubscribeToVehicleMutation, UnsubscribeToVehicleMutationVariables>(UnsubscribeToVehicleDocument, options);
      }
export type UnsubscribeToVehicleMutationHookResult = ReturnType<typeof useUnsubscribeToVehicleMutation>;
export type UnsubscribeToVehicleMutationResult = Apollo.MutationResult<UnsubscribeToVehicleMutation>;
export type UnsubscribeToVehicleMutationOptions = Apollo.BaseMutationOptions<UnsubscribeToVehicleMutation, UnsubscribeToVehicleMutationVariables>;