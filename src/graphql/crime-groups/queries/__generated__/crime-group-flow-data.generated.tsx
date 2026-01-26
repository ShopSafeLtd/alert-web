import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CrimeGroupFlowDataQueryVariables = Types.Exact<{
  where: Types.CrimeGroupWhereUniqueInput;
}>;


export type CrimeGroupFlowDataQuery = { __typename?: 'Query', crimeGroup: { __typename?: 'CrimeGroup', id: string, alias?: string | null, reference?: number | null, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, reference?: number | null, totalIncidents: number, totalValue: number, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, optimisedPersisted?: string | null }> }>, incidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, totalValue: number, location?: { __typename?: 'Address', full: string, geoLat?: number | null, geoLng?: number | null } | null, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null }> }> } };


export const CrimeGroupFlowDataDocument = gql`
    query CrimeGroupFlowData($where: CrimeGroupWhereUniqueInput!) {
  crimeGroup(where: $where) {
    id
    alias
    reference
    offenders {
      id
      name
      reference
      totalIncidents
      totalValue
      images(take: 1) {
        id
        optimised
        optimisedPersisted
      }
    }
    incidents {
      id
      reference
      dayTime
      totalValue
      location {
        full
        geoLat
        geoLng
      }
      crimeTypes {
        id
        name
      }
      offenders {
        id
        name
      }
    }
  }
}
    `;
export function useCrimeGroupFlowDataQuery(baseOptions: Apollo.QueryHookOptions<CrimeGroupFlowDataQuery, CrimeGroupFlowDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CrimeGroupFlowDataQuery, CrimeGroupFlowDataQueryVariables>(CrimeGroupFlowDataDocument, options);
      }
export function useCrimeGroupFlowDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CrimeGroupFlowDataQuery, CrimeGroupFlowDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CrimeGroupFlowDataQuery, CrimeGroupFlowDataQueryVariables>(CrimeGroupFlowDataDocument, options);
        }
export type CrimeGroupFlowDataQueryHookResult = ReturnType<typeof useCrimeGroupFlowDataQuery>;
export type CrimeGroupFlowDataLazyQueryHookResult = ReturnType<typeof useCrimeGroupFlowDataLazyQuery>;
export type CrimeGroupFlowDataQueryResult = Apollo.QueryResult<CrimeGroupFlowDataQuery, CrimeGroupFlowDataQueryVariables>;