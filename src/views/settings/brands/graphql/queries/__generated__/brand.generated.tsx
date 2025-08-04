import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BrandQueryVariables = Types.Exact<{
  where: Types.BrandWhereUniqueInput;
}>;


export type BrandQuery = { __typename?: 'Query', brand: { __typename?: 'Brand', name?: string | null, id?: string | null, description?: string | null, businesses?: Array<{ __typename?: 'Business', id: string, name?: string | null }> | null, scheme?: { __typename?: 'Scheme', id?: string | null } | null } };


export const BrandDocument = gql`
    query Brand($where: BrandWhereUniqueInput!) {
  brand(where: $where) {
    name
    id
    description
    businesses {
      id
      name
    }
    scheme {
      id
    }
  }
}
    `;
export function useBrandQuery(baseOptions: Apollo.QueryHookOptions<BrandQuery, BrandQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BrandQuery, BrandQueryVariables>(BrandDocument, options);
      }
export function useBrandLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BrandQuery, BrandQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BrandQuery, BrandQueryVariables>(BrandDocument, options);
        }
export type BrandQueryHookResult = ReturnType<typeof useBrandQuery>;
export type BrandLazyQueryHookResult = ReturnType<typeof useBrandLazyQuery>;
export type BrandQueryResult = Apollo.QueryResult<BrandQuery, BrandQueryVariables>;