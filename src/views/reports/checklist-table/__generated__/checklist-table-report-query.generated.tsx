import type * as Types from '../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ChecklistTableReportQueryVariables = Types.Exact<{
  where: Types.ChecklistTableWhereInput;
}>;


export type ChecklistTableReportQuery = { __typename?: 'Query', checklistTableReport: { __typename?: 'ListChecklistPerformance', total: number, checklistPerformance: Array<{ __typename?: 'ChecklistPerformance', id: string, completedAt: Date, name: string, percentComplete: number, totalSections: number, totalQuestions: number, totalAnswers: number, percentAnswer: number, percentScore: number }> } };


export const ChecklistTableReportDocument = gql`
    query ChecklistTableReport($where: ChecklistTableWhereInput!) {
  checklistTableReport(where: $where) {
    total
    checklistPerformance {
      id
      completedAt
      name
      percentComplete
      totalSections
      totalQuestions
      totalAnswers
      percentAnswer
      percentScore
    }
  }
}
    `;
export function useChecklistTableReportQuery(baseOptions: Apollo.QueryHookOptions<ChecklistTableReportQuery, ChecklistTableReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChecklistTableReportQuery, ChecklistTableReportQueryVariables>(ChecklistTableReportDocument, options);
      }
export function useChecklistTableReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChecklistTableReportQuery, ChecklistTableReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChecklistTableReportQuery, ChecklistTableReportQueryVariables>(ChecklistTableReportDocument, options);
        }
export type ChecklistTableReportQueryHookResult = ReturnType<typeof useChecklistTableReportQuery>;
export type ChecklistTableReportLazyQueryHookResult = ReturnType<typeof useChecklistTableReportLazyQuery>;
export type ChecklistTableReportQueryResult = Apollo.QueryResult<ChecklistTableReportQuery, ChecklistTableReportQueryVariables>;