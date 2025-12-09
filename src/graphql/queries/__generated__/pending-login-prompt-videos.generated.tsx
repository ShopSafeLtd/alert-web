import type * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PendingLoginPromptVideosQueryVariables = Types.Exact<{
  schemeId: Types.Scalars['String'];
}>;


export type PendingLoginPromptVideosQuery = { __typename?: 'Query', pendingLoginPromptVideos: Array<{ __typename?: 'TrainingVideo', id: string, title: string, description?: string | null, videoUrl: string, thumbnailUrl?: string | null, duration?: number | null, mandatory: boolean, loginPrompt: boolean }> };


export const PendingLoginPromptVideosDocument = gql`
    query PendingLoginPromptVideos($schemeId: String!) {
  pendingLoginPromptVideos(schemeId: $schemeId) {
    id
    title
    description
    videoUrl
    thumbnailUrl
    duration
    mandatory
    loginPrompt
  }
}
    `;
export function usePendingLoginPromptVideosQuery(baseOptions: Apollo.QueryHookOptions<PendingLoginPromptVideosQuery, PendingLoginPromptVideosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PendingLoginPromptVideosQuery, PendingLoginPromptVideosQueryVariables>(PendingLoginPromptVideosDocument, options);
      }
export function usePendingLoginPromptVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PendingLoginPromptVideosQuery, PendingLoginPromptVideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PendingLoginPromptVideosQuery, PendingLoginPromptVideosQueryVariables>(PendingLoginPromptVideosDocument, options);
        }
export type PendingLoginPromptVideosQueryHookResult = ReturnType<typeof usePendingLoginPromptVideosQuery>;
export type PendingLoginPromptVideosLazyQueryHookResult = ReturnType<typeof usePendingLoginPromptVideosLazyQuery>;
export type PendingLoginPromptVideosQueryResult = Apollo.QueryResult<PendingLoginPromptVideosQuery, PendingLoginPromptVideosQueryVariables>;