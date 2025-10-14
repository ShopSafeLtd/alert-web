import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateStockRemovalRequestMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.UpdateStockRemovalRequestInput;
}>;


export type UpdateStockRemovalRequestMutation = { __typename?: 'Mutation', updateStockRemovalRequest: { __typename?: 'StockRemovalRequest', id: string, createdAt: Date, title: string, description?: string | null, status: Types.StockRemovalRequestStatus, reference?: number | null, costCentreCode?: string | null, fascia?: string | null, personalityInfluences?: string | null, reason?: string | null, reasonForNonReturn?: string | null, rechargeBrand?: string | null, rechargeReference?: string | null, returnDate?: Date | null, shippingAddress?: string | null, smqAccountNumber?: string | null, socialHandles?: string | null, storeOrDC?: string | null, willStockBeReturned?: string | null, items: Array<{ __typename?: 'StockRemovalItem', id: string, name?: string | null, requestedQuantity?: number | null, pickedQuantity?: number | null }>, business?: { __typename?: 'Business', id: string, name: string } | null, approvers: Array<{ __typename?: 'StockRemovalRequestApproval', status: Types.StockRemovalRequestApprovalStatus, id: string, user: { __typename?: 'User', id: string, fullName: string } }> } };


export const UpdateStockRemovalRequestDocument = gql`
    mutation UpdateStockRemovalRequest($where: UniqueId!, $data: UpdateStockRemovalRequestInput!) {
  updateStockRemovalRequest(where: $where, data: $data) {
    id
    createdAt
    title
    description
    status
    reference
    costCentreCode
    fascia
    personalityInfluences
    reason
    reasonForNonReturn
    rechargeBrand
    rechargeReference
    returnDate
    shippingAddress
    smqAccountNumber
    socialHandles
    storeOrDC
    willStockBeReturned
    items {
      id
      name
      requestedQuantity
      pickedQuantity
    }
    business {
      id
      name
    }
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
export type UpdateStockRemovalRequestMutationFn = Apollo.MutationFunction<UpdateStockRemovalRequestMutation, UpdateStockRemovalRequestMutationVariables>;
export function useUpdateStockRemovalRequestMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStockRemovalRequestMutation, UpdateStockRemovalRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStockRemovalRequestMutation, UpdateStockRemovalRequestMutationVariables>(UpdateStockRemovalRequestDocument, options);
      }
export type UpdateStockRemovalRequestMutationHookResult = ReturnType<typeof useUpdateStockRemovalRequestMutation>;
export type UpdateStockRemovalRequestMutationResult = Apollo.MutationResult<UpdateStockRemovalRequestMutation>;
export type UpdateStockRemovalRequestMutationOptions = Apollo.BaseMutationOptions<UpdateStockRemovalRequestMutation, UpdateStockRemovalRequestMutationVariables>;