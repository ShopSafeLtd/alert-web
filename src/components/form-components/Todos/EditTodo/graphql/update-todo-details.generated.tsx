import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateTodoDetailsMutationVariables = Types.Exact<{
  data: Types.TodoUpdateInput;
  where: Types.UniqueId;
}>;


export type UpdateTodoDetailsMutation = { __typename?: 'Mutation', updateTodo: { __typename?: 'Todo', id: string, name?: string | null, description?: string | null, dueDate?: Date | null, completed?: boolean | null, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, evidence: Array<{ __typename?: 'Document', id: string, name: string, url: string, fileType?: Types.FileType | null }> } };


export const UpdateTodoDetailsDocument = gql`
    mutation UpdateTodoDetails($data: TodoUpdateInput!, $where: UniqueId!) {
  updateTodo(data: $data, where: $where) {
    id
    name
    description
    dueDate
    completed
    assignedUsers {
      id
      fullName
    }
    groups {
      id
      name
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
export type UpdateTodoDetailsMutationFn = Apollo.MutationFunction<UpdateTodoDetailsMutation, UpdateTodoDetailsMutationVariables>;
export function useUpdateTodoDetailsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTodoDetailsMutation, UpdateTodoDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTodoDetailsMutation, UpdateTodoDetailsMutationVariables>(UpdateTodoDetailsDocument, options);
      }
export type UpdateTodoDetailsMutationHookResult = ReturnType<typeof useUpdateTodoDetailsMutation>;
export type UpdateTodoDetailsMutationResult = Apollo.MutationResult<UpdateTodoDetailsMutation>;
export type UpdateTodoDetailsMutationOptions = Apollo.BaseMutationOptions<UpdateTodoDetailsMutation, UpdateTodoDetailsMutationVariables>;