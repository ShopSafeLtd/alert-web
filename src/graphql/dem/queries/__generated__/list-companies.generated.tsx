import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListDemCompaniesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ListDemCompaniesQuery = { __typename?: 'Query', listDemCompanies: { __typename?: 'ListDemCompanies', total: number, demCompanies: Array<{ __typename?: 'DemCompany', name?: string | null, id?: string | null }> } };


export const ListDemCompaniesDocument = gql`
    query ListDemCompanies {
  listDemCompanies {
    demCompanies {
      name
      id
    }
    total
  }
}
    `;
export function useListDemCompaniesQuery(baseOptions?: Apollo.QueryHookOptions<ListDemCompaniesQuery, ListDemCompaniesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListDemCompaniesQuery, ListDemCompaniesQueryVariables>(ListDemCompaniesDocument, options);
      }
export function useListDemCompaniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListDemCompaniesQuery, ListDemCompaniesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListDemCompaniesQuery, ListDemCompaniesQueryVariables>(ListDemCompaniesDocument, options);
        }
export type ListDemCompaniesQueryHookResult = ReturnType<typeof useListDemCompaniesQuery>;
export type ListDemCompaniesLazyQueryHookResult = ReturnType<typeof useListDemCompaniesLazyQuery>;
export type ListDemCompaniesQueryResult = Apollo.QueryResult<ListDemCompaniesQuery, ListDemCompaniesQueryVariables>;