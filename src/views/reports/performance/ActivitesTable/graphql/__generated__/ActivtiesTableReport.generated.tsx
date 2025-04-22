import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ActivitiesTableReportQueryVariables = Types.Exact<{
  where: Types.TodoRelayWhereInput;
  orderBy?: Types.InputMaybe<Array<Types.TodoOrderByWithRelationInput> | Types.TodoOrderByWithRelationInput>;
}>;


export type ActivitiesTableReportQuery = { __typename?: 'Query', todoRelay: { __typename?: 'QueryTodoRelayConnection', edges: Array<{ __typename?: 'QueryTodoRelayConnectionEdge', node: { __typename?: 'Todo', id: string, name?: string | null, dueDate?: Date | null, createdAt: Date, completed?: boolean | null, type?: Types.TodoType | null, completedDate?: Date | null, business?: { __typename?: 'Business', id: string, name: string } | null, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }> } }> } };


export const ActivitiesTableReportDocument = gql`
    query ActivitiesTableReport($where: TodoRelayWhereInput!, $orderBy: [TodoOrderByWithRelationInput!]) {
  todoRelay(where: $where, orderBy: $orderBy) {
    edges {
      node {
        id
        name
        dueDate
        createdAt
        completed
        type
        completedDate
        business {
          id
          name
        }
        assignedUsers {
          id
          fullName
        }
      }
    }
  }
}
    `;
export function useActivitiesTableReportQuery(baseOptions: Apollo.QueryHookOptions<ActivitiesTableReportQuery, ActivitiesTableReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActivitiesTableReportQuery, ActivitiesTableReportQueryVariables>(ActivitiesTableReportDocument, options);
      }
export function useActivitiesTableReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivitiesTableReportQuery, ActivitiesTableReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActivitiesTableReportQuery, ActivitiesTableReportQueryVariables>(ActivitiesTableReportDocument, options);
        }
export type ActivitiesTableReportQueryHookResult = ReturnType<typeof useActivitiesTableReportQuery>;
export type ActivitiesTableReportLazyQueryHookResult = ReturnType<typeof useActivitiesTableReportLazyQuery>;
export type ActivitiesTableReportQueryResult = Apollo.QueryResult<ActivitiesTableReportQuery, ActivitiesTableReportQueryVariables>;