import type * as Types from '../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BusinessLossPreventionDashboardQueryVariables = Types.Exact<{
  businessId: Types.Scalars['String'];
  schemeId?: Types.InputMaybe<Types.Scalars['String']>;
  watchlistOrderBy?: Types.InputMaybe<Types.BusinessLpWatchlistOrderBy>;
  sections?: Types.InputMaybe<Array<Types.BusinessLossPreventionSection> | Types.BusinessLossPreventionSection>;
}>;


export type BusinessLossPreventionDashboardQuery = { __typename?: 'Query', businessLossPreventionDashboard: { __typename?: 'BusinessLossPreventionData', summary: { __typename?: 'BusinessLPSummary', todayCount: number, thisWeekCount: number, thisMonthCount: number, totalValueLost: number, totalRecoveredValue: number, recoveryRate: number, activeBansCount: number, pendingApprovalCount: number, weeklyChange?: number | null, lastIncidentDate?: Date | null }, riskProfile?: { __typename?: 'BusinessLPRiskProfile', aiRiskScore?: number | null, aiRiskLevel?: string | null, aiEngagementScore?: number | null, aiDataQualityScore?: number | null, aiKeyInsights: Array<string>, aiUrgentActions: Array<string> } | null, offenderWatchlist?: Array<{ __typename?: 'BusinessLPWatchlistOffender', id: string, reference?: number | null, name?: string | null, incidentCount: number, totalValue: number, lastIncidentDate?: Date | null, images: { [key: string]: any }, isCurrentlyBanned: boolean }> | null, watchlistInsights?: { __typename?: 'BusinessLPWatchlistInsights', totalRepeatOffenders: number, averageDaysBetweenIncidents: number, recidivismDistribution: { [key: string]: any }, topByFrequency: Array<{ __typename?: 'BusinessLPWatchlistOffender', id: string, reference?: number | null, name?: string | null, incidentCount: number, totalValue: number, lastIncidentDate?: Date | null, images: { [key: string]: any }, isCurrentlyBanned: boolean }> } | null, activeBans?: { __typename?: 'BusinessLPActiveBans', expiringWithin30Days: Array<{ __typename?: 'BusinessLPBanItem', id: string, offenderId: string, offenderName?: string | null, offenderImages: { [key: string]: any }, endDate: Date, daysRemaining: number, location?: string | null }>, longerTerm: Array<{ __typename?: 'BusinessLPBanItem', id: string, offenderId: string, offenderName?: string | null, offenderImages: { [key: string]: any }, endDate: Date, daysRemaining: number, location?: string | null }> } | null, recentIncidents?: Array<{ __typename?: 'BusinessLPRecentIncident', id: string, reference?: number | null, date: Date, value?: number | null, approved?: boolean | null, offenderCount: number, crimeTypes: Array<string> }> | null, crimePatterns?: { __typename?: 'BusinessLPCrimePatterns', peakDay?: number | null, peakHours: Array<{ __typename?: 'BusinessLPPeakHour', hour: number, count: number }>, topStolenGoods: Array<{ __typename?: 'BusinessLPTopGood', name: string, count: number, totalValue: number }> } | null, linkedInvestigations?: Array<{ __typename?: 'BusinessLPLinkedInvestigation', id: string, reference?: number | null, name: string, status: string, incidentCount: number }> | null, schemeComparison?: { __typename?: 'BusinessLPSchemeComparison', schemeBusinessCount: number, incidentCountRank: number, valueRank: number, incidentCountPercentile: number, valuePercentile: number, schemeAvgIncidentCount: number, schemeAvgValueLost: number } | null, actionItems?: { __typename?: 'BusinessLPActionItems', incidentsPendingApproval: Array<{ __typename?: 'BusinessLPPendingIncident', id: string, reference?: number | null, date: Date }>, bansExpiringSoon: Array<{ __typename?: 'BusinessLPExpiringBan', id: string, offenderName?: string | null, endDate: Date }> } | null } };


export const BusinessLossPreventionDashboardDocument = gql`
    query BusinessLossPreventionDashboard($businessId: String!, $schemeId: String, $watchlistOrderBy: BusinessLPWatchlistOrderBy, $sections: [BusinessLossPreventionSection!]) {
  businessLossPreventionDashboard(
    businessId: $businessId
    schemeId: $schemeId
    watchlistOrderBy: $watchlistOrderBy
    sections: $sections
  ) {
    summary {
      todayCount
      thisWeekCount
      thisMonthCount
      totalValueLost
      totalRecoveredValue
      recoveryRate
      activeBansCount
      pendingApprovalCount
      weeklyChange
      lastIncidentDate
    }
    riskProfile {
      aiRiskScore
      aiRiskLevel
      aiEngagementScore
      aiDataQualityScore
      aiKeyInsights
      aiUrgentActions
    }
    offenderWatchlist {
      id
      reference
      name
      incidentCount
      totalValue
      lastIncidentDate
      images
      isCurrentlyBanned
    }
    watchlistInsights {
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
        isCurrentlyBanned
      }
    }
    activeBans {
      expiringWithin30Days {
        id
        offenderId
        offenderName
        offenderImages
        endDate
        daysRemaining
        location
      }
      longerTerm {
        id
        offenderId
        offenderName
        offenderImages
        endDate
        daysRemaining
        location
      }
    }
    recentIncidents {
      id
      reference
      date
      value
      approved
      offenderCount
      crimeTypes
    }
    crimePatterns {
      peakHours {
        hour
        count
      }
      peakDay
      topStolenGoods {
        name
        count
        totalValue
      }
    }
    linkedInvestigations {
      id
      reference
      name
      status
      incidentCount
    }
    schemeComparison {
      schemeBusinessCount
      incidentCountRank
      valueRank
      incidentCountPercentile
      valuePercentile
      schemeAvgIncidentCount
      schemeAvgValueLost
    }
    actionItems {
      incidentsPendingApproval {
        id
        reference
        date
      }
      bansExpiringSoon {
        id
        offenderName
        endDate
      }
    }
  }
}
    `;
export function useBusinessLossPreventionDashboardQuery(baseOptions: Apollo.QueryHookOptions<BusinessLossPreventionDashboardQuery, BusinessLossPreventionDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessLossPreventionDashboardQuery, BusinessLossPreventionDashboardQueryVariables>(BusinessLossPreventionDashboardDocument, options);
      }
export function useBusinessLossPreventionDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessLossPreventionDashboardQuery, BusinessLossPreventionDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessLossPreventionDashboardQuery, BusinessLossPreventionDashboardQueryVariables>(BusinessLossPreventionDashboardDocument, options);
        }
export type BusinessLossPreventionDashboardQueryHookResult = ReturnType<typeof useBusinessLossPreventionDashboardQuery>;
export type BusinessLossPreventionDashboardLazyQueryHookResult = ReturnType<typeof useBusinessLossPreventionDashboardLazyQuery>;
export type BusinessLossPreventionDashboardQueryResult = Apollo.QueryResult<BusinessLossPreventionDashboardQuery, BusinessLossPreventionDashboardQueryVariables>;