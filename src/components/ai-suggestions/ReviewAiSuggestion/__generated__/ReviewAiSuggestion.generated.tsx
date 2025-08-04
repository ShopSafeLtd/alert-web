import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ReviewAiSuggestionQueryVariables = Types.Exact<{
  where: Types.AiSuggestionWhereUniqueInput;
}>;


export type ReviewAiSuggestionQuery = { __typename?: 'Query', aiSuggestion: { __typename?: 'AISuggestion', id: string, title: string, reference?: number | null, createdAt?: Date | null, description?: string | null, type?: Types.AiSuggestionType | null, status?: Types.AiSuggestionStatus | null, rekMatch?: { __typename?: 'RekMatch', id?: string | null, avgSimilarity?: number | null, matchedFaces?: Array<{ __typename?: 'RekMatchedFace', id?: string | null, rekFace?: { __typename?: 'RekFace', id?: string | null, image?: { __typename?: 'Image', url?: string | null, id?: string | null } | null } | null }> | null, searchedFace?: { __typename?: 'RekFace', id?: string | null, image?: { __typename?: 'Image', id?: string | null, url?: string | null } | null } | null, matchedOffender?: { __typename?: 'Offender', id?: string | null, name?: string | null, reference?: number | null } | null, searchedOffender?: { __typename?: 'Offender', id?: string | null, name?: string | null, reference?: number | null } | null } | null } };


export const ReviewAiSuggestionDocument = gql`
    query ReviewAiSuggestion($where: AiSuggestionWhereUniqueInput!) {
  aiSuggestion(where: $where) {
    id
    title
    reference
    createdAt
    description
    type
    status
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
  }
}
    `;
export function useReviewAiSuggestionQuery(baseOptions: Apollo.QueryHookOptions<ReviewAiSuggestionQuery, ReviewAiSuggestionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReviewAiSuggestionQuery, ReviewAiSuggestionQueryVariables>(ReviewAiSuggestionDocument, options);
      }
export function useReviewAiSuggestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReviewAiSuggestionQuery, ReviewAiSuggestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReviewAiSuggestionQuery, ReviewAiSuggestionQueryVariables>(ReviewAiSuggestionDocument, options);
        }
export type ReviewAiSuggestionQueryHookResult = ReturnType<typeof useReviewAiSuggestionQuery>;
export type ReviewAiSuggestionLazyQueryHookResult = ReturnType<typeof useReviewAiSuggestionLazyQuery>;
export type ReviewAiSuggestionQueryResult = Apollo.QueryResult<ReviewAiSuggestionQuery, ReviewAiSuggestionQueryVariables>;