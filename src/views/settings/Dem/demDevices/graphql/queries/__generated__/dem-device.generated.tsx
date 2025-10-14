import type * as Types from '../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import { DemDevicesFragmentDoc } from '../../../../../../../graphql/fragments/__generated__/dem-device.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DemDeviceQueryVariables = Types.Exact<{
  where: Types.DemDeviceWhereUniqueInput;
}>;


export type DemDeviceQuery = { __typename?: 'Query', demDevice: { __typename?: 'DemDevice', id: string, demId: string, createdAt: Date, serialNumber?: string | null, name: string, evidence: Array<{ __typename?: 'Document', id: string, name: string, url: string, fileType?: Types.FileType | null }>, demGroups: Array<{ __typename?: 'DemGroup', id: string, name: string }>, business?: { __typename?: 'Business', id: string, name: string } | null } };


export const DemDeviceDocument = gql`
    query DemDevice($where: DemDeviceWhereUniqueInput!) {
  demDevice(where: $where) {
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
export function useDemDeviceQuery(baseOptions: Apollo.QueryHookOptions<DemDeviceQuery, DemDeviceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DemDeviceQuery, DemDeviceQueryVariables>(DemDeviceDocument, options);
      }
export function useDemDeviceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DemDeviceQuery, DemDeviceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DemDeviceQuery, DemDeviceQueryVariables>(DemDeviceDocument, options);
        }
export type DemDeviceQueryHookResult = ReturnType<typeof useDemDeviceQuery>;
export type DemDeviceLazyQueryHookResult = ReturnType<typeof useDemDeviceLazyQuery>;
export type DemDeviceQueryResult = Apollo.QueryResult<DemDeviceQuery, DemDeviceQueryVariables>;