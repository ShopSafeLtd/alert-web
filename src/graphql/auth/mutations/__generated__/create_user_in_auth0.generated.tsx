import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateUserinAuth0MutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  password: Types.Scalars['String'];
}>;


export type CreateUserinAuth0Mutation = { __typename?: 'Mutation', createUserInAuth0?: { __typename?: 'UserNewAuth0', message: string } | null };


export const CreateUserinAuth0Document = gql`
    mutation createUserinAuth0($id: String!, $password: String!) {
  createUserInAuth0(id: $id, password: $password) {
    message
  }
}
    `;
export type CreateUserinAuth0MutationFn = Apollo.MutationFunction<CreateUserinAuth0Mutation, CreateUserinAuth0MutationVariables>;
export function useCreateUserinAuth0Mutation(baseOptions?: Apollo.MutationHookOptions<CreateUserinAuth0Mutation, CreateUserinAuth0MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserinAuth0Mutation, CreateUserinAuth0MutationVariables>(CreateUserinAuth0Document, options);
      }
export type CreateUserinAuth0MutationHookResult = ReturnType<typeof useCreateUserinAuth0Mutation>;
export type CreateUserinAuth0MutationResult = Apollo.MutationResult<CreateUserinAuth0Mutation>;
export type CreateUserinAuth0MutationOptions = Apollo.BaseMutationOptions<CreateUserinAuth0Mutation, CreateUserinAuth0MutationVariables>;