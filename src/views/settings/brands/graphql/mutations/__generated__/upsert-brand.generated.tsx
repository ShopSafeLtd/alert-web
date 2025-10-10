import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpsertBrandMutationVariables = Types.Exact<{
  data: Types.UpsertBrand;
}>;


export type UpsertBrandMutation = { __typename?: 'Mutation', upsertBrand: { __typename?: 'Brand', id: string, name: string, businessCount: number, description?: string | null } };


export const UpsertBrandDocument = gql`
    mutation UpsertBrand($data: UpsertBrand!) {
  upsertBrand(data: $data) {
    id
    name
    businessCount
    description
  }
}
    `;
export type UpsertBrandMutationFn = Apollo.MutationFunction<UpsertBrandMutation, UpsertBrandMutationVariables>;
export function useUpsertBrandMutation(baseOptions?: Apollo.MutationHookOptions<UpsertBrandMutation, UpsertBrandMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertBrandMutation, UpsertBrandMutationVariables>(UpsertBrandDocument, options);
      }
export type UpsertBrandMutationHookResult = ReturnType<typeof useUpsertBrandMutation>;
export type UpsertBrandMutationResult = Apollo.MutationResult<UpsertBrandMutation>;
export type UpsertBrandMutationOptions = Apollo.BaseMutationOptions<UpsertBrandMutation, UpsertBrandMutationVariables>;