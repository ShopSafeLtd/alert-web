import type * as Types from '../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CurrentUserProviderQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentUserProviderQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: string, fullName: string, email?: string | null, reference?: number | null, messageCount: number, newUser: boolean, reportToAllBusinesses?: boolean | null, totalSchemes: number, totalUnreadNotifications: number, schemes: Array<{ __typename?: 'UserScheme', id: string }>, expoPushTokens: Array<{ __typename?: 'ExpoPushToken', id: string, token: string }>, defaultGroups: Array<{ __typename?: 'Group', id: string, schemeId: string, name: string }>, groups: Array<{ __typename?: 'Group', id: string, schemeId: string, name: string }>, businesses: Array<{ __typename?: 'Business', id: string, name: string, demId?: string | null }> } | null };


export const CurrentUserProviderDocument = gql`
    query CurrentUserProvider {
  currentUser {
    id
    fullName
    email
    reference
    messageCount
    newUser
    reportToAllBusinesses
    totalSchemes
    schemes(take: 1) {
      id
    }
    totalUnreadNotifications
    expoPushTokens {
      id
      token
    }
    defaultGroups {
      id
      schemeId
      name
    }
    groups {
      id
      schemeId
      name
    }
    businesses {
      id
      name
      demId
    }
  }
}
    `;
export function useCurrentUserProviderQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserProviderQuery, CurrentUserProviderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserProviderQuery, CurrentUserProviderQueryVariables>(CurrentUserProviderDocument, options);
      }
export function useCurrentUserProviderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserProviderQuery, CurrentUserProviderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserProviderQuery, CurrentUserProviderQueryVariables>(CurrentUserProviderDocument, options);
        }
export type CurrentUserProviderQueryHookResult = ReturnType<typeof useCurrentUserProviderQuery>;
export type CurrentUserProviderLazyQueryHookResult = ReturnType<typeof useCurrentUserProviderLazyQuery>;
export type CurrentUserProviderQueryResult = Apollo.QueryResult<CurrentUserProviderQuery, CurrentUserProviderQueryVariables>;