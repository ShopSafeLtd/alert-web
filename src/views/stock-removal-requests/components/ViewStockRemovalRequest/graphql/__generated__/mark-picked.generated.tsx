import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MarkStockRemovalRequestAsPickedMutationVariables = Types.Exact<{
  data: Types.MarkStockRemovalRequestAsPickedInput;
}>;


export type MarkStockRemovalRequestAsPickedMutation = { __typename?: 'Mutation', markStockRemovalRequestAsPicked: { __typename?: 'StockRemovalRequest', id: string, status: Types.StockRemovalRequestStatus, tmid?: string | null, tracking?: string | null, items: Array<{ __typename?: 'StockRemovalItem', id: string, name?: string | null, brand?: string | null, sku?: string | null, barcode?: string | null, requestedQuantity?: number | null, pickedQuantity?: number | null, value?: number | null }> } };


export const MarkStockRemovalRequestAsPickedDocument = gql`
    mutation MarkStockRemovalRequestAsPicked($data: MarkStockRemovalRequestAsPickedInput!) {
  markStockRemovalRequestAsPicked(data: $data) {
    id
    status
    tmid
    tracking
    items {
      id
      name
      brand
      sku
      barcode
      requestedQuantity
      pickedQuantity
      value
    }
  }
}
    `;
export type MarkStockRemovalRequestAsPickedMutationFn = Apollo.MutationFunction<MarkStockRemovalRequestAsPickedMutation, MarkStockRemovalRequestAsPickedMutationVariables>;
export function useMarkStockRemovalRequestAsPickedMutation(baseOptions?: Apollo.MutationHookOptions<MarkStockRemovalRequestAsPickedMutation, MarkStockRemovalRequestAsPickedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkStockRemovalRequestAsPickedMutation, MarkStockRemovalRequestAsPickedMutationVariables>(MarkStockRemovalRequestAsPickedDocument, options);
      }
export type MarkStockRemovalRequestAsPickedMutationHookResult = ReturnType<typeof useMarkStockRemovalRequestAsPickedMutation>;
export type MarkStockRemovalRequestAsPickedMutationResult = Apollo.MutationResult<MarkStockRemovalRequestAsPickedMutation>;
export type MarkStockRemovalRequestAsPickedMutationOptions = Apollo.BaseMutationOptions<MarkStockRemovalRequestAsPickedMutation, MarkStockRemovalRequestAsPickedMutationVariables>;