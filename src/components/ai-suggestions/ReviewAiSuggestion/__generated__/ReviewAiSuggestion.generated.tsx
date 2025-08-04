import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ReviewAiSuggestionQueryVariables = Types.Exact<{
  where: Types.AiSuggestionWhereUniqueInput;
}>;


export type ReviewAiSuggestionQuery = { __typename?: 'Query', aiSuggestion: { __typename?: 'AISuggestion', id: string, title: string, reference?: number | null, createdAt: Date, description?: string | null, type?: Types.AiSuggestionType | null, status?: Types.AiSuggestionStatus | null, rekMatch?: { __typename?: 'RekMatch', id: string, avgSimilarity: number, matchedFaces: Array<{ __typename?: 'RekMatchedFace', id: string, rekFace: { __typename?: 'RekFace', id: string, image: { __typename?: 'Image', url?: string | null, id: string } } }>, searchedFace: { __typename?: 'RekFace', id: string, image: { __typename?: 'Image', id: string, url?: string | null } }, matchedOffender?: { __typename?: 'Offender', id: string, name?: string | null, reference?: number | null } | null, searchedOffender?: { __typename?: 'Offender', id: string, name?: string | null, reference?: number | null } | null } | null } };


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