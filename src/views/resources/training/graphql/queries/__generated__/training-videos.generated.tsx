import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ResourceTrainingVideosQueryVariables = Types.Exact<{
  schemeId: Types.Scalars['String'];
  where?: Types.InputMaybe<Types.TrainingVideoWhereInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Array<Types.TrainingVideoOrderByInput> | Types.TrainingVideoOrderByInput>;
}>;


export type ResourceTrainingVideosQuery = { __typename?: 'Query', trainingVideos: Array<{ __typename?: 'TrainingVideo', id: string, title: string, description?: string | null, videoUrl: string, thumbnailUrl?: string | null, thumbnailStatus: Types.ThumbnailStatus, viewCount: number, loginPrompt: boolean, mandatory: boolean, createdAt: Date, updatedAt: Date, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }> }> };


export const ResourceTrainingVideosDocument = gql`
    query ResourceTrainingVideos($schemeId: String!, $where: TrainingVideoWhereInput, $take: Int, $skip: Int, $orderBy: [TrainingVideoOrderByInput!]) {
  trainingVideos(
    schemeId: $schemeId
    where: $where
    take: $take
    skip: $skip
    orderBy: $orderBy
  ) {
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
export function useResourceTrainingVideosQuery(baseOptions: Apollo.QueryHookOptions<ResourceTrainingVideosQuery, ResourceTrainingVideosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ResourceTrainingVideosQuery, ResourceTrainingVideosQueryVariables>(ResourceTrainingVideosDocument, options);
      }
export function useResourceTrainingVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ResourceTrainingVideosQuery, ResourceTrainingVideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ResourceTrainingVideosQuery, ResourceTrainingVideosQueryVariables>(ResourceTrainingVideosDocument, options);
        }
export type ResourceTrainingVideosQueryHookResult = ReturnType<typeof useResourceTrainingVideosQuery>;
export type ResourceTrainingVideosLazyQueryHookResult = ReturnType<typeof useResourceTrainingVideosLazyQuery>;
export type ResourceTrainingVideosQueryResult = Apollo.QueryResult<ResourceTrainingVideosQuery, ResourceTrainingVideosQueryVariables>;