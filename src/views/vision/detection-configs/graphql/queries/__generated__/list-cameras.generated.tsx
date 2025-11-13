import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type VisionCamerasSelectQueryVariables = Types.Exact<{
  schemeIds: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type VisionCamerasSelectQuery = { __typename?: 'Query', aiVisionCameras: { __typename?: 'QueryAiVisionCamerasConnection', totalCount: number, edges: Array<{ __typename?: 'QueryAiVisionCamerasConnectionEdge', node: { __typename?: 'AIVisionCamera', id: string, serialNumber?: string | null, make?: string | null, model?: string | null } }> } };


export const VisionCamerasSelectDocument = gql`
    query VisionCamerasSelect($schemeIds: [String!]!) {
  aiVisionCameras(where: {schemeIds: $schemeIds}) {
    edges {
      node {
        id
        serialNumber
        make
        model
      }
    }
    totalCount
  }
}
    `;
export function useVisionCamerasSelectQuery(baseOptions: Apollo.QueryHookOptions<VisionCamerasSelectQuery, VisionCamerasSelectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VisionCamerasSelectQuery, VisionCamerasSelectQueryVariables>(VisionCamerasSelectDocument, options);
      }
export function useVisionCamerasSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VisionCamerasSelectQuery, VisionCamerasSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VisionCamerasSelectQuery, VisionCamerasSelectQueryVariables>(VisionCamerasSelectDocument, options);
        }
export type VisionCamerasSelectQueryHookResult = ReturnType<typeof useVisionCamerasSelectQuery>;
export type VisionCamerasSelectLazyQueryHookResult = ReturnType<typeof useVisionCamerasSelectLazyQuery>;
export type VisionCamerasSelectQueryResult = Apollo.QueryResult<VisionCamerasSelectQuery, VisionCamerasSelectQueryVariables>;