import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GeographicalAreasQueryVariables = Types.Exact<{
  schemeId: Types.Scalars['String'];
}>;


export type GeographicalAreasQuery = { __typename?: 'Query', geographicalAreas: Array<{ __typename?: 'GeographicalArea', id: string, name: string, description?: string | null, color?: string | null, areaType: string, circle?: { [key: string]: any } | null, polygon?: { [key: string]: any } | null, createdAt: Date, updatedAt: Date, createdBy?: { __typename?: 'User', id: string, fullName: string } | null }> };


export const GeographicalAreasDocument = gql`
    query GeographicalAreas($schemeId: String!) {
  geographicalAreas(schemeId: $schemeId) {
    id
    name
    description
    color
    areaType
    circle
    polygon
    createdAt
    updatedAt
    createdBy {
      id
      fullName
    }
  }
}
    `;
export function useGeographicalAreasQuery(baseOptions: Apollo.QueryHookOptions<GeographicalAreasQuery, GeographicalAreasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GeographicalAreasQuery, GeographicalAreasQueryVariables>(GeographicalAreasDocument, options);
      }
export function useGeographicalAreasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GeographicalAreasQuery, GeographicalAreasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GeographicalAreasQuery, GeographicalAreasQueryVariables>(GeographicalAreasDocument, options);
        }
export type GeographicalAreasQueryHookResult = ReturnType<typeof useGeographicalAreasQuery>;
export type GeographicalAreasLazyQueryHookResult = ReturnType<typeof useGeographicalAreasLazyQuery>;
export type GeographicalAreasQueryResult = Apollo.QueryResult<GeographicalAreasQuery, GeographicalAreasQueryVariables>;