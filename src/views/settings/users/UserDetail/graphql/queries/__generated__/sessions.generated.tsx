import type * as Types from '../../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListSessionsQueryVariables = Types.Exact<{
  where: Types.UserWhereUniqueInput;
  SessionWhere?: Types.InputMaybe<Types.SessionWhereInput>;
}>;


export type ListSessionsQuery = { __typename?: 'Query', user: { __typename?: 'User', sessions: Array<{ __typename?: 'Session', locationLng?: number | null, locationLat?: number | null, createdAt: Date, app: Types.AppType, id: string }> } };


export const ListSessionsDocument = gql`
    query ListSessions($where: UserWhereUniqueInput!, $SessionWhere: SessionWhereInput) {
  user(where: $where) {
    sessions(orderBy: {createdAt: desc}, where: $SessionWhere) {
      locationLng
      locationLat
      createdAt
      app
      id
    }
  }
}
    `;
export function useListSessionsQuery(baseOptions: Apollo.QueryHookOptions<ListSessionsQuery, ListSessionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListSessionsQuery, ListSessionsQueryVariables>(ListSessionsDocument, options);
      }
export function useListSessionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListSessionsQuery, ListSessionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListSessionsQuery, ListSessionsQueryVariables>(ListSessionsDocument, options);
        }
export type ListSessionsQueryHookResult = ReturnType<typeof useListSessionsQuery>;
export type ListSessionsLazyQueryHookResult = ReturnType<typeof useListSessionsLazyQuery>;
export type ListSessionsQueryResult = Apollo.QueryResult<ListSessionsQuery, ListSessionsQueryVariables>;