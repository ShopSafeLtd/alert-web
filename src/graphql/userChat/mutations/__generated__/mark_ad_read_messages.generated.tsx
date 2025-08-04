import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MarkAsReadMessagesMutationVariables = Types.Exact<{
  userChatId: Types.Scalars['String'];
}>;


export type MarkAsReadMessagesMutation = { __typename?: 'Mutation', markAsReadMessages?: { __typename?: 'UserChat', id?: string | null } | null };


export const MarkAsReadMessagesDocument = gql`
    mutation markAsReadMessages($userChatId: String!) {
  markAsReadMessages(userChatId: $userChatId) {
    id
  }
}
    `;
export type MarkAsReadMessagesMutationFn = Apollo.MutationFunction<MarkAsReadMessagesMutation, MarkAsReadMessagesMutationVariables>;
export function useMarkAsReadMessagesMutation(baseOptions?: Apollo.MutationHookOptions<MarkAsReadMessagesMutation, MarkAsReadMessagesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkAsReadMessagesMutation, MarkAsReadMessagesMutationVariables>(MarkAsReadMessagesDocument, options);
      }
export type MarkAsReadMessagesMutationHookResult = ReturnType<typeof useMarkAsReadMessagesMutation>;
export type MarkAsReadMessagesMutationResult = Apollo.MutationResult<MarkAsReadMessagesMutation>;
export type MarkAsReadMessagesMutationOptions = Apollo.BaseMutationOptions<MarkAsReadMessagesMutation, MarkAsReadMessagesMutationVariables>;