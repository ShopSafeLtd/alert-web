import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CustomGraphQueryVariables = Types.Exact<{
  input: Types.CustomGraphInput;
}>;


export type CustomGraphQuery = { __typename?: 'Query', customGraph: Array<{ __typename?: 'Graph', label: string, value: number }> };


export const CustomGraphDocument = gql`
    query customGraph($input: CustomGraphInput!) {
  customGraph(input: $input) {
    label
    value
  }
}
    `;
export function useCustomGraphQuery(baseOptions: Apollo.QueryHookOptions<CustomGraphQuery, CustomGraphQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CustomGraphQuery, CustomGraphQueryVariables>(CustomGraphDocument, options);
      }
export function useCustomGraphLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CustomGraphQuery, CustomGraphQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CustomGraphQuery, CustomGraphQueryVariables>(CustomGraphDocument, options);
        }
export type CustomGraphQueryHookResult = ReturnType<typeof useCustomGraphQuery>;
export type CustomGraphLazyQueryHookResult = ReturnType<typeof useCustomGraphLazyQuery>;
export type CustomGraphQueryResult = Apollo.QueryResult<CustomGraphQuery, CustomGraphQueryVariables>;