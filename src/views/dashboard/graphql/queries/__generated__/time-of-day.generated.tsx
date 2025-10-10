import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IncidentsTimeOfDayQueryVariables = Types.Exact<{
  where: Types.DashboardInput;
}>;


export type IncidentsTimeOfDayQuery = { __typename?: 'Query', incidentsTimeOfDay: Array<{ __typename?: 'Graph', value: number, label: string }> };


export const IncidentsTimeOfDayDocument = gql`
    query IncidentsTimeOfDay($where: DashboardInput!) {
  incidentsTimeOfDay(where: $where) {
    value
    label
  }
}
    `;
export function useIncidentsTimeOfDayQuery(baseOptions: Apollo.QueryHookOptions<IncidentsTimeOfDayQuery, IncidentsTimeOfDayQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IncidentsTimeOfDayQuery, IncidentsTimeOfDayQueryVariables>(IncidentsTimeOfDayDocument, options);
      }
export function useIncidentsTimeOfDayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IncidentsTimeOfDayQuery, IncidentsTimeOfDayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IncidentsTimeOfDayQuery, IncidentsTimeOfDayQueryVariables>(IncidentsTimeOfDayDocument, options);
        }
export type IncidentsTimeOfDayQueryHookResult = ReturnType<typeof useIncidentsTimeOfDayQuery>;
export type IncidentsTimeOfDayLazyQueryHookResult = ReturnType<typeof useIncidentsTimeOfDayLazyQuery>;
export type IncidentsTimeOfDayQueryResult = Apollo.QueryResult<IncidentsTimeOfDayQuery, IncidentsTimeOfDayQueryVariables>;