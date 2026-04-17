import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteStockRemovalReasonOptionMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type DeleteStockRemovalReasonOptionMutation = { __typename?: 'Mutation', deleteStockRemovalReasonOption: { __typename?: 'StockRemovalReasonOption', id: string } };


export const DeleteStockRemovalReasonOptionDocument = gql`
    mutation DeleteStockRemovalReasonOption($where: UniqueId!) {
  deleteStockRemovalReasonOption(where: $where) {
    id
  }
}
    `;
export type DeleteStockRemovalReasonOptionMutationFn = Apollo.MutationFunction<DeleteStockRemovalReasonOptionMutation, DeleteStockRemovalReasonOptionMutationVariables>;
export function useDeleteStockRemovalReasonOptionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStockRemovalReasonOptionMutation, DeleteStockRemovalReasonOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteStockRemovalReasonOptionMutation, DeleteStockRemovalReasonOptionMutationVariables>(DeleteStockRemovalReasonOptionDocument, options);
      }
export type DeleteStockRemovalReasonOptionMutationHookResult = ReturnType<typeof useDeleteStockRemovalReasonOptionMutation>;
export type DeleteStockRemovalReasonOptionMutationResult = Apollo.MutationResult<DeleteStockRemovalReasonOptionMutation>;
export type DeleteStockRemovalReasonOptionMutationOptions = Apollo.BaseMutationOptions<DeleteStockRemovalReasonOptionMutation, DeleteStockRemovalReasonOptionMutationVariables>;