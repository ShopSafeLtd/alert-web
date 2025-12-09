import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OffenderEngagementQueryVariables = Types.Exact<{
  offenderId: Types.Scalars['String'];
}>;


export type OffenderEngagementQuery = { __typename?: 'Query', offenderEngagement: { __typename?: 'OffenderEngagement', offenderId: string, offenderName: string, totalViews: number, totalUsers: number, viewedCount: number, notViewedCount: number, viewRate: number, averageViewsPerUser: number, users: Array<{ __typename?: 'OffenderUserEngagement', userId: string, userFullName: string, userEmail?: string | null, hasViewed: boolean, firstViewedAt?: Date | null, lastViewedAt?: Date | null, viewCount?: number | null }> } };


export const OffenderEngagementDocument = gql`
    query OffenderEngagement($offenderId: String!) {
  offenderEngagement(offenderId: $offenderId) {
    offenderId
    offenderName
    totalViews
    totalUsers
    viewedCount
    notViewedCount
    viewRate
    averageViewsPerUser
    users {
      userId
      userFullName
      userEmail
      hasViewed
      firstViewedAt
      lastViewedAt
      viewCount
    }
  }
}
    `;
export function useOffenderEngagementQuery(baseOptions: Apollo.QueryHookOptions<OffenderEngagementQuery, OffenderEngagementQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OffenderEngagementQuery, OffenderEngagementQueryVariables>(OffenderEngagementDocument, options);
      }
export function useOffenderEngagementLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OffenderEngagementQuery, OffenderEngagementQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OffenderEngagementQuery, OffenderEngagementQueryVariables>(OffenderEngagementDocument, options);
        }
export type OffenderEngagementQueryHookResult = ReturnType<typeof useOffenderEngagementQuery>;
export type OffenderEngagementLazyQueryHookResult = ReturnType<typeof useOffenderEngagementLazyQuery>;
export type OffenderEngagementQueryResult = Apollo.QueryResult<OffenderEngagementQuery, OffenderEngagementQueryVariables>;