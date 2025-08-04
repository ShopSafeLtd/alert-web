import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IncidentActivityAuthorisedQueryVariables = Types.Exact<{
  where: Types.IncidentWhereUniqueInput;
}>;


export type IncidentActivityAuthorisedQuery = { __typename?: 'Query', incident: { __typename?: 'Incident', id?: string | null, activityAuthorised?: boolean | null } };


export const IncidentActivityAuthorisedDocument = gql`
    query IncidentActivityAuthorised($where: IncidentWhereUniqueInput!) {
  incident(where: $where) {
    id
    activityAuthorised
  }
}
    `;
export function useIncidentActivityAuthorisedQuery(baseOptions: Apollo.QueryHookOptions<IncidentActivityAuthorisedQuery, IncidentActivityAuthorisedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IncidentActivityAuthorisedQuery, IncidentActivityAuthorisedQueryVariables>(IncidentActivityAuthorisedDocument, options);
      }
export function useIncidentActivityAuthorisedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IncidentActivityAuthorisedQuery, IncidentActivityAuthorisedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IncidentActivityAuthorisedQuery, IncidentActivityAuthorisedQueryVariables>(IncidentActivityAuthorisedDocument, options);
        }
export type IncidentActivityAuthorisedQueryHookResult = ReturnType<typeof useIncidentActivityAuthorisedQuery>;
export type IncidentActivityAuthorisedLazyQueryHookResult = ReturnType<typeof useIncidentActivityAuthorisedLazyQuery>;
export type IncidentActivityAuthorisedQueryResult = Apollo.QueryResult<IncidentActivityAuthorisedQuery, IncidentActivityAuthorisedQueryVariables>;