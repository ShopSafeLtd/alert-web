import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BrandsQueryVariables = Types.Exact<{
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<
    | Array<Types.BrandOrderByWithRelationInput>
    | Types.BrandOrderByWithRelationInput
  >;
  where?: Types.InputMaybe<Types.BrandWhereInput>;
}>;

export type BrandsQuery = {
  __typename?: 'Query';
  brands: {
    __typename?: 'QueryBrandsConnection';
    totalCount: number;
    edges: Array<{
      __typename?: 'QueryBrandsConnectionEdge';
      node: {
        __typename?: 'Brand';
        id: string;
        name: string;
        description?: string | null;
        businesses: Array<{
          __typename?: 'Business';
          id: string;
          name: string;
        }>;
      };
    }>;
  };
};

export const BrandsDocument = gql`
  query Brands(
    $skip: Int
    $take: Int
    $orderBy: [BrandOrderByWithRelationInput!]
    $where: BrandWhereInput
  ) {
    brands(skip: $skip, take: $take, orderBy: $orderBy, where: $where) {
      totalCount
      edges {
        node {
          id
          name
          description
          businesses {
            id
            name
          }
        }
      }
    }
  }
`;
export function useBrandsQuery(
  baseOptions?: Apollo.QueryHookOptions<BrandsQuery, BrandsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BrandsQuery, BrandsQueryVariables>(
    BrandsDocument,
    options
  );
}
export function useBrandsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BrandsQuery, BrandsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BrandsQuery, BrandsQueryVariables>(
    BrandsDocument,
    options
  );
}
export type BrandsQueryHookResult = ReturnType<typeof useBrandsQuery>;
export type BrandsLazyQueryHookResult = ReturnType<typeof useBrandsLazyQuery>;
export type BrandsQueryResult = Apollo.QueryResult<
  BrandsQuery,
  BrandsQueryVariables
>;
