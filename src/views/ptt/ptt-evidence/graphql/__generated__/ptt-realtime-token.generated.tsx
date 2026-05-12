import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PttEvidencePageRealtimeTokenQueryVariables = Types.Exact<{
  schemeId: Types.Scalars['String'];
}>;


export type PttEvidencePageRealtimeTokenQuery = { __typename?: 'Query', scheme: { __typename?: 'Scheme', pttRealtimeToken: { __typename?: 'PttRealtimeToken', accessToken: string, supabaseUrl: string, anonKey: string, expiresIn: number, recordingChannel: string, presenceChannel: string } } };


export const PttEvidencePageRealtimeTokenDocument = gql`
    query PttEvidencePageRealtimeToken($schemeId: String!) {
  scheme(where: {id: $schemeId}) {
    pttRealtimeToken {
      accessToken
      supabaseUrl
      anonKey
      expiresIn
      recordingChannel
      presenceChannel
    }
  }
}
    `;
export function usePttEvidencePageRealtimeTokenQuery(baseOptions: Apollo.QueryHookOptions<PttEvidencePageRealtimeTokenQuery, PttEvidencePageRealtimeTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PttEvidencePageRealtimeTokenQuery, PttEvidencePageRealtimeTokenQueryVariables>(PttEvidencePageRealtimeTokenDocument, options);
      }
export function usePttEvidencePageRealtimeTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PttEvidencePageRealtimeTokenQuery, PttEvidencePageRealtimeTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PttEvidencePageRealtimeTokenQuery, PttEvidencePageRealtimeTokenQueryVariables>(PttEvidencePageRealtimeTokenDocument, options);
        }
export type PttEvidencePageRealtimeTokenQueryHookResult = ReturnType<typeof usePttEvidencePageRealtimeTokenQuery>;
export type PttEvidencePageRealtimeTokenLazyQueryHookResult = ReturnType<typeof usePttEvidencePageRealtimeTokenLazyQuery>;
export type PttEvidencePageRealtimeTokenQueryResult = Apollo.QueryResult<PttEvidencePageRealtimeTokenQuery, PttEvidencePageRealtimeTokenQueryVariables>;