import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ResourceTrainingVideoQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type ResourceTrainingVideoQuery = { __typename?: 'Query', trainingVideo: { __typename?: 'TrainingVideo', id: string, title: string, description?: string | null, videoUrl: string, thumbnailUrl?: string | null, thumbnailStatus: Types.ThumbnailStatus, viewCount: number, loginPrompt: boolean, mandatory: boolean, createdAt: Date, updatedAt: Date, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }> } };


export const ResourceTrainingVideoDocument = gql`
    query ResourceTrainingVideo($id: String!) {
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
    loginPrompt
    mandatory
    createdAt
    updatedAt
  }
}
    `;
export function useResourceTrainingVideoQuery(baseOptions: Apollo.QueryHookOptions<ResourceTrainingVideoQuery, ResourceTrainingVideoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ResourceTrainingVideoQuery, ResourceTrainingVideoQueryVariables>(ResourceTrainingVideoDocument, options);
      }
export function useResourceTrainingVideoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ResourceTrainingVideoQuery, ResourceTrainingVideoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ResourceTrainingVideoQuery, ResourceTrainingVideoQueryVariables>(ResourceTrainingVideoDocument, options);
        }
export type ResourceTrainingVideoQueryHookResult = ReturnType<typeof useResourceTrainingVideoQuery>;
export type ResourceTrainingVideoLazyQueryHookResult = ReturnType<typeof useResourceTrainingVideoLazyQuery>;
export type ResourceTrainingVideoQueryResult = Apollo.QueryResult<ResourceTrainingVideoQuery, ResourceTrainingVideoQueryVariables>;