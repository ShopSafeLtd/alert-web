import type * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IndustriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type IndustriesQuery = { __typename?: 'Query', industries: Array<{ __typename?: 'Industry', name: string, id: string }> };


export const IndustriesDocument = gql`
    query Industries {
  industries {
    name
    id
  }
}
    `;
export function useIndustriesQuery(baseOptions?: Apollo.QueryHookOptions<IndustriesQuery, IndustriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IndustriesQuery, IndustriesQueryVariables>(IndustriesDocument, options);
      }
export function useIndustriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IndustriesQuery, IndustriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IndustriesQuery, IndustriesQueryVariables>(IndustriesDocument, options);
        }
export type IndustriesQueryHookResult = ReturnType<typeof useIndustriesQuery>;
export type IndustriesLazyQueryHookResult = ReturnType<typeof useIndustriesLazyQuery>;
export type IndustriesQueryResult = Apollo.QueryResult<IndustriesQuery, IndustriesQueryVariables>;