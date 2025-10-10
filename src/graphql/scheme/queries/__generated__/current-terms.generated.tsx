import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CurrentSchemeTermsQueryVariables = Types.Exact<{
  where: Types.SchemeWhereUniqueInput;
}>;


export type CurrentSchemeTermsQuery = { __typename?: 'Query', scheme: { __typename?: 'Scheme', currentTerms?: { __typename?: 'TermsAndCondition', id: string, content: string } | null } };


export const CurrentSchemeTermsDocument = gql`
    query currentSchemeTerms($where: SchemeWhereUniqueInput!) {
  scheme(where: $where) {
    currentTerms {
      id
      content
    }
  }
}
    `;
export function useCurrentSchemeTermsQuery(baseOptions: Apollo.QueryHookOptions<CurrentSchemeTermsQuery, CurrentSchemeTermsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentSchemeTermsQuery, CurrentSchemeTermsQueryVariables>(CurrentSchemeTermsDocument, options);
      }
export function useCurrentSchemeTermsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentSchemeTermsQuery, CurrentSchemeTermsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentSchemeTermsQuery, CurrentSchemeTermsQueryVariables>(CurrentSchemeTermsDocument, options);
        }
export type CurrentSchemeTermsQueryHookResult = ReturnType<typeof useCurrentSchemeTermsQuery>;
export type CurrentSchemeTermsLazyQueryHookResult = ReturnType<typeof useCurrentSchemeTermsLazyQuery>;
export type CurrentSchemeTermsQueryResult = Apollo.QueryResult<CurrentSchemeTermsQuery, CurrentSchemeTermsQueryVariables>;