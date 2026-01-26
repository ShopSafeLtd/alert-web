import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PoliceHubDashboardQueryVariables = Types.Exact<{
  policeHubId: Types.Scalars['String'];
  startDate?: Types.InputMaybe<Types.Scalars['DateTime']>;
  endDate?: Types.InputMaybe<Types.Scalars['DateTime']>;
  policeForce?: Types.InputMaybe<Types.Scalars['String']>;
  minPriorityScore?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type PoliceHubDashboardQuery = { __typename?: 'Query', policeHubDashboard: { __typename?: 'PoliceHubDashboard', summary: { __typename?: 'PoliceHubSummaryMetrics', activeOffendersCount: number, highRiskIndividualsCount: number, activeCrimeGroupsCount: number, totalIncidentsSharedCount: number, averagePriorityScore?: number | null, totalEstimatedValue?: number | null, uniqueRetailersAffected: number, totalOffenders: number, averageOffenderValue?: number | null, totalRepeatOffenders: number, offendersSharedWithOtherPoliceHubs: number }, topOffenders: Array<{ __typename?: 'PoliceHubTopOffender', sharedOffenderId: string, name?: string | null, policePriorityScore?: number | null, aiImpactScore?: number | null, aiSummary?: string | null, threatLevel?: string | null, riskCategory?: string | null, incidentCount: number, daysSinceLastIncident?: number | null, firstIncidentDate?: Date | null, lastIncidentDate?: Date | null, lastIncidentAt?: Date | null, totalValue?: number | null, hasImages: boolean, hasName: boolean, images: { [key: string]: any }, tags: { [key: string]: any }, activeAreas: Array<string>, affectedSchemes: Array<string> }>, repeatOffenderInsights: { __typename?: 'PoliceHubRepeatOffenderInsights', totalRepeatOffenders: number, averageDaysBetweenIncidents: number, highFrequencyOffenders: number, recidivismDistribution: { [key: string]: any }, topByFrequency: Array<{ __typename?: 'PoliceHubTopOffender', sharedOffenderId: string, policePriorityScore?: number | null, aiSummary?: string | null, incidentCount: number, daysSinceLastIncident?: number | null, affectedSchemes: Array<string> }> }, activeCrimeGroups: Array<{ __typename?: 'PoliceHubCrimeGroupSummary', sharedCrimeGroupId: string, crimeGroupId: string, policePriorityScore?: number | null, aiSummary?: string | null, aiSophisticationLevel?: string | null, memberCount: number, recentActivityCount: number, totalValue?: number | null, affectedSchemes: Array<string>, updatedAt: Date }>, vehiclesOfInterest: Array<{ __typename?: 'PoliceHubVehicleSummary', sharedVehicleId: string, vehicleIds: Array<string>, policePriorityScore?: number | null, aiSummary?: string | null, aiUsagePatterns?: string | null, registration?: string | null, make?: string | null, model?: string | null, color?: string | null, incidentCount: number, associatedOffenderCount: number, lastSeenDate?: Date | null, affectedSchemes: Array<string> }>, incidentTypeDistribution: Array<{ __typename?: 'PoliceHubIncidentTypeDistribution', tagId: string, tagName: string, crimeType?: string | null, count: number }>, monthlyIncidentCounts: Array<{ __typename?: 'PoliceHubMonthlyIncidentCount', month: string, count: number }> } };


export const PoliceHubDashboardDocument = gql`
    query PoliceHubDashboard($policeHubId: String!, $startDate: DateTime, $endDate: DateTime, $policeForce: String, $minPriorityScore: Int) {
  policeHubDashboard(
    policeHubId: $policeHubId
    startDate: $startDate
    endDate: $endDate
    policeForce: $policeForce
    minPriorityScore: $minPriorityScore
  ) {
    summary {
      activeOffendersCount
      highRiskIndividualsCount
      activeCrimeGroupsCount
      totalIncidentsSharedCount
      averagePriorityScore
      totalEstimatedValue
      uniqueRetailersAffected
      totalOffenders
      averageOffenderValue
      totalRepeatOffenders
      offendersSharedWithOtherPoliceHubs
    }
    topOffenders {
      sharedOffenderId
      name
      policePriorityScore
      aiImpactScore
      aiSummary
      threatLevel
      riskCategory
      incidentCount
      daysSinceLastIncident
      firstIncidentDate
      lastIncidentDate
      lastIncidentAt
      totalValue
      hasImages
      hasName
      images
      tags
      activeAreas
      affectedSchemes
    }
    repeatOffenderInsights {
      totalRepeatOffenders
      averageDaysBetweenIncidents
      highFrequencyOffenders
      recidivismDistribution
      topByFrequency {
        sharedOffenderId
        policePriorityScore
        aiSummary
        incidentCount
        daysSinceLastIncident
        affectedSchemes
      }
    }
    activeCrimeGroups {
      sharedCrimeGroupId
      crimeGroupId
      policePriorityScore
      aiSummary
      aiSophisticationLevel
      memberCount
      recentActivityCount
      totalValue
      affectedSchemes
      updatedAt
    }
    vehiclesOfInterest {
      sharedVehicleId
      vehicleIds
      policePriorityScore
      aiSummary
      aiUsagePatterns
      registration
      make
      model
      color
      incidentCount
      associatedOffenderCount
      lastSeenDate
      affectedSchemes
    }
    incidentTypeDistribution {
      tagId
      tagName
      crimeType
      count
    }
    monthlyIncidentCounts {
      month
      count
    }
  }
}
    `;
export function usePoliceHubDashboardQuery(baseOptions: Apollo.QueryHookOptions<PoliceHubDashboardQuery, PoliceHubDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PoliceHubDashboardQuery, PoliceHubDashboardQueryVariables>(PoliceHubDashboardDocument, options);
      }
export function usePoliceHubDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PoliceHubDashboardQuery, PoliceHubDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PoliceHubDashboardQuery, PoliceHubDashboardQueryVariables>(PoliceHubDashboardDocument, options);
        }
export type PoliceHubDashboardQueryHookResult = ReturnType<typeof usePoliceHubDashboardQuery>;
export type PoliceHubDashboardLazyQueryHookResult = ReturnType<typeof usePoliceHubDashboardLazyQuery>;
export type PoliceHubDashboardQueryResult = Apollo.QueryResult<PoliceHubDashboardQuery, PoliceHubDashboardQueryVariables>;