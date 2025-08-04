import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DemDeviceModelQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type DemDeviceModelQuery = { __typename?: 'Query', demDeviceModel: Array<{ __typename?: 'DemDeviceModel', id?: string | null, name?: string | null }> };


export const DemDeviceModelDocument = gql`
    query demDeviceModel {
  demDeviceModel {
    id
    name
  }
}
    `;
export function useDemDeviceModelQuery(baseOptions?: Apollo.QueryHookOptions<DemDeviceModelQuery, DemDeviceModelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DemDeviceModelQuery, DemDeviceModelQueryVariables>(DemDeviceModelDocument, options);
      }
export function useDemDeviceModelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DemDeviceModelQuery, DemDeviceModelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DemDeviceModelQuery, DemDeviceModelQueryVariables>(DemDeviceModelDocument, options);
        }
export type DemDeviceModelQueryHookResult = ReturnType<typeof useDemDeviceModelQuery>;
export type DemDeviceModelLazyQueryHookResult = ReturnType<typeof useDemDeviceModelLazyQuery>;
export type DemDeviceModelQueryResult = Apollo.QueryResult<DemDeviceModelQuery, DemDeviceModelQueryVariables>;