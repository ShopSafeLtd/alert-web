import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StockItemSelectQueryVariables = Types.Exact<{
  where: Types.StockItemRelayWhereInput;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type StockItemSelectQuery = { __typename?: 'Query', stockItemsRelay: { __typename?: 'QueryStockItemsRelayConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean }, edges: Array<{ __typename?: 'QueryStockItemsRelayConnectionEdge', node: { __typename?: 'StockItem', id: string, barcode?: string | null, brand?: string | null, costPriceLocal?: number | null, costPriceStandard?: number | null, division?: string | null, name?: string | null, salesPriceLocal?: number | null, salesPriceStandard?: number | null, sku?: string | null, variant?: string | null } }> } };


export const StockItemSelectDocument = gql`
    query StockItemSelect($where: stockItemRelayWhereInput!, $first: Int, $after: String) {
  stockItemsRelay(where: $where, first: $first, after: $after) {
    totalCount
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
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
}
    `;
export function useStockItemSelectQuery(baseOptions: Apollo.QueryHookOptions<StockItemSelectQuery, StockItemSelectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StockItemSelectQuery, StockItemSelectQueryVariables>(StockItemSelectDocument, options);
      }
export function useStockItemSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StockItemSelectQuery, StockItemSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StockItemSelectQuery, StockItemSelectQueryVariables>(StockItemSelectDocument, options);
        }
export type StockItemSelectQueryHookResult = ReturnType<typeof useStockItemSelectQuery>;
export type StockItemSelectLazyQueryHookResult = ReturnType<typeof useStockItemSelectLazyQuery>;
export type StockItemSelectQueryResult = Apollo.QueryResult<StockItemSelectQuery, StockItemSelectQueryVariables>;