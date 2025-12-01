import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TrainingVideoQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type TrainingVideoQuery = { __typename?: 'Query', trainingVideo: { __typename?: 'TrainingVideo', id: string, title: string, description?: string | null, videoUrl: string, thumbnailUrl?: string | null, thumbnailStatus: Types.ThumbnailStatus, viewCount: number, createdAt: Date, updatedAt: Date, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }> } };


export const TrainingVideoDocument = gql`
    query TrainingVideo($id: String!) {
  trainingVideo(id: $id) {
    id
    title
    description
    videoUrl
    thumbnailUrl
    thumbnailStatus
    viewCount
    tags {
      id
      name
    }
    groups {
      id
      name
    }
    createdAt
    updatedAt
  }
}
    `;
export function useTrainingVideoQuery(baseOptions: Apollo.QueryHookOptions<TrainingVideoQuery, TrainingVideoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TrainingVideoQuery, TrainingVideoQueryVariables>(TrainingVideoDocument, options);
      }
export function useTrainingVideoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TrainingVideoQuery, TrainingVideoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TrainingVideoQuery, TrainingVideoQueryVariables>(TrainingVideoDocument, options);
        }
export type TrainingVideoQueryHookResult = ReturnType<typeof useTrainingVideoQuery>;
export type TrainingVideoLazyQueryHookResult = ReturnType<typeof useTrainingVideoLazyQuery>;
export type TrainingVideoQueryResult = Apollo.QueryResult<TrainingVideoQuery, TrainingVideoQueryVariables>;