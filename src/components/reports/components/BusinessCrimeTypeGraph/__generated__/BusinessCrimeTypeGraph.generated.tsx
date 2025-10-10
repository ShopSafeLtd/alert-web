import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BusinessCrimeTypeGraphQueryVariables = Types.Exact<{
  where: Types.BusinessIncidentsCountGraphInput;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type BusinessCrimeTypeGraphQuery = { __typename?: 'Query', businessCrimeTypeGraph: Array<{ __typename?: 'RadialValueGraph', label: string, data: Array<{ __typename?: 'Graph', label: string, value: number }> }> };


export const BusinessCrimeTypeGraphDocument = gql`
    query BusinessCrimeTypeGraph($where: BusinessIncidentsCountGraphInput!, $take: Int) {
  businessCrimeTypeGraph(where: $where, take: $take) {
    label
    data {
      label
      value
    }
  }
}
    `;
export function useBusinessCrimeTypeGraphQuery(baseOptions: Apollo.QueryHookOptions<BusinessCrimeTypeGraphQuery, BusinessCrimeTypeGraphQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessCrimeTypeGraphQuery, BusinessCrimeTypeGraphQueryVariables>(BusinessCrimeTypeGraphDocument, options);
      }
export function useBusinessCrimeTypeGraphLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessCrimeTypeGraphQuery, BusinessCrimeTypeGraphQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessCrimeTypeGraphQuery, BusinessCrimeTypeGraphQueryVariables>(BusinessCrimeTypeGraphDocument, options);
        }
export type BusinessCrimeTypeGraphQueryHookResult = ReturnType<typeof useBusinessCrimeTypeGraphQuery>;
export type BusinessCrimeTypeGraphLazyQueryHookResult = ReturnType<typeof useBusinessCrimeTypeGraphLazyQuery>;
export type BusinessCrimeTypeGraphQueryResult = Apollo.QueryResult<BusinessCrimeTypeGraphQuery, BusinessCrimeTypeGraphQueryVariables>;