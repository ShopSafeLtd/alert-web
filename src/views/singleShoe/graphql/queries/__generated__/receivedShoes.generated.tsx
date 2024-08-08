import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { SingleShoeFragmentDoc } from '../../../../../graphql/fragments/__generated__/shoe.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ReceivedShoesQueryVariables = Types.Exact<{
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<ReadonlyArray<Types.ShoeOrderByWithRelationInput> | Types.ShoeOrderByWithRelationInput>;
  where?: Types.InputMaybe<Types.ShoeWhereInput>;
}>;


export type ReceivedShoesQuery = { readonly __typename?: 'Query', readonly receivedShoes: { readonly __typename?: 'QueryReceivedShoesConnection', readonly totalCount: number, readonly edges: ReadonlyArray<{ readonly __typename?: 'QueryReceivedShoesConnectionEdge', readonly node: { readonly __typename?: 'Shoe', readonly type: Types.ShoeType, readonly style: string, readonly size: number, readonly status: Types.ShoeStatus, readonly side: Types.ShoeSide, readonly retailPrice: number, readonly recycled: boolean, readonly id: string, readonly description: string, readonly colour: string, readonly box: boolean, readonly updatedAt: Date, readonly stockItem: { readonly __typename?: 'StockItem', readonly id: string, readonly sku?: string | null }, readonly business: { readonly __typename?: 'Business', readonly id: string, readonly name: string, readonly locations: ReadonlyArray<{ readonly __typename?: 'Address', readonly full: string }> }, readonly primaryShoe?: { readonly __typename?: 'Shoe', readonly id: string, readonly business: { readonly __typename?: 'Business', readonly id: string, readonly name: string, readonly locations: ReadonlyArray<{ readonly __typename?: 'Address', readonly full: string }> } } | null } }> } };


export const ReceivedShoesDocument = gql`
    query receivedShoes($skip: Int, $take: Int, $orderBy: [ShoeOrderByWithRelationInput!], $where: ShoeWhereInput) {
  receivedShoes(skip: $skip, take: $take, orderBy: $orderBy, where: $where) {
    totalCount
    edges {
      node {
        ...SingleShoe
      }
    }
  }
}
    ${SingleShoeFragmentDoc}`;
export function useReceivedShoesQuery(baseOptions?: Apollo.QueryHookOptions<ReceivedShoesQuery, ReceivedShoesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReceivedShoesQuery, ReceivedShoesQueryVariables>(ReceivedShoesDocument, options);
      }
export function useReceivedShoesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReceivedShoesQuery, ReceivedShoesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReceivedShoesQuery, ReceivedShoesQueryVariables>(ReceivedShoesDocument, options);
        }
export type ReceivedShoesQueryHookResult = ReturnType<typeof useReceivedShoesQuery>;
export type ReceivedShoesLazyQueryHookResult = ReturnType<typeof useReceivedShoesLazyQuery>;
export type ReceivedShoesQueryResult = Apollo.QueryResult<ReceivedShoesQuery, ReceivedShoesQueryVariables>;