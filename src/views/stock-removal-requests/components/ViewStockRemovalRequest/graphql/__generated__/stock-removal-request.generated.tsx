import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StockRemovalRequestQueryVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type StockRemovalRequestQuery = { __typename?: 'Query', stockRemovalRequest?: { __typename?: 'StockRemovalRequest', id: string, createdAt?: Date | null, title: string, description?: string | null, status: Types.StockRemovalRequestStatus, reference?: number | null, costCentreCode?: string | null, fascia?: string | null, personalityInfluences?: string | null, reason?: string | null, reasonForNonReturn?: string | null, rechargeBrand?: string | null, rechargeReference?: string | null, returnDate?: Date | null, shippingAddress?: string | null, smqAccountNumber?: string | null, socialHandles?: string | null, storeOrDC?: string | null, willStockBeReturned?: string | null, items?: Array<{ __typename?: 'StockRemovalItem', id: string, name?: string | null, requestedQuantity?: number | null, pickedQuantity?: number | null }> | null, business?: { __typename?: 'Business', id: string, name?: string | null } | null, approvers?: Array<{ __typename?: 'StockRemovalRequestApproval', status: Types.StockRemovalRequestApprovalStatus, id: string, user?: { __typename?: 'User', id?: string | null, fullName: string } | null }> | null } | null };


export const StockRemovalRequestDocument = gql`
    query stockRemovalRequest($where: UniqueId!) {
  stockRemovalRequest(where: $where) {
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
export function useStockRemovalRequestQuery(baseOptions: Apollo.QueryHookOptions<StockRemovalRequestQuery, StockRemovalRequestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StockRemovalRequestQuery, StockRemovalRequestQueryVariables>(StockRemovalRequestDocument, options);
      }
export function useStockRemovalRequestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StockRemovalRequestQuery, StockRemovalRequestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StockRemovalRequestQuery, StockRemovalRequestQueryVariables>(StockRemovalRequestDocument, options);
        }
export type StockRemovalRequestQueryHookResult = ReturnType<typeof useStockRemovalRequestQuery>;
export type StockRemovalRequestLazyQueryHookResult = ReturnType<typeof useStockRemovalRequestLazyQuery>;
export type StockRemovalRequestQueryResult = Apollo.QueryResult<StockRemovalRequestQuery, StockRemovalRequestQueryVariables>;