import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListActionsQueryVariables = Types.Exact<{
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  where?: Types.InputMaybe<Types.ActionWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.ActionOrderByWithRelationInput> | Types.ActionOrderByWithRelationInput>;
}>;


export type ListActionsQuery = { __typename?: 'Query', listActions: { __typename?: 'ListActions', total: number, actions: Array<{ __typename?: 'Action', id: string, description?: string | null, dataType: Types.Model, reason?: string | null, createdAt: Date, byUser: { __typename?: 'User', id: string, fullName: string, businesses: Array<{ __typename?: 'Business', fullName: string, id: string, name: string }> } }> } };


export const ListActionsDocument = gql`
    query ListActions($take: Int, $skip: Int, $where: ActionWhereInput, $orderBy: [ActionOrderByWithRelationInput!]) {
  listActions(take: $take, skip: $skip, where: $where, orderBy: $orderBy) {
    total
    actions {
      id
      description
      dataType
      reason
      createdAt
      byUser {
        id
        fullName
        businesses {
          fullName
          id
          name
        }
      }
    }
  }
}
    `;
export function useListActionsQuery(baseOptions?: Apollo.QueryHookOptions<ListActionsQuery, ListActionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListActionsQuery, ListActionsQueryVariables>(ListActionsDocument, options);
      }
export function useListActionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListActionsQuery, ListActionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListActionsQuery, ListActionsQueryVariables>(ListActionsDocument, options);
        }
export type ListActionsQueryHookResult = ReturnType<typeof useListActionsQuery>;
export type ListActionsLazyQueryHookResult = ReturnType<typeof useListActionsLazyQuery>;
export type ListActionsQueryResult = Apollo.QueryResult<ListActionsQuery, ListActionsQueryVariables>;