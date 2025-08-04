import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type WorkflowsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WorkflowWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.WorkflowOrderByWithRelationInput> | Types.WorkflowOrderByWithRelationInput>;
}>;


export type WorkflowsQuery = { __typename?: 'Query', workflows: Array<{ __typename?: 'Workflow', id?: string | null, name?: string | null, trigger?: Types.WorkflowTrigger | null, triggerModels?: Types.Model | null, cronSchedule?: Types.CronSchedule | null, cronDate?: Date | null, actions?: Array<{ __typename?: 'WorkflowAction', type?: Types.WorkflowActionType | null, outputModel?: Types.Model | null, timesRun?: number | null }> | null }> };


export const WorkflowsDocument = gql`
    query Workflows($where: WorkflowWhereInput, $orderBy: [WorkflowOrderByWithRelationInput!]) {
  workflows(where: $where, orderBy: $orderBy) {
    id
    name
    trigger
    triggerModels
    cronSchedule
    cronDate
    actions {
      type
      outputModel
      timesRun
    }
  }
}
    `;
export function useWorkflowsQuery(baseOptions?: Apollo.QueryHookOptions<WorkflowsQuery, WorkflowsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WorkflowsQuery, WorkflowsQueryVariables>(WorkflowsDocument, options);
      }
export function useWorkflowsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkflowsQuery, WorkflowsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WorkflowsQuery, WorkflowsQueryVariables>(WorkflowsDocument, options);
        }
export type WorkflowsQueryHookResult = ReturnType<typeof useWorkflowsQuery>;
export type WorkflowsLazyQueryHookResult = ReturnType<typeof useWorkflowsLazyQuery>;
export type WorkflowsQueryResult = Apollo.QueryResult<WorkflowsQuery, WorkflowsQueryVariables>;