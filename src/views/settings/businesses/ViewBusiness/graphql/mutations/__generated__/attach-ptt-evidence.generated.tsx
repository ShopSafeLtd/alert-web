import type * as Types from '../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AttachPttEvidenceMutationVariables = Types.Exact<{
  incidentId: Types.Scalars['String'];
  sessionId: Types.Scalars['String'];
  chunks: Array<Types.AttachPttChunkInput> | Types.AttachPttChunkInput;
}>;


export type AttachPttEvidenceMutation = { __typename?: 'Mutation', attachPttEvidence: Array<{ __typename?: 'Document', id: string, name: string, url: string }> };


export const AttachPttEvidenceDocument = gql`
    mutation AttachPttEvidence($incidentId: String!, $sessionId: String!, $chunks: [AttachPttChunkInput!]!) {
  attachPttEvidence(
    incidentId: $incidentId
    sessionId: $sessionId
    chunks: $chunks
  ) {
    id
    name
    url
  }
}
    `;
export type AttachPttEvidenceMutationFn = Apollo.MutationFunction<AttachPttEvidenceMutation, AttachPttEvidenceMutationVariables>;
export function useAttachPttEvidenceMutation(baseOptions?: Apollo.MutationHookOptions<AttachPttEvidenceMutation, AttachPttEvidenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AttachPttEvidenceMutation, AttachPttEvidenceMutationVariables>(AttachPttEvidenceDocument, options);
      }
export type AttachPttEvidenceMutationHookResult = ReturnType<typeof useAttachPttEvidenceMutation>;
export type AttachPttEvidenceMutationResult = Apollo.MutationResult<AttachPttEvidenceMutation>;
export type AttachPttEvidenceMutationOptions = Apollo.BaseMutationOptions<AttachPttEvidenceMutation, AttachPttEvidenceMutationVariables>;