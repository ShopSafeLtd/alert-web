import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateStockItemMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.UpdateStockItemInput;
}>;


export type UpdateStockItemMutation = { __typename?: 'Mutation', updateStockItem: { __typename?: 'StockItem', id: string, name?: string | null, sku?: string | null, barcode?: string | null, brand?: string | null, division?: string | null, variant?: string | null, currency?: Types.Currency | null, salesPriceLocal?: number | null, salesPriceStandard?: number | null } };


export const UpdateStockItemDocument = gql`
    mutation UpdateStockItem($where: UniqueId!, $data: UpdateStockItemInput!) {
  updateStockItem(where: $where, data: $data) {
    id
    name
    sku
    barcode
    brand
    division
    variant
    currency
    salesPriceLocal
    salesPriceStandard
  }
}
    `;
export type UpdateStockItemMutationFn = Apollo.MutationFunction<UpdateStockItemMutation, UpdateStockItemMutationVariables>;
export function useUpdateStockItemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStockItemMutation, UpdateStockItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStockItemMutation, UpdateStockItemMutationVariables>(UpdateStockItemDocument, options);
      }
export type UpdateStockItemMutationHookResult = ReturnType<typeof useUpdateStockItemMutation>;
export type UpdateStockItemMutationResult = Apollo.MutationResult<UpdateStockItemMutation>;
export type UpdateStockItemMutationOptions = Apollo.BaseMutationOptions<UpdateStockItemMutation, UpdateStockItemMutationVariables>;