import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ViewWorkflowQueryVariables = Types.Exact<{
  where: Types.WorkflowWhereUniqueInput;
}>;


export type ViewWorkflowQuery = { __typename?: 'Query', workflow?: { __typename?: 'Workflow', name: string, conditions: { [key: string]: any }, triggerModels: Types.Model, cronSchedule?: Types.CronSchedule | null, cronDate?: Date | null, actions: Array<{ __typename?: 'WorkflowAction', data: { [key: string]: any }, id: string }> } | null };


export const ViewWorkflowDocument = gql`
    query ViewWorkflow($where: WorkflowWhereUniqueInput!) {
  workflow(where: $where) {
    name
    conditions
    triggerModels
    cronSchedule
    cronDate
    actions {
      data
      id
    }
  }
}
    `;
export function useViewWorkflowQuery(baseOptions: Apollo.QueryHookOptions<ViewWorkflowQuery, ViewWorkflowQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewWorkflowQuery, ViewWorkflowQueryVariables>(ViewWorkflowDocument, options);
      }
export function useViewWorkflowLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewWorkflowQuery, ViewWorkflowQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewWorkflowQuery, ViewWorkflowQueryVariables>(ViewWorkflowDocument, options);
        }
export type ViewWorkflowQueryHookResult = ReturnType<typeof useViewWorkflowQuery>;
export type ViewWorkflowLazyQueryHookResult = ReturnType<typeof useViewWorkflowLazyQuery>;
export type ViewWorkflowQueryResult = Apollo.QueryResult<ViewWorkflowQuery, ViewWorkflowQueryVariables>;