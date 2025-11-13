import type * as Types from '../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListVisionCamerasQueryVariables = Types.Exact<{
  where: Types.AiVisionCameraWhereInput;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type ListVisionCamerasQuery = { __typename?: 'Query', aiVisionCameras: { __typename?: 'QueryAiVisionCamerasConnection', totalCount: number, edges: Array<{ __typename?: 'QueryAiVisionCamerasConnectionEdge', node: { __typename?: 'AIVisionCamera', id: string, make?: string | null, model?: string | null, serialNumber?: string | null, lastUploaded?: Date | null, duplicateMatchTimeout: string, business: { __typename?: 'Business', id: string, name: string }, groups: Array<{ __typename?: 'Group', id: string, name: string }> } }> } };


export const ListVisionCamerasDocument = gql`
    query listVisionCameras($where: AiVisionCameraWhereInput!, $take: Int, $skip: Int) {
  aiVisionCameras(where: $where, take: $take, skip: $skip) {
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
        lastUploaded
        duplicateMatchTimeout
        groups {
          id
          name
        }
      }
    }
    totalCount
  }
}
    `;
export function useListVisionCamerasQuery(baseOptions: Apollo.QueryHookOptions<ListVisionCamerasQuery, ListVisionCamerasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListVisionCamerasQuery, ListVisionCamerasQueryVariables>(ListVisionCamerasDocument, options);
      }
export function useListVisionCamerasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListVisionCamerasQuery, ListVisionCamerasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListVisionCamerasQuery, ListVisionCamerasQueryVariables>(ListVisionCamerasDocument, options);
        }
export type ListVisionCamerasQueryHookResult = ReturnType<typeof useListVisionCamerasQuery>;
export type ListVisionCamerasLazyQueryHookResult = ReturnType<typeof useListVisionCamerasLazyQuery>;
export type ListVisionCamerasQueryResult = Apollo.QueryResult<ListVisionCamerasQuery, ListVisionCamerasQueryVariables>;