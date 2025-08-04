import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteOneWorkflowMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeleteOneWorkflowMutation = { __typename?: 'Mutation', deleteOneWorkflow?: { __typename?: 'Workflow', id: string } | null };


export const DeleteOneWorkflowDocument = gql`
    mutation deleteOneWorkflow($id: String!) {
  deleteOneWorkflow(where: {id: $id}) {
    id
  }
}
    `;
export type DeleteOneWorkflowMutationFn = Apollo.MutationFunction<DeleteOneWorkflowMutation, DeleteOneWorkflowMutationVariables>;
export function useDeleteOneWorkflowMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOneWorkflowMutation, DeleteOneWorkflowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOneWorkflowMutation, DeleteOneWorkflowMutationVariables>(DeleteOneWorkflowDocument, options);
      }
export type DeleteOneWorkflowMutationHookResult = ReturnType<typeof useDeleteOneWorkflowMutation>;
export type DeleteOneWorkflowMutationResult = Apollo.MutationResult<DeleteOneWorkflowMutation>;
export type DeleteOneWorkflowMutationOptions = Apollo.BaseMutationOptions<DeleteOneWorkflowMutation, DeleteOneWorkflowMutationVariables>;