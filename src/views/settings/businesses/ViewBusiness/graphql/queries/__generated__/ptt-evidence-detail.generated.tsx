import type * as Types from '../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PttEvidenceDetailQueryVariables = Types.Exact<{
  schemeId: Types.Scalars['String'];
  sessionId: Types.Scalars['String'];
}>;


export type PttEvidenceDetailQuery = { __typename?: 'Query', pttEvidenceDetail: { __typename?: 'PttEvidenceDetail', session: { __typename?: 'PttEvidenceDetailSession', sessionId: string, deviceName: string, status: string, startedAt: Date, endedAt?: Date | null, durationMs?: number | null, thumbnailUrl?: string | null }, chunks: Array<{ __typename?: 'PttEvidenceChunk', id: string, chunkNumber: number, blobUrl: string, durationMs?: number | null, status: string }>, faceCrops: Array<{ __typename?: 'PttFaceCrop', id: string, blobUrl: string, trackingId?: number | null, boundingBox?: { __typename?: 'PttBoundingBox', left: number, top: number, right: number, bottom: number } | null }> } };


export const PttEvidenceDetailDocument = gql`
    query PttEvidenceDetail($schemeId: String!, $sessionId: String!) {
  pttEvidenceDetail(schemeId: $schemeId, sessionId: $sessionId) {
    session {
      sessionId
      deviceName
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
export function usePttEvidenceDetailQuery(baseOptions: Apollo.QueryHookOptions<PttEvidenceDetailQuery, PttEvidenceDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PttEvidenceDetailQuery, PttEvidenceDetailQueryVariables>(PttEvidenceDetailDocument, options);
      }
export function usePttEvidenceDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PttEvidenceDetailQuery, PttEvidenceDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PttEvidenceDetailQuery, PttEvidenceDetailQueryVariables>(PttEvidenceDetailDocument, options);
        }
export type PttEvidenceDetailQueryHookResult = ReturnType<typeof usePttEvidenceDetailQuery>;
export type PttEvidenceDetailLazyQueryHookResult = ReturnType<typeof usePttEvidenceDetailLazyQuery>;
export type PttEvidenceDetailQueryResult = Apollo.QueryResult<PttEvidenceDetailQuery, PttEvidenceDetailQueryVariables>;