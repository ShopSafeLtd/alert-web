import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateTaskMutationVariables = Types.Exact<{
  data: Types.TodoUpdateInput;
  where: Types.UniqueId;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTodo: { __typename?: 'Todo', id: string, name?: string | null, description?: string | null, dueDate?: Date | null, completed?: boolean | null, completedDate?: Date | null, createdAt: Date, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }>, evidence: Array<{ __typename?: 'Document', id: string, name: string, url: string, fileType?: Types.FileType | null }> } };


export const UpdateTaskDocument = gql`
    mutation UpdateTask($data: TodoUpdateInput!, $where: UniqueId!) {
  updateTodo(data: $data, where: $where) {
    id
    name
    description
    dueDate
    completed
    completedDate
    createdAt
    assignedUsers {
      id
      fullName
    }
    evidence {
      id
      name
      url
      fileType
    }
  }
}
    `;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;