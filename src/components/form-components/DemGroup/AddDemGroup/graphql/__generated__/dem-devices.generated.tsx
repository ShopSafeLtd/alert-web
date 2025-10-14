import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DemDevicesSelectQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.DemDeviceWhereInput>;
}>;


export type DemDevicesSelectQuery = { __typename?: 'Query', demDevices: { __typename?: 'QueryDemDevicesConnection', totalCount: number, edges: Array<{ __typename?: 'QueryDemDevicesConnectionEdge', node: { __typename?: 'DemDevice', id: string, name: string } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } };


export const DemDevicesSelectDocument = gql`
    query demDevicesSelect($where: DemDeviceWhereInput) {
  demDevices(where: $where) {
    edges {
      node {
        id
        name
      }
    }
    totalCount
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;
export function useDemDevicesSelectQuery(baseOptions?: Apollo.QueryHookOptions<DemDevicesSelectQuery, DemDevicesSelectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DemDevicesSelectQuery, DemDevicesSelectQueryVariables>(DemDevicesSelectDocument, options);
      }
export function useDemDevicesSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DemDevicesSelectQuery, DemDevicesSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DemDevicesSelectQuery, DemDevicesSelectQueryVariables>(DemDevicesSelectDocument, options);
        }
export type DemDevicesSelectQueryHookResult = ReturnType<typeof useDemDevicesSelectQuery>;
export type DemDevicesSelectLazyQueryHookResult = ReturnType<typeof useDemDevicesSelectLazyQuery>;
export type DemDevicesSelectQueryResult = Apollo.QueryResult<DemDevicesSelectQuery, DemDevicesSelectQueryVariables>;