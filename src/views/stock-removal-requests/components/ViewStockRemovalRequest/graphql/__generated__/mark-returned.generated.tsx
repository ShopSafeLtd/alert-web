import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MarkStockRemovalRequestAsReturnedMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type MarkStockRemovalRequestAsReturnedMutation = { __typename?: 'Mutation', markStockRemovalRequestAsReturned: { __typename?: 'StockRemovalRequest', id: string, status: Types.StockRemovalRequestStatus } };


export const MarkStockRemovalRequestAsReturnedDocument = gql`
    mutation MarkStockRemovalRequestAsReturned($where: UniqueId!) {
  markStockRemovalRequestAsReturned(where: $where) {
    id
    status
  }
}
    `;
export type MarkStockRemovalRequestAsReturnedMutationFn = Apollo.MutationFunction<MarkStockRemovalRequestAsReturnedMutation, MarkStockRemovalRequestAsReturnedMutationVariables>;
export function useMarkStockRemovalRequestAsReturnedMutation(baseOptions?: Apollo.MutationHookOptions<MarkStockRemovalRequestAsReturnedMutation, MarkStockRemovalRequestAsReturnedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkStockRemovalRequestAsReturnedMutation, MarkStockRemovalRequestAsReturnedMutationVariables>(MarkStockRemovalRequestAsReturnedDocument, options);
      }
export type MarkStockRemovalRequestAsReturnedMutationHookResult = ReturnType<typeof useMarkStockRemovalRequestAsReturnedMutation>;
export type MarkStockRemovalRequestAsReturnedMutationResult = Apollo.MutationResult<MarkStockRemovalRequestAsReturnedMutation>;
export type MarkStockRemovalRequestAsReturnedMutationOptions = Apollo.BaseMutationOptions<MarkStockRemovalRequestAsReturnedMutation, MarkStockRemovalRequestAsReturnedMutationVariables>;