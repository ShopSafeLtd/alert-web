import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserChatsQueryVariables = Types.Exact<{
  where: Types.UserWhereUniqueInput;
  orderBy?: Types.InputMaybe<Array<Types.UserChatOrderByWithRelationInput> | Types.UserChatOrderByWithRelationInput>;
  scheme: Types.Scalars['String'];
}>;


export type UserChatsQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, totalChats: number, chats: Array<{ __typename?: 'UserChat', id: string, newMessages?: boolean | null, mentioned?: boolean | null, updatedAt: Date, createdAt: Date, chat: { __typename?: 'Chat', id: string, name: string, firstLetter: string, totalMembers: number, messageCount: number, messages: Array<{ __typename?: 'Message', id: string, content: string, createdAt: Date, from: { __typename?: 'User', id: string, origName: string }, images: Array<{ __typename?: 'Image', id: string }>, incidents: Array<{ __typename?: 'Incident', id: string }>, offenders: Array<{ __typename?: 'Offender', id: string }>, vehicles: Array<{ __typename?: 'Vehicle', id: string }>, crimeGroups: Array<{ __typename?: 'CrimeGroup', id: string }>, articles: Array<{ __typename?: 'Article', id: string }> }> } }> } };


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