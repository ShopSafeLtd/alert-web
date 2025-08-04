import type * as Types from '../../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListDemBusinessEvidenceQueryVariables = Types.Exact<{
  where: Types.Scalars['String'];
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  recycled?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type ListDemBusinessEvidenceQuery = { __typename?: 'Query', listDemBusinessEvidence: { __typename?: 'ListDemEvidenceRelay', totalCount: number, edges: Array<{ __typename?: 'DemEvidenceNode', node: { __typename?: 'DemEvidenceNew', type?: string | null, thumbnailUrl?: string | null, recordedAt?: Date | null, playbackUrl?: string | null, id: string, importance?: string | null, officerName?: string | null, duration?: string | null } }>, pageInfo: { __typename?: 'PageInfoRelay', endCursor?: string | null, hasNextPage?: boolean | null } } };


export const ListDemBusinessEvidenceDocument = gql`
    query listDemBusinessEvidence($where: String!, $skip: Int, $take: Int, $recycled: Boolean) {
  listDemBusinessEvidence(
    where: $where
    skip: $skip
    take: $take
    recycled: $recycled
  ) {
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
export function useListDemBusinessEvidenceQuery(baseOptions: Apollo.QueryHookOptions<ListDemBusinessEvidenceQuery, ListDemBusinessEvidenceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListDemBusinessEvidenceQuery, ListDemBusinessEvidenceQueryVariables>(ListDemBusinessEvidenceDocument, options);
      }
export function useListDemBusinessEvidenceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListDemBusinessEvidenceQuery, ListDemBusinessEvidenceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListDemBusinessEvidenceQuery, ListDemBusinessEvidenceQueryVariables>(ListDemBusinessEvidenceDocument, options);
        }
export type ListDemBusinessEvidenceQueryHookResult = ReturnType<typeof useListDemBusinessEvidenceQuery>;
export type ListDemBusinessEvidenceLazyQueryHookResult = ReturnType<typeof useListDemBusinessEvidenceLazyQuery>;
export type ListDemBusinessEvidenceQueryResult = Apollo.QueryResult<ListDemBusinessEvidenceQuery, ListDemBusinessEvidenceQueryVariables>;