import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CopyEvidenceToAlertMutationVariables = Types.Exact<{
  data: Types.CopyEvidenceInput;
}>;


export type CopyEvidenceToAlertMutation = { __typename?: 'Mutation', copyEvidenceToAlert?: { __typename?: 'Document', id?: string | null, name?: string | null, thumbnailUrl?: string | null, url?: string | null, createdAt?: Date | null, updatedAt?: Date | null } | null };


export const CopyEvidenceToAlertDocument = gql`
    mutation copyEvidenceToAlert($data: CopyEvidenceInput!) {
  copyEvidenceToAlert(data: $data) {
    id
    name
    thumbnailUrl
    url
    createdAt
    updatedAt
  }
}
    `;
export type CopyEvidenceToAlertMutationFn = Apollo.MutationFunction<CopyEvidenceToAlertMutation, CopyEvidenceToAlertMutationVariables>;
export function useCopyEvidenceToAlertMutation(baseOptions?: Apollo.MutationHookOptions<CopyEvidenceToAlertMutation, CopyEvidenceToAlertMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CopyEvidenceToAlertMutation, CopyEvidenceToAlertMutationVariables>(CopyEvidenceToAlertDocument, options);
      }
export type CopyEvidenceToAlertMutationHookResult = ReturnType<typeof useCopyEvidenceToAlertMutation>;
export type CopyEvidenceToAlertMutationResult = Apollo.MutationResult<CopyEvidenceToAlertMutation>;
export type CopyEvidenceToAlertMutationOptions = Apollo.BaseMutationOptions<CopyEvidenceToAlertMutation, CopyEvidenceToAlertMutationVariables>;