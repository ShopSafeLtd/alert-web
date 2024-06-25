import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateTodoMutationVariables = Types.Exact<{
  data: Types.TodoUpdateInput;
  where: Types.UniqueId;
}>;


export type UpdateTodoMutation = { __typename?: 'Mutation', updateTodo: { __typename?: 'Todo', type?: Types.TodoType | null, description?: string | null, dueDate?: Date | null, completedDate?: Date | null, completed?: boolean | null, id: string, name?: string | null, similarOffenderIds: Array<string>, createdBy?: { __typename?: 'User', id: string, fullName: string } | null, completedBy?: { __typename?: 'User', id: string, fullName: string } | null, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }> } };


export const UpdateTodoDocument = gql`
    mutation UpdateTodo($data: TodoUpdateInput!, $where: UniqueId!) {
  updateTodo(data: $data, where: $where) {
    type
    description
    dueDate
    completedDate
    completed
    id
    name
    similarOffenderIds
    createdBy {
      id
      fullName
    }
    completedBy {
      id
      fullName
    }
    assignedUsers {
      id
      fullName
    }
  }
}
    `;
export type UpdateTodoMutationFn = Apollo.MutationFunction<UpdateTodoMutation, UpdateTodoMutationVariables>;
export function useUpdateTodoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTodoMutation, UpdateTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(UpdateTodoDocument, options);
      }
export type UpdateTodoMutationHookResult = ReturnType<typeof useUpdateTodoMutation>;
export type UpdateTodoMutationResult = Apollo.MutationResult<UpdateTodoMutation>;
export type UpdateTodoMutationOptions = Apollo.BaseMutationOptions<UpdateTodoMutation, UpdateTodoMutationVariables>;