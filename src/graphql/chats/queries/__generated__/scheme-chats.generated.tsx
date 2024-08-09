import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SchemeChatsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ChatWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.ChatOrderByWithRelationInput> | Types.ChatOrderByWithRelationInput>;
}>;


export type SchemeChatsQuery = { __typename?: 'Query', chats: Array<{ __typename?: 'Chat', id: string, name: string, description?: string | null }> };


export const SchemeChatsDocument = gql`
    query schemeChats($where: ChatWhereInput, $orderBy: [ChatOrderByWithRelationInput!]) {
  chats(where: $where, orderBy: $orderBy) {
    id
    name
    description
  }
}
    `;
export function useSchemeChatsQuery(baseOptions?: Apollo.QueryHookOptions<SchemeChatsQuery, SchemeChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SchemeChatsQuery, SchemeChatsQueryVariables>(SchemeChatsDocument, options);
      }
export function useSchemeChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SchemeChatsQuery, SchemeChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SchemeChatsQuery, SchemeChatsQueryVariables>(SchemeChatsDocument, options);
        }
export type SchemeChatsQueryHookResult = ReturnType<typeof useSchemeChatsQuery>;
export type SchemeChatsLazyQueryHookResult = ReturnType<typeof useSchemeChatsLazyQuery>;
export type SchemeChatsQueryResult = Apollo.QueryResult<SchemeChatsQuery, SchemeChatsQueryVariables>;