import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListStockRemovalReasonOptionsQueryVariables = Types.Exact<{
  where: Types.SchemeWhereUniqueInput;
}>;


export type ListStockRemovalReasonOptionsQuery = { __typename?: 'Query', scheme: { __typename?: 'Scheme', id: string, stockRemovalReasonOptions: Array<{ __typename?: 'StockRemovalReasonOption', id: string, label: string, position: number, active: boolean }> } };


export const ListStockRemovalReasonOptionsDocument = gql`
    query ListStockRemovalReasonOptions($where: SchemeWhereUniqueInput!) {
  scheme(where: $where) {
    id
    stockRemovalReasonOptions {
      id
      label
      position
      active
    }
  }
}
    `;
export function useListStockRemovalReasonOptionsQuery(baseOptions: Apollo.QueryHookOptions<ListStockRemovalReasonOptionsQuery, ListStockRemovalReasonOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListStockRemovalReasonOptionsQuery, ListStockRemovalReasonOptionsQueryVariables>(ListStockRemovalReasonOptionsDocument, options);
      }
export function useListStockRemovalReasonOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListStockRemovalReasonOptionsQuery, ListStockRemovalReasonOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListStockRemovalReasonOptionsQuery, ListStockRemovalReasonOptionsQueryVariables>(ListStockRemovalReasonOptionsDocument, options);
        }
export type ListStockRemovalReasonOptionsQueryHookResult = ReturnType<typeof useListStockRemovalReasonOptionsQuery>;
export type ListStockRemovalReasonOptionsLazyQueryHookResult = ReturnType<typeof useListStockRemovalReasonOptionsLazyQuery>;
export type ListStockRemovalReasonOptionsQueryResult = Apollo.QueryResult<ListStockRemovalReasonOptionsQuery, ListStockRemovalReasonOptionsQueryVariables>;