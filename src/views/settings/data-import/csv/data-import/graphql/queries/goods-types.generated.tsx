import type * as Types from '../../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GoodsTypesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GoodsTypesQuery = {
  __typename?: 'Query';
  goodsTypes: Array<{ __typename?: 'GoodsType'; id: string; name: string }>;
};

export const GoodsTypesDocument = gql`
  query GoodsTypes {
    goodsTypes {
      id
      name
    }
  }
`;
export function useGoodsTypesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GoodsTypesQuery,
    GoodsTypesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GoodsTypesQuery, GoodsTypesQueryVariables>(
    GoodsTypesDocument,
    options
  );
}
export function useGoodsTypesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GoodsTypesQuery,
    GoodsTypesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GoodsTypesQuery, GoodsTypesQueryVariables>(
    GoodsTypesDocument,
    options
  );
}
export type GoodsTypesQueryHookResult = ReturnType<typeof useGoodsTypesQuery>;
export type GoodsTypesLazyQueryHookResult = ReturnType<
  typeof useGoodsTypesLazyQuery
>;
export type GoodsTypesQueryResult = Apollo.QueryResult<
  GoodsTypesQuery,
  GoodsTypesQueryVariables
>;
