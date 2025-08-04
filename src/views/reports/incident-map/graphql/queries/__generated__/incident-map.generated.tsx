import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IncidentSimpleMapQueryVariables = Types.Exact<{
  where: Types.IncidentWhereInput;
}>;


export type IncidentSimpleMapQuery = { __typename?: 'Query', incidents: Array<{ __typename?: 'Incident', id?: string | null, location?: { __typename?: 'Address', id: string, geoLat?: number | null, geoLng?: number | null, full?: string | null } | null }> };


export const IncidentSimpleMapDocument = gql`
    query IncidentSimpleMap($where: IncidentWhereInput!) {
  incidents(where: $where) {
    id
    location {
      id
      geoLat
      geoLng
      full
    }
  }
}
    `;
export function useIncidentSimpleMapQuery(baseOptions: Apollo.QueryHookOptions<IncidentSimpleMapQuery, IncidentSimpleMapQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IncidentSimpleMapQuery, IncidentSimpleMapQueryVariables>(IncidentSimpleMapDocument, options);
      }
export function useIncidentSimpleMapLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IncidentSimpleMapQuery, IncidentSimpleMapQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IncidentSimpleMapQuery, IncidentSimpleMapQueryVariables>(IncidentSimpleMapDocument, options);
        }
export type IncidentSimpleMapQueryHookResult = ReturnType<typeof useIncidentSimpleMapQuery>;
export type IncidentSimpleMapLazyQueryHookResult = ReturnType<typeof useIncidentSimpleMapLazyQuery>;
export type IncidentSimpleMapQueryResult = Apollo.QueryResult<IncidentSimpleMapQuery, IncidentSimpleMapQueryVariables>;