import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteStockRemovalReturnMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type DeleteStockRemovalReturnMutation = { __typename?: 'Mutation', deleteStockRemovalReturn: { __typename?: 'StockRemovalRequest', id: string } };


export const DeleteStockRemovalReturnDocument = gql`
    mutation DeleteStockRemovalReturn($where: UniqueId!) {
  deleteStockRemovalReturn(where: $where) {
    id
  }
}
    `;
export type DeleteStockRemovalReturnMutationFn = Apollo.MutationFunction<DeleteStockRemovalReturnMutation, DeleteStockRemovalReturnMutationVariables>;
export function useDeleteStockRemovalReturnMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStockRemovalReturnMutation, DeleteStockRemovalReturnMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteStockRemovalReturnMutation, DeleteStockRemovalReturnMutationVariables>(DeleteStockRemovalReturnDocument, options);
      }
export type DeleteStockRemovalReturnMutationHookResult = ReturnType<typeof useDeleteStockRemovalReturnMutation>;
export type DeleteStockRemovalReturnMutationResult = Apollo.MutationResult<DeleteStockRemovalReturnMutation>;
export type DeleteStockRemovalReturnMutationOptions = Apollo.BaseMutationOptions<DeleteStockRemovalReturnMutation, DeleteStockRemovalReturnMutationVariables>;