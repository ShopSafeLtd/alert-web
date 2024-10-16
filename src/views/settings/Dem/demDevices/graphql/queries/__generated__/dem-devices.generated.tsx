import type * as Types from '../../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { DemDevicesFragmentDoc } from '../../../../../../../graphql/fragments/__generated__/dem-device.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DemDevicesQueryVariables = Types.Exact<{
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Array<Types.DemDeviceOrderByWithRelationInput> | Types.DemDeviceOrderByWithRelationInput>;
  where?: Types.InputMaybe<Types.DemDeviceWhereInput>;
}>;


export type DemDevicesQuery = { __typename?: 'Query', demDevices: { __typename?: 'QueryDemDevicesConnection', totalCount: number, edges: Array<{ __typename?: 'QueryDemDevicesConnectionEdge', node: { __typename?: 'DemDevice', id: string, demId: string, createdAt: Date, serialNumber?: string | null, name: string, evidence: Array<{ __typename?: 'Document', id: string, name: string, url: string, fileType?: Types.FileType | null }>, demGroups: Array<{ __typename?: 'DemGroup', id: string, name: string }>, business: { __typename?: 'Business', id: string, name: string } } }> } };


export const DemDevicesDocument = gql`
    query DemDevices($skip: Int, $take: Int, $orderBy: [DemDeviceOrderByWithRelationInput!], $where: DemDeviceWhereInput) {
  demDevices(skip: $skip, take: $take, orderBy: $orderBy, where: $where) {
    totalCount
    edges {
      node {
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
  }
}
    ${DemDevicesFragmentDoc}`;
export function useDemDevicesQuery(baseOptions?: Apollo.QueryHookOptions<DemDevicesQuery, DemDevicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DemDevicesQuery, DemDevicesQueryVariables>(DemDevicesDocument, options);
      }
export function useDemDevicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DemDevicesQuery, DemDevicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DemDevicesQuery, DemDevicesQueryVariables>(DemDevicesDocument, options);
        }
export type DemDevicesQueryHookResult = ReturnType<typeof useDemDevicesQuery>;
export type DemDevicesLazyQueryHookResult = ReturnType<typeof useDemDevicesLazyQuery>;
export type DemDevicesQueryResult = Apollo.QueryResult<DemDevicesQuery, DemDevicesQueryVariables>;