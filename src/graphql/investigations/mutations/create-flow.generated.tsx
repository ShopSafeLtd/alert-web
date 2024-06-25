import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateFlowMutationVariables = Types.Exact<{
  data: Types.CreateFlowInput;
}>;


export type CreateFlowMutation = { __typename?: 'Mutation', createFlow: { __typename?: 'Flow', id: string, name: string, description?: string | null } };


export const CreateFlowDocument = gql`
    mutation CreateFlow($data: CreateFlowInput!) {
  createFlow(data: $data) {
    id
    name
    description
  }
}
    `;
export type CreateFlowMutationFn = Apollo.MutationFunction<CreateFlowMutation, CreateFlowMutationVariables>;
export function useCreateFlowMutation(baseOptions?: Apollo.MutationHookOptions<CreateFlowMutation, CreateFlowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFlowMutation, CreateFlowMutationVariables>(CreateFlowDocument, options);
      }
export type CreateFlowMutationHookResult = ReturnType<typeof useCreateFlowMutation>;
export type CreateFlowMutationResult = Apollo.MutationResult<CreateFlowMutation>;
export type CreateFlowMutationOptions = Apollo.BaseMutationOptions<CreateFlowMutation, CreateFlowMutationVariables>;