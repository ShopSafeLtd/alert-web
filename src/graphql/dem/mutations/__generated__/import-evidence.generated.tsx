import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CopyEvidenceMutationVariables = Types.Exact<{
  data: Types.ImportDemEvidence;
  where: Types.UniqueId;
}>;


export type CopyEvidenceMutation = { __typename?: 'Mutation', copyEvidenceOnInvestigation: { __typename?: 'Document', id: string, name: string, url: string, thumbnailUrl?: string | null, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, investigation: Array<{ __typename?: 'Investigation', id: string, name: string }> } };


export const CopyEvidenceDocument = gql`
    mutation CopyEvidence($data: ImportDemEvidence!, $where: UniqueId!) {
  copyEvidenceOnInvestigation(data: $data, where: $where) {
    id
    name
    url
    thumbnailUrl
    tags {
      id
      name
    }
    investigation {
      id
      name
    }
  }
}
    `;
export type CopyEvidenceMutationFn = Apollo.MutationFunction<CopyEvidenceMutation, CopyEvidenceMutationVariables>;
export function useCopyEvidenceMutation(baseOptions?: Apollo.MutationHookOptions<CopyEvidenceMutation, CopyEvidenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CopyEvidenceMutation, CopyEvidenceMutationVariables>(CopyEvidenceDocument, options);
      }
export type CopyEvidenceMutationHookResult = ReturnType<typeof useCopyEvidenceMutation>;
export type CopyEvidenceMutationResult = Apollo.MutationResult<CopyEvidenceMutation>;
export type CopyEvidenceMutationOptions = Apollo.BaseMutationOptions<CopyEvidenceMutation, CopyEvidenceMutationVariables>;