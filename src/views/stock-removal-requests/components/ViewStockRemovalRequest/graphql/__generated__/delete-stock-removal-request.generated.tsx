import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteStockRemovalRequestMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type DeleteStockRemovalRequestMutation = { __typename?: 'Mutation', deleteStockRemovalRequest: { __typename?: 'StockRemovalRequest', id: string } };


export const DeleteStockRemovalRequestDocument = gql`
    mutation DeleteStockRemovalRequest($where: UniqueId!) {
  deleteStockRemovalRequest(where: $where) {
    id
  }
}
    `;
export type DeleteStockRemovalRequestMutationFn = Apollo.MutationFunction<DeleteStockRemovalRequestMutation, DeleteStockRemovalRequestMutationVariables>;
export function useDeleteStockRemovalRequestMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStockRemovalRequestMutation, DeleteStockRemovalRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteStockRemovalRequestMutation, DeleteStockRemovalRequestMutationVariables>(DeleteStockRemovalRequestDocument, options);
      }
export type DeleteStockRemovalRequestMutationHookResult = ReturnType<typeof useDeleteStockRemovalRequestMutation>;
export type DeleteStockRemovalRequestMutationResult = Apollo.MutationResult<DeleteStockRemovalRequestMutation>;
export type DeleteStockRemovalRequestMutationOptions = Apollo.BaseMutationOptions<DeleteStockRemovalRequestMutation, DeleteStockRemovalRequestMutationVariables>;