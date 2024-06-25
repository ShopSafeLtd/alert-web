import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MentionableUsersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MentionableUsersQuery = { __typename?: 'Query', mentionableUsers: Array<{ __typename?: 'MentionableUser', businessesName: string, firstLetter: string, fullName: string, id: string, oldFullName: string }> };


export const MentionableUsersDocument = gql`
    query MentionableUsers {
  mentionableUsers {
    businessesName
    firstLetter
    fullName
    id
    oldFullName
  }
}
    `;
export function useMentionableUsersQuery(baseOptions?: Apollo.QueryHookOptions<MentionableUsersQuery, MentionableUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MentionableUsersQuery, MentionableUsersQueryVariables>(MentionableUsersDocument, options);
      }
export function useMentionableUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MentionableUsersQuery, MentionableUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MentionableUsersQuery, MentionableUsersQueryVariables>(MentionableUsersDocument, options);
        }
export type MentionableUsersQueryHookResult = ReturnType<typeof useMentionableUsersQuery>;
export type MentionableUsersLazyQueryHookResult = ReturnType<typeof useMentionableUsersLazyQuery>;
export type MentionableUsersQueryResult = Apollo.QueryResult<MentionableUsersQuery, MentionableUsersQueryVariables>;