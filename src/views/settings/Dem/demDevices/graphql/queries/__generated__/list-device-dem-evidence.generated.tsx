import type * as Types from '../../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListDemDeviceEvidenceQueryVariables = Types.Exact<{
  where: Types.Scalars['String'];
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type ListDemDeviceEvidenceQuery = { __typename?: 'Query', listDemDeviceEvidence: { __typename?: 'ListDemEvidenceRelay', totalCount: number, edges: Array<{ __typename?: 'DemEvidenceNode', node: { __typename?: 'DemEvidenceNew', type?: string | null, thumbnailUrl?: string | null, recordedAt?: Date | null, playbackUrl?: string | null, id: string, importance?: string | null, officerName?: string | null, duration?: string | null } }>, pageInfo: { __typename?: 'PageInfoRelay', endCursor?: string | null, hasNextPage?: boolean | null } } };


export const ListDemDeviceEvidenceDocument = gql`
    query listDemDeviceEvidence($where: String!, $skip: Int, $take: Int) {
  listDemDeviceEvidence(where: $where, skip: $skip, take: $take) {
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
export function useListDemDeviceEvidenceQuery(baseOptions: Apollo.QueryHookOptions<ListDemDeviceEvidenceQuery, ListDemDeviceEvidenceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListDemDeviceEvidenceQuery, ListDemDeviceEvidenceQueryVariables>(ListDemDeviceEvidenceDocument, options);
      }
export function useListDemDeviceEvidenceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListDemDeviceEvidenceQuery, ListDemDeviceEvidenceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListDemDeviceEvidenceQuery, ListDemDeviceEvidenceQueryVariables>(ListDemDeviceEvidenceDocument, options);
        }
export type ListDemDeviceEvidenceQueryHookResult = ReturnType<typeof useListDemDeviceEvidenceQuery>;
export type ListDemDeviceEvidenceLazyQueryHookResult = ReturnType<typeof useListDemDeviceEvidenceLazyQuery>;
export type ListDemDeviceEvidenceQueryResult = Apollo.QueryResult<ListDemDeviceEvidenceQuery, ListDemDeviceEvidenceQueryVariables>;