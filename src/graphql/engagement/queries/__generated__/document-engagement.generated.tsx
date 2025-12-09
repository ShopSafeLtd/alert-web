import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DocumentEngagementQueryVariables = Types.Exact<{
  documentId: Types.Scalars['String'];
}>;


export type DocumentEngagementQuery = { __typename?: 'Query', documentEngagement: { __typename?: 'DocumentEngagement', documentId: string, documentName: string, totalViews: number, totalUsers: number, viewedCount: number, notViewedCount: number, viewRate: number, averageViewsPerUser: number, users: Array<{ __typename?: 'DocumentUserEngagement', userId: string, userFullName: string, userEmail?: string | null, hasViewed: boolean, firstViewedAt?: Date | null, lastViewedAt?: Date | null, viewCount?: number | null }> } };


export const DocumentEngagementDocument = gql`
    query DocumentEngagement($documentId: String!) {
  documentEngagement(documentId: $documentId) {
    documentId
    documentName
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
export function useDocumentEngagementQuery(baseOptions: Apollo.QueryHookOptions<DocumentEngagementQuery, DocumentEngagementQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DocumentEngagementQuery, DocumentEngagementQueryVariables>(DocumentEngagementDocument, options);
      }
export function useDocumentEngagementLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DocumentEngagementQuery, DocumentEngagementQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DocumentEngagementQuery, DocumentEngagementQueryVariables>(DocumentEngagementDocument, options);
        }
export type DocumentEngagementQueryHookResult = ReturnType<typeof useDocumentEngagementQuery>;
export type DocumentEngagementLazyQueryHookResult = ReturnType<typeof useDocumentEngagementLazyQuery>;
export type DocumentEngagementQueryResult = Apollo.QueryResult<DocumentEngagementQuery, DocumentEngagementQueryVariables>;