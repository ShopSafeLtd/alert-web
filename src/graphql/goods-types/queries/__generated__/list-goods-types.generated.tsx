import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListGoodsTypesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ListGoodsTypeWhere>;
}>;


export type ListGoodsTypesQuery = { __typename?: 'Query', listGoodsTypes: { __typename?: 'ListGoodsTypes', total: number, goodsTypes: Array<{ __typename?: 'GoodsType', id: string, name: string }> } };


export const ListGoodsTypesDocument = gql`
    query ListGoodsTypes($where: ListGoodsTypeWhere) {
  listGoodsTypes(where: $where) {
    total
    goodsTypes {
      id
      name
    }
  }
}
    `;
export function useListGoodsTypesQuery(baseOptions?: Apollo.QueryHookOptions<ListGoodsTypesQuery, ListGoodsTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListGoodsTypesQuery, ListGoodsTypesQueryVariables>(ListGoodsTypesDocument, options);
      }
export function useListGoodsTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListGoodsTypesQuery, ListGoodsTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListGoodsTypesQuery, ListGoodsTypesQueryVariables>(ListGoodsTypesDocument, options);
        }
export type ListGoodsTypesQueryHookResult = ReturnType<typeof useListGoodsTypesQuery>;
export type ListGoodsTypesLazyQueryHookResult = ReturnType<typeof useListGoodsTypesLazyQuery>;
export type ListGoodsTypesQueryResult = Apollo.QueryResult<ListGoodsTypesQuery, ListGoodsTypesQueryVariables>;