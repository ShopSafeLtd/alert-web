import type * as Types from '../types.js';

import { gql } from '@apollo/client';
export type TodoItemFragment = {
  __typename?: 'Todo';
  description?: string | null;
  id: string;
  name?: string | null;
  dueDate?: Date | null;
  completed?: boolean | null;
  type?: Types.TodoType | null;
  vehicleId?: string | null;
  offenderId?: string | null;
  crimeGroupId?: string | null;
  incidentId?: string | null;
  investigationId?: string | null;
  chatId?: string | null;
  similarOffenderIds: Array<string>;
  completedDate?: Date | null;
  createdBy?: { __typename?: 'User'; id: string; fullName: string } | null;
  completedBy?: { __typename?: 'User'; id: string; fullName: string } | null;
  assignedUsers: Array<{ __typename?: 'User'; id: string; fullName: string }>;
};

export const TodoItemFragmentDoc = gql`
  fragment TodoItem on Todo {
    description
    id
    name
    dueDate
    completed
    type
    vehicleId
    offenderId
    crimeGroupId
    incidentId
    investigationId
    chatId
    similarOffenderIds
    completedDate
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
`;
