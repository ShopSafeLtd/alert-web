import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateTodoDetailsMutationVariables = Types.Exact<{
  data: Types.TodoUpdateInput;
  where: Types.UniqueId;
}>;


export type UpdateTodoDetailsMutation = { __typename?: 'Mutation', updateTodo?: { __typename?: 'Todo', id?: string | null, name?: string | null, description?: string | null, dueDate?: Date | null, completed?: boolean | null, authorised?: boolean | null, assignedUsers: Array<{ __typename?: 'User', id?: string | null, fullName: string }>, business?: { __typename?: 'Business', id: string } | null, groups: Array<{ __typename?: 'Group', id: string, name: string }>, evidence?: Array<{ __typename?: 'Document', id?: string | null, name?: string | null, url?: string | null, fileType?: Types.FileType | null }> | null, incident?: { __typename?: 'Incident', id?: string | null, reference?: number | null, subject?: string | null } | null, offender?: { __typename?: 'Offender', id?: string | null, name?: string | null } | null, investigation?: { __typename?: 'Investigation', id?: string | null, name?: string | null } | null, crimeGroup?: { __typename?: 'CrimeGroup', id: string, alias?: string | null, reference?: number | null } | null, checklist?: { __typename?: 'ActiveChecklist', id: string, name?: string | null } | null } | null };


export const UpdateTodoDetailsDocument = gql`
    mutation UpdateTodoDetails($data: TodoUpdateInput!, $where: UniqueId!) {
  updateTodo(data: $data, where: $where) {
    id
    name
    description
    dueDate
    completed
    authorised
    assignedUsers {
      id
      fullName
    }
    business {
      id
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
    incident {
      id
      reference
      subject
    }
    offender {
      id
      name
    }
    investigation {
      id
      name
    }
    crimeGroup {
      id
      alias
      reference
    }
    checklist {
      id
      name
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