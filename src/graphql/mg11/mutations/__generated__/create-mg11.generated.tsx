import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateMg11MutationVariables = Types.Exact<{
  data: Types.Mg11CreateInput;
  schemeId: Types.Scalars['String'];
}>;


export type CreateMg11Mutation = { __typename?: 'Mutation', createMg11?: { __typename?: 'MG11', id?: string | null } | null };


export const CreateMg11Document = gql`
    mutation CreateMg11($data: MG11CreateInput!, $schemeId: String!) {
  createMg11(data: $data, schemeId: $schemeId) {
    id
  }
}
    `;
export type CreateMg11MutationFn = Apollo.MutationFunction<CreateMg11Mutation, CreateMg11MutationVariables>;
export function useCreateMg11Mutation(baseOptions?: Apollo.MutationHookOptions<CreateMg11Mutation, CreateMg11MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMg11Mutation, CreateMg11MutationVariables>(CreateMg11Document, options);
      }
export type CreateMg11MutationHookResult = ReturnType<typeof useCreateMg11Mutation>;
export type CreateMg11MutationResult = Apollo.MutationResult<CreateMg11Mutation>;
export type CreateMg11MutationOptions = Apollo.BaseMutationOptions<CreateMg11Mutation, CreateMg11MutationVariables>;