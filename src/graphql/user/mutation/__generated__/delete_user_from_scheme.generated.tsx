import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteUserFromSchemeMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  scheme: Types.Scalars['String'];
}>;


export type DeleteUserFromSchemeMutation = { __typename?: 'Mutation', deleteUserFromScheme?: { __typename?: 'User', id?: string | null } | null };


export const DeleteUserFromSchemeDocument = gql`
    mutation deleteUserFromScheme($id: String!, $scheme: String!) {
  deleteUserFromScheme(id: $id, scheme: $scheme) {
    id
  }
}
    `;
export type DeleteUserFromSchemeMutationFn = Apollo.MutationFunction<DeleteUserFromSchemeMutation, DeleteUserFromSchemeMutationVariables>;
export function useDeleteUserFromSchemeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserFromSchemeMutation, DeleteUserFromSchemeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserFromSchemeMutation, DeleteUserFromSchemeMutationVariables>(DeleteUserFromSchemeDocument, options);
      }
export type DeleteUserFromSchemeMutationHookResult = ReturnType<typeof useDeleteUserFromSchemeMutation>;
export type DeleteUserFromSchemeMutationResult = Apollo.MutationResult<DeleteUserFromSchemeMutation>;
export type DeleteUserFromSchemeMutationOptions = Apollo.BaseMutationOptions<DeleteUserFromSchemeMutation, DeleteUserFromSchemeMutationVariables>;