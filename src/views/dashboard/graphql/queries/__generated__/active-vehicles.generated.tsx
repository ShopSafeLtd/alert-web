import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LatestVehiclesQueryVariables = Types.Exact<{
  where: Types.DashboardInput;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type LatestVehiclesQuery = { __typename?: 'Query', latestVehicles: { __typename?: 'QueryLatestVehiclesConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'QueryLatestVehiclesConnectionEdge', node: { __typename?: 'Vehicle', id: string, registration?: string | null, model?: string | null, make?: string | null, images: Array<{ __typename?: 'Image', low?: string | null }> } }> } };


export const LatestVehiclesDocument = gql`
    query LatestVehicles($where: DashboardInput!, $after: String, $first: Int, $take: Int) {
  latestVehicles(where: $where, after: $after, first: $first) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        registration
        model
        make
        images(take: 1) {
          low
        }
      }
    }
  }
}
    `;
export function useLatestVehiclesQuery(baseOptions: Apollo.QueryHookOptions<LatestVehiclesQuery, LatestVehiclesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LatestVehiclesQuery, LatestVehiclesQueryVariables>(LatestVehiclesDocument, options);
      }
export function useLatestVehiclesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LatestVehiclesQuery, LatestVehiclesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LatestVehiclesQuery, LatestVehiclesQueryVariables>(LatestVehiclesDocument, options);
        }
export type LatestVehiclesQueryHookResult = ReturnType<typeof useLatestVehiclesQuery>;
export type LatestVehiclesLazyQueryHookResult = ReturnType<typeof useLatestVehiclesLazyQuery>;
export type LatestVehiclesQueryResult = Apollo.QueryResult<LatestVehiclesQuery, LatestVehiclesQueryVariables>;