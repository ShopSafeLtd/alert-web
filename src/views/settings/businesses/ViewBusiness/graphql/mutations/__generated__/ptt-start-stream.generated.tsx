import type * as Types from '../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PttStartStreamMutationVariables = Types.Exact<{
  deviceId: Types.Scalars['String'];
  schemeId?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type PttStartStreamMutation = { __typename?: 'Mutation', pttStartStream: { __typename?: 'PttStream', streamId: string, livekitRoom: string, livekitToken: string, livekitUrl: string, status: string } };


export const PttStartStreamDocument = gql`
    mutation PttStartStream($deviceId: String!, $schemeId: String) {
  pttStartStream(deviceId: $deviceId, schemeId: $schemeId) {
    streamId
    livekitRoom
    livekitToken
    livekitUrl
    status
  }
}
    `;
export type PttStartStreamMutationFn = Apollo.MutationFunction<PttStartStreamMutation, PttStartStreamMutationVariables>;
export function usePttStartStreamMutation(baseOptions?: Apollo.MutationHookOptions<PttStartStreamMutation, PttStartStreamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PttStartStreamMutation, PttStartStreamMutationVariables>(PttStartStreamDocument, options);
      }
export type PttStartStreamMutationHookResult = ReturnType<typeof usePttStartStreamMutation>;
export type PttStartStreamMutationResult = Apollo.MutationResult<PttStartStreamMutation>;
export type PttStartStreamMutationOptions = Apollo.BaseMutationOptions<PttStartStreamMutation, PttStartStreamMutationVariables>;