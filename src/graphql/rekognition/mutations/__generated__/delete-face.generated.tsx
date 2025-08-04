import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteFaceMutationVariables = Types.Exact<{
  where: Types.RekFaceWhereUniqueInput;
}>;


export type DeleteFaceMutation = { __typename?: 'Mutation', deleteFace?: { __typename?: 'RekFace', id?: string | null, faceId?: string | null } | null };


export const DeleteFaceDocument = gql`
    mutation DeleteFace($where: RekFaceWhereUniqueInput!) {
  deleteFace(where: $where) {
    id
    faceId
  }
}
    `;
export type DeleteFaceMutationFn = Apollo.MutationFunction<DeleteFaceMutation, DeleteFaceMutationVariables>;
export function useDeleteFaceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFaceMutation, DeleteFaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFaceMutation, DeleteFaceMutationVariables>(DeleteFaceDocument, options);
      }
export type DeleteFaceMutationHookResult = ReturnType<typeof useDeleteFaceMutation>;
export type DeleteFaceMutationResult = Apollo.MutationResult<DeleteFaceMutation>;
export type DeleteFaceMutationOptions = Apollo.BaseMutationOptions<DeleteFaceMutation, DeleteFaceMutationVariables>;