import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateTodoMutationVariables = Types.Exact<{
  data: Types.TodoCreateInput;
}>;


export type CreateTodoMutation = { __typename?: 'Mutation', createTodo: { __typename?: 'Todo', id: string, name?: string | null, authorised?: boolean | null, description?: string | null, dueDate?: Date | null, completedDate?: Date | null, completed?: boolean | null, createdAt: Date, type?: Types.TodoType | null, vehicleId?: string | null, offenderId?: string | null, crimeGroupId?: string | null, incidentId?: string | null, investigationId?: string | null, chatId?: string | null, vehicle?: { __typename?: 'Vehicle', id: string, reference?: number | null } | null, offender?: { __typename?: 'Offender', id: string, reference?: number | null } | null, crimeGroup?: { __typename?: 'CrimeGroup', id: string, reference?: number | null } | null, incident?: { __typename?: 'Incident', id: string, reference?: number | null } | null, investigation?: { __typename?: 'Investigation', id: string, reference?: number | null } | null, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }> } };


export const CreateTodoDocument = gql`
    mutation CreateTodo($data: TodoCreateInput!) {
  createTodo(data: $data) {
    id
    name
    authorised
    description
    dueDate
    completedDate
    completed
    createdAt
    type
    vehicleId
    vehicle {
      id
      reference
    }
    offenderId
    offender {
      id
      reference
    }
    crimeGroupId
    crimeGroup {
      id
      reference
    }
    incidentId
    incident {
      id
      reference
    }
    investigationId
    investigation {
      id
      reference
    }
    chatId
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