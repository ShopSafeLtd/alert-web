import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { SingleShoeFragmentDoc } from '../../../../../graphql/fragments/__generated__/shoe.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ShoeQueryVariables = Types.Exact<{
  where: Types.ShoeWhereUniqueInput;
}>;


export type ShoeQuery = { __typename?: 'Query', shoe: { __typename?: 'Shoe', type: Types.ShoeType, style: string, size: number, status: Types.ShoeStatus, side: Types.ShoeSide, retailPrice: number, recycled: boolean, id: string, description: string, colour: string, box: boolean, updatedAt: Date, stockItem: { __typename?: 'StockItem', id: string, sku?: string | null }, business: { __typename?: 'Business', id: string, name: string, locations: Array<{ __typename?: 'Address', full: string }> }, primaryShoe?: { __typename?: 'Shoe', id: string, business: { __typename?: 'Business', id: string, name: string, locations: Array<{ __typename?: 'Address', full: string }> } } | null } };


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