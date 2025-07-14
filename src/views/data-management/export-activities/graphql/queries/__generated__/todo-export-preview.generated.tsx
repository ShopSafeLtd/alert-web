import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TodoExportPreviewQueryVariables = Types.Exact<{
  where: Types.TodoRelayWhereInput;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Array<Types.TodoOrderByWithRelationInput> | Types.TodoOrderByWithRelationInput>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type TodoExportPreviewQuery = { __typename?: 'Query', todoExportRelay: { __typename?: 'QueryTodoExportRelayConnection', totalCount: number, edges: Array<{ __typename?: 'QueryTodoExportRelayConnectionEdge', node: { __typename?: 'Todo', id: string, name?: string | null, reference?: number | null, description?: string | null, dueDate?: Date | null, completedDate?: Date | null, completed?: boolean | null, createdAt: Date, type?: Types.TodoType | null, business?: { __typename?: 'Business', name: string, id: string } | null } }> } };


export const TodoExportPreviewDocument = gql`
    query TodoExportPreview($where: TodoRelayWhereInput!, $take: Int, $orderBy: [TodoOrderByWithRelationInput!], $after: String) {
  todoExportRelay(where: $where, take: $take, orderBy: $orderBy, after: $after) {
    edges {
      node {
        id
        name
        reference
        description
        dueDate
        completedDate
        completed
        createdAt
        type
        business {
          name
          id
        }
      }
    }
    totalCount
  }
}
    `;
export function useTodoExportPreviewQuery(baseOptions: Apollo.QueryHookOptions<TodoExportPreviewQuery, TodoExportPreviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TodoExportPreviewQuery, TodoExportPreviewQueryVariables>(TodoExportPreviewDocument, options);
      }
export function useTodoExportPreviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TodoExportPreviewQuery, TodoExportPreviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TodoExportPreviewQuery, TodoExportPreviewQueryVariables>(TodoExportPreviewDocument, options);
        }
export type TodoExportPreviewQueryHookResult = ReturnType<typeof useTodoExportPreviewQuery>;
export type TodoExportPreviewLazyQueryHookResult = ReturnType<typeof useTodoExportPreviewLazyQuery>;
export type TodoExportPreviewQueryResult = Apollo.QueryResult<TodoExportPreviewQuery, TodoExportPreviewQueryVariables>;