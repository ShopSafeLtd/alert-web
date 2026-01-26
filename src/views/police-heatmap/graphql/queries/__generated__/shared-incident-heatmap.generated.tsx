import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SharedIncidentHeatmapQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.SharedIncidentRelayWhereInput>;
}>;


export type SharedIncidentHeatmapQuery = { __typename?: 'Query', sharedIncidentHeatmap: { __typename?: 'SharedIncidentHeatmap', total: number, points: Array<{ __typename?: 'SharedIncidentHeatmapPoint', id: string, lat: number, lng: number, policePriorityScore?: number | null, createdAt: Date }> } };


export const SharedIncidentHeatmapDocument = gql`
    query SharedIncidentHeatmap($where: SharedIncidentRelayWhereInput) {
  sharedIncidentHeatmap(where: $where) {
    points {
      id
      lat
      lng
      policePriorityScore
      createdAt
    }
    total
  }
}
    `;
export function useSharedIncidentHeatmapQuery(baseOptions?: Apollo.QueryHookOptions<SharedIncidentHeatmapQuery, SharedIncidentHeatmapQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SharedIncidentHeatmapQuery, SharedIncidentHeatmapQueryVariables>(SharedIncidentHeatmapDocument, options);
      }
export function useSharedIncidentHeatmapLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SharedIncidentHeatmapQuery, SharedIncidentHeatmapQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SharedIncidentHeatmapQuery, SharedIncidentHeatmapQueryVariables>(SharedIncidentHeatmapDocument, options);
        }
export type SharedIncidentHeatmapQueryHookResult = ReturnType<typeof useSharedIncidentHeatmapQuery>;
export type SharedIncidentHeatmapLazyQueryHookResult = ReturnType<typeof useSharedIncidentHeatmapLazyQuery>;
export type SharedIncidentHeatmapQueryResult = Apollo.QueryResult<SharedIncidentHeatmapQuery, SharedIncidentHeatmapQueryVariables>;