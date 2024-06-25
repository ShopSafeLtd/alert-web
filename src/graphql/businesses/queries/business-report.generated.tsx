import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BusinessReportQueryVariables = Types.Exact<{
  where: Types.BusinessWhereUniqueInput;
  endDate: Types.Scalars['DateTime'];
  startDate: Types.Scalars['DateTime'];
}>;


export type BusinessReportQuery = { __typename?: 'Query', business: { __typename?: 'Business', id: string, name: string, siteNumber?: string | null, incidents: Array<{ __typename?: 'Incident', id: string, subject?: string | null, createdAt: Date, reference?: number | null, policeRef?: string | null, totalRecoveredValue: number, totalValue: number, date: Date, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, createdBy: { __typename?: 'User', id: string, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }> } }>, locations: Array<{ __typename?: 'Address', id: string, full: string }>, valueStats?: { __typename?: 'ValueTotals', avgLostValue: number, businessId: string, avgRecoveredValue: number, successRate: number, totalLostValue: number, totalRecoveredValue: number } | null, goodsTypesTotals?: Array<{ __typename?: 'BusinessGoodsTotals', avgLostValue?: number | null, businessId?: string | null, avgRecoveredValue?: number | null, count?: number | null, successRate?: number | null, totalRecoveredValue?: number | null, totalLostValue?: number | null, goodsType?: { __typename?: 'GoodsType', id: string, name: string } | null }> | null } };


export const BusinessReportDocument = gql`
    query BusinessReport($where: BusinessWhereUniqueInput!, $endDate: DateTime!, $startDate: DateTime!) {
  business(where: $where) {
    id
    name
    siteNumber
    incidents {
      id
      subject
      crimeTypes {
        id
        name
      }
      createdAt
      reference
      policeRef
      totalRecoveredValue
      totalValue
      date
      createdBy {
        id
        businesses {
          id
          name
          fullName
          fullName
        }
      }
    }
    locations {
      id
      full
    }
    valueStats(endDate: $endDate, startDate: $startDate) {
      avgLostValue
      businessId
      avgRecoveredValue
      successRate
      totalLostValue
      totalRecoveredValue
    }
    goodsTypesTotals(startDate: $startDate, endDate: $endDate) {
      avgLostValue
      businessId
      avgRecoveredValue
      count
      successRate
      totalRecoveredValue
      totalLostValue
      goodsType {
        id
        name
      }
    }
  }
}
    `;
export function useBusinessReportQuery(baseOptions: Apollo.QueryHookOptions<BusinessReportQuery, BusinessReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessReportQuery, BusinessReportQueryVariables>(BusinessReportDocument, options);
      }
export function useBusinessReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessReportQuery, BusinessReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessReportQuery, BusinessReportQueryVariables>(BusinessReportDocument, options);
        }
export type BusinessReportQueryHookResult = ReturnType<typeof useBusinessReportQuery>;
export type BusinessReportLazyQueryHookResult = ReturnType<typeof useBusinessReportLazyQuery>;
export type BusinessReportQueryResult = Apollo.QueryResult<BusinessReportQuery, BusinessReportQueryVariables>;