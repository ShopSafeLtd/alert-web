import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AiSuggestionsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  where: Types.AiSuggestionWhereInput;
  orderBy?: Types.InputMaybe<Array<Types.AiSuggestionsOrderBy> | Types.AiSuggestionsOrderBy>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type AiSuggestionsQuery = { __typename?: 'Query', aiSuggestions?: { __typename?: 'QueryAiSuggestionsConnection', edges: Array<{ __typename?: 'QueryAiSuggestionsConnectionEdge', node: { __typename?: 'AISuggestion', id: string, title: string, description?: string | null, reference?: number | null, type?: Types.AiSuggestionType | null, createdAt?: Date | null, metadata?: { [key: string]: any } | null, rekMatch?: { __typename?: 'RekMatch', id?: string | null, avgSimilarity?: number | null, matchedFaces?: Array<{ __typename?: 'RekMatchedFace', id?: string | null, rekFace?: { __typename?: 'RekFace', id?: string | null, image?: { __typename?: 'Image', url?: string | null, id?: string | null } | null } | null }> | null, searchedFace?: { __typename?: 'RekFace', id?: string | null, image?: { __typename?: 'Image', id?: string | null, url?: string | null } | null } | null, matchedOffender?: { __typename?: 'Offender', id?: string | null, name?: string | null, reference?: number | null } | null, searchedOffender?: { __typename?: 'Offender', id?: string | null, name?: string | null, reference?: number | null } | null } | null, offenders?: Array<{ __typename?: 'Offender', id?: string | null, name?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null }> }> | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null } } | null };


export const AiSuggestionsDocument = gql`
    query AiSuggestions($first: Int, $where: AiSuggestionWhereInput!, $orderBy: [AiSuggestionsOrderBy!], $take: Int, $after: String) {
  aiSuggestions(
    first: $first
    where: $where
    orderBy: $orderBy
    take: $take
    after: $after
  ) {
    edges {
      node {
        id
        title
        description
        reference
        type
        rekMatch {
          id
          matchedFaces {
            id
            rekFace {
              id
              image {
                url
                id
              }
            }
          }
          searchedFace {
            id
            image {
              id
              url
            }
          }
          avgSimilarity
          matchedOffender {
            id
            name
            reference
          }
          searchedOffender {
            id
            name
            reference
          }
        }
        createdAt
        metadata
        offenders {
          id
          name
          images {
            id
            url
          }
        }
      }
    }
    pageInfo {
      endCursor
    }
  }
}
    `;
export function useAiSuggestionsQuery(baseOptions: Apollo.QueryHookOptions<AiSuggestionsQuery, AiSuggestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AiSuggestionsQuery, AiSuggestionsQueryVariables>(AiSuggestionsDocument, options);
      }
export function useAiSuggestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AiSuggestionsQuery, AiSuggestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AiSuggestionsQuery, AiSuggestionsQueryVariables>(AiSuggestionsDocument, options);
        }
export type AiSuggestionsQueryHookResult = ReturnType<typeof useAiSuggestionsQuery>;
export type AiSuggestionsLazyQueryHookResult = ReturnType<typeof useAiSuggestionsLazyQuery>;
export type AiSuggestionsQueryResult = Apollo.QueryResult<AiSuggestionsQuery, AiSuggestionsQueryVariables>;