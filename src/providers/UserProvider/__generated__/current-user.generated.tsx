import type * as Types from '../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CurrentUserProviderQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentUserProviderQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id?: string | null, fullName: string, email?: string | null, reference?: number | null, messageCount?: number | null, newUser?: boolean | null, reportToAllBusinesses?: boolean | null, hasPassword?: boolean | null, totalSchemes: number, termsExpired?: boolean | null, forcePasswordReset?: boolean | null, totalUnreadNotifications?: number | null, schemes: Array<{ __typename?: 'UserScheme', id?: string | null, schemeId?: string | null, permissionsId?: string | null, scheme?: { __typename?: 'Scheme', id?: string | null, name?: string | null } | null }>, expoPushTokens?: Array<{ __typename?: 'ExpoPushToken', id?: string | null, token?: string | null }> | null, defaultGroups: Array<{ __typename?: 'Group', id: string, schemeId: string, name: string }>, groups: Array<{ __typename?: 'Group', id: string, schemeId: string, name: string }>, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null, demId?: string | null, brands?: Array<string> | null, schemes: Array<{ __typename?: 'Scheme', id?: string | null }> }> } | null };


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
    hasPassword
    totalSchemes
    termsExpired
    forcePasswordReset
    messageCount
    schemes {
      id
      schemeId
      scheme {
        id
        name
      }
      permissionsId
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
      brands
      schemes {
        id
      }
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