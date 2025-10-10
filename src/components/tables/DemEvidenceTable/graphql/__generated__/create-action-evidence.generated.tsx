import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateActionEvidenceMutationVariables = Types.Exact<{
  data: Types.CreateActionEvidence;
}>;


export type CreateActionEvidenceMutation = { __typename?: 'Mutation', createActionEvidence?: string | null };


export const CreateActionEvidenceDocument = gql`
    mutation createActionEvidence($data: CreateActionEvidence!) {
  createActionEvidence(data: $data)
}
    `;
export type CreateActionEvidenceMutationFn = Apollo.MutationFunction<CreateActionEvidenceMutation, CreateActionEvidenceMutationVariables>;
export function useCreateActionEvidenceMutation(baseOptions?: Apollo.MutationHookOptions<CreateActionEvidenceMutation, CreateActionEvidenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateActionEvidenceMutation, CreateActionEvidenceMutationVariables>(CreateActionEvidenceDocument, options);
      }
export type CreateActionEvidenceMutationHookResult = ReturnType<typeof useCreateActionEvidenceMutation>;
export type CreateActionEvidenceMutationResult = Apollo.MutationResult<CreateActionEvidenceMutation>;
export type CreateActionEvidenceMutationOptions = Apollo.BaseMutationOptions<CreateActionEvidenceMutation, CreateActionEvidenceMutationVariables>;