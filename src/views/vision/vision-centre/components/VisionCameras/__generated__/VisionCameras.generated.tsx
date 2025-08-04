import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AiVisionCamerasQueryVariables = Types.Exact<{
  where: Types.AiVisionCameraWhereInput;
}>;


export type AiVisionCamerasQuery = { __typename?: 'Query', aiVisionCameras?: { __typename?: 'QueryAiVisionCamerasConnection', edges: Array<{ __typename?: 'QueryAiVisionCamerasConnectionEdge', node: { __typename?: 'AIVisionCamera', id: string, make?: string | null, model?: string | null, serialNumber?: string | null, business: { __typename?: 'Business', id: string, name?: string | null } } }> } | null };


export const AiVisionCamerasDocument = gql`
    query aiVisionCameras($where: AiVisionCameraWhereInput!) {
  aiVisionCameras(where: $where) {
    edges {
      node {
        id
        business {
          id
          name
        }
        make
        model
        serialNumber
      }
    }
  }
}
    `;
export function useAiVisionCamerasQuery(baseOptions: Apollo.QueryHookOptions<AiVisionCamerasQuery, AiVisionCamerasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AiVisionCamerasQuery, AiVisionCamerasQueryVariables>(AiVisionCamerasDocument, options);
      }
export function useAiVisionCamerasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AiVisionCamerasQuery, AiVisionCamerasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AiVisionCamerasQuery, AiVisionCamerasQueryVariables>(AiVisionCamerasDocument, options);
        }
export type AiVisionCamerasQueryHookResult = ReturnType<typeof useAiVisionCamerasQuery>;
export type AiVisionCamerasLazyQueryHookResult = ReturnType<typeof useAiVisionCamerasLazyQuery>;
export type AiVisionCamerasQueryResult = Apollo.QueryResult<AiVisionCamerasQuery, AiVisionCamerasQueryVariables>;