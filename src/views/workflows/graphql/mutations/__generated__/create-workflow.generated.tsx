import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateOneWorkflowMutationVariables = Types.Exact<{
  data: Types.WorkflowCreateInput;
}>;


export type CreateOneWorkflowMutation = { __typename?: 'Mutation', createOneWorkflow: { __typename?: 'Workflow', id?: string | null, name?: string | null, trigger?: Types.WorkflowTrigger | null, triggerModels?: Types.Model | null, actions?: Array<{ __typename?: 'WorkflowAction', type?: Types.WorkflowActionType | null, outputModel?: Types.Model | null, timesRun?: number | null }> | null } };


export const CreateOneWorkflowDocument = gql`
    mutation CreateOneWorkflow($data: WorkflowCreateInput!) {
  createOneWorkflow(data: $data) {
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
export type CreateOneWorkflowMutationFn = Apollo.MutationFunction<CreateOneWorkflowMutation, CreateOneWorkflowMutationVariables>;
export function useCreateOneWorkflowMutation(baseOptions?: Apollo.MutationHookOptions<CreateOneWorkflowMutation, CreateOneWorkflowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOneWorkflowMutation, CreateOneWorkflowMutationVariables>(CreateOneWorkflowDocument, options);
      }
export type CreateOneWorkflowMutationHookResult = ReturnType<typeof useCreateOneWorkflowMutation>;
export type CreateOneWorkflowMutationResult = Apollo.MutationResult<CreateOneWorkflowMutation>;
export type CreateOneWorkflowMutationOptions = Apollo.BaseMutationOptions<CreateOneWorkflowMutation, CreateOneWorkflowMutationVariables>;