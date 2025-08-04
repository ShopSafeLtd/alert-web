import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateOneWorkflowMutationVariables = Types.Exact<{
  data: Types.WorkflowUpdateInput;
  where: Types.WorkflowWhereUniqueInput;
}>;


export type UpdateOneWorkflowMutation = { __typename?: 'Mutation', updateOneWorkflow: { __typename?: 'Workflow', id?: string | null, name?: string | null, trigger?: Types.WorkflowTrigger | null, triggerModels?: Types.Model | null, actions?: Array<{ __typename?: 'WorkflowAction', type?: Types.WorkflowActionType | null, outputModel?: Types.Model | null, timesRun?: number | null }> | null } };


export const UpdateOneWorkflowDocument = gql`
    mutation UpdateOneWorkflow($data: WorkflowUpdateInput!, $where: WorkflowWhereUniqueInput!) {
  updateOneWorkflow(data: $data, where: $where) {
    id
    name
    trigger
    triggerModels
    actions {
      type
      outputModel
      timesRun
    }
  }
}
    `;
export type UpdateOneWorkflowMutationFn = Apollo.MutationFunction<UpdateOneWorkflowMutation, UpdateOneWorkflowMutationVariables>;
export function useUpdateOneWorkflowMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOneWorkflowMutation, UpdateOneWorkflowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOneWorkflowMutation, UpdateOneWorkflowMutationVariables>(UpdateOneWorkflowDocument, options);
      }
export type UpdateOneWorkflowMutationHookResult = ReturnType<typeof useUpdateOneWorkflowMutation>;
export type UpdateOneWorkflowMutationResult = Apollo.MutationResult<UpdateOneWorkflowMutation>;
export type UpdateOneWorkflowMutationOptions = Apollo.BaseMutationOptions<UpdateOneWorkflowMutation, UpdateOneWorkflowMutationVariables>;