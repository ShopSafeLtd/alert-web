import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateTrainingVideoMutationVariables = Types.Exact<{
  input: Types.CreateTrainingVideoInput;
}>;


export type CreateTrainingVideoMutation = { __typename?: 'Mutation', createTrainingVideo: { __typename?: 'TrainingVideo', id: string, title: string, description?: string | null, videoUrl: string, thumbnailUrl?: string | null, thumbnailStatus: Types.ThumbnailStatus, viewCount: number, createdAt: Date, updatedAt: Date, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }> } };


export const CreateTrainingVideoDocument = gql`
    mutation CreateTrainingVideo($input: CreateTrainingVideoInput!) {
  createTrainingVideo(input: $input) {
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
export type CreateTrainingVideoMutationFn = Apollo.MutationFunction<CreateTrainingVideoMutation, CreateTrainingVideoMutationVariables>;
export function useCreateTrainingVideoMutation(baseOptions?: Apollo.MutationHookOptions<CreateTrainingVideoMutation, CreateTrainingVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTrainingVideoMutation, CreateTrainingVideoMutationVariables>(CreateTrainingVideoDocument, options);
      }
export type CreateTrainingVideoMutationHookResult = ReturnType<typeof useCreateTrainingVideoMutation>;
export type CreateTrainingVideoMutationResult = Apollo.MutationResult<CreateTrainingVideoMutation>;
export type CreateTrainingVideoMutationOptions = Apollo.BaseMutationOptions<CreateTrainingVideoMutation, CreateTrainingVideoMutationVariables>;