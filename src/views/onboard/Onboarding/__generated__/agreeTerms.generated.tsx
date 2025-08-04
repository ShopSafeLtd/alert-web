import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AgreeTermsMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.UserUpdateInput;
}>;


export type AgreeTermsMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', id?: string | null, newUser?: boolean | null, termsSigned?: boolean | null } | null };


export const AgreeTermsDocument = gql`
    mutation agreeTerms($where: UniqueId!, $data: UserUpdateInput!) {
  updateUser(where: $where, data: $data) {
    id
    newUser
    termsSigned
  }
}
    `;
export type AgreeTermsMutationFn = Apollo.MutationFunction<AgreeTermsMutation, AgreeTermsMutationVariables>;
export function useAgreeTermsMutation(baseOptions?: Apollo.MutationHookOptions<AgreeTermsMutation, AgreeTermsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AgreeTermsMutation, AgreeTermsMutationVariables>(AgreeTermsDocument, options);
      }
export type AgreeTermsMutationHookResult = ReturnType<typeof useAgreeTermsMutation>;
export type AgreeTermsMutationResult = Apollo.MutationResult<AgreeTermsMutation>;
export type AgreeTermsMutationOptions = Apollo.BaseMutationOptions<AgreeTermsMutation, AgreeTermsMutationVariables>;