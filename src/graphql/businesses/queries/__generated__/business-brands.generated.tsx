import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BusinessBrandsQueryVariables = Types.Exact<{
  where: Types.BusinessWhereUniqueInput;
}>;


export type BusinessBrandsQuery = { __typename?: 'Query', business: { __typename?: 'Business', id: string, brands: Array<string> } };


export const BusinessBrandsDocument = gql`
    query BusinessBrands($where: BusinessWhereUniqueInput!) {
  business(where: $where) {
    id
    brands
  }
}
    `;
export function useBusinessBrandsQuery(baseOptions: Apollo.QueryHookOptions<BusinessBrandsQuery, BusinessBrandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessBrandsQuery, BusinessBrandsQueryVariables>(BusinessBrandsDocument, options);
      }
export function useBusinessBrandsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessBrandsQuery, BusinessBrandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessBrandsQuery, BusinessBrandsQueryVariables>(BusinessBrandsDocument, options);
        }
export type BusinessBrandsQueryHookResult = ReturnType<typeof useBusinessBrandsQuery>;
export type BusinessBrandsLazyQueryHookResult = ReturnType<typeof useBusinessBrandsLazyQuery>;
export type BusinessBrandsQueryResult = Apollo.QueryResult<BusinessBrandsQuery, BusinessBrandsQueryVariables>;