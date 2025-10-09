import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListIncidentStatusesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ListIncidentStatusesQuery = { __typename?: 'Query', incidentStatuses: Array<{ __typename?: 'IncidentStatus', id: string, name: string, tooltip?: string | null, description?: string | null }> };


export const ListIncidentStatusesDocument = gql`
    query ListIncidentStatuses {
  incidentStatuses {
    id
    name
    tooltip
    description
  }
}
    `;
export function useListIncidentStatusesQuery(baseOptions?: Apollo.QueryHookOptions<ListIncidentStatusesQuery, ListIncidentStatusesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListIncidentStatusesQuery, ListIncidentStatusesQueryVariables>(ListIncidentStatusesDocument, options);
      }
export function useListIncidentStatusesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListIncidentStatusesQuery, ListIncidentStatusesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListIncidentStatusesQuery, ListIncidentStatusesQueryVariables>(ListIncidentStatusesDocument, options);
        }
export type ListIncidentStatusesQueryHookResult = ReturnType<typeof useListIncidentStatusesQuery>;
export type ListIncidentStatusesLazyQueryHookResult = ReturnType<typeof useListIncidentStatusesLazyQuery>;
export type ListIncidentStatusesQueryResult = Apollo.QueryResult<ListIncidentStatusesQuery, ListIncidentStatusesQueryVariables>;