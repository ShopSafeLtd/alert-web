import type * as Types from '../../../../../graphql/types.js';

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


export type ShoesQuery = { __typename?: 'Query', shoes: { __typename?: 'QueryShoesConnection', totalCount: number, edges: Array<{ __typename?: 'QueryShoesConnectionEdge', node: { __typename?: 'Shoe', type?: Types.ShoeType | null, style?: string | null, size?: number | null, status?: Types.ShoeStatus | null, side?: Types.ShoeSide | null, retailPrice?: number | null, recycled?: boolean | null, id?: string | null, description?: string | null, colour?: string | null, box?: boolean | null, updatedAt?: Date | null, stockItem?: { __typename?: 'StockItem', id?: string | null, sku?: string | null } | null, business?: { __typename?: 'Business', id: string, name?: string | null, locations: Array<{ __typename?: 'Address', full?: string | null }> } | null, primaryShoe?: { __typename?: 'Shoe', id?: string | null, business?: { __typename?: 'Business', id: string, name?: string | null, locations: Array<{ __typename?: 'Address', full?: string | null }> } | null } | null } }> } };


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