import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListStockItemsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.StockItemsWhereInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type ListStockItemsQuery = { __typename?: 'Query', listStockItems: { __typename?: 'ListStockItems', total: number, stockItems: Array<{ __typename?: 'StockItem', id?: string | null, barcode?: string | null, brand?: string | null, costPriceLocal?: number | null, costPriceStandard?: number | null, division?: string | null, name?: string | null, salesPriceLocal?: number | null, salesPriceStandard?: number | null, sku?: string | null }> } };


export const ListStockItemsDocument = gql`
    query ListStockItems($where: StockItemsWhereInput, $take: Int) {
  listStockItems(where: $where, take: $take) {
    total
    stockItems {
      id
      barcode
      brand
      costPriceLocal
      costPriceStandard
      division
      name
      salesPriceLocal
      salesPriceStandard
      sku
    }
  }
}
    `;
export function useListStockItemsQuery(baseOptions?: Apollo.QueryHookOptions<ListStockItemsQuery, ListStockItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListStockItemsQuery, ListStockItemsQueryVariables>(ListStockItemsDocument, options);
      }
export function useListStockItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListStockItemsQuery, ListStockItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListStockItemsQuery, ListStockItemsQueryVariables>(ListStockItemsDocument, options);
        }
export type ListStockItemsQueryHookResult = ReturnType<typeof useListStockItemsQuery>;
export type ListStockItemsLazyQueryHookResult = ReturnType<typeof useListStockItemsLazyQuery>;
export type ListStockItemsQueryResult = Apollo.QueryResult<ListStockItemsQuery, ListStockItemsQueryVariables>;