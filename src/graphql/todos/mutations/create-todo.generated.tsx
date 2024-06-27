import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateTodoMutationVariables = Types.Exact<{
  data: Types.TodoCreateInput;
}>;


export type CreateTodoMutation = { __typename?: 'Mutation', createTodo: { __typename?: 'Todo', type?: Types.TodoType | null, description?: string | null, dueDate?: Date | null, createdAt: Date, completedDate?: Date | null, completed?: boolean | null, id: string, name?: string | null, similarOffenderIds: Array<string>, createdBy?: { __typename?: 'User', id: string, fullName: string } | null, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }> } };


export const CreateTodoDocument = gql`
    mutation CreateTodo($data: TodoCreateInput!) {
  createTodo(data: $data) {
    type
    description
    dueDate
    createdAt
    completedDate
    completed
    id
    name
    similarOffenderIds
    createdBy {
      id
      fullName
    }
    assignedUsers {
      id
      fullName
    }
    groups {
      id
      name
    }
  }
}
    `;
export type CreateTodoMutationFn = Apollo.MutationFunction<CreateTodoMutation, CreateTodoMutationVariables>;
export function useCreateTodoMutation(baseOptions?: Apollo.MutationHookOptions<CreateTodoMutation, CreateTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTodoMutation, CreateTodoMutationVariables>(CreateTodoDocument, options);
      }
export type CreateTodoMutationHookResult = ReturnType<typeof useCreateTodoMutation>;
export type CreateTodoMutationResult = Apollo.MutationResult<CreateTodoMutation>;
export type CreateTodoMutationOptions = Apollo.BaseMutationOptions<CreateTodoMutation, CreateTodoMutationVariables>;