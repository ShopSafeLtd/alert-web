import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { SingleShoeFragmentDoc } from '../../../../../graphql/fragments/__generated__/shoe.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpsertShoeMutationVariables = Types.Exact<{
  data: Types.UpsertShoe;
}>;


export type UpsertShoeMutation = { readonly __typename?: 'Mutation', readonly upsertShoe: { readonly __typename?: 'Shoe', readonly matchedInfo?: string | null, readonly type: Types.ShoeType, readonly style: string, readonly size: number, readonly status: Types.ShoeStatus, readonly side: Types.ShoeSide, readonly retailPrice: number, readonly recycled: boolean, readonly id: string, readonly description: string, readonly colour: string, readonly box: boolean, readonly updatedAt: Date, readonly secondaryShoe?: { readonly __typename?: 'Shoe', readonly id: string } | null, readonly stockItem: { readonly __typename?: 'StockItem', readonly id: string, readonly sku?: string | null }, readonly business: { readonly __typename?: 'Business', readonly id: string, readonly name: string, readonly locations: ReadonlyArray<{ readonly __typename?: 'Address', readonly full: string }> }, readonly primaryShoe?: { readonly __typename?: 'Shoe', readonly id: string, readonly business: { readonly __typename?: 'Business', readonly id: string, readonly name: string, readonly locations: ReadonlyArray<{ readonly __typename?: 'Address', readonly full: string }> } } | null } };


export const UpsertShoeDocument = gql`
    mutation UpsertShoe($data: UpsertShoe!) {
  upsertShoe(data: $data) {
    ...SingleShoe
    matchedInfo
    secondaryShoe {
      id
    }
  }
}
    ${SingleShoeFragmentDoc}`;
export type UpsertShoeMutationFn = Apollo.MutationFunction<UpsertShoeMutation, UpsertShoeMutationVariables>;
export function useUpsertShoeMutation(baseOptions?: Apollo.MutationHookOptions<UpsertShoeMutation, UpsertShoeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertShoeMutation, UpsertShoeMutationVariables>(UpsertShoeDocument, options);
      }
export type UpsertShoeMutationHookResult = ReturnType<typeof useUpsertShoeMutation>;
export type UpsertShoeMutationResult = Apollo.MutationResult<UpsertShoeMutation>;
export type UpsertShoeMutationOptions = Apollo.BaseMutationOptions<UpsertShoeMutation, UpsertShoeMutationVariables>;