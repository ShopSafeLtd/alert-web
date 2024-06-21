import type * as Types from '../types.js';

import { gql } from '@apollo/client';
export type TodosFragment = {
  __typename?: 'Todo';
  id: string;
  name?: string | null;
  description?: string | null;
  dueDate?: Date | null;
  completed?: boolean | null;
  assignedUsers: Array<{ __typename?: 'User'; id: string; fullName: string }>;
};

export const TodosFragmentDoc = gql`
  fragment Todos on Todo {
    id
    name
    description
    dueDate
    completed
    assignedUsers {
      id
      fullName
    }
  }
`;
