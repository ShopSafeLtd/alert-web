import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListDemEvidenceRecycleQueryVariables = Types.Exact<{
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  recycled: Types.Scalars['Boolean'];
}>;


export type ListDemEvidenceRecycleQuery = { __typename?: 'Query', listDemEvidenceRecycle: { __typename?: 'ListDemEvidenceRelay', totalCount: number, edges: Array<{ __typename?: 'DemEvidenceNode', node: { __typename?: 'DemEvidenceNew', type?: string | null, thumbnailUrl?: string | null, recordedAt?: Date | null, playbackUrl?: string | null, id: string, importance?: string | null, officerName?: string | null, duration?: string | null } }>, pageInfo: { __typename?: 'PageInfoRelay', endCursor: string, hasNextPage: boolean } } };


export const ListDemEvidenceRecycleDocument = gql`
    query listDemEvidenceRecycle($skip: Int, $take: Int, $recycled: Boolean!) {
  listDemEvidenceRecycle(skip: $skip, take: $take, recycled: $recycled) {
    edges {
      node {
        type
        thumbnailUrl
        recordedAt
        playbackUrl
        id
        importance
        officerName
        duration
      }
    }
    totalCount
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;
export function useListDemEvidenceRecycleQuery(baseOptions: Apollo.QueryHookOptions<ListDemEvidenceRecycleQuery, ListDemEvidenceRecycleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListDemEvidenceRecycleQuery, ListDemEvidenceRecycleQueryVariables>(ListDemEvidenceRecycleDocument, options);
      }
export function useListDemEvidenceRecycleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListDemEvidenceRecycleQuery, ListDemEvidenceRecycleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListDemEvidenceRecycleQuery, ListDemEvidenceRecycleQueryVariables>(ListDemEvidenceRecycleDocument, options);
        }
export type ListDemEvidenceRecycleQueryHookResult = ReturnType<typeof useListDemEvidenceRecycleQuery>;
export type ListDemEvidenceRecycleLazyQueryHookResult = ReturnType<typeof useListDemEvidenceRecycleLazyQuery>;
export type ListDemEvidenceRecycleQueryResult = Apollo.QueryResult<ListDemEvidenceRecycleQuery, ListDemEvidenceRecycleQueryVariables>;