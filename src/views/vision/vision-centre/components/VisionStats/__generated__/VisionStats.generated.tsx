import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AiVisionStatsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AiVisionStatsQuery = { __typename?: 'Query', aiVisionStats: Array<{ __typename?: 'Count', count: Array<number>, name: string }> };


export const AiVisionStatsDocument = gql`
    query AiVisionStats {
  aiVisionStats {
    count
    name
  }
}
    `;
export function useAiVisionStatsQuery(baseOptions?: Apollo.QueryHookOptions<AiVisionStatsQuery, AiVisionStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AiVisionStatsQuery, AiVisionStatsQueryVariables>(AiVisionStatsDocument, options);
      }
export function useAiVisionStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AiVisionStatsQuery, AiVisionStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AiVisionStatsQuery, AiVisionStatsQueryVariables>(AiVisionStatsDocument, options);
        }
export type AiVisionStatsQueryHookResult = ReturnType<typeof useAiVisionStatsQuery>;
export type AiVisionStatsLazyQueryHookResult = ReturnType<typeof useAiVisionStatsLazyQuery>;
export type AiVisionStatsQueryResult = Apollo.QueryResult<AiVisionStatsQuery, AiVisionStatsQueryVariables>;