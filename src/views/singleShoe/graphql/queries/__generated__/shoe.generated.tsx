import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { SingleShoeFragmentDoc } from '../../../../../graphql/fragments/__generated__/singleShoe.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ShoeQueryVariables = Types.Exact<{
  where: Types.ShoeWhereUniqueInput;
}>;


export type ShoeQuery = { __typename?: 'Query', shoe: { __typename?: 'Shoe', type?: Types.ShoeType | null, style?: string | null, size?: number | null, status?: Types.ShoeStatus | null, side?: Types.ShoeSide | null, retailPrice?: number | null, recycled?: boolean | null, id?: string | null, description?: string | null, colour?: string | null, box?: boolean | null, updatedAt?: Date | null, stockItem?: { __typename?: 'StockItem', id?: string | null, sku?: string | null } | null, business?: { __typename?: 'Business', id: string, name?: string | null, locations: Array<{ __typename?: 'Address', full?: string | null }> } | null, primaryShoe?: { __typename?: 'Shoe', id?: string | null, business?: { __typename?: 'Business', id: string, name?: string | null, locations: Array<{ __typename?: 'Address', full?: string | null }> } | null } | null } };


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