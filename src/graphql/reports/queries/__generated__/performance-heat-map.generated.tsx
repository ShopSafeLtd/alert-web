import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PerformanceHeatMapQueryVariables = Types.Exact<{
  where: Types.UserContributionWhereInput;
}>;


export type PerformanceHeatMapQuery = { __typename?: 'Query', incidentHeatPerformance: { __typename?: 'ListIncidentsHeatPerformance', total: number, incidents: Array<{ __typename?: 'HeatMapLocations', id: string, location?: { __typename?: 'LatLngId', id: string, geoLat?: number | null, geoLng?: number | null } | null }> } };


export const PerformanceHeatMapDocument = gql`
    query PerformanceHeatMap($where: UserContributionWhereInput!) {
  incidentHeatPerformance(where: $where) {
    total
    incidents {
      id
      location {
        id
        geoLat
        geoLng
      }
    }
  }
}
    `;
export function usePerformanceHeatMapQuery(baseOptions: Apollo.QueryHookOptions<PerformanceHeatMapQuery, PerformanceHeatMapQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PerformanceHeatMapQuery, PerformanceHeatMapQueryVariables>(PerformanceHeatMapDocument, options);
      }
export function usePerformanceHeatMapLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PerformanceHeatMapQuery, PerformanceHeatMapQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PerformanceHeatMapQuery, PerformanceHeatMapQueryVariables>(PerformanceHeatMapDocument, options);
        }
export type PerformanceHeatMapQueryHookResult = ReturnType<typeof usePerformanceHeatMapQuery>;
export type PerformanceHeatMapLazyQueryHookResult = ReturnType<typeof usePerformanceHeatMapLazyQuery>;
export type PerformanceHeatMapQueryResult = Apollo.QueryResult<PerformanceHeatMapQuery, PerformanceHeatMapQueryVariables>;