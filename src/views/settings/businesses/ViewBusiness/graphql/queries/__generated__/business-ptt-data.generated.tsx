import type * as Types from '../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BusinessPttDataQueryVariables = Types.Exact<{
  schemeId: Types.Scalars['String'];
  businessId: Types.Scalars['String'];
  cursor?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type BusinessPttDataQuery = { __typename?: 'Query', scheme: { __typename?: 'Scheme', pttEnabled: boolean, pttDevices: Array<{ __typename?: 'PttDevice', id: string, name: string, model: string, isEnabled: boolean, lastSeenAt?: Date | null, groupId?: string | null, groupName?: string | null }>, pttEvidence: { __typename?: 'PttEvidenceList', nextCursor?: string | null, sessions: Array<{ __typename?: 'PttEvidenceSession', sessionId: string, deviceId: string, deviceName: string, status: string, thumbnailUrl?: string | null, startedAt: Date, endedAt?: Date | null, durationMs?: number | null, chunkCount: number, totalSizeBytes: number }> } } };


export const BusinessPttDataDocument = gql`
    query BusinessPttData($schemeId: String!, $businessId: String!, $cursor: String, $limit: Int) {
  scheme(where: {id: $schemeId}) {
    pttEnabled
    pttDevices(businessId: $businessId) {
      id
      name
      model
      isEnabled
      lastSeenAt
      groupId
      groupName
    }
    pttEvidence(businessId: $businessId, limit: $limit, cursor: $cursor) {
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
export function useBusinessPttDataQuery(baseOptions: Apollo.QueryHookOptions<BusinessPttDataQuery, BusinessPttDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessPttDataQuery, BusinessPttDataQueryVariables>(BusinessPttDataDocument, options);
      }
export function useBusinessPttDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessPttDataQuery, BusinessPttDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessPttDataQuery, BusinessPttDataQueryVariables>(BusinessPttDataDocument, options);
        }
export type BusinessPttDataQueryHookResult = ReturnType<typeof useBusinessPttDataQuery>;
export type BusinessPttDataLazyQueryHookResult = ReturnType<typeof useBusinessPttDataLazyQuery>;
export type BusinessPttDataQueryResult = Apollo.QueryResult<BusinessPttDataQuery, BusinessPttDataQueryVariables>;