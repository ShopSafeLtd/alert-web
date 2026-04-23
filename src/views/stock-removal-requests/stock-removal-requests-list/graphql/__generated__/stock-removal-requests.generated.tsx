import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StockRemovalRequestsQueryVariables = Types.Exact<{
  where: Types.StockRemovalRequestsWhere;
  orderBy?: Types.InputMaybe<Array<Types.StockRemovalRequestsOrderBy> | Types.StockRemovalRequestsOrderBy>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type StockRemovalRequestsQuery = { __typename?: 'Query', stockRemovalRequests: { __typename?: 'QueryStockRemovalRequestsConnection', totalCount: number, edges: Array<{ __typename?: 'QueryStockRemovalRequestsConnectionEdge', node: { __typename?: 'StockRemovalRequest', id: string, createdAt: Date, title: string, status: Types.StockRemovalRequestStatus, reference?: number | null, isReturn?: boolean | null, storeOrDC?: string | null, dateofReturn?: Date | null, createdBy: { __typename?: 'User', id: string, fullName: string }, business?: { __typename?: 'Business', id: string, name: string } | null, approvers: Array<{ __typename?: 'StockRemovalRequestApproval', status: Types.StockRemovalRequestApprovalStatus, user: { __typename?: 'User', id: string, fullName: string } }> } }> } };


export const StockRemovalRequestsDocument = gql`
    query StockRemovalRequests($where: StockRemovalRequestsWhere!, $orderBy: [StockRemovalRequestsOrderBy!], $take: Int, $skip: Int) {
  stockRemovalRequests(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
    edges {
      node {
        id
        createdAt
        createdBy {
          id
          fullName
        }
        title
        status
        reference
        isReturn
        storeOrDC
        dateofReturn
        business {
          id
          name
        }
        approvers {
          status
          user {
            id
            fullName
          }
        }
      }
    }
    totalCount
  }
}
    `;
export function useStockRemovalRequestsQuery(baseOptions: Apollo.QueryHookOptions<StockRemovalRequestsQuery, StockRemovalRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StockRemovalRequestsQuery, StockRemovalRequestsQueryVariables>(StockRemovalRequestsDocument, options);
      }
export function useStockRemovalRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StockRemovalRequestsQuery, StockRemovalRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StockRemovalRequestsQuery, StockRemovalRequestsQueryVariables>(StockRemovalRequestsDocument, options);
        }
export type StockRemovalRequestsQueryHookResult = ReturnType<typeof useStockRemovalRequestsQuery>;
export type StockRemovalRequestsLazyQueryHookResult = ReturnType<typeof useStockRemovalRequestsLazyQuery>;
export type StockRemovalRequestsQueryResult = Apollo.QueryResult<StockRemovalRequestsQuery, StockRemovalRequestsQueryVariables>;