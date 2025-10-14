import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IncidentsDayOfWeekQueryVariables = Types.Exact<{
  where: Types.DashboardInput;
}>;


export type IncidentsDayOfWeekQuery = { __typename?: 'Query', incidentsDayOfWeek: Array<{ __typename?: 'Graph', value: number, label: string }> };


export const IncidentsDayOfWeekDocument = gql`
    query IncidentsDayOfWeek($where: DashboardInput!) {
  incidentsDayOfWeek(where: $where) {
    value
    label
  }
}
    `;
export function useIncidentsDayOfWeekQuery(baseOptions: Apollo.QueryHookOptions<IncidentsDayOfWeekQuery, IncidentsDayOfWeekQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IncidentsDayOfWeekQuery, IncidentsDayOfWeekQueryVariables>(IncidentsDayOfWeekDocument, options);
      }
export function useIncidentsDayOfWeekLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IncidentsDayOfWeekQuery, IncidentsDayOfWeekQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IncidentsDayOfWeekQuery, IncidentsDayOfWeekQueryVariables>(IncidentsDayOfWeekDocument, options);
        }
export type IncidentsDayOfWeekQueryHookResult = ReturnType<typeof useIncidentsDayOfWeekQuery>;
export type IncidentsDayOfWeekLazyQueryHookResult = ReturnType<typeof useIncidentsDayOfWeekLazyQuery>;
export type IncidentsDayOfWeekQueryResult = Apollo.QueryResult<IncidentsDayOfWeekQuery, IncidentsDayOfWeekQueryVariables>;