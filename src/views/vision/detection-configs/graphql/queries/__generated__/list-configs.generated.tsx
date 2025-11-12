import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListDetectionConfigsQueryVariables = Types.Exact<{
  where: Types.DetectionConfigWhere;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  order?: Types.InputMaybe<Types.SortOrder>;
}>;


export type ListDetectionConfigsQuery = { __typename?: 'Query', detectionConfigs: { __typename?: 'QueryDetectionConfigsConnection', totalCount: number, edges: Array<{ __typename?: 'QueryDetectionConfigsConnectionEdge', node: { __typename?: 'DetectActionConfig', id: string, minimumConfidenceTrigger: Types.AiVisionMatchConfidence, minimumPriorityTrigger: Types.AiVisionMatchPriority, name: string, type: Types.DetectActionType, cameraCount: number } }> } };


export const ListDetectionConfigsDocument = gql`
    query ListDetectionConfigs($where: DetectionConfigWhere!, $skip: Int, $take: Int, $order: SortOrder) {
  detectionConfigs(
    where: $where
    take: $take
    skip: $skip
    orderByCameras: $order
  ) {
    totalCount
    edges {
      node {
        id
        minimumConfidenceTrigger
        minimumPriorityTrigger
        name
        type
        cameraCount
      }
    }
  }
}
    `;
export function useListDetectionConfigsQuery(baseOptions: Apollo.QueryHookOptions<ListDetectionConfigsQuery, ListDetectionConfigsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListDetectionConfigsQuery, ListDetectionConfigsQueryVariables>(ListDetectionConfigsDocument, options);
      }
export function useListDetectionConfigsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListDetectionConfigsQuery, ListDetectionConfigsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListDetectionConfigsQuery, ListDetectionConfigsQueryVariables>(ListDetectionConfigsDocument, options);
        }
export type ListDetectionConfigsQueryHookResult = ReturnType<typeof useListDetectionConfigsQuery>;
export type ListDetectionConfigsLazyQueryHookResult = ReturnType<typeof useListDetectionConfigsLazyQuery>;
export type ListDetectionConfigsQueryResult = Apollo.QueryResult<ListDetectionConfigsQuery, ListDetectionConfigsQueryVariables>;