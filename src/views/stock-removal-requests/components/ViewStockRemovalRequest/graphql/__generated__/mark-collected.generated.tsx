import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MarkStockRemovalRequestAsCollectedMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type MarkStockRemovalRequestAsCollectedMutation = { __typename?: 'Mutation', markStockRemovalRequestAsCollected: { __typename?: 'StockRemovalRequest', id: string, status: Types.StockRemovalRequestStatus } };


export const MarkStockRemovalRequestAsCollectedDocument = gql`
    mutation MarkStockRemovalRequestAsCollected($where: UniqueId!) {
  markStockRemovalRequestAsCollected(where: $where) {
    id
    status
  }
}
    `;
export type MarkStockRemovalRequestAsCollectedMutationFn = Apollo.MutationFunction<MarkStockRemovalRequestAsCollectedMutation, MarkStockRemovalRequestAsCollectedMutationVariables>;
export function useMarkStockRemovalRequestAsCollectedMutation(baseOptions?: Apollo.MutationHookOptions<MarkStockRemovalRequestAsCollectedMutation, MarkStockRemovalRequestAsCollectedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkStockRemovalRequestAsCollectedMutation, MarkStockRemovalRequestAsCollectedMutationVariables>(MarkStockRemovalRequestAsCollectedDocument, options);
      }
export type MarkStockRemovalRequestAsCollectedMutationHookResult = ReturnType<typeof useMarkStockRemovalRequestAsCollectedMutation>;
export type MarkStockRemovalRequestAsCollectedMutationResult = Apollo.MutationResult<MarkStockRemovalRequestAsCollectedMutation>;
export type MarkStockRemovalRequestAsCollectedMutationOptions = Apollo.BaseMutationOptions<MarkStockRemovalRequestAsCollectedMutation, MarkStockRemovalRequestAsCollectedMutationVariables>;