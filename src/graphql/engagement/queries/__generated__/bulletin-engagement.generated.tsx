import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BulletinEngagementQueryVariables = Types.Exact<{
  articleId: Types.Scalars['String'];
}>;


export type BulletinEngagementQuery = { __typename?: 'Query', bulletinEngagement: { __typename?: 'BulletinEngagement', bulletinId: string, bulletinTitle: string, totalViews: number, totalUsers: number, viewedCount: number, notViewedCount: number, viewRate: number, averageViewsPerUser: number, users: Array<{ __typename?: 'BulletinUserEngagement', userId: string, userFullName: string, userEmail?: string | null, hasViewed: boolean, firstViewedAt?: Date | null, lastViewedAt?: Date | null, viewCount?: number | null }> } };


export const BulletinEngagementDocument = gql`
    query BulletinEngagement($articleId: String!) {
  bulletinEngagement(articleId: $articleId) {
    bulletinId
    bulletinTitle
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
export function useBulletinEngagementQuery(baseOptions: Apollo.QueryHookOptions<BulletinEngagementQuery, BulletinEngagementQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BulletinEngagementQuery, BulletinEngagementQueryVariables>(BulletinEngagementDocument, options);
      }
export function useBulletinEngagementLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BulletinEngagementQuery, BulletinEngagementQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BulletinEngagementQuery, BulletinEngagementQueryVariables>(BulletinEngagementDocument, options);
        }
export type BulletinEngagementQueryHookResult = ReturnType<typeof useBulletinEngagementQuery>;
export type BulletinEngagementLazyQueryHookResult = ReturnType<typeof useBulletinEngagementLazyQuery>;
export type BulletinEngagementQueryResult = Apollo.QueryResult<BulletinEngagementQuery, BulletinEngagementQueryVariables>;