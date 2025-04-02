import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AiTrendsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  where: Types.AiSuggestionWhereInput;
  orderBy?: Types.InputMaybe<Array<Types.AiSuggestionsOrderBy> | Types.AiSuggestionsOrderBy>;
}>;


export type AiTrendsQuery = { __typename?: 'Query', aiSuggestions: { __typename?: 'QueryAiSuggestionsConnection', edges: Array<{ __typename?: 'QueryAiSuggestionsConnectionEdge', node: { __typename?: 'AISuggestion', id: string, title: string, description?: string | null, type?: Types.AiSuggestionType | null, createdAt: Date } }> } };


export const AiTrendsDocument = gql`
    query AiTrends($first: Int, $where: AiSuggestionWhereInput!, $orderBy: [AiSuggestionsOrderBy!]) {
  aiSuggestions(first: $first, where: $where, orderBy: $orderBy) {
    edges {
      node {
        id
        title
        description
        type
        createdAt
      }
    }
  }
}
    `;
export function useAiTrendsQuery(baseOptions: Apollo.QueryHookOptions<AiTrendsQuery, AiTrendsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AiTrendsQuery, AiTrendsQueryVariables>(AiTrendsDocument, options);
      }
export function useAiTrendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AiTrendsQuery, AiTrendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AiTrendsQuery, AiTrendsQueryVariables>(AiTrendsDocument, options);
        }
export type AiTrendsQueryHookResult = ReturnType<typeof useAiTrendsQuery>;
export type AiTrendsLazyQueryHookResult = ReturnType<typeof useAiTrendsLazyQuery>;
export type AiTrendsQueryResult = Apollo.QueryResult<AiTrendsQuery, AiTrendsQueryVariables>;