import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StoreColleagueDashboardQueryVariables = Types.Exact<{
  businessId: Types.Scalars['String'];
  schemeId?: Types.InputMaybe<Types.Scalars['String']>;
  watchlistRadiusMeters?: Types.InputMaybe<Types.Scalars['Float']>;
  sections?: Types.InputMaybe<Array<Types.StoreColleagueDashboardSection> | Types.StoreColleagueDashboardSection>;
}>;


export type StoreColleagueDashboardQuery = { __typename?: 'Query', storeColleagueDashboard: { __typename?: 'StoreColleagueDashboardData', summary: { __typename?: 'StoreColleagueSummary', todayCount: number, thisWeekCount: number, thisMonthCount: number, activeBansCount: number, pendingApprovalCount: number, weeklyChange?: number | null, watchlistGeoBounded: boolean, watchlistRadiusMeters?: number | null }, offenderWatchlist?: Array<{ __typename?: 'StoreColleagueWatchlistOffender', id: string, reference?: number | null, name?: string | null, incidentCount: number, totalValue: number, lastIncidentDate?: Date | null, images: { [key: string]: any }, isCurrentlyBanned: boolean }> | null, watchlistInsights?: { __typename?: 'StoreColleagueWatchlistInsights', totalRepeatOffenders: number, averageDaysBetweenIncidents: number, recidivismDistribution: { [key: string]: any }, topByFrequency: Array<{ __typename?: 'StoreColleagueWatchlistOffender', id: string, reference?: number | null, name?: string | null, incidentCount: number, totalValue: number, lastIncidentDate?: Date | null, images: { [key: string]: any }, isCurrentlyBanned: boolean }> } | null, activeBans?: { __typename?: 'StoreColleagueActiveBans', expiringWithin30Days: Array<{ __typename?: 'StoreColleagueBanItem', id: string, offenderId: string, offenderName?: string | null, offenderImages: { [key: string]: any }, endDate: Date, daysRemaining: number, location?: string | null }>, longerTerm: Array<{ __typename?: 'StoreColleagueBanItem', id: string, offenderId: string, offenderName?: string | null, offenderImages: { [key: string]: any }, endDate: Date, daysRemaining: number, location?: string | null }> } | null, recentIncidents?: Array<{ __typename?: 'StoreColleagueRecentIncident', id: string, reference?: number | null, date: Date, value?: number | null, approved?: boolean | null, offenderCount: number, crimeTypes: Array<string> }> | null, crimePatterns?: { __typename?: 'StoreColleagueCrimePatterns', peakDay?: number | null, peakHours: Array<{ __typename?: 'StoreColleaguePeakHour', hour: number, count: number }>, topStolenGoods: Array<{ __typename?: 'StoreColleagueTopGood', name: string, count: number }> } | null, localAreaContext?: { __typename?: 'StoreColleagueLocalAreaContext', schemeIncidentsThisWeek: number, schemeActiveOffenders: number, topSchemeOffenders: Array<{ __typename?: 'StoreColleagueSchemeOffender', name?: string | null, incidentCount: number }> } | null, actionItems?: { __typename?: 'StoreColleagueActionItems', incidentsPendingApproval: Array<{ __typename?: 'StoreColleaguePendingIncident', id: string, reference?: number | null, date: Date }>, bansExpiringSoon: Array<{ __typename?: 'StoreColleagueExpiringBan', id: string, offenderName?: string | null, endDate: Date }> } | null } };


export const StoreColleagueDashboardDocument = gql`
    query StoreColleagueDashboard($businessId: String!, $schemeId: String, $watchlistRadiusMeters: Float, $sections: [StoreColleagueDashboardSection!]) {
  storeColleagueDashboard(
    businessId: $businessId
    schemeId: $schemeId
    watchlistRadiusMeters: $watchlistRadiusMeters
    sections: $sections
  ) {
    summary {
      todayCount
      thisWeekCount
      thisMonthCount
      activeBansCount
      pendingApprovalCount
      weeklyChange
      watchlistGeoBounded
      watchlistRadiusMeters
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
      }
    }
    localAreaContext {
      schemeIncidentsThisWeek
      schemeActiveOffenders
      topSchemeOffenders {
        name
        incidentCount
      }
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
export function useStoreColleagueDashboardQuery(baseOptions: Apollo.QueryHookOptions<StoreColleagueDashboardQuery, StoreColleagueDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StoreColleagueDashboardQuery, StoreColleagueDashboardQueryVariables>(StoreColleagueDashboardDocument, options);
      }
export function useStoreColleagueDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StoreColleagueDashboardQuery, StoreColleagueDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StoreColleagueDashboardQuery, StoreColleagueDashboardQueryVariables>(StoreColleagueDashboardDocument, options);
        }
export type StoreColleagueDashboardQueryHookResult = ReturnType<typeof useStoreColleagueDashboardQuery>;
export type StoreColleagueDashboardLazyQueryHookResult = ReturnType<typeof useStoreColleagueDashboardLazyQuery>;
export type StoreColleagueDashboardQueryResult = Apollo.QueryResult<StoreColleagueDashboardQuery, StoreColleagueDashboardQueryVariables>;