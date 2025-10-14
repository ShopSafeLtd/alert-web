import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ApprovePapStockRequestMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type ApprovePapStockRequestMutation = { __typename?: 'Mutation', approvePAPStockRemovalRequest: { __typename?: 'StockRemovalRequest', id: string, status: Types.StockRemovalRequestStatus, approvers: Array<{ __typename?: 'StockRemovalRequestApproval', id: string, status: Types.StockRemovalRequestApprovalStatus, user: { __typename?: 'User', id: string, fullName: string } }> } };


export const ApprovePapStockRequestDocument = gql`
    mutation ApprovePAPStockRequest($where: UniqueId!) {
  approvePAPStockRemovalRequest(where: $where) {
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
export type ApprovePapStockRequestMutationFn = Apollo.MutationFunction<ApprovePapStockRequestMutation, ApprovePapStockRequestMutationVariables>;
export function useApprovePapStockRequestMutation(baseOptions?: Apollo.MutationHookOptions<ApprovePapStockRequestMutation, ApprovePapStockRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApprovePapStockRequestMutation, ApprovePapStockRequestMutationVariables>(ApprovePapStockRequestDocument, options);
      }
export type ApprovePapStockRequestMutationHookResult = ReturnType<typeof useApprovePapStockRequestMutation>;
export type ApprovePapStockRequestMutationResult = Apollo.MutationResult<ApprovePapStockRequestMutation>;
export type ApprovePapStockRequestMutationOptions = Apollo.BaseMutationOptions<ApprovePapStockRequestMutation, ApprovePapStockRequestMutationVariables>;