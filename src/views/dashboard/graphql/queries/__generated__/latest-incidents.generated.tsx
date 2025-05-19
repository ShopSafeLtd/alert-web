import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LatestIncidentsQueryVariables = Types.Exact<{
  where: Types.DashboardInput;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type LatestIncidentsQuery = { __typename?: 'Query', latestIncidents: { __typename?: 'QueryLatestIncidentsConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'QueryLatestIncidentsConnectionEdge', node: { __typename?: 'Incident', referenceStr?: string | null, date: Date, id: string, description: string } }> } };


export const LatestIncidentsDocument = gql`
    query LatestIncidents($where: DashboardInput!, $after: String, $first: Int) {
  latestIncidents(where: $where, after: $after, first: $first) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        referenceStr
        date
        id
        description
      }
    }
  }
}
    `;
export function useLatestIncidentsQuery(baseOptions: Apollo.QueryHookOptions<LatestIncidentsQuery, LatestIncidentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LatestIncidentsQuery, LatestIncidentsQueryVariables>(LatestIncidentsDocument, options);
      }
export function useLatestIncidentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LatestIncidentsQuery, LatestIncidentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LatestIncidentsQuery, LatestIncidentsQueryVariables>(LatestIncidentsDocument, options);
        }
export type LatestIncidentsQueryHookResult = ReturnType<typeof useLatestIncidentsQuery>;
export type LatestIncidentsLazyQueryHookResult = ReturnType<typeof useLatestIncidentsLazyQuery>;
export type LatestIncidentsQueryResult = Apollo.QueryResult<LatestIncidentsQuery, LatestIncidentsQueryVariables>;