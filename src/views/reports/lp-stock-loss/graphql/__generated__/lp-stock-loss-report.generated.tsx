import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export {
  LpStockLossBusinessHotspotsOrderBy,
  LpStockLossGoodsTypeOrderBy,
  LpStockLossOffenderOrderBy,
  LpStockLossTopItemsOrderBy,
} from '../../../../../graphql/types';
export type LpStockLossReportQueryVariables = Types.Exact<{
  startDate?: Types.InputMaybe<Types.Scalars['DateTime']>;
  endDate?: Types.InputMaybe<Types.Scalars['DateTime']>;
  schemeId?: Types.InputMaybe<Types.Scalars['String']>;
  goodsTypeId?: Types.InputMaybe<Types.Scalars['String']>;
  stockItemId?: Types.InputMaybe<Types.Scalars['String']>;
  businessId?: Types.InputMaybe<Types.Scalars['String']>;
  topItemsOrderBy?: Types.InputMaybe<Types.LpStockLossTopItemsOrderBy>;
  offenderOrderBy?: Types.InputMaybe<Types.LpStockLossOffenderOrderBy>;
  goodsTypeOrderBy?: Types.InputMaybe<Types.LpStockLossGoodsTypeOrderBy>;
  businessHotspotsOrderBy?: Types.InputMaybe<Types.LpStockLossBusinessHotspotsOrderBy>;
  groupIds?: Types.InputMaybe<Array<Types.Scalars['String']>>;
}>;


export type LpStockLossReportQuery = { __typename?: 'Query', lpStockLossReport: { __typename?: 'LPStockLossReportData', summary: { __typename?: 'LPStockLossSummary', totalIncidents: number, totalValueLost: number, totalValueRecovered: number, recoveryRate: number, uniqueItemsStolen: number, uniqueOffenders: number, businessesAffected: number, periodIncidentChange?: number | null, periodValueChange?: number | null }, topTargetedItems?: Array<{ __typename?: 'LPStockLossTargetedItem', stockItemId: string, name?: string | null, brand?: string | null, goodsTypeName?: string | null, incidentCount: number, totalValueLost: number, totalValueRecovered: number, netValueLost: number, totalQuantityLost: number, recoveryRate: number, topBusinesses: Array<{ __typename?: 'LPStockLossBusinessRef', id: string, name: string }> }> | null, goodsTypeBreakdown?: Array<{ __typename?: 'LPStockLossGoodsTypeRow', goodsTypeId: string, goodsTypeName: string, totalValueLost: number, totalValueRecovered: number, netValueLost: number, incidentCount: number, recoveryRate: number, topItems: Array<{ __typename?: 'LPStockLossGoodsTypeTopItem', name?: string | null, incidentCount: number }>, monthlyTrend: Array<{ __typename?: 'LPStockLossGoodsTypeMonthItem', month: string, count: number }> }> | null, incidentAnalysis?: { __typename?: 'LPStockLossIncidentAnalysis', approvalBreakdown: { __typename?: 'LPStockLossApprovalBreakdown', approved: number, pending: number }, byBusiness: Array<{ __typename?: 'LPStockLossBusinessValueItem', id: string, name: string, incidentCount: number, totalValueLost: number }>, byHour: Array<{ __typename?: 'LPStockLossHourlyItem', hour: number, count: number }>, byDayOfWeek: Array<{ __typename?: 'LPStockLossDailyItem', dayOfWeek: number, count: number }> } | null, offenderAssociations?: Array<{ __typename?: 'LPStockLossOffenderRow', id: string, name?: string | null, incidentCount: number, itemsTargeted: Array<string>, businessesTargeted: Array<string>, totalValueAssociated: number, totalValueRecovered: number, netValueLost: number }> | null, recoveryAnalysis?: { __typename?: 'LPStockLossRecoveryAnalysis', overallRecoveryRate: number, byGoodsType: Array<{ __typename?: 'LPStockLossRecoveryRateRow', id: string, name: string, recoveryRate: number, totalValueLost: number, totalValueRecovered: number }>, byBusiness: Array<{ __typename?: 'LPStockLossRecoveryRateRow', id: string, name: string, recoveryRate: number, totalValueLost: number, totalValueRecovered: number }>, zeroRecoveryItems: Array<{ __typename?: 'LPStockLossZeroRecoveryItem', stockItemId: string, name?: string | null, sku?: string | null, totalValueLost: number }>, highestAbsoluteRecoveryItems: Array<{ __typename?: 'LPStockLossZeroRecoveryItem', stockItemId: string, name?: string | null, sku?: string | null, totalValueLost: number }> } | null, businessHotspots?: Array<{ __typename?: 'LPStockLossBusinessRow', id: string, name: string, incidentCount: number, totalValueLost: number, recoveryRate: number, topTargetedItems: Array<string> }> | null } };


