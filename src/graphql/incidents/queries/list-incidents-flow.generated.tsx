import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListIncidentsFlowQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.IncidentWhereInput>;
}>;


export type ListIncidentsFlowQuery = { __typename?: 'Query', incidents: Array<{ __typename?: 'Incident', dayTime: string, subject?: string | null, id: string }> };


export const ListIncidentsFlowDocument = gql`
    query ListIncidentsFlow($where: IncidentWhereInput) {
  incidents(where: $where) {
    dayTime
    subject
    id
  }
}
    `;
export function useListIncidentsFlowQuery(baseOptions?: Apollo.QueryHookOptions<ListIncidentsFlowQuery, ListIncidentsFlowQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListIncidentsFlowQuery, ListIncidentsFlowQueryVariables>(ListIncidentsFlowDocument, options);
      }
export function useListIncidentsFlowLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListIncidentsFlowQuery, ListIncidentsFlowQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListIncidentsFlowQuery, ListIncidentsFlowQueryVariables>(ListIncidentsFlowDocument, options);
        }
export type ListIncidentsFlowQueryHookResult = ReturnType<typeof useListIncidentsFlowQuery>;
export type ListIncidentsFlowLazyQueryHookResult = ReturnType<typeof useListIncidentsFlowLazyQuery>;
export type ListIncidentsFlowQueryResult = Apollo.QueryResult<ListIncidentsFlowQuery, ListIncidentsFlowQueryVariables>;