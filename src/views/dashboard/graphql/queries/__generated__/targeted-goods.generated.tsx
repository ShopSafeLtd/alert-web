import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TargetedGoodsDashboardQueryVariables = Types.Exact<{
  where: Types.DashboardInput;
}>;


export type TargetedGoodsDashboardQuery = { __typename?: 'Query', targetedGoodsDashboard?: Array<{ __typename?: 'Graph', value: number, label: string }> | null };


export const TargetedGoodsDashboardDocument = gql`
    query TargetedGoodsDashboard($where: DashboardInput!) {
  targetedGoodsDashboard(where: $where) {
    value
    label
  }
}
    `;
export function useTargetedGoodsDashboardQuery(baseOptions: Apollo.QueryHookOptions<TargetedGoodsDashboardQuery, TargetedGoodsDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TargetedGoodsDashboardQuery, TargetedGoodsDashboardQueryVariables>(TargetedGoodsDashboardDocument, options);
      }
export function useTargetedGoodsDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TargetedGoodsDashboardQuery, TargetedGoodsDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TargetedGoodsDashboardQuery, TargetedGoodsDashboardQueryVariables>(TargetedGoodsDashboardDocument, options);
        }
export type TargetedGoodsDashboardQueryHookResult = ReturnType<typeof useTargetedGoodsDashboardQuery>;
export type TargetedGoodsDashboardLazyQueryHookResult = ReturnType<typeof useTargetedGoodsDashboardLazyQuery>;
export type TargetedGoodsDashboardQueryResult = Apollo.QueryResult<TargetedGoodsDashboardQuery, TargetedGoodsDashboardQueryVariables>;