import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { SingleShoeFragmentDoc } from '../../../../../graphql/fragments/__generated__/shoe.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ShoesQueryVariables = Types.Exact<{
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<ReadonlyArray<Types.ShoeOrderByWithRelationInput> | Types.ShoeOrderByWithRelationInput>;
  where?: Types.InputMaybe<Types.ShoeWhereInput>;
}>;


export type ShoesQuery = { readonly __typename?: 'Query', readonly shoes: { readonly __typename?: 'QueryShoesConnection', readonly totalCount: number, readonly edges: ReadonlyArray<{ readonly __typename?: 'QueryShoesConnectionEdge', readonly node: { readonly __typename?: 'Shoe', readonly type: Types.ShoeType, readonly style: string, readonly size: number, readonly status: Types.ShoeStatus, readonly side: Types.ShoeSide, readonly retailPrice: number, readonly recycled: boolean, readonly id: string, readonly description: string, readonly colour: string, readonly box: boolean, readonly updatedAt: Date, readonly stockItem: { readonly __typename?: 'StockItem', readonly id: string, readonly sku?: string | null }, readonly business: { readonly __typename?: 'Business', readonly id: string, readonly name: string, readonly locations: ReadonlyArray<{ readonly __typename?: 'Address', readonly full: string }> }, readonly primaryShoe?: { readonly __typename?: 'Shoe', readonly id: string, readonly business: { readonly __typename?: 'Business', readonly id: string, readonly name: string, readonly locations: ReadonlyArray<{ readonly __typename?: 'Address', readonly full: string }> } } | null } }> } };


export const ShoesDocument = gql`
    query Shoes($skip: Int, $take: Int, $orderBy: [ShoeOrderByWithRelationInput!], $where: ShoeWhereInput) {
  shoes(skip: $skip, take: $take, orderBy: $orderBy, where: $where) {
    totalCount
    edges {
      node {
        ...SingleShoe
      }
    }
  }
}
    ${SingleShoeFragmentDoc}`;
export function useShoesQuery(baseOptions?: Apollo.QueryHookOptions<ShoesQuery, ShoesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShoesQuery, ShoesQueryVariables>(ShoesDocument, options);
      }
export function useShoesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShoesQuery, ShoesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShoesQuery, ShoesQueryVariables>(ShoesDocument, options);
        }
export type ShoesQueryHookResult = ReturnType<typeof useShoesQuery>;
export type ShoesLazyQueryHookResult = ReturnType<typeof useShoesLazyQuery>;
export type ShoesQueryResult = Apollo.QueryResult<ShoesQuery, ShoesQueryVariables>;