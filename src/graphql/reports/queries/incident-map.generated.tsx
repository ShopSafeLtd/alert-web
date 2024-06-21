import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IncidentMapQueryVariables = Types.Exact<{
  where: Types.IncidentWhereInput;
}>;

export type IncidentMapQuery = {
  __typename?: 'Query';
  incidents: Array<{
    __typename?: 'Incident';
    id: string;
    location?: {
      __typename?: 'Address';
      id: string;
      geoLat?: number | null;
      geoLng?: number | null;
    } | null;
  }>;
};

export const IncidentMapDocument = gql`
  query IncidentMap($where: IncidentWhereInput!) {
    incidents(where: $where) {
      id
      location {
        id
        geoLat
        geoLng
      }
    }
  }
`;
export function useIncidentMapQuery(
  baseOptions: Apollo.QueryHookOptions<
    IncidentMapQuery,
    IncidentMapQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IncidentMapQuery, IncidentMapQueryVariables>(
    IncidentMapDocument,
    options
  );
}
export function useIncidentMapLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IncidentMapQuery,
    IncidentMapQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IncidentMapQuery, IncidentMapQueryVariables>(
    IncidentMapDocument,
    options
  );
}
export type IncidentMapQueryHookResult = ReturnType<typeof useIncidentMapQuery>;
export type IncidentMapLazyQueryHookResult = ReturnType<
  typeof useIncidentMapLazyQuery
>;
export type IncidentMapQueryResult = Apollo.QueryResult<
  IncidentMapQuery,
  IncidentMapQueryVariables
>;
