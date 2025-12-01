import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteTrainingVideoMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeleteTrainingVideoMutation = { __typename?: 'Mutation', deleteTrainingVideo: boolean };


export const DeleteTrainingVideoDocument = gql`
    mutation DeleteTrainingVideo($id: String!) {
  deleteTrainingVideo(id: $id)
}
    `;
export type DeleteTrainingVideoMutationFn = Apollo.MutationFunction<DeleteTrainingVideoMutation, DeleteTrainingVideoMutationVariables>;
export function useDeleteTrainingVideoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTrainingVideoMutation, DeleteTrainingVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTrainingVideoMutation, DeleteTrainingVideoMutationVariables>(DeleteTrainingVideoDocument, options);
      }
export type DeleteTrainingVideoMutationHookResult = ReturnType<typeof useDeleteTrainingVideoMutation>;
export type DeleteTrainingVideoMutationResult = Apollo.MutationResult<DeleteTrainingVideoMutation>;
export type DeleteTrainingVideoMutationOptions = Apollo.BaseMutationOptions<DeleteTrainingVideoMutation, DeleteTrainingVideoMutationVariables>;