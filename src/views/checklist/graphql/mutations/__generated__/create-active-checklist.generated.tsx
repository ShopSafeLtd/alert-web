import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateActiveChecklistMutationVariables = Types.Exact<{
  data: Types.CreateActiveChecklistInput;
}>;


export type CreateActiveChecklistMutation = { __typename?: 'Mutation', createActiveChecklist?: { __typename?: 'ActiveChecklist', id: string } | null };


export const CreateActiveChecklistDocument = gql`
    mutation CreateActiveChecklist($data: CreateActiveChecklistInput!) {
  createActiveChecklist(data: $data) {
    id
  }
}
    `;
export type CreateActiveChecklistMutationFn = Apollo.MutationFunction<CreateActiveChecklistMutation, CreateActiveChecklistMutationVariables>;
export function useCreateActiveChecklistMutation(baseOptions?: Apollo.MutationHookOptions<CreateActiveChecklistMutation, CreateActiveChecklistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateActiveChecklistMutation, CreateActiveChecklistMutationVariables>(CreateActiveChecklistDocument, options);
      }
export type CreateActiveChecklistMutationHookResult = ReturnType<typeof useCreateActiveChecklistMutation>;
export type CreateActiveChecklistMutationResult = Apollo.MutationResult<CreateActiveChecklistMutation>;
export type CreateActiveChecklistMutationOptions = Apollo.BaseMutationOptions<CreateActiveChecklistMutation, CreateActiveChecklistMutationVariables>;