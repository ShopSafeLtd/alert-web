import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateUpdateChecklistMutationVariables = Types.Exact<{
  data: Types.ChecklistCreateUpdateInput;
  createUpdateChecklistId?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type CreateUpdateChecklistMutation = { __typename?: 'Mutation', createUpdateChecklist?: { __typename?: 'Checklist', id: string } | null };


export const CreateUpdateChecklistDocument = gql`
    mutation CreateUpdateChecklist($data: ChecklistCreateUpdateInput!, $createUpdateChecklistId: String) {
  createUpdateChecklist(data: $data, id: $createUpdateChecklistId) {
    id
  }
}
    `;
export type CreateUpdateChecklistMutationFn = Apollo.MutationFunction<CreateUpdateChecklistMutation, CreateUpdateChecklistMutationVariables>;
export function useCreateUpdateChecklistMutation(baseOptions?: Apollo.MutationHookOptions<CreateUpdateChecklistMutation, CreateUpdateChecklistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUpdateChecklistMutation, CreateUpdateChecklistMutationVariables>(CreateUpdateChecklistDocument, options);
      }
export type CreateUpdateChecklistMutationHookResult = ReturnType<typeof useCreateUpdateChecklistMutation>;
export type CreateUpdateChecklistMutationResult = Apollo.MutationResult<CreateUpdateChecklistMutation>;
export type CreateUpdateChecklistMutationOptions = Apollo.BaseMutationOptions<CreateUpdateChecklistMutation, CreateUpdateChecklistMutationVariables>;