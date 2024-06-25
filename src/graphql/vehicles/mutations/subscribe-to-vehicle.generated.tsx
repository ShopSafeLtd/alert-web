import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SubscribeToVehicleMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type SubscribeToVehicleMutation = { __typename?: 'Mutation', subscribeToVehicle: { __typename?: 'Vehicle', id: string, subscribed: boolean } };


export const SubscribeToVehicleDocument = gql`
    mutation SubscribeToVehicle($where: UniqueId!) {
  subscribeToVehicle(where: $where) {
    id
    subscribed
  }
}
    `;
export type SubscribeToVehicleMutationFn = Apollo.MutationFunction<SubscribeToVehicleMutation, SubscribeToVehicleMutationVariables>;
export function useSubscribeToVehicleMutation(baseOptions?: Apollo.MutationHookOptions<SubscribeToVehicleMutation, SubscribeToVehicleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubscribeToVehicleMutation, SubscribeToVehicleMutationVariables>(SubscribeToVehicleDocument, options);
      }
export type SubscribeToVehicleMutationHookResult = ReturnType<typeof useSubscribeToVehicleMutation>;
export type SubscribeToVehicleMutationResult = Apollo.MutationResult<SubscribeToVehicleMutation>;
export type SubscribeToVehicleMutationOptions = Apollo.BaseMutationOptions<SubscribeToVehicleMutation, SubscribeToVehicleMutationVariables>;