import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PttEvidencePageDetailQueryVariables = Types.Exact<{
  schemeId: Types.Scalars['String'];
  sessionId: Types.Scalars['String'];
}>;


export type PttEvidencePageDetailQuery = { __typename?: 'Query', pttEvidenceDetail: { __typename?: 'PttEvidenceDetail', session: { __typename?: 'PttEvidenceDetailSession', sessionId: string, status: string, startedAt: Date, endedAt?: Date | null, durationMs?: number | null, thumbnailUrl?: string | null }, chunks: Array<{ __typename?: 'PttEvidenceChunk', id: string, chunkNumber: number, blobUrl: string, durationMs?: number | null, status: string }>, faceCrops: Array<{ __typename?: 'PttFaceCrop', id: string, blobUrl: string, trackingId?: number | null, boundingBox?: { __typename?: 'PttBoundingBox', left: number, top: number, right: number, bottom: number } | null }> } };


export const PttEvidencePageDetailDocument = gql`
    query PttEvidencePageDetail($schemeId: String!, $sessionId: String!) {
  pttEvidenceDetail(schemeId: $schemeId, sessionId: $sessionId) {
    session {
      sessionId
      status
      startedAt
      endedAt
      durationMs
      thumbnailUrl
    }
    chunks {
      id
      chunkNumber
      blobUrl
      durationMs
      status
    }
    faceCrops {
      id
      blobUrl
      trackingId
      boundingBox {
        left
        top
        right
        bottom
      }
    }
  }
}
    `;
export function usePttEvidencePageDetailQuery(baseOptions: Apollo.QueryHookOptions<PttEvidencePageDetailQuery, PttEvidencePageDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PttEvidencePageDetailQuery, PttEvidencePageDetailQueryVariables>(PttEvidencePageDetailDocument, options);
      }
export function usePttEvidencePageDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PttEvidencePageDetailQuery, PttEvidencePageDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PttEvidencePageDetailQuery, PttEvidencePageDetailQueryVariables>(PttEvidencePageDetailDocument, options);
        }
export type PttEvidencePageDetailQueryHookResult = ReturnType<typeof usePttEvidencePageDetailQuery>;
export type PttEvidencePageDetailLazyQueryHookResult = ReturnType<typeof usePttEvidencePageDetailLazyQuery>;
export type PttEvidencePageDetailQueryResult = Apollo.QueryResult<PttEvidencePageDetailQuery, PttEvidencePageDetailQueryVariables>;