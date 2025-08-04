import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateTodoMentionMutationVariables = Types.Exact<{
  where: Types.UpdateTodoMention;
}>;


export type UpdateTodoMentionMutation = { __typename?: 'Mutation', updateTodoMention?: Array<{ __typename?: 'Todo', id?: string | null }> | null };


export const UpdateTodoMentionDocument = gql`
    mutation UpdateTodoMention($where: UpdateTodoMention!) {
  updateTodoMention(where: $where) {
    id
  }
}
    `;
export type UpdateTodoMentionMutationFn = Apollo.MutationFunction<UpdateTodoMentionMutation, UpdateTodoMentionMutationVariables>;
export function useUpdateTodoMentionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTodoMentionMutation, UpdateTodoMentionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTodoMentionMutation, UpdateTodoMentionMutationVariables>(UpdateTodoMentionDocument, options);
      }
export type UpdateTodoMentionMutationHookResult = ReturnType<typeof useUpdateTodoMentionMutation>;
export type UpdateTodoMentionMutationResult = Apollo.MutationResult<UpdateTodoMentionMutation>;
export type UpdateTodoMentionMutationOptions = Apollo.BaseMutationOptions<UpdateTodoMentionMutation, UpdateTodoMentionMutationVariables>;