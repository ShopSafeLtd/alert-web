import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import { FeedTodoFragmentDoc } from '../../../fragments/__generated__/feed-todo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FeedTodosQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.TodoWhereInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Array<Types.TodoOrderBy> | Types.TodoOrderBy>;
}>;


export type FeedTodosQuery = { __typename?: 'Query', listTodos: { __typename?: 'ListTodos', totalUserTodos: number, uncompletedTotal: number, uncompletedTodos: Array<{ __typename?: 'Todo', description?: string | null, id: string, name?: string | null, dueDate?: Date | null, completed?: boolean | null, type?: Types.TodoType | null, vehicleId?: string | null, offenderId?: string | null, crimeGroupId?: string | null, incidentId?: string | null, investigationId?: string | null, chatId?: string | null, similarOffenderIds: Array<string> }> } };


export const FeedTodosDocument = gql`
    query FeedTodos($where: TodoWhereInput, $take: Int, $skip: Int, $orderBy: [TodoOrderBy!]) {
  listTodos(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
    uncompletedTodos {
      ...FeedTodo
    }
    totalUserTodos
    uncompletedTotal
  }
}
    ${FeedTodoFragmentDoc}`;
export function useFeedTodosQuery(baseOptions?: Apollo.QueryHookOptions<FeedTodosQuery, FeedTodosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedTodosQuery, FeedTodosQueryVariables>(FeedTodosDocument, options);
      }
export function useFeedTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedTodosQuery, FeedTodosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedTodosQuery, FeedTodosQueryVariables>(FeedTodosDocument, options);
        }
export type FeedTodosQueryHookResult = ReturnType<typeof useFeedTodosQuery>;
export type FeedTodosLazyQueryHookResult = ReturnType<typeof useFeedTodosLazyQuery>;
export type FeedTodosQueryResult = Apollo.QueryResult<FeedTodosQuery, FeedTodosQueryVariables>;