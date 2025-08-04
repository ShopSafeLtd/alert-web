import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserChatsQueryVariables = Types.Exact<{
  where: Types.UserWhereUniqueInput;
  orderBy?: Types.InputMaybe<Array<Types.UserChatOrderByWithRelationInput> | Types.UserChatOrderByWithRelationInput>;
  scheme: Types.Scalars['String'];
}>;


export type UserChatsQuery = { __typename?: 'Query', user: { __typename?: 'User', id?: string | null, totalChats: number, chats: Array<{ __typename?: 'UserChat', id?: string | null, newMessages?: boolean | null, mentioned?: boolean | null, updatedAt?: Date | null, createdAt?: Date | null, chat?: { __typename?: 'Chat', id: string, name: string, firstLetter?: string | null, totalMembers: number, messageCount: number, messages: Array<{ __typename?: 'Message', id?: string | null, content?: string | null, createdAt?: Date | null, from: { __typename?: 'User', id?: string | null, origName?: string | null }, images: Array<{ __typename?: 'Image', id?: string | null }>, incidents: Array<{ __typename?: 'Incident', id?: string | null }>, offenders: Array<{ __typename?: 'Offender', id?: string | null }>, vehicles: Array<{ __typename?: 'Vehicle', id?: string | null }>, crimeGroups: Array<{ __typename?: 'CrimeGroup', id: string }>, articles: Array<{ __typename?: 'Article', id: string }> }> } | null }> } };


export const UserChatsDocument = gql`
    query userChats($where: UserWhereUniqueInput!, $orderBy: [UserChatOrderByWithRelationInput!], $scheme: String!) {
  user(where: $where) {
    id
    totalChats
    chats(where: {chat: {scheme: {id: {equals: $scheme}}}}, orderBy: $orderBy) {
      id
      newMessages
      mentioned
      updatedAt
      createdAt
      chat {
        id
        name
        firstLetter
        totalMembers
        messageCount
        messages(first: 1, orderBy: [{createdAt: desc}]) {
          id
          content
          createdAt
          from {
            id
            origName
          }
          images {
            id
          }
          incidents {
            id
          }
          offenders {
            id
          }
          vehicles {
            id
          }
          crimeGroups {
            id
          }
          articles {
            id
          }
        }
      }
    }
  }
}
    `;
export function useUserChatsQuery(baseOptions: Apollo.QueryHookOptions<UserChatsQuery, UserChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserChatsQuery, UserChatsQueryVariables>(UserChatsDocument, options);
      }
export function useUserChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserChatsQuery, UserChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserChatsQuery, UserChatsQueryVariables>(UserChatsDocument, options);
        }
export type UserChatsQueryHookResult = ReturnType<typeof useUserChatsQuery>;
export type UserChatsLazyQueryHookResult = ReturnType<typeof useUserChatsLazyQuery>;
export type UserChatsQueryResult = Apollo.QueryResult<UserChatsQuery, UserChatsQueryVariables>;