export const LpStockLossReportDocument = gql`
    query LpStockLossReport($startDate: DateTime, $endDate: DateTime, $schemeId: String, $goodsTypeId: String, $stockItemId: String, $businessId: String, $topItemsOrderBy: LPStockLossTopItemsOrderBy, $offenderOrderBy: LPStockLossOffenderOrderBy, $goodsTypeOrderBy: LPStockLossGoodsTypeOrderBy, $businessHotspotsOrderBy: LPStockLossBusinessHotspotsOrderBy, $groupIds: [String!]) {
  lpStockLossReport(
    startDate: $startDate
    endDate: $endDate
    schemeId: $schemeId
    goodsTypeId: $goodsTypeId
    stockItemId: $stockItemId
    businessId: $businessId
    topItemsOrderBy: $topItemsOrderBy
    offenderOrderBy: $offenderOrderBy
    goodsTypeOrderBy: $goodsTypeOrderBy
    businessHotspotsOrderBy: $businessHotspotsOrderBy
    groupIds: $groupIds
  ) {
    summary {
      totalIncidents
      totalValueLost
      totalValueRecovered
      recoveryRate
      uniqueItemsStolen
      uniqueOffenders
      businessesAffected
      periodIncidentChange
      periodValueChange
    }
    topTargetedItems {
      stockItemId
      name
      brand
      goodsTypeName
      incidentCount
      totalValueLost
      totalValueRecovered
      netValueLost
      totalQuantityLost
      recoveryRate
      topBusinesses {
        id
        name
      }
    }
    goodsTypeBreakdown {
      goodsTypeId
      goodsTypeName
      totalValueLost
      totalValueRecovered
      netValueLost
      incidentCount
      recoveryRate
      topItems {
        name
        incidentCount
      }
      monthlyTrend {
        month
        count
      }
    }
    incidentAnalysis {
      approvalBreakdown {
        approved
        pending
      }
      byBusiness {
        id
        name
        incidentCount
        totalValueLost
      }
      byHour {
        hour
        count
      }
      byDayOfWeek {
        dayOfWeek
        count
      }
    }
    offenderAssociations {
      id
      name
      incidentCount
      itemsTargeted
      businessesTargeted
      totalValueAssociated
      totalValueRecovered
      netValueLost
    }
    recoveryAnalysis {
      overallRecoveryRate
      byGoodsType {
        id
        name
        recoveryRate
        totalValueLost
        totalValueRecovered
      }
      byBusiness {
        id
        name
        recoveryRate
        totalValueLost
        totalValueRecovered
      }
      zeroRecoveryItems {
        stockItemId
        name
        sku
        totalValueLost
      }
      highestAbsoluteRecoveryItems {
        stockItemId
        name
        sku
        totalValueLost
      }
    }
    businessHotspots {
      id
      name
      incidentCount
      totalValueLost
      recoveryRate
      topTargetedItems
    }
  }
}
    `;
export function useLpStockLossReportQuery(baseOptions?: Apollo.QueryHookOptions<LpStockLossReportQuery, LpStockLossReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LpStockLossReportQuery, LpStockLossReportQueryVariables>(LpStockLossReportDocument, options);
      }
export function useLpStockLossReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LpStockLossReportQuery, LpStockLossReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LpStockLossReportQuery, LpStockLossReportQueryVariables>(LpStockLossReportDocument, options);
        }
export type LpStockLossReportQueryHookResult = ReturnType<typeof useLpStockLossReportQuery>;
export type LpStockLossReportLazyQueryHookResult = ReturnType<typeof useLpStockLossReportLazyQuery>;
export type LpStockLossReportQueryResult = Apollo.QueryResult<LpStockLossReportQuery, LpStockLossReportQueryVariables>;