import type * as Types from '../../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateDemDeviceMutationVariables = Types.Exact<{
  data: Types.UpdateDemDevice;
  where: Types.UniqueId;
}>;


export type UpdateDemDeviceMutation = { __typename?: 'Mutation', updateDemDevice: { __typename?: 'DemDevice', id: string, business?: { __typename?: 'Business', id: string, name: string } | null } };


export const UpdateDemDeviceDocument = gql`
    mutation UpdateDemDevice($data: UpdateDemDevice!, $where: UniqueId!) {
  updateDemDevice(data: $data, where: $where) {
    id
    business {
      id
      name
    }
  }
}
    `;
export type UpdateDemDeviceMutationFn = Apollo.MutationFunction<UpdateDemDeviceMutation, UpdateDemDeviceMutationVariables>;
export function useUpdateDemDeviceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDemDeviceMutation, UpdateDemDeviceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDemDeviceMutation, UpdateDemDeviceMutationVariables>(UpdateDemDeviceDocument, options);
      }
export type UpdateDemDeviceMutationHookResult = ReturnType<typeof useUpdateDemDeviceMutation>;
export type UpdateDemDeviceMutationResult = Apollo.MutationResult<UpdateDemDeviceMutation>;
export type UpdateDemDeviceMutationOptions = Apollo.BaseMutationOptions<UpdateDemDeviceMutation, UpdateDemDeviceMutationVariables>;