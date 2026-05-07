import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateStockRemovalRequestMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.UpdateStockRemovalRequestInput;
}>;


export type UpdateStockRemovalRequestMutation = { __typename?: 'Mutation', updateStockRemovalRequest: { __typename?: 'StockRemovalRequest', id: string, createdAt: Date, title: string, description?: string | null, status: Types.StockRemovalRequestStatus, reference?: number | null, costCentreCode?: string | null, destination?: Types.StockRemovalRquestDestination | null, fascia?: string | null, nominalCode?: string | null, picker?: { __typename?: 'User', id: string, fullName: string } | null, priority: Types.StockRemovalPriority, personalityInfluences?: string | null, reason?: string | null, reasonForNonReturn?: string | null, rechargeBrand?: string | null, rechargeReference?: string | null, recipientEmail?: string | null, recipientName?: string | null, recipientPhone?: string | null, returnDate?: Date | null, shippingAddress?: string | null, shippingAddressLine1?: string | null, shippingAddressLine2?: string | null, shippingCity?: string | null, shippingCounty?: string | null, shippingPostcode?: string | null, shippingCountry?: string | null, smqAccountNumber?: string | null, socialHandles?: string | null, storeOrDC?: string | null, willStockBeReturned?: string | null, items: Array<{ __typename?: 'StockRemovalItem', id: string, name?: string | null, requestedQuantity?: number | null, pickedQuantity?: number | null }>, business?: { __typename?: 'Business', id: string, name: string } | null, approvers: Array<{ __typename?: 'StockRemovalRequestApproval', status: Types.StockRemovalRequestApprovalStatus, id: string, user: { __typename?: 'User', id: string, fullName: string } }> } };


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
    destination
    fascia
    nominalCode
    picker {
      id
      fullName
    }
    priority
    personalityInfluences
    reason
    reasonForNonReturn
    rechargeBrand
    rechargeReference
    recipientEmail
    recipientName
    recipientPhone
    returnDate
    shippingAddress
    shippingAddressLine1
    shippingAddressLine2
    shippingCity
    shippingCounty
    shippingPostcode
    shippingCountry
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