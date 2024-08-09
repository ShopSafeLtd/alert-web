import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateTermsAndConditionsMutationVariables = Types.Exact<{
  data: Types.CreateTermsInput;
}>;


export type CreateTermsAndConditionsMutation = { __typename?: 'Mutation', createTermsAndConditions: { __typename?: 'TermsAndCondition', id: string, content: string } };


export const CreateTermsAndConditionsDocument = gql`
    mutation createTermsAndConditions($data: CreateTermsInput!) {
  createTermsAndConditions(data: $data) {
    id
    content
  }
}
    `;
export type CreateTermsAndConditionsMutationFn = Apollo.MutationFunction<CreateTermsAndConditionsMutation, CreateTermsAndConditionsMutationVariables>;
export function useCreateTermsAndConditionsMutation(baseOptions?: Apollo.MutationHookOptions<CreateTermsAndConditionsMutation, CreateTermsAndConditionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTermsAndConditionsMutation, CreateTermsAndConditionsMutationVariables>(CreateTermsAndConditionsDocument, options);
      }
export type CreateTermsAndConditionsMutationHookResult = ReturnType<typeof useCreateTermsAndConditionsMutation>;
export type CreateTermsAndConditionsMutationResult = Apollo.MutationResult<CreateTermsAndConditionsMutation>;
export type CreateTermsAndConditionsMutationOptions = Apollo.BaseMutationOptions<CreateTermsAndConditionsMutation, CreateTermsAndConditionsMutationVariables>;