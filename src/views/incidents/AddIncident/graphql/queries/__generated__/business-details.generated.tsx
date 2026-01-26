import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BusinessDetailsQueryVariables = Types.Exact<{
  where: Types.BusinessWhereUniqueInput;
}>;


export type BusinessDetailsQuery = { __typename?: 'Query', business: { __typename?: 'Business', id: string, name: string, fullName: string, locations: Array<{ __typename?: 'Address', id: string, building?: string | null, street?: string | null, townCity?: string | null, county?: string | null, postcode?: string | null }> } };


export const BusinessDetailsDocument = gql`
    query BusinessDetails($where: BusinessWhereUniqueInput!) {
  business(where: $where) {
    id
    name
    fullName
    locations {
      id
      building
      street
      townCity
      county
      postcode
    }
  }
}
    `;
export function useBusinessDetailsQuery(baseOptions: Apollo.QueryHookOptions<BusinessDetailsQuery, BusinessDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessDetailsQuery, BusinessDetailsQueryVariables>(BusinessDetailsDocument, options);
      }
export function useBusinessDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessDetailsQuery, BusinessDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessDetailsQuery, BusinessDetailsQueryVariables>(BusinessDetailsDocument, options);
        }
export type BusinessDetailsQueryHookResult = ReturnType<typeof useBusinessDetailsQuery>;
export type BusinessDetailsLazyQueryHookResult = ReturnType<typeof useBusinessDetailsLazyQuery>;
export type BusinessDetailsQueryResult = Apollo.QueryResult<BusinessDetailsQuery, BusinessDetailsQueryVariables>;