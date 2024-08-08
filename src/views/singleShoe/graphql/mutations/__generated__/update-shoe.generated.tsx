import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { SingleShoeFragmentDoc } from '../../../../../graphql/fragments/__generated__/shoe.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateShoeMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.UpdateShoe;
}>;


export type UpdateShoeMutation = { readonly __typename?: 'Mutation', readonly updateShoe: { readonly __typename?: 'Shoe', readonly matchedInfo?: string | null, readonly type: Types.ShoeType, readonly style: string, readonly size: number, readonly status: Types.ShoeStatus, readonly side: Types.ShoeSide, readonly retailPrice: number, readonly recycled: boolean, readonly id: string, readonly description: string, readonly colour: string, readonly box: boolean, readonly updatedAt: Date, readonly stockItem: { readonly __typename?: 'StockItem', readonly id: string, readonly sku?: string | null }, readonly business: { readonly __typename?: 'Business', readonly id: string, readonly name: string, readonly locations: ReadonlyArray<{ readonly __typename?: 'Address', readonly full: string }> }, readonly primaryShoe?: { readonly __typename?: 'Shoe', readonly id: string, readonly business: { readonly __typename?: 'Business', readonly id: string, readonly name: string, readonly locations: ReadonlyArray<{ readonly __typename?: 'Address', readonly full: string }> } } | null } };


export const UpdateShoeDocument = gql`
    mutation UpdateShoe($where: UniqueId!, $data: UpdateShoe!) {
  updateShoe(where: $where, data: $data) {
    ...SingleShoe
    matchedInfo
  }
}
    ${SingleShoeFragmentDoc}`;
export type UpdateShoeMutationFn = Apollo.MutationFunction<UpdateShoeMutation, UpdateShoeMutationVariables>;
export function useUpdateShoeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateShoeMutation, UpdateShoeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateShoeMutation, UpdateShoeMutationVariables>(UpdateShoeDocument, options);
      }
export type UpdateShoeMutationHookResult = ReturnType<typeof useUpdateShoeMutation>;
export type UpdateShoeMutationResult = Apollo.MutationResult<UpdateShoeMutation>;
export type UpdateShoeMutationOptions = Apollo.BaseMutationOptions<UpdateShoeMutation, UpdateShoeMutationVariables>;