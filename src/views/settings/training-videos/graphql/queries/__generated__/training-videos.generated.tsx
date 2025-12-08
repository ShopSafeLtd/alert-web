import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TrainingVideosQueryVariables = Types.Exact<{
  schemeId: Types.Scalars['String'];
  where?: Types.InputMaybe<Types.TrainingVideoWhereInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type TrainingVideosQuery = { __typename?: 'Query', trainingVideos: Array<{ __typename?: 'TrainingVideo', id: string, title: string, description?: string | null, videoUrl: string, thumbnailUrl?: string | null, thumbnailStatus: Types.ThumbnailStatus, viewCount: number, loginPrompt: boolean, mandatory: boolean, createdAt: Date, updatedAt: Date, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }> }> };


export const TrainingVideosDocument = gql`
    query TrainingVideos($schemeId: String!, $where: TrainingVideoWhereInput, $take: Int, $skip: Int) {
  trainingVideos(schemeId: $schemeId, where: $where, take: $take, skip: $skip) {
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
    loginPrompt
    mandatory
    createdAt
    updatedAt
  }
}
    `;
export function useTrainingVideosQuery(baseOptions: Apollo.QueryHookOptions<TrainingVideosQuery, TrainingVideosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TrainingVideosQuery, TrainingVideosQueryVariables>(TrainingVideosDocument, options);
      }
export function useTrainingVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TrainingVideosQuery, TrainingVideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TrainingVideosQuery, TrainingVideosQueryVariables>(TrainingVideosDocument, options);
        }
export type TrainingVideosQueryHookResult = ReturnType<typeof useTrainingVideosQuery>;
export type TrainingVideosLazyQueryHookResult = ReturnType<typeof useTrainingVideosLazyQuery>;
export type TrainingVideosQueryResult = Apollo.QueryResult<TrainingVideosQuery, TrainingVideosQueryVariables>;