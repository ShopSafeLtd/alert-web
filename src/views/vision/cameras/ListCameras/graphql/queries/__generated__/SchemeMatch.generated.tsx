import type * as Types from '../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SchemeDetectTimeoutQueryVariables = Types.Exact<{
  where: Types.SchemeWhereUniqueInput;
}>;


export type SchemeDetectTimeoutQuery = { __typename?: 'Query', scheme: { __typename?: 'Scheme', duplicateMatchTimeout: string } };


export const SchemeDetectTimeoutDocument = gql`
    query SchemeDetectTimeout($where: SchemeWhereUniqueInput!) {
  scheme(where: $where) {
    duplicateMatchTimeout
  }
}
    `;
export function useSchemeDetectTimeoutQuery(baseOptions: Apollo.QueryHookOptions<SchemeDetectTimeoutQuery, SchemeDetectTimeoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SchemeDetectTimeoutQuery, SchemeDetectTimeoutQueryVariables>(SchemeDetectTimeoutDocument, options);
      }
export function useSchemeDetectTimeoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SchemeDetectTimeoutQuery, SchemeDetectTimeoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SchemeDetectTimeoutQuery, SchemeDetectTimeoutQueryVariables>(SchemeDetectTimeoutDocument, options);
        }
export type SchemeDetectTimeoutQueryHookResult = ReturnType<typeof useSchemeDetectTimeoutQuery>;
export type SchemeDetectTimeoutLazyQueryHookResult = ReturnType<typeof useSchemeDetectTimeoutLazyQuery>;
export type SchemeDetectTimeoutQueryResult = Apollo.QueryResult<SchemeDetectTimeoutQuery, SchemeDetectTimeoutQueryVariables>;