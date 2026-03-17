import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RetailAdminDashboardQueryVariables = Types.Exact<{
  schemeId?: Types.InputMaybe<Types.Scalars['String']>;
  startDate?: Types.InputMaybe<Types.Scalars['DateTime']>;
  endDate?: Types.InputMaybe<Types.Scalars['DateTime']>;
  groupIds?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  sections?: Types.InputMaybe<Array<Types.RetailAdminDashboardSection> | Types.RetailAdminDashboardSection>;
}>;


export type RetailAdminDashboardQuery = { __typename?: 'Query', retailAdminDashboard: { __typename?: 'RetailAdminDashboardData', summary: { __typename?: 'RetailDashboardSummary', totalIncidents: number, totalValueLost: number, activeOffenders: number, repeatOffenders: number, pendingApproval: number, openInvestigations: number, periodIncidentChange?: number | null, periodValueChange?: number | null }, topOffenders?: Array<{ __typename?: 'RetailDashboardTopOffender', id: string, reference?: number | null, name?: string | null, incidentCount: number, totalValue: number, lastIncidentDate?: Date | null, images: { [key: string]: any } }> | null, repeatOffenderInsights?: { __typename?: 'RetailDashboardRepeatOffenderInsights', totalRepeatOffenders: number, averageDaysBetweenIncidents: number, recidivismDistribution: { [key: string]: any }, topByFrequency: Array<{ __typename?: 'RetailDashboardTopOffender', id: string, reference?: number | null, name?: string | null, incidentCount: number, totalValue: number, lastIncidentDate?: Date | null, images: { [key: string]: any } }> } | null, crimeTypeDistribution?: Array<{ __typename?: 'RetailDashboardCrimeTypeItem', tagId: string, tagName: string, crimeType?: string | null, count: number }> | null, businessIntelligence?: { __typename?: 'RetailDashboardBusinessIntelligence', goingDarkCount: number, goingDarkNames: Array<string>, topByValue: Array<{ __typename?: 'RetailDashboardBusinessItem', id: string, name: string, totalValue: number, incidentCount: number }>, topByCount: Array<{ __typename?: 'RetailDashboardBusinessItem', id: string, name: string, totalValue: number, incidentCount: number }> } | null, crimePatterns?: { __typename?: 'RetailDashboardCrimePatterns', byHour: Array<{ __typename?: 'RetailDashboardHourlyItem', hour: number, count: number }>, byDayOfWeek: Array<{ __typename?: 'RetailDashboardDailyItem', dayOfWeek: number, count: number }>, monthlyTrend: Array<{ __typename?: 'RetailDashboardMonthlyItem', month: string, count: number, totalValue: number }> } | null, targetedGoods?: Array<{ __typename?: 'RetailDashboardTargetedGoodsItem', name: string, count: number, totalValue: number }> | null, operationalQueue?: { __typename?: 'RetailDashboardOperationalQueue', pendingApproval: number, expiringBansCount: number, openInvestigations: number, expiringBans: Array<{ __typename?: 'RetailDashboardExpiringBanItem', id: string, offenderName?: string | null, endDate: Date }> } | null } };


export const RetailAdminDashboardDocument = gql`
    query RetailAdminDashboard($schemeId: String, $startDate: DateTime, $endDate: DateTime, $groupIds: [String!], $sections: [RetailAdminDashboardSection!]) {
  retailAdminDashboard(
    schemeId: $schemeId
    startDate: $startDate
    endDate: $endDate
    groupIds: $groupIds
    sections: $sections
  ) {
    summary {
      totalIncidents
      totalValueLost
      activeOffenders
      repeatOffenders
      pendingApproval
      openInvestigations
      periodIncidentChange
      periodValueChange
    }
    topOffenders {
      id
      reference
      name
      incidentCount
      totalValue
      lastIncidentDate
      images
    }
    repeatOffenderInsights {
      totalRepeatOffenders
      averageDaysBetweenIncidents
      recidivismDistribution
      topByFrequency {
        id
        reference
        name
        incidentCount
        totalValue
        lastIncidentDate
        images
      }
    }
    crimeTypeDistribution {
      tagId
      tagName
      crimeType
      count
    }
    businessIntelligence {
      topByValue {
        id
        name
        totalValue
        incidentCount
      }
      topByCount {
        id
        name
        totalValue
        incidentCount
      }
      goingDarkCount
      goingDarkNames
    }
    crimePatterns {
      byHour {
        hour
        count
      }
      byDayOfWeek {
        dayOfWeek
        count
      }
      monthlyTrend {
        month
        count
        totalValue
      }
    }
    targetedGoods {
      name
      count
      totalValue
    }
    operationalQueue {
      pendingApproval
      expiringBansCount
      expiringBans {
        id
        offenderName
        endDate
      }
      openInvestigations
    }
  }
}
    `;
export function useRetailAdminDashboardQuery(baseOptions?: Apollo.QueryHookOptions<RetailAdminDashboardQuery, RetailAdminDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RetailAdminDashboardQuery, RetailAdminDashboardQueryVariables>(RetailAdminDashboardDocument, options);
      }
export function useRetailAdminDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RetailAdminDashboardQuery, RetailAdminDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RetailAdminDashboardQuery, RetailAdminDashboardQueryVariables>(RetailAdminDashboardDocument, options);
        }
export type RetailAdminDashboardQueryHookResult = ReturnType<typeof useRetailAdminDashboardQuery>;
export type RetailAdminDashboardLazyQueryHookResult = ReturnType<typeof useRetailAdminDashboardLazyQuery>;
export type RetailAdminDashboardQueryResult = Apollo.QueryResult<RetailAdminDashboardQuery, RetailAdminDashboardQueryVariables>;