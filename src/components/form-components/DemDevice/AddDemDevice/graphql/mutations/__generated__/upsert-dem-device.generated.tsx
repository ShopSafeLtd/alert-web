import type * as Types from '../../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { DemDevicesFragmentDoc } from '../../../../../../../graphql/fragments/__generated__/dem-device.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpsertDemDeviceMutationVariables = Types.Exact<{
  data: Types.UpsertDemDevice;
}>;


export type UpsertDemDeviceMutation = { __typename?: 'Mutation', upsertDemDevice: { __typename?: 'DemDevice', id: string, demId: string, createdAt: Date, serialNumber?: string | null, name: string, evidence: Array<{ __typename?: 'Document', id: string, name: string, url: string, fileType?: Types.FileType | null }>, demGroups: Array<{ __typename?: 'DemGroup', id: string, name: string }>, business: { __typename?: 'Business', id: string, name: string } } };


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