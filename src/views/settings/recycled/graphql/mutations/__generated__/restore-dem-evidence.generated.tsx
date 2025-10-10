import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RestoreDemEvidenceMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type RestoreDemEvidenceMutation = { __typename?: 'Mutation', restoreDemEvidence?: string | null };


export const RestoreDemEvidenceDocument = gql`
    mutation restoreDemEvidence($id: String!) {
  restoreDemEvidence(where: {id: $id})
}
    `;
export type RestoreDemEvidenceMutationFn = Apollo.MutationFunction<RestoreDemEvidenceMutation, RestoreDemEvidenceMutationVariables>;
export function useRestoreDemEvidenceMutation(baseOptions?: Apollo.MutationHookOptions<RestoreDemEvidenceMutation, RestoreDemEvidenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RestoreDemEvidenceMutation, RestoreDemEvidenceMutationVariables>(RestoreDemEvidenceDocument, options);
      }
export type RestoreDemEvidenceMutationHookResult = ReturnType<typeof useRestoreDemEvidenceMutation>;
export type RestoreDemEvidenceMutationResult = Apollo.MutationResult<RestoreDemEvidenceMutation>;
export type RestoreDemEvidenceMutationOptions = Apollo.BaseMutationOptions<RestoreDemEvidenceMutation, RestoreDemEvidenceMutationVariables>;