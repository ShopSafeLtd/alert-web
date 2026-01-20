import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PendingCriticalBulletinsQueryVariables = Types.Exact<{
  schemeId: Types.Scalars['String'];
}>;


export type PendingCriticalBulletinsQuery = { __typename?: 'Query', pendingCriticalBulletins: Array<{ __typename?: 'Article', id: string, title: string, previewText?: string | null, previewImage?: string | null, criticalExpiry?: Date | null, priority: Types.ArticlePriority, createdAt: Date, createdBy: { __typename?: 'User', id: string, fullName: string } }> };


export const PendingCriticalBulletinsDocument = gql`
    query PendingCriticalBulletins($schemeId: String!) {
  pendingCriticalBulletins(schemeId: $schemeId) {
    id
    title
    previewText
    previewImage
    criticalExpiry
    priority
    createdAt
    createdBy {
      id
      fullName
    }
  }
}
    `;
export function usePendingCriticalBulletinsQuery(baseOptions: Apollo.QueryHookOptions<PendingCriticalBulletinsQuery, PendingCriticalBulletinsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PendingCriticalBulletinsQuery, PendingCriticalBulletinsQueryVariables>(PendingCriticalBulletinsDocument, options);
      }
export function usePendingCriticalBulletinsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PendingCriticalBulletinsQuery, PendingCriticalBulletinsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PendingCriticalBulletinsQuery, PendingCriticalBulletinsQueryVariables>(PendingCriticalBulletinsDocument, options);
        }
export type PendingCriticalBulletinsQueryHookResult = ReturnType<typeof usePendingCriticalBulletinsQuery>;
export type PendingCriticalBulletinsLazyQueryHookResult = ReturnType<typeof usePendingCriticalBulletinsLazyQuery>;
export type PendingCriticalBulletinsQueryResult = Apollo.QueryResult<PendingCriticalBulletinsQuery, PendingCriticalBulletinsQueryVariables>;