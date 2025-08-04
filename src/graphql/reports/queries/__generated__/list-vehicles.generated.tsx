import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListLoginEventsQueryVariables = Types.Exact<{
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  where?: Types.InputMaybe<Types.LoginEventWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.LoginEventOrderByWithRelationInput> | Types.LoginEventOrderByWithRelationInput>;
}>;


export type ListLoginEventsQuery = { __typename?: 'Query', listLoginEvents: { __typename?: 'ListLoginEvents', total: number, loginEvents: Array<{ __typename?: 'LoginEvent', id?: string | null, createdAt?: Date | null, loginTime?: Date | null, user?: { __typename?: 'User', id?: string | null, fullName: string, firstLetter?: string | null, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null }> } | null }> } };


export const ListLoginEventsDocument = gql`
    query ListLoginEvents($take: Int, $skip: Int, $where: LoginEventWhereInput, $orderBy: [LoginEventOrderByWithRelationInput!]) {
  listLoginEvents(take: $take, skip: $skip, where: $where, orderBy: $orderBy) {
    loginEvents {
      id
      createdAt
      loginTime
      user {
        id
        fullName
        firstLetter
        businesses {
          id
          name
        }
      }
    }
    total
  }
}
    `;
export function useListLoginEventsQuery(baseOptions?: Apollo.QueryHookOptions<ListLoginEventsQuery, ListLoginEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListLoginEventsQuery, ListLoginEventsQueryVariables>(ListLoginEventsDocument, options);
      }
export function useListLoginEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListLoginEventsQuery, ListLoginEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListLoginEventsQuery, ListLoginEventsQueryVariables>(ListLoginEventsDocument, options);
        }
export type ListLoginEventsQueryHookResult = ReturnType<typeof useListLoginEventsQuery>;
export type ListLoginEventsLazyQueryHookResult = ReturnType<typeof useListLoginEventsLazyQuery>;
export type ListLoginEventsQueryResult = Apollo.QueryResult<ListLoginEventsQuery, ListLoginEventsQueryVariables>;