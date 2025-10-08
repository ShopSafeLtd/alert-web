import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RejectPapStockRequestMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type RejectPapStockRequestMutation = { __typename?: 'Mutation', rejectPAPStockRemovalRequest: { __typename?: 'StockRemovalRequest', id: string, status: Types.StockRemovalRequestStatus, approvers: Array<{ __typename?: 'StockRemovalRequestApproval', id: string, status: Types.StockRemovalRequestApprovalStatus, user: { __typename?: 'User', id: string, fullName: string } }> } };


export const RejectPapStockRequestDocument = gql`
    mutation RejectPAPStockRequest($where: UniqueId!) {
  rejectPAPStockRemovalRequest(where: $where) {
    id
    status
    approvers {
      id
      status
      user {
        id
        fullName
      }
    }
  }
}
    `;
export type RejectPapStockRequestMutationFn = Apollo.MutationFunction<RejectPapStockRequestMutation, RejectPapStockRequestMutationVariables>;
export function useRejectPapStockRequestMutation(baseOptions?: Apollo.MutationHookOptions<RejectPapStockRequestMutation, RejectPapStockRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectPapStockRequestMutation, RejectPapStockRequestMutationVariables>(RejectPapStockRequestDocument, options);
      }
export type RejectPapStockRequestMutationHookResult = ReturnType<typeof useRejectPapStockRequestMutation>;
export type RejectPapStockRequestMutationResult = Apollo.MutationResult<RejectPapStockRequestMutation>;
export type RejectPapStockRequestMutationOptions = Apollo.BaseMutationOptions<RejectPapStockRequestMutation, RejectPapStockRequestMutationVariables>;