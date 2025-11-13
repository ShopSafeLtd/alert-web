import type * as Types from '../../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AiVisionMapQueryVariables = Types.Exact<{
  where: Types.AiVisionCameraWhereInput;
}>;


export type AiVisionMapQuery = { __typename?: 'Query', aiVisionMap: Array<{ __typename?: 'AiVisionMapData', lon: number, lat: number, count: number }> };


export const AiVisionMapDocument = gql`
    query AiVisionMap($where: AiVisionCameraWhereInput!) {
  aiVisionMap(where: $where) {
    lon
    lat
    count
  }
}
    `;
export function useAiVisionMapQuery(baseOptions: Apollo.QueryHookOptions<AiVisionMapQuery, AiVisionMapQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AiVisionMapQuery, AiVisionMapQueryVariables>(AiVisionMapDocument, options);
      }
export function useAiVisionMapLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AiVisionMapQuery, AiVisionMapQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AiVisionMapQuery, AiVisionMapQueryVariables>(AiVisionMapDocument, options);
        }
export type AiVisionMapQueryHookResult = ReturnType<typeof useAiVisionMapQuery>;
export type AiVisionMapLazyQueryHookResult = ReturnType<typeof useAiVisionMapLazyQuery>;
export type AiVisionMapQueryResult = Apollo.QueryResult<AiVisionMapQuery, AiVisionMapQueryVariables>;