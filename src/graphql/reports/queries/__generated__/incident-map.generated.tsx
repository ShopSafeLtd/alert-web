import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IncidentMapQueryVariables = Types.Exact<{
  where: Types.IncidentWhereInput;
}>;


export type IncidentMapQuery = { __typename?: 'Query', incidents: Array<{ __typename?: 'Incident', id: string, subject: string, reference?: number | null, policeRef?: string | null, customerRef?: string | null, dayTime: string, description: string, priority: Types.IncidentPriority, approved?: boolean | null, totalValue: number, location?: { __typename?: 'Address', id: string, geoLat?: number | null, geoLng?: number | null, full: string } | null, business?: { __typename?: 'Business', id: string, name: string } | null, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, url?: string | null }>, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null }>, createdBy: { __typename?: 'User', id: string, fullName: string } }> };


export const IncidentMapDocument = gql`
    query IncidentMap($where: IncidentWhereInput!) {
  incidents(where: $where) {
    id
    subject
    reference
    policeRef
    customerRef
    dayTime
    description
    priority
    approved
    totalValue
    location {
      id
      geoLat
      geoLng
      full
    }
    business {
      id
      name
    }
    images {
      id
      optimised
      url
    }
    crimeTypes {
      id
      name
    }
    groups {
      id
      name
    }
    offenders {
      id
      name
    }
    createdBy {
      id
      fullName
    }
  }
}
    `;
export function useIncidentMapQuery(baseOptions: Apollo.QueryHookOptions<IncidentMapQuery, IncidentMapQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IncidentMapQuery, IncidentMapQueryVariables>(IncidentMapDocument, options);
      }
export function useIncidentMapLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IncidentMapQuery, IncidentMapQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IncidentMapQuery, IncidentMapQueryVariables>(IncidentMapDocument, options);
        }
export type IncidentMapQueryHookResult = ReturnType<typeof useIncidentMapQuery>;
export type IncidentMapLazyQueryHookResult = ReturnType<typeof useIncidentMapLazyQuery>;
export type IncidentMapQueryResult = Apollo.QueryResult<IncidentMapQuery, IncidentMapQueryVariables>;