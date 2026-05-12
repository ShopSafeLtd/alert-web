import type * as Types from '../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PttEndStreamMutationVariables = Types.Exact<{
  streamId: Types.Scalars['String'];
  schemeId?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type PttEndStreamMutation = { __typename?: 'Mutation', pttEndStream: boolean };


export const PttEndStreamDocument = gql`
    mutation PttEndStream($streamId: String!, $schemeId: String) {
  pttEndStream(streamId: $streamId, schemeId: $schemeId)
}
    `;
export type PttEndStreamMutationFn = Apollo.MutationFunction<PttEndStreamMutation, PttEndStreamMutationVariables>;
export function usePttEndStreamMutation(baseOptions?: Apollo.MutationHookOptions<PttEndStreamMutation, PttEndStreamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PttEndStreamMutation, PttEndStreamMutationVariables>(PttEndStreamDocument, options);
      }
export type PttEndStreamMutationHookResult = ReturnType<typeof usePttEndStreamMutation>;
export type PttEndStreamMutationResult = Apollo.MutationResult<PttEndStreamMutation>;
export type PttEndStreamMutationOptions = Apollo.BaseMutationOptions<PttEndStreamMutation, PttEndStreamMutationVariables>;