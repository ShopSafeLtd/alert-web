import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TermQueryVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type TermQuery = { __typename?: 'Query', term: { __typename?: 'TermsAndCondition', content: string, version: number } };


export const TermDocument = gql`
    query Term($where: UniqueId!) {
  term(where: $where) {
    content
    version
  }
}
    `;
export function useTermQuery(baseOptions: Apollo.QueryHookOptions<TermQuery, TermQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TermQuery, TermQueryVariables>(TermDocument, options);
      }
export function useTermLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TermQuery, TermQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TermQuery, TermQueryVariables>(TermDocument, options);
        }
export type TermQueryHookResult = ReturnType<typeof useTermQuery>;
export type TermLazyQueryHookResult = ReturnType<typeof useTermLazyQuery>;
export type TermQueryResult = Apollo.QueryResult<TermQuery, TermQueryVariables>;