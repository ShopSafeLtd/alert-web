import type * as Types from '../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StockItemsListQueryVariables = Types.Exact<{
  where: Types.StockItemRelayWhereInput;
  take: Types.Scalars['Int'];
  after?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type StockItemsListQuery = { __typename?: 'Query', stockItemsSearch: { __typename?: 'StockItemSearchResult', hasMore?: string | null, stock: Array<{ __typename?: 'StockItem', id: string, name?: string | null, sku?: string | null, barcode?: string | null, brand?: string | null, division?: string | null, variant?: string | null, currency?: Types.Currency | null, salesPriceLocal?: number | null, salesPriceStandard?: number | null }> } };


export const StockItemsListDocument = gql`
    query StockItemsList($where: stockItemRelayWhereInput!, $take: Int!, $after: String) {
  stockItemsSearch(where: $where, take: $take, after: $after) {
    hasMore
    stock {
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
}
    `;
export function useStockItemsListQuery(baseOptions: Apollo.QueryHookOptions<StockItemsListQuery, StockItemsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StockItemsListQuery, StockItemsListQueryVariables>(StockItemsListDocument, options);
      }
export function useStockItemsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StockItemsListQuery, StockItemsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StockItemsListQuery, StockItemsListQueryVariables>(StockItemsListDocument, options);
        }
export type StockItemsListQueryHookResult = ReturnType<typeof useStockItemsListQuery>;
export type StockItemsListLazyQueryHookResult = ReturnType<typeof useStockItemsListLazyQuery>;
export type StockItemsListQueryResult = Apollo.QueryResult<StockItemsListQuery, StockItemsListQueryVariables>;