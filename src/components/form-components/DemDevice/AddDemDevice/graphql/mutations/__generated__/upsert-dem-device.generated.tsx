import type * as Types from '../../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { DemDevicesFragmentDoc } from '../../../../../../../graphql/fragments/__generated__/dem-device.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpsertDemDeviceMutationVariables = Types.Exact<{
  data: Types.UpsertDemDevice;
}>;


export type UpsertDemDeviceMutation = { __typename?: 'Mutation', upsertDemDevice?: { __typename?: 'DemDevice', id?: string | null, demId?: string | null, createdAt?: Date | null, serialNumber?: string | null, name?: string | null, evidence?: Array<{ __typename?: 'Document', id?: string | null, name?: string | null, url?: string | null, fileType?: Types.FileType | null }> | null, demGroups?: Array<{ __typename?: 'DemGroup', id?: string | null, name?: string | null }> | null, business?: { __typename?: 'Business', id: string, name?: string | null } | null } | null };


export const UpsertDemDeviceDocument = gql`
    mutation UpsertDemDevice($data: UpsertDemDevice!) {
  upsertDemDevice(data: $data) {
    ...DemDevices
    evidence {
      id
      name
      url
      fileType
    }
    demGroups {
      id
      name
    }
    business {
      id
      name
    }
  }
}
    ${DemDevicesFragmentDoc}`;
export type UpsertDemDeviceMutationFn = Apollo.MutationFunction<UpsertDemDeviceMutation, UpsertDemDeviceMutationVariables>;
export function useUpsertDemDeviceMutation(baseOptions?: Apollo.MutationHookOptions<UpsertDemDeviceMutation, UpsertDemDeviceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertDemDeviceMutation, UpsertDemDeviceMutationVariables>(UpsertDemDeviceDocument, options);
      }
export type UpsertDemDeviceMutationHookResult = ReturnType<typeof useUpsertDemDeviceMutation>;
export type UpsertDemDeviceMutationResult = Apollo.MutationResult<UpsertDemDeviceMutation>;
export type UpsertDemDeviceMutationOptions = Apollo.BaseMutationOptions<UpsertDemDeviceMutation, UpsertDemDeviceMutationVariables>;