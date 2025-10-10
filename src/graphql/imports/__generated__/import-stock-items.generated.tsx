import type * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StockItemImportMutationVariables = Types.Exact<{
  data: Array<Types.StockItemsCreateInput> | Types.StockItemsCreateInput;
}>;


export type StockItemImportMutation = { __typename?: 'Mutation', stockItemImport: { __typename?: 'SystemTask', success: boolean } };


export const StockItemImportDocument = gql`
    mutation StockItemImport($data: [StockItemsCreateInput!]!) {
  stockItemImport(data: $data) {
    success
  }
}
    `;
export type StockItemImportMutationFn = Apollo.MutationFunction<StockItemImportMutation, StockItemImportMutationVariables>;
export function useStockItemImportMutation(baseOptions?: Apollo.MutationHookOptions<StockItemImportMutation, StockItemImportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StockItemImportMutation, StockItemImportMutationVariables>(StockItemImportDocument, options);
      }
export type StockItemImportMutationHookResult = ReturnType<typeof useStockItemImportMutation>;
export type StockItemImportMutationResult = Apollo.MutationResult<StockItemImportMutation>;
export type StockItemImportMutationOptions = Apollo.BaseMutationOptions<StockItemImportMutation, StockItemImportMutationVariables>;