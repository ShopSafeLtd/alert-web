import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListDemEvidenceQueryVariables = Types.Exact<{
  where: Types.Scalars['String'];
}>;


export type ListDemEvidenceQuery = { __typename?: 'Query', listDemEvidence: { __typename?: 'ListDemEvidence', total: number, demEvidence: Array<{ __typename?: 'DemEvidence', type?: string | null, thumbnailUrl?: string | null, playbackUrl?: string | null, importance?: string | null, id?: string | null, createdAt?: Date | null }> } };


export const ListDemEvidenceDocument = gql`
    query ListDemEvidence($where: String!) {
  listDemEvidence(where: $where) {
    total
    demEvidence {
      type
      thumbnailUrl
      playbackUrl
      importance
      id
      createdAt
    }
  }
}
    `;
export function useListDemEvidenceQuery(baseOptions: Apollo.QueryHookOptions<ListDemEvidenceQuery, ListDemEvidenceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListDemEvidenceQuery, ListDemEvidenceQueryVariables>(ListDemEvidenceDocument, options);
      }
export function useListDemEvidenceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListDemEvidenceQuery, ListDemEvidenceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListDemEvidenceQuery, ListDemEvidenceQueryVariables>(ListDemEvidenceDocument, options);
        }
export type ListDemEvidenceQueryHookResult = ReturnType<typeof useListDemEvidenceQuery>;
export type ListDemEvidenceLazyQueryHookResult = ReturnType<typeof useListDemEvidenceLazyQuery>;
export type ListDemEvidenceQueryResult = Apollo.QueryResult<ListDemEvidenceQuery, ListDemEvidenceQueryVariables>;