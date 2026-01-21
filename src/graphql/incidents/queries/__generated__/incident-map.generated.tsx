import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListIncidentsForMapQueryVariables = Types.Exact<{
  where: Types.IncidentWhereInput;
}>;


export type ListIncidentsForMapQuery = { __typename?: 'Query', incidents: Array<{ __typename?: 'Incident', id: string, totalValue: number, location?: { __typename?: 'Address', geoLat?: number | null, geoLng?: number | null } | null }> };


export const ListIncidentsForMapDocument = gql`
    query ListIncidentsForMap($where: IncidentWhereInput!) {
  incidents(where: $where) {
    id
    totalValue
    location {
      geoLat
      geoLng
    }
  }
}
    `;
export function useListIncidentsForMapQuery(baseOptions: Apollo.QueryHookOptions<ListIncidentsForMapQuery, ListIncidentsForMapQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListIncidentsForMapQuery, ListIncidentsForMapQueryVariables>(ListIncidentsForMapDocument, options);
      }
export function useListIncidentsForMapLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListIncidentsForMapQuery, ListIncidentsForMapQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListIncidentsForMapQuery, ListIncidentsForMapQueryVariables>(ListIncidentsForMapDocument, options);
        }
export type ListIncidentsForMapQueryHookResult = ReturnType<typeof useListIncidentsForMapQuery>;
export type ListIncidentsForMapLazyQueryHookResult = ReturnType<typeof useListIncidentsForMapLazyQuery>;
export type ListIncidentsForMapQueryResult = Apollo.QueryResult<ListIncidentsForMapQuery, ListIncidentsForMapQueryVariables>;