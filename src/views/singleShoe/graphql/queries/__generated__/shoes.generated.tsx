import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import { SingleShoeFragmentDoc } from '../../../../../graphql/fragments/__generated__/singleShoe.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ShoesQueryVariables = Types.Exact<{
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Array<Types.ShoeOrderByWithRelationInput> | Types.ShoeOrderByWithRelationInput>;
  where?: Types.InputMaybe<Types.ShoeWhereInput>;
}>;


export type ShoesQuery = { __typename?: 'Query', shoes: { __typename?: 'QueryShoesConnection', totalCount: number, edges: Array<{ __typename?: 'QueryShoesConnectionEdge', node: { __typename?: 'Shoe', type: Types.ShoeType, style: string, size: number, status: Types.ShoeStatus, side: Types.ShoeSide, retailPrice: number, recycled: boolean, id: string, description: string, colour: string, box: boolean, updatedAt: Date, stockItem: { __typename?: 'StockItem', id: string, sku?: string | null }, business: { __typename?: 'Business', id: string, name: string, locations: Array<{ __typename?: 'Address', full: string }> }, primaryShoe?: { __typename?: 'Shoe', id: string, business: { __typename?: 'Business', id: string, name: string, locations: Array<{ __typename?: 'Address', full: string }> } } | null } }> } };


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