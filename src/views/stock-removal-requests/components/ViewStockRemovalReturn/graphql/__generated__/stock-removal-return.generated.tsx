import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import type { UpdatesFragment } from '../../../../../../graphql/fragments/__generated__/updates.generated';
import { UpdatesFragmentDoc } from '../../../../../../graphql/fragments/__generated__/updates.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StockRemovalReturnQueryVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type StockRemovalReturnQuery = { __typename?: 'Query', stockRemovalRequest: { __typename?: 'StockRemovalRequest', id: string, createdAt: Date, title: string, description?: string | null, status: Types.StockRemovalRequestStatus, reference?: number | null, isReturn?: boolean | null, storeOrDC?: string | null, returnOrignalId?: string | null, rechargeReference?: string | null, rechargeBrand?: string | null, costCentreCode?: string | null, tracking?: string | null, dateofReturn?: Date | null, createdBy: { __typename?: 'User', id: string, fullName: string }, business?: { __typename?: 'Business', id: string, name: string } | null, returnImages?: Array<{ __typename?: 'Image', id: string, url?: string | null }> | null, items: Array<{ __typename?: 'StockRemovalItem', id: string, name?: string | null, brand?: string | null, sku?: string | null, barcode?: string | null, value?: number | null, requestedQuantity?: number | null, pickedQuantity?: number | null, damaged?: boolean | null, stockItem: { __typename?: 'StockItem', id: string } }>, updates: Array<UpdatesFragment> } };


export const StockRemovalReturnDocument = gql`
    query stockRemovalReturn($where: UniqueId!) {
  stockRemovalRequest(where: $where) {
    id
    createdAt
    title
    description
    status
    reference
    isReturn
    storeOrDC
    returnOrignalId
    rechargeReference
    rechargeBrand
    costCentreCode
    tracking
    dateofReturn
    createdBy {
      id
      fullName
    }
    business {
      id
      name
    }
    returnImages {
      id
      url
    }
    items {
      id
      name
      brand
      sku
      barcode
      value
      requestedQuantity
      pickedQuantity
      damaged
      stockItem {
        id
      }
    }
    updates(orderBy: {createdAt: desc}) {
      ...Updates
    }
  }
}
    ${UpdatesFragmentDoc}`;
export function useStockRemovalReturnQuery(baseOptions: Apollo.QueryHookOptions<StockRemovalReturnQuery, StockRemovalReturnQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StockRemovalReturnQuery, StockRemovalReturnQueryVariables>(StockRemovalReturnDocument, options);
      }
export function useStockRemovalReturnLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StockRemovalReturnQuery, StockRemovalReturnQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StockRemovalReturnQuery, StockRemovalReturnQueryVariables>(StockRemovalReturnDocument, options);
        }
export type StockRemovalReturnQueryHookResult = ReturnType<typeof useStockRemovalReturnQuery>;
export type StockRemovalReturnLazyQueryHookResult = ReturnType<typeof useStockRemovalReturnLazyQuery>;
export type StockRemovalReturnQueryResult = Apollo.QueryResult<StockRemovalReturnQuery, StockRemovalReturnQueryVariables>;
