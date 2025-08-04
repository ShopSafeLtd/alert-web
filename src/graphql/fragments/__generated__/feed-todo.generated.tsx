import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
export type FeedTodoFragment = { __typename?: 'Todo', description?: string | null, id?: string | null, name?: string | null, dueDate?: Date | null, completed?: boolean | null, authorised?: boolean | null, type?: Types.TodoType | null, vehicleId?: string | null, offenderId?: string | null, crimeGroupId?: string | null, incidentId?: string | null, investigationId?: string | null, chatId?: string | null, similarOffenderIds?: Array<string> | null };

export const FeedTodoFragmentDoc = gql`
    fragment FeedTodo on Todo {
  description
  id
  name
  dueDate
  completed
  authorised
  type
  vehicleId
  offenderId
  crimeGroupId
  incidentId
  investigationId
  chatId
  similarOffenderIds
}
    `;