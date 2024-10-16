import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { SingleShoeFragmentDoc } from '../../../../../graphql/fragments/__generated__/singleShoe.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpsertShoeMutationVariables = Types.Exact<{
  data: Types.UpsertShoe;
}>;


export type UpsertShoeMutation = { __typename?: 'Mutation', upsertShoe: { __typename?: 'Shoe', matchedInfo?: string | null, type: Types.ShoeType, style: string, size: number, status: Types.ShoeStatus, side: Types.ShoeSide, retailPrice: number, recycled: boolean, id: string, description: string, colour: string, box: boolean, updatedAt: Date, secondaryShoe?: { __typename?: 'Shoe', id: string } | null, stockItem: { __typename?: 'StockItem', id: string, sku?: string | null }, business: { __typename?: 'Business', id: string, name: string, locations: Array<{ __typename?: 'Address', full: string }> }, primaryShoe?: { __typename?: 'Shoe', id: string, business: { __typename?: 'Business', id: string, name: string, locations: Array<{ __typename?: 'Address', full: string }> } } | null } };


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