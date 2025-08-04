import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RejectStockRequestMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type RejectStockRequestMutation = { __typename?: 'Mutation', rejectStockRemovalRequest?: { __typename?: 'StockRemovalRequestApproval', id: string, status: Types.StockRemovalRequestApprovalStatus, user?: { __typename?: 'User', id?: string | null, fullName: string } | null } | null };


export const RejectStockRequestDocument = gql`
    mutation RejectStockRequest($where: UniqueId!) {
  rejectStockRemovalRequest(where: $where) {
    id
    status
    user {
      id
      fullName
    }
  }
}
    `;
export type RejectStockRequestMutationFn = Apollo.MutationFunction<RejectStockRequestMutation, RejectStockRequestMutationVariables>;
export function useRejectStockRequestMutation(baseOptions?: Apollo.MutationHookOptions<RejectStockRequestMutation, RejectStockRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectStockRequestMutation, RejectStockRequestMutationVariables>(RejectStockRequestDocument, options);
      }
export type RejectStockRequestMutationHookResult = ReturnType<typeof useRejectStockRequestMutation>;
export type RejectStockRequestMutationResult = Apollo.MutationResult<RejectStockRequestMutation>;
export type RejectStockRequestMutationOptions = Apollo.BaseMutationOptions<RejectStockRequestMutation, RejectStockRequestMutationVariables>;