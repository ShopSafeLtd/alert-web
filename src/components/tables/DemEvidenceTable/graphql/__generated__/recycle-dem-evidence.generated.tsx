import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RecycleDemEvidenceMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type RecycleDemEvidenceMutation = { __typename?: 'Mutation', recycleDemEvidence?: string | null };


export const RecycleDemEvidenceDocument = gql`
    mutation recycleDemEvidence($id: String!) {
  recycleDemEvidence(where: {id: $id})
}
    `;
export type RecycleDemEvidenceMutationFn = Apollo.MutationFunction<RecycleDemEvidenceMutation, RecycleDemEvidenceMutationVariables>;
export function useRecycleDemEvidenceMutation(baseOptions?: Apollo.MutationHookOptions<RecycleDemEvidenceMutation, RecycleDemEvidenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RecycleDemEvidenceMutation, RecycleDemEvidenceMutationVariables>(RecycleDemEvidenceDocument, options);
      }
export type RecycleDemEvidenceMutationHookResult = ReturnType<typeof useRecycleDemEvidenceMutation>;
export type RecycleDemEvidenceMutationResult = Apollo.MutationResult<RecycleDemEvidenceMutation>;
export type RecycleDemEvidenceMutationOptions = Apollo.BaseMutationOptions<RecycleDemEvidenceMutation, RecycleDemEvidenceMutationVariables>;