import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SignTermsMutationVariables = Types.Exact<{
  data: Types.SignTermsInput;
}>;


export type SignTermsMutation = { __typename?: 'Mutation', signTerms: { __typename?: 'UserTerm', id: string } };


export const SignTermsDocument = gql`
    mutation signTerms($data: SignTermsInput!) {
  signTerms(data: $data) {
    id
  }
}
    `;
export type SignTermsMutationFn = Apollo.MutationFunction<SignTermsMutation, SignTermsMutationVariables>;
export function useSignTermsMutation(baseOptions?: Apollo.MutationHookOptions<SignTermsMutation, SignTermsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignTermsMutation, SignTermsMutationVariables>(SignTermsDocument, options);
      }
export type SignTermsMutationHookResult = ReturnType<typeof useSignTermsMutation>;
export type SignTermsMutationResult = Apollo.MutationResult<SignTermsMutation>;
export type SignTermsMutationOptions = Apollo.BaseMutationOptions<SignTermsMutation, SignTermsMutationVariables>;