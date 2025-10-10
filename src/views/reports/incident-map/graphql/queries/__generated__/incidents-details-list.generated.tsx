import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IncidentsMapDetailsListQueryVariables = Types.Exact<{
  ids: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type IncidentsMapDetailsListQuery = { __typename?: 'Query', incidentMapRelay: { __typename?: 'QueryIncidentMapRelayConnection', edges: Array<{ __typename?: 'QueryIncidentMapRelayConnectionEdge', node: { __typename?: 'Incident', id: string, subject: string, reference?: number | null, policeRef?: string | null, customerRef?: string | null, dayTime: string, description: string, priority: Types.IncidentPriority, approved?: boolean | null, totalValue: number, location?: { __typename?: 'Address', id: string, geoLat?: number | null, geoLng?: number | null, full: string } | null, business?: { __typename?: 'Business', id: string, name: string } | null, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, url?: string | null }>, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null }>, createdBy: { __typename?: 'User', id: string, fullName: string } } }> } };


export const IncidentsMapDetailsListDocument = gql`
    query IncidentsMapDetailsList($ids: [String!]!) {
  incidentMapRelay(where: {ids: $ids}) {
    edges {
      node {
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
  }
}
    `;
export function useIncidentsMapDetailsListQuery(baseOptions: Apollo.QueryHookOptions<IncidentsMapDetailsListQuery, IncidentsMapDetailsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IncidentsMapDetailsListQuery, IncidentsMapDetailsListQueryVariables>(IncidentsMapDetailsListDocument, options);
      }
export function useIncidentsMapDetailsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IncidentsMapDetailsListQuery, IncidentsMapDetailsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IncidentsMapDetailsListQuery, IncidentsMapDetailsListQueryVariables>(IncidentsMapDetailsListDocument, options);
        }
export type IncidentsMapDetailsListQueryHookResult = ReturnType<typeof useIncidentsMapDetailsListQuery>;
export type IncidentsMapDetailsListLazyQueryHookResult = ReturnType<typeof useIncidentsMapDetailsListLazyQuery>;
export type IncidentsMapDetailsListQueryResult = Apollo.QueryResult<IncidentsMapDetailsListQuery, IncidentsMapDetailsListQueryVariables>;