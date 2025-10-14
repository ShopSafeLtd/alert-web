import type * as Types from '../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ActivityGraphQueryVariables = Types.Exact<{
  where: Types.ActivityReportsWhere;
}>;


export type ActivityGraphQuery = { __typename?: 'Query', activityGraph: Array<{ __typename?: 'Graph', label: string, value: number }> };


export const ActivityGraphDocument = gql`
    query ActivityGraph($where: ActivityReportsWhere!) {
  activityGraph(where: $where) {
    label
    value
  }
}
    `;
export function useActivityGraphQuery(baseOptions: Apollo.QueryHookOptions<ActivityGraphQuery, ActivityGraphQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActivityGraphQuery, ActivityGraphQueryVariables>(ActivityGraphDocument, options);
      }
export function useActivityGraphLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivityGraphQuery, ActivityGraphQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActivityGraphQuery, ActivityGraphQueryVariables>(ActivityGraphDocument, options);
        }
export type ActivityGraphQueryHookResult = ReturnType<typeof useActivityGraphQuery>;
export type ActivityGraphLazyQueryHookResult = ReturnType<typeof useActivityGraphLazyQuery>;
export type ActivityGraphQueryResult = Apollo.QueryResult<ActivityGraphQuery, ActivityGraphQueryVariables>;