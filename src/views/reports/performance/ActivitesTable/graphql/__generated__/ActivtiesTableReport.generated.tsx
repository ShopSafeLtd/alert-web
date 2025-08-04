import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ActivitiesTableReportQueryVariables = Types.Exact<{
  where: Types.TodoRelayWhereInput;
  orderBy?: Types.InputMaybe<Array<Types.TodoOrderByWithRelationInput> | Types.TodoOrderByWithRelationInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type ActivitiesTableReportQuery = { __typename?: 'Query', todoRelay?: { __typename?: 'QueryTodoRelayConnection', totalCount: number, edges: Array<{ __typename?: 'QueryTodoRelayConnectionEdge', node: { __typename?: 'Todo', id?: string | null, name?: string | null, dueDate?: Date | null, createdAt?: Date | null, completed?: boolean | null, type?: Types.TodoType | null, completedDate?: Date | null, business?: { __typename?: 'Business', id: string, name?: string | null } | null, assignedUsers: Array<{ __typename?: 'User', id?: string | null, fullName: string }> } }> } | null };


export const ActivitiesTableReportDocument = gql`
    query ActivitiesTableReport($where: TodoRelayWhereInput!, $orderBy: [TodoOrderByWithRelationInput!], $take: Int, $skip: Int) {
  todoRelay(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
    totalCount
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