import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StockRemovalRequestQueryVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type StockRemovalRequestQuery = { __typename?: 'Query', stockRemovalRequest: { __typename?: 'StockRemovalRequest', id: string, createdAt: Date, title: string, description?: string | null, status: Types.StockRemovalRequestStatus, reference?: number | null, items: Array<{ __typename?: 'StockRemovalItem', id: string, name?: string | null, requestedQuantity?: number | null, pickedQuantity?: number | null }>, business: { __typename?: 'Business', id: string, name: string }, approvers: Array<{ __typename?: 'StockRemovalRequestApproval', status: Types.StockRemovalRequestApprovalStatus, id: string, user: { __typename?: 'User', id: string, fullName: string } }> } };


export const StockRemovalRequestDocument = gql`
    query stockRemovalRequest($where: UniqueId!) {
  stockRemovalRequest(where: $where) {
    id
    createdAt
    title
    description
    status
    reference
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