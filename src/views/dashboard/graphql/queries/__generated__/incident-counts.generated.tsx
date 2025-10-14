import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IncidentCountQueryVariables = Types.Exact<{
  where: Types.DashboardInput;
}>;


export type IncidentCountQuery = { __typename?: 'Query', incidentCount: number };


export const IncidentCountDocument = gql`
    query IncidentCount($where: DashboardInput!) {
  incidentCount(where: $where)
}
    `;
export function useIncidentCountQuery(baseOptions: Apollo.QueryHookOptions<IncidentCountQuery, IncidentCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IncidentCountQuery, IncidentCountQueryVariables>(IncidentCountDocument, options);
      }
export function useIncidentCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IncidentCountQuery, IncidentCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IncidentCountQuery, IncidentCountQueryVariables>(IncidentCountDocument, options);
        }
export type IncidentCountQueryHookResult = ReturnType<typeof useIncidentCountQuery>;
export type IncidentCountLazyQueryHookResult = ReturnType<typeof useIncidentCountLazyQuery>;
export type IncidentCountQueryResult = Apollo.QueryResult<IncidentCountQuery, IncidentCountQueryVariables>;