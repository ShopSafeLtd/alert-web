import type * as Types from '../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ActivityTableReportQueryVariables = Types.Exact<{
  where: Types.ActivityTableWhereInput;
}>;


export type ActivityTableReportQuery = { __typename?: 'Query', activityTableReport: { __typename?: 'ListActivityPerformance', total: number, activityPerformance: Array<{ __typename?: 'ActivityPerformance', id: string, dueDate: Date, name: string, totalQuestions: number, totalAnswers: number, totalAssignedUsers: number, completed: boolean }> } };


export const ActivityTableReportDocument = gql`
    query ActivityTableReport($where: ActivityTableWhereInput!) {
  activityTableReport(where: $where) {
    total
    activityPerformance {
      id
      dueDate
      name
      totalQuestions
      totalAnswers
      totalAssignedUsers
      completed
    }
  }
}
    `;
export function useActivityTableReportQuery(baseOptions: Apollo.QueryHookOptions<ActivityTableReportQuery, ActivityTableReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActivityTableReportQuery, ActivityTableReportQueryVariables>(ActivityTableReportDocument, options);
      }
export function useActivityTableReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivityTableReportQuery, ActivityTableReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActivityTableReportQuery, ActivityTableReportQueryVariables>(ActivityTableReportDocument, options);
        }
export type ActivityTableReportQueryHookResult = ReturnType<typeof useActivityTableReportQuery>;
export type ActivityTableReportLazyQueryHookResult = ReturnType<typeof useActivityTableReportLazyQuery>;
export type ActivityTableReportQueryResult = Apollo.QueryResult<ActivityTableReportQuery, ActivityTableReportQueryVariables>;