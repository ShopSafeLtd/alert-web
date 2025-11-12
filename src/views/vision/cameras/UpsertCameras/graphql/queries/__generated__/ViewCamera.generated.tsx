import type * as Types from '../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ViewAiCameraQueryVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type ViewAiCameraQuery = { __typename?: 'Query', aiVisionCamera: { __typename?: 'AIVisionCamera', id: string, duplicateMatchTimeout: string, model?: string | null, make?: string | null, serialNumber?: string | null, osVersion?: string | null, onDetect: Array<{ __typename?: 'DetectActionConfig', id: string }>, groups: Array<{ __typename?: 'Group', id: string }>, business: { __typename?: 'Business', id: string } } };


export const ViewAiCameraDocument = gql`
    query ViewAiCamera($where: UniqueId!) {
  aiVisionCamera(where: $where) {
    id
    duplicateMatchTimeout
    model
    make
    onDetect {
      id
    }
    groups {
      id
    }
    serialNumber
    osVersion
    business {
      id
    }
  }
}
    `;
export function useViewAiCameraQuery(baseOptions: Apollo.QueryHookOptions<ViewAiCameraQuery, ViewAiCameraQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewAiCameraQuery, ViewAiCameraQueryVariables>(ViewAiCameraDocument, options);
      }
export function useViewAiCameraLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewAiCameraQuery, ViewAiCameraQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewAiCameraQuery, ViewAiCameraQueryVariables>(ViewAiCameraDocument, options);
        }
export type ViewAiCameraQueryHookResult = ReturnType<typeof useViewAiCameraQuery>;
export type ViewAiCameraLazyQueryHookResult = ReturnType<typeof useViewAiCameraLazyQuery>;
export type ViewAiCameraQueryResult = Apollo.QueryResult<ViewAiCameraQuery, ViewAiCameraQueryVariables>;