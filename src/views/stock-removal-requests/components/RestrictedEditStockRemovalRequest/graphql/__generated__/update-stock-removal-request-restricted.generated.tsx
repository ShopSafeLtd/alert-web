import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateStockRemovalRequestRestrictedMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.UpdateStockRemovalRequestInput;
}>;


export type UpdateStockRemovalRequestRestrictedMutation = { __typename?: 'Mutation', updateStockRemovalRequest: { __typename?: 'StockRemovalRequest', id: string, shippingAddress?: string | null, approvers: Array<{ __typename?: 'StockRemovalRequestApproval', status: Types.StockRemovalRequestApprovalStatus, id: string, user: { __typename?: 'User', id: string, fullName: string } }> } };


export const UpdateStockRemovalRequestRestrictedDocument = gql`
    mutation UpdateStockRemovalRequestRestricted($where: UniqueId!, $data: UpdateStockRemovalRequestInput!) {
  updateStockRemovalRequest(where: $where, data: $data) {
    id
    shippingAddress
    approvers {
      status
      id
      user {
        id
        fullName
      }
    }
  }
}
    `;
export type UpdateStockRemovalRequestRestrictedMutationFn = Apollo.MutationFunction<UpdateStockRemovalRequestRestrictedMutation, UpdateStockRemovalRequestRestrictedMutationVariables>;
export function useUpdateStockRemovalRequestRestrictedMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStockRemovalRequestRestrictedMutation, UpdateStockRemovalRequestRestrictedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStockRemovalRequestRestrictedMutation, UpdateStockRemovalRequestRestrictedMutationVariables>(UpdateStockRemovalRequestRestrictedDocument, options);
      }
export type UpdateStockRemovalRequestRestrictedMutationHookResult = ReturnType<typeof useUpdateStockRemovalRequestRestrictedMutation>;
export type UpdateStockRemovalRequestRestrictedMutationResult = Apollo.MutationResult<UpdateStockRemovalRequestRestrictedMutation>;
export type UpdateStockRemovalRequestRestrictedMutationOptions = Apollo.BaseMutationOptions<UpdateStockRemovalRequestRestrictedMutation, UpdateStockRemovalRequestRestrictedMutationVariables>;