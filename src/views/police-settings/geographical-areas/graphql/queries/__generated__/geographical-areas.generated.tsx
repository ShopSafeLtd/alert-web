import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PoliceGeographicalAreasQueryVariables = Types.Exact<{
  schemeId: Types.Scalars['String'];
}>;


export type PoliceGeographicalAreasQuery = { __typename?: 'Query', geographicalAreas: Array<{ __typename?: 'GeographicalArea', id: string, name: string, description?: string | null, areaType: string, color?: string | null, circle?: { [key: string]: any } | null, polygon?: { [key: string]: any } | null, createdAt: Date }> };


export const PoliceGeographicalAreasDocument = gql`
    query PoliceGeographicalAreas($schemeId: String!) {
  geographicalAreas(schemeId: $schemeId) {
    id
    name
    description
    areaType
    color
    circle
    polygon
    createdAt
  }
}
    `;
export function usePoliceGeographicalAreasQuery(baseOptions: Apollo.QueryHookOptions<PoliceGeographicalAreasQuery, PoliceGeographicalAreasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PoliceGeographicalAreasQuery, PoliceGeographicalAreasQueryVariables>(PoliceGeographicalAreasDocument, options);
      }
export function usePoliceGeographicalAreasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PoliceGeographicalAreasQuery, PoliceGeographicalAreasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PoliceGeographicalAreasQuery, PoliceGeographicalAreasQueryVariables>(PoliceGeographicalAreasDocument, options);
        }
export type PoliceGeographicalAreasQueryHookResult = ReturnType<typeof usePoliceGeographicalAreasQuery>;
export type PoliceGeographicalAreasLazyQueryHookResult = ReturnType<typeof usePoliceGeographicalAreasLazyQuery>;
export type PoliceGeographicalAreasQueryResult = Apollo.QueryResult<PoliceGeographicalAreasQuery, PoliceGeographicalAreasQueryVariables>;