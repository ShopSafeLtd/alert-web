import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StockItemsSearchQueryVariables = Types.Exact<{
  where: Types.StockItemRelayWhereInput;
  take: Types.Scalars['Int'];
  after?: Types.InputMaybe<Types.Scalars['String']>;
  orderBy?: Types.InputMaybe<Types.StockItemRelayOrderInput>;
}>;


export type StockItemsSearchQuery = { __typename?: 'Query', stockItemsSearch: { __typename?: 'StockItemSearchResult', hasMore?: string | null, stock: Array<{ __typename?: 'StockItem', id: string, barcode?: string | null, brand?: string | null, costPriceLocal?: number | null, costPriceStandard?: number | null, division?: string | null, name?: string | null, salesPriceLocal?: number | null, salesPriceStandard?: number | null, sku?: string | null, variant?: string | null }> } };


export const StockItemsSearchDocument = gql`
    query StockItemsSearch($where: stockItemRelayWhereInput!, $take: Int!, $after: String, $orderBy: stockItemRelayOrderInput) {
  stockItemsSearch(where: $where, take: $take, after: $after, orderBy: $orderBy) {
    hasMore
    stock {
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
      variant
    }
  }
}
    `;
export function useStockItemsSearchQuery(baseOptions: Apollo.QueryHookOptions<StockItemsSearchQuery, StockItemsSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StockItemsSearchQuery, StockItemsSearchQueryVariables>(StockItemsSearchDocument, options);
      }
export function useStockItemsSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StockItemsSearchQuery, StockItemsSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StockItemsSearchQuery, StockItemsSearchQueryVariables>(StockItemsSearchDocument, options);
        }
export type StockItemsSearchQueryHookResult = ReturnType<typeof useStockItemsSearchQuery>;
export type StockItemsSearchLazyQueryHookResult = ReturnType<typeof useStockItemsSearchLazyQuery>;
export type StockItemsSearchQueryResult = Apollo.QueryResult<StockItemsSearchQuery, StockItemsSearchQueryVariables>;