import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
export type TodosFragment = { __typename?: 'Todo', id: string, name?: string | null, completedDate?: Date | null, createdAt: Date, completed?: boolean | null, reference?: number | null, dueDate?: Date | null, createdBy?: { __typename?: 'User', id: string, fullName: string } | null, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }> };

export const TodosFragmentDoc = gql`
    fragment Todos on Todo {
  id
  name
  completedDate
  createdAt
  completed
  reference
  dueDate
  createdBy {
    id
    fullName
  }
  assignedUsers {
    id
    fullName
  }
}
    `;