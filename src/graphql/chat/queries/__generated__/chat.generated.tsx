import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ChatQueryVariables = Types.Exact<{
  where: Types.ChatWhereUniqueInput;
}>;


export type ChatQuery = { __typename?: 'Query', chat: { __typename?: 'Chat', id: string, name: string, description?: string | null, totalMembers: number, totalMessages: number, members: Array<{ __typename?: 'UserChat', id?: string | null, user?: { __typename?: 'User', id?: string | null, fullName: string, firstLetter?: string | null, origFirstLetter?: string | null, origName?: string | null, businesses: Array<{ __typename?: 'Business', fullName?: string | null, id: string, name?: string | null }> } | null }> } };


export const ChatDocument = gql`
    query Chat($where: ChatWhereUniqueInput!) {
  chat(where: $where) {
    id
    name
    description
    totalMembers
    totalMessages
    members {
      id
      user {
        id
        fullName
        firstLetter
        origFirstLetter
        origName
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
export function useChatQuery(baseOptions: Apollo.QueryHookOptions<ChatQuery, ChatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatQuery, ChatQueryVariables>(ChatDocument, options);
      }
export function useChatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatQuery, ChatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatQuery, ChatQueryVariables>(ChatDocument, options);
        }
export type ChatQueryHookResult = ReturnType<typeof useChatQuery>;
export type ChatLazyQueryHookResult = ReturnType<typeof useChatLazyQuery>;
export type ChatQueryResult = Apollo.QueryResult<ChatQuery, ChatQueryVariables>;