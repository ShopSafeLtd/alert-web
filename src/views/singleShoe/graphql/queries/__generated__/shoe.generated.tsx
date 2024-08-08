import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { SingleShoeFragmentDoc } from '../../../../../graphql/fragments/__generated__/shoe.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ShoeQueryVariables = Types.Exact<{
  where: Types.ShoeWhereUniqueInput;
}>;


export type ShoeQuery = { readonly __typename?: 'Query', readonly shoe: { readonly __typename?: 'Shoe', readonly type: Types.ShoeType, readonly style: string, readonly size: number, readonly status: Types.ShoeStatus, readonly side: Types.ShoeSide, readonly retailPrice: number, readonly recycled: boolean, readonly id: string, readonly description: string, readonly colour: string, readonly box: boolean, readonly updatedAt: Date, readonly stockItem: { readonly __typename?: 'StockItem', readonly id: string, readonly sku?: string | null }, readonly business: { readonly __typename?: 'Business', readonly id: string, readonly name: string, readonly locations: ReadonlyArray<{ readonly __typename?: 'Address', readonly full: string }> }, readonly primaryShoe?: { readonly __typename?: 'Shoe', readonly id: string, readonly business: { readonly __typename?: 'Business', readonly id: string, readonly name: string, readonly locations: ReadonlyArray<{ readonly __typename?: 'Address', readonly full: string }> } } | null } };


export const ShoeDocument = gql`
    query Shoe($where: ShoeWhereUniqueInput!) {
  shoe(where: $where) {
    ...SingleShoe
  }
}
    ${SingleShoeFragmentDoc}`;
export function useShoeQuery(baseOptions: Apollo.QueryHookOptions<ShoeQuery, ShoeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShoeQuery, ShoeQueryVariables>(ShoeDocument, options);
      }
export function useShoeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShoeQuery, ShoeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShoeQuery, ShoeQueryVariables>(ShoeDocument, options);
        }
export type ShoeQueryHookResult = ReturnType<typeof useShoeQuery>;
export type ShoeLazyQueryHookResult = ReturnType<typeof useShoeLazyQuery>;
export type ShoeQueryResult = Apollo.QueryResult<ShoeQuery, ShoeQueryVariables>;