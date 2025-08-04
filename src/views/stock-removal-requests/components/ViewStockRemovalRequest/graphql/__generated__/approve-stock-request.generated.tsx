import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ApproveStockRequestMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type ApproveStockRequestMutation = { __typename?: 'Mutation', approveStockRemovalRequest: { __typename?: 'StockRemovalRequestApproval', id: string, status: Types.StockRemovalRequestApprovalStatus, user: { __typename?: 'User', id: string, fullName: string } } };


export const ApproveStockRequestDocument = gql`
    mutation ApproveStockRequest($where: UniqueId!) {
  approveStockRemovalRequest(where: $where) {
    id
    status
    user {
      id
      fullName
    }
  }
}
    `;
export type ApproveStockRequestMutationFn = Apollo.MutationFunction<ApproveStockRequestMutation, ApproveStockRequestMutationVariables>;
export function useApproveStockRequestMutation(baseOptions?: Apollo.MutationHookOptions<ApproveStockRequestMutation, ApproveStockRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveStockRequestMutation, ApproveStockRequestMutationVariables>(ApproveStockRequestDocument, options);
      }
export type ApproveStockRequestMutationHookResult = ReturnType<typeof useApproveStockRequestMutation>;
export type ApproveStockRequestMutationResult = Apollo.MutationResult<ApproveStockRequestMutation>;
export type ApproveStockRequestMutationOptions = Apollo.BaseMutationOptions<ApproveStockRequestMutation, ApproveStockRequestMutationVariables>;