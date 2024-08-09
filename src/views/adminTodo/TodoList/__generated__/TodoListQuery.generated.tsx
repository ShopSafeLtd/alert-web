import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TodoListQueryVariables = Types.Exact<{
  where: Types.TodoRelayWhereInput;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Array<Types.TodoOrderByWithRelationInput> | Types.TodoOrderByWithRelationInput>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type TodoListQuery = { __typename?: 'Query', todoRelay: { __typename?: 'QueryTodoRelayConnection', totalCount: number, edges: Array<{ __typename?: 'QueryTodoRelayConnectionEdge', node: { __typename?: 'Todo', id: string, name?: string | null, description?: string | null, dueDate?: Date | null, completedDate?: Date | null, completed?: boolean | null, createdAt: Date, type?: Types.TodoType | null, vehicleId?: string | null, offenderId?: string | null, crimeGroupId?: string | null, incidentId?: string | null, investigationId?: string | null, chatId?: string | null, vehicle?: { __typename?: 'Vehicle', id: string, reference?: number | null } | null, offender?: { __typename?: 'Offender', id: string, reference?: number | null } | null, crimeGroup?: { __typename?: 'CrimeGroup', id: string, reference?: number | null } | null, incident?: { __typename?: 'Incident', id: string, reference?: number | null } | null, investigation?: { __typename?: 'Investigation', id: string, reference?: number | null } | null, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }> } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null } } };


export const TodoListDocument = gql`
    query TodoList($where: TodoRelayWhereInput!, $take: Int, $skip: Int, $orderBy: [TodoOrderByWithRelationInput!], $after: String) {
  todoRelay(
    where: $where
    take: $take
    skip: $skip
    orderBy: $orderBy
    after: $after
  ) {
    edges {
      node {
        id
        name
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
    totalCount
    pageInfo {
      endCursor
    }
  }
}
    `;
export function useTodoListQuery(baseOptions: Apollo.QueryHookOptions<TodoListQuery, TodoListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TodoListQuery, TodoListQueryVariables>(TodoListDocument, options);
      }
export function useTodoListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TodoListQuery, TodoListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TodoListQuery, TodoListQueryVariables>(TodoListDocument, options);
        }
export type TodoListQueryHookResult = ReturnType<typeof useTodoListQuery>;
export type TodoListLazyQueryHookResult = ReturnType<typeof useTodoListLazyQuery>;
export type TodoListQueryResult = Apollo.QueryResult<TodoListQuery, TodoListQueryVariables>;