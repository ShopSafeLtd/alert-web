import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PttEvidencePageQueryVariables = Types.Exact<{
  schemeId: Types.Scalars['String'];
  deviceId?: Types.InputMaybe<Types.Scalars['String']>;
  groupId?: Types.InputMaybe<Types.Scalars['String']>;
  since?: Types.InputMaybe<Types.Scalars['String']>;
  until?: Types.InputMaybe<Types.Scalars['String']>;
  status?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  cursor?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type PttEvidencePageQuery = { __typename?: 'Query', scheme: { __typename?: 'Scheme', pttEvidence: { __typename?: 'PttEvidenceList', nextCursor?: string | null, sessions: Array<{ __typename?: 'PttEvidenceSession', sessionId: string, deviceId: string, deviceName: string, status: string, thumbnailUrl?: string | null, startedAt: Date, endedAt?: Date | null, durationMs?: number | null, chunkCount: number, totalSizeBytes: number }> } } };


export const PttEvidencePageDocument = gql`
    query PttEvidencePage($schemeId: String!, $deviceId: String, $groupId: String, $since: String, $until: String, $status: String, $limit: Int, $cursor: String) {
  scheme(where: {id: $schemeId}) {
    pttEvidence(
      deviceId: $deviceId
      groupId: $groupId
      since: $since
      until: $until
      status: $status
      limit: $limit
      cursor: $cursor
    ) {
      sessions {
        sessionId
        deviceId
        deviceName
        status
        thumbnailUrl
        startedAt
        endedAt
        durationMs
        chunkCount
        totalSizeBytes
      }
      nextCursor
    }
  }
}
    `;
export function usePttEvidencePageQuery(baseOptions: Apollo.QueryHookOptions<PttEvidencePageQuery, PttEvidencePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PttEvidencePageQuery, PttEvidencePageQueryVariables>(PttEvidencePageDocument, options);
      }
export function usePttEvidencePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PttEvidencePageQuery, PttEvidencePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PttEvidencePageQuery, PttEvidencePageQueryVariables>(PttEvidencePageDocument, options);
        }
export type PttEvidencePageQueryHookResult = ReturnType<typeof usePttEvidencePageQuery>;
export type PttEvidencePageLazyQueryHookResult = ReturnType<typeof usePttEvidencePageLazyQuery>;
export type PttEvidencePageQueryResult = Apollo.QueryResult<PttEvidencePageQuery, PttEvidencePageQueryVariables>;