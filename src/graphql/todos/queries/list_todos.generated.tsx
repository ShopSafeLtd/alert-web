import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListTodosQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.TodoWhereInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Array<Types.TodoOrderBy> | Types.TodoOrderBy>;
}>;


export type ListTodosQuery = { __typename?: 'Query', listTodos: { __typename?: 'ListTodos', total: number, uncompletedTotal: number, totalUserTodos: number, todos: Array<{ __typename?: 'Todo', description?: string | null, id: string, name?: string | null, dueDate?: Date | null, createdAt: Date, completed?: boolean | null, type?: Types.TodoType | null, vehicleId?: string | null, offenderId?: string | null, crimeGroupId?: string | null, incidentId?: string | null, investigationId?: string | null, chatId?: string | null, completedDate?: Date | null, vehicle?: { __typename?: 'Vehicle', id: string, reference?: number | null } | null, offender?: { __typename?: 'Offender', id: string, reference?: number | null } | null, crimeGroup?: { __typename?: 'CrimeGroup', id: string, reference?: number | null } | null, incident?: { __typename?: 'Incident', id: string, reference?: number | null } | null, investigation?: { __typename?: 'Investigation', id: string, reference?: number | null } | null, createdBy?: { __typename?: 'User', id: string, fullName: string } | null, completedBy?: { __typename?: 'User', id: string, fullName: string } | null, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }> }> } };


export const ListTodosDocument = gql`
    query listTodos($where: TodoWhereInput, $take: Int, $skip: Int, $orderBy: [TodoOrderBy!]) {
  listTodos(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
    todos {
      description
      id
      name
      dueDate
      createdAt
      completed
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
      groups {
        id
        name
      }
    }
    total
    uncompletedTotal
    totalUserTodos
  }
}
    `;
export function useListTodosQuery(baseOptions?: Apollo.QueryHookOptions<ListTodosQuery, ListTodosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListTodosQuery, ListTodosQueryVariables>(ListTodosDocument, options);
      }
export function useListTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListTodosQuery, ListTodosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListTodosQuery, ListTodosQueryVariables>(ListTodosDocument, options);
        }
export type ListTodosQueryHookResult = ReturnType<typeof useListTodosQuery>;
export type ListTodosLazyQueryHookResult = ReturnType<typeof useListTodosLazyQuery>;
export type ListTodosQueryResult = Apollo.QueryResult<ListTodosQuery, ListTodosQueryVariables>;