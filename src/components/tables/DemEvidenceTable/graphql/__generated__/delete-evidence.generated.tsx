import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteEvidenceMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeleteEvidenceMutation = { __typename?: 'Mutation', deleteEvidence: { __typename?: 'Document', id: string } };


export const DeleteEvidenceDocument = gql`
    mutation deleteEvidence($id: String!) {
  deleteEvidence(where: {id: $id}) {
    id
  }
}
    `;
export type DeleteEvidenceMutationFn = Apollo.MutationFunction<DeleteEvidenceMutation, DeleteEvidenceMutationVariables>;
export function useDeleteEvidenceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEvidenceMutation, DeleteEvidenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEvidenceMutation, DeleteEvidenceMutationVariables>(DeleteEvidenceDocument, options);
      }
export type DeleteEvidenceMutationHookResult = ReturnType<typeof useDeleteEvidenceMutation>;
export type DeleteEvidenceMutationResult = Apollo.MutationResult<DeleteEvidenceMutation>;
export type DeleteEvidenceMutationOptions = Apollo.BaseMutationOptions<DeleteEvidenceMutation, DeleteEvidenceMutationVariables>;