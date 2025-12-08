import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserEngagementActivityQueryVariables = Types.Exact<{
  userId?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type UserEngagementActivityQuery = { __typename?: 'Query', userEngagementActivity: { __typename?: 'UserEngagementActivity', userId: string, userFullName: string, totalViews: number, totalBulletinsViewed: number, totalDocumentsViewed: number, totalOffendersViewed: number, bulletins: Array<{ __typename?: 'BulletinView', bulletinId: string, bulletinTitle: string, viewCount: number, firstViewedAt: Date, lastViewedAt: Date }>, documents: Array<{ __typename?: 'DocumentView', documentId: string, documentName: string, viewCount: number, firstViewedAt: Date, lastViewedAt: Date }>, offenders: Array<{ __typename?: 'OffenderView', offenderId: string, offenderName: string, viewCount: number, firstViewedAt: Date, lastViewedAt: Date }> } };


export const UserEngagementActivityDocument = gql`
    query UserEngagementActivity($userId: String) {
  userEngagementActivity(userId: $userId) {
    userId
    userFullName
    totalViews
    totalBulletinsViewed
    totalDocumentsViewed
    totalOffendersViewed
    bulletins {
      bulletinId
      bulletinTitle
      viewCount
      firstViewedAt
      lastViewedAt
    }
    documents {
      documentId
      documentName
      viewCount
      firstViewedAt
      lastViewedAt
    }
    offenders {
      offenderId
      offenderName
      viewCount
      firstViewedAt
      lastViewedAt
    }
  }
}
    `;
export function useUserEngagementActivityQuery(baseOptions?: Apollo.QueryHookOptions<UserEngagementActivityQuery, UserEngagementActivityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserEngagementActivityQuery, UserEngagementActivityQueryVariables>(UserEngagementActivityDocument, options);
      }
export function useUserEngagementActivityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserEngagementActivityQuery, UserEngagementActivityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserEngagementActivityQuery, UserEngagementActivityQueryVariables>(UserEngagementActivityDocument, options);
        }
export type UserEngagementActivityQueryHookResult = ReturnType<typeof useUserEngagementActivityQuery>;
export type UserEngagementActivityLazyQueryHookResult = ReturnType<typeof useUserEngagementActivityLazyQuery>;
export type UserEngagementActivityQueryResult = Apollo.QueryResult<UserEngagementActivityQuery, UserEngagementActivityQueryVariables>;