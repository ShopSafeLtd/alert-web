import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LatestIncidentQueryVariables = Types.Exact<{
  where: Types.DashboardInput;
}>;


export type LatestIncidentQuery = { __typename?: 'Query', latestIncident?: { __typename?: 'LatestIncident', id: string, date: Date } | null };


export const LatestIncidentDocument = gql`
    query LatestIncident($where: DashboardInput!) {
  latestIncident(where: $where) {
    id
    date
  }
}
    `;
export function useLatestIncidentQuery(baseOptions: Apollo.QueryHookOptions<LatestIncidentQuery, LatestIncidentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LatestIncidentQuery, LatestIncidentQueryVariables>(LatestIncidentDocument, options);
      }
export function useLatestIncidentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LatestIncidentQuery, LatestIncidentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LatestIncidentQuery, LatestIncidentQueryVariables>(LatestIncidentDocument, options);
        }
export type LatestIncidentQueryHookResult = ReturnType<typeof useLatestIncidentQuery>;
export type LatestIncidentLazyQueryHookResult = ReturnType<typeof useLatestIncidentLazyQuery>;
export type LatestIncidentQueryResult = Apollo.QueryResult<LatestIncidentQuery, LatestIncidentQueryVariables>;