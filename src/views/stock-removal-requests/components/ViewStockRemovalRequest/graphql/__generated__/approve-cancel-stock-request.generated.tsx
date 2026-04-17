import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ApproveCancelStockRequestMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type ApproveCancelStockRequestMutation = { __typename?: 'Mutation', approveCancelStockRemovalRequest: { __typename?: 'StockRemovalRequest', id: string, status: Types.StockRemovalRequestStatus } };


export const ApproveCancelStockRequestDocument = gql`
    mutation ApproveCancelStockRequest($where: UniqueId!) {
  approveCancelStockRemovalRequest(where: $where) {
    id
    status
  }
}
    `;
export type ApproveCancelStockRequestMutationFn = Apollo.MutationFunction<ApproveCancelStockRequestMutation, ApproveCancelStockRequestMutationVariables>;
export function useApproveCancelStockRequestMutation(baseOptions?: Apollo.MutationHookOptions<ApproveCancelStockRequestMutation, ApproveCancelStockRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveCancelStockRequestMutation, ApproveCancelStockRequestMutationVariables>(ApproveCancelStockRequestDocument, options);
      }
export type ApproveCancelStockRequestMutationHookResult = ReturnType<typeof useApproveCancelStockRequestMutation>;
export type ApproveCancelStockRequestMutationResult = Apollo.MutationResult<ApproveCancelStockRequestMutation>;
export type ApproveCancelStockRequestMutationOptions = Apollo.BaseMutationOptions<ApproveCancelStockRequestMutation, ApproveCancelStockRequestMutationVariables>;