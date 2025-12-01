import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateTrainingVideoMutationVariables = Types.Exact<{
  input: Types.UpdateTrainingVideoInput;
}>;


export type UpdateTrainingVideoMutation = { __typename?: 'Mutation', updateTrainingVideo: { __typename?: 'TrainingVideo', id: string, title: string, description?: string | null, videoUrl: string, thumbnailUrl?: string | null, thumbnailStatus: Types.ThumbnailStatus, viewCount: number, createdAt: Date, updatedAt: Date, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }> } };


export const UpdateTrainingVideoDocument = gql`
    mutation UpdateTrainingVideo($input: UpdateTrainingVideoInput!) {
  updateTrainingVideo(input: $input) {
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
export type UpdateTrainingVideoMutationFn = Apollo.MutationFunction<UpdateTrainingVideoMutation, UpdateTrainingVideoMutationVariables>;
export function useUpdateTrainingVideoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTrainingVideoMutation, UpdateTrainingVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTrainingVideoMutation, UpdateTrainingVideoMutationVariables>(UpdateTrainingVideoDocument, options);
      }
export type UpdateTrainingVideoMutationHookResult = ReturnType<typeof useUpdateTrainingVideoMutation>;
export type UpdateTrainingVideoMutationResult = Apollo.MutationResult<UpdateTrainingVideoMutation>;
export type UpdateTrainingVideoMutationOptions = Apollo.BaseMutationOptions<UpdateTrainingVideoMutation, UpdateTrainingVideoMutationVariables>;