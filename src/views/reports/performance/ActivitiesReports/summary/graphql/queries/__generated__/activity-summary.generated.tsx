import type * as Types from '../../../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ActivitySummaryQueryVariables = Types.Exact<{
  where: Types.ActivityReportsWhere;
}>;


export type ActivitySummaryQuery = { __typename?: 'Query', activitySummary: { __typename?: 'ActivitySummary', total: number, percentComplete: string, overdue: number, completed: number } };


export const ActivitySummaryDocument = gql`
    query ActivitySummary($where: ActivityReportsWhere!) {
  activitySummary(where: $where) {
    total
    percentComplete
    overdue
    completed
  }
}
    `;
export function useActivitySummaryQuery(baseOptions: Apollo.QueryHookOptions<ActivitySummaryQuery, ActivitySummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActivitySummaryQuery, ActivitySummaryQueryVariables>(ActivitySummaryDocument, options);
      }
export function useActivitySummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivitySummaryQuery, ActivitySummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActivitySummaryQuery, ActivitySummaryQueryVariables>(ActivitySummaryDocument, options);
        }
export type ActivitySummaryQueryHookResult = ReturnType<typeof useActivitySummaryQuery>;
export type ActivitySummaryLazyQueryHookResult = ReturnType<typeof useActivitySummaryLazyQuery>;
export type ActivitySummaryQueryResult = Apollo.QueryResult<ActivitySummaryQuery, ActivitySummaryQueryVariables>;