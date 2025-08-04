import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IncidentItemsReportQueryVariables = Types.Exact<{
  where: Types.IncidentItemsWhereInput;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  orderby?: Types.InputMaybe<Types.IncidentItemsOrderByInput>;
}>;


export type IncidentItemsReportQuery = { __typename?: 'Query', incidentItems?: { __typename?: 'QueryIncidentItemsConnection', totalCount: number, edges: Array<{ __typename?: 'QueryIncidentItemsConnectionEdge', node: { __typename?: 'IncidentItem', id?: string | null, name?: string | null, quantity?: number | null, recoveredQuantity?: number | null, sku?: string | null, incident?: { __typename?: 'Incident', id?: string | null, date?: Date | null, createdAt?: Date | null, business?: { __typename?: 'Business', id: string, name?: string | null, siteNumber?: string | null } | null } | null, stockItem?: { __typename?: 'StockItem', variant?: string | null, goodsType?: { __typename?: 'GoodsType', id?: string | null, name?: string | null } | null } | null } }> } | null };


export const IncidentItemsReportDocument = gql`
    query IncidentItemsReport($where: IncidentItemsWhereInput!, $take: Int, $skip: Int, $orderby: IncidentItemsOrderByInput) {
  incidentItems(where: $where, take: $take, skip: $skip, orderby: $orderby) {
    edges {
      node {
        id
        name
        quantity
        recoveredQuantity
        incident {
          id
          date
          createdAt
          business {
            id
            name
            siteNumber
          }
        }
        sku
        stockItem {
          goodsType {
            id
            name
          }
          variant
        }
      }
    }
    totalCount
  }
}
    `;
export function useIncidentItemsReportQuery(baseOptions: Apollo.QueryHookOptions<IncidentItemsReportQuery, IncidentItemsReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IncidentItemsReportQuery, IncidentItemsReportQueryVariables>(IncidentItemsReportDocument, options);
      }
export function useIncidentItemsReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IncidentItemsReportQuery, IncidentItemsReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IncidentItemsReportQuery, IncidentItemsReportQueryVariables>(IncidentItemsReportDocument, options);
        }
export type IncidentItemsReportQueryHookResult = ReturnType<typeof useIncidentItemsReportQuery>;
export type IncidentItemsReportLazyQueryHookResult = ReturnType<typeof useIncidentItemsReportLazyQuery>;
export type IncidentItemsReportQueryResult = Apollo.QueryResult<IncidentItemsReportQuery, IncidentItemsReportQueryVariables>;