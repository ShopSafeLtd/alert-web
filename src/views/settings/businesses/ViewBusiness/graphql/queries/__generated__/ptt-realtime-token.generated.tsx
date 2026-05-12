import type * as Types from '../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PttRealtimeTokenQueryVariables = Types.Exact<{
  schemeId: Types.Scalars['String'];
}>;


export type PttRealtimeTokenQuery = { __typename?: 'Query', scheme: { __typename?: 'Scheme', pttRealtimeToken: { __typename?: 'PttRealtimeToken', accessToken: string, supabaseUrl: string, anonKey: string, expiresIn: number, recordingChannel: string, presenceChannel: string } } };


export const PttRealtimeTokenDocument = gql`
    query PttRealtimeToken($schemeId: String!) {
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
export function usePttRealtimeTokenQuery(baseOptions: Apollo.QueryHookOptions<PttRealtimeTokenQuery, PttRealtimeTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PttRealtimeTokenQuery, PttRealtimeTokenQueryVariables>(PttRealtimeTokenDocument, options);
      }
export function usePttRealtimeTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PttRealtimeTokenQuery, PttRealtimeTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PttRealtimeTokenQuery, PttRealtimeTokenQueryVariables>(PttRealtimeTokenDocument, options);
        }
export type PttRealtimeTokenQueryHookResult = ReturnType<typeof usePttRealtimeTokenQuery>;
export type PttRealtimeTokenLazyQueryHookResult = ReturnType<typeof usePttRealtimeTokenLazyQuery>;
export type PttRealtimeTokenQueryResult = Apollo.QueryResult<PttRealtimeTokenQuery, PttRealtimeTokenQueryVariables>;