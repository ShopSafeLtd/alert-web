import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteFeedItemMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeleteFeedItemMutation = { __typename?: 'Mutation', deleteFeedItem: { __typename?: 'FeedItem', id: string } };


export const DeleteFeedItemDocument = gql`
    mutation deleteFeedItem($id: String!) {
  deleteFeedItem(where: {id: $id}) {
    id
  }
}
    `;
export type DeleteFeedItemMutationFn = Apollo.MutationFunction<DeleteFeedItemMutation, DeleteFeedItemMutationVariables>;
export function useDeleteFeedItemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFeedItemMutation, DeleteFeedItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFeedItemMutation, DeleteFeedItemMutationVariables>(DeleteFeedItemDocument, options);
      }
export type DeleteFeedItemMutationHookResult = ReturnType<typeof useDeleteFeedItemMutation>;
export type DeleteFeedItemMutationResult = Apollo.MutationResult<DeleteFeedItemMutation>;
export type DeleteFeedItemMutationOptions = Apollo.BaseMutationOptions<DeleteFeedItemMutation, DeleteFeedItemMutationVariables>;