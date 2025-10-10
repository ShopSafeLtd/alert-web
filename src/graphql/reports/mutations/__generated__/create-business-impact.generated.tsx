import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateOneBusinessImpactMutationVariables = Types.Exact<{
  data: Types.BusinessImpactInput;
}>;


export type CreateOneBusinessImpactMutation = { __typename?: 'Mutation', createOneBusinessImpact: { __typename?: 'Document', id: string, name: string } };


export const CreateOneBusinessImpactDocument = gql`
    mutation CreateOneBusinessImpact($data: BusinessImpactInput!) {
  createOneBusinessImpact(data: $data) {
    id
    name
  }
}
    `;
export type CreateOneBusinessImpactMutationFn = Apollo.MutationFunction<CreateOneBusinessImpactMutation, CreateOneBusinessImpactMutationVariables>;
export function useCreateOneBusinessImpactMutation(baseOptions?: Apollo.MutationHookOptions<CreateOneBusinessImpactMutation, CreateOneBusinessImpactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOneBusinessImpactMutation, CreateOneBusinessImpactMutationVariables>(CreateOneBusinessImpactDocument, options);
      }
export type CreateOneBusinessImpactMutationHookResult = ReturnType<typeof useCreateOneBusinessImpactMutation>;
export type CreateOneBusinessImpactMutationResult = Apollo.MutationResult<CreateOneBusinessImpactMutation>;
export type CreateOneBusinessImpactMutationOptions = Apollo.BaseMutationOptions<CreateOneBusinessImpactMutation, CreateOneBusinessImpactMutationVariables>;