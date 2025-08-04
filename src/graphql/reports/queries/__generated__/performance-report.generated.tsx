import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PerformanceReportQueryVariables = Types.Exact<{
  where: Types.UserContributionWhereInput;
}>;


export type PerformanceReportQuery = { __typename?: 'Query', performanceReport: { __typename?: 'PerformanceReport', createdDataCounts?: { __typename?: 'CreatedDataCounts', crimeGroups: number, incidents: number, messages: number, offenders: number, updates: number, vehicles: number, bulletins: number } | null, incidentSummary?: { __typename?: 'IncidentSummary', totalIncidents: number, lastIncidentDate?: Date | null, incidentsReportedToPolice: number, incidentsWherePoliceAttended: number, mostCommonCrimeType: string } | null, outcomeSummary?: { __typename?: 'OutcomeSummary', totalArrests: number, totalCBOYears: number, totalCBOCount: number, totalFinesCount: number, totalFinesValue: number, totalPrisonSentenceCount: number, totalPrisonSentenceMonths: number, totalRehabOrders: number } | null, crimeTypeDonut?: Array<{ __typename?: 'Graph', label: string, value: number }> | null, involvedTagCountDonut?: Array<{ __typename?: 'Graph', label: string, value: number }> | null, incidentDayOfWeekLine?: Array<{ __typename?: 'Graph', label: string, value: number }> | null, lossTotals?: { __typename?: 'LossTotals', totalIncidents: number, totalLostValue: number, totalRecoveredValue: number, averagePerIncident: number, averageSuccessRate: number, averageLossPerIncident: number } | null, goodsTypeCountDonut?: Array<{ __typename?: 'Graph', label: string, value: number }> | null, goodsTypeValueDonut?: Array<{ __typename?: 'Graph', label: string, value: number }> | null, policeSummary?: { __typename?: 'PoliceSummary', totalAttendedIncidents: number, totalReportedIncidents: number, totalPoliceImages: number, totalVerifiedOffenders: number } | null, investigationSummary?: { __typename?: 'InvestigationSummary', closed: number, open: number, opened: number } | null, timeHeatMap?: Array<{ __typename?: 'TimeHeatMap', id: string, data: Array<{ __typename?: 'HourCountXY', x: string, y: number }> }> | null, priorityGraph?: Array<{ __typename?: 'Graph', value: number, label: string }> | null }, offendersPerformance: { __typename?: 'ListOffenderPerformance', total: number, offenderPerformance: Array<{ __typename?: 'OffenderPerformance', primaryPhoto?: string | null, alertId: string, name: string, totalIncidents: number, totalLostValue: number, totalRecoveredValue: number, totalSuccessRate: number, lastIncidentDate?: Date | null, id: string, totalBulletins: number }> }, businessContribution: { __typename?: 'ListBusinessContribution', total: number, businessContributions: Array<{ __typename?: 'BusinessContributions', name: string, totalUsers: number, totalIncidents: number, totalOffenders: number, totalUpdates: number, totalMessages: number, totalLogins: number, totalSuccessRate: number, totalRecoveredValue: number, totalLostValue: number, mostCommonGoodLost?: string | null, highestTotalValueGoodLost?: number | null, averageLossValue?: number | null }> }, crimeGroupPerformance: { __typename?: 'ListCrimeGroupPerformance', total: number, crimeGroupPerformance: Array<{ __typename?: 'CrimeGroupPerformance', totalSuccessRate: number, totalRecoveredValue: number, totalOffenders: number, totalLostValue: number, totalIncidents: number, lastIncident?: Date | null, alias: string, alertId: string }> }, userContributions: { __typename?: 'ListUserContribution', total: number, userContributions: Array<{ __typename?: 'UserContribution', name: string, totalIncidents: number, totalOffenders: number, totalUpdates: number, totalMessages: number, totalLogins: number }> }, targetedGoods: { __typename?: 'ListTargetedGoods', total: number, targetedGoods: Array<{ __typename?: 'TargetedGood', alertId: string, name: string, totalIncidents: number, totalOffenders: number, totalLostValue: number, totalRecoveredValue: number, totalSuccessRate: number, averageLossValue: number }> }, incidentHeatPerformance: { __typename?: 'ListIncidentsHeatPerformance', total: number, incidents: Array<{ __typename?: 'HeatMapLocations', id: string, location?: { __typename?: 'LatLngId', id: string, geoLat?: number | null, geoLng?: number | null } | null }> }, investigationPerformance: { __typename?: 'ListInvestigationPerformance', total: number, investigationPerformance: Array<{ __typename?: 'InvestigationPerformance', id: string, alertId: string, name: string, status: Types.InvestigationStatus, totalIncidents: number, totalOffenders: number, totalValue: number, createdAt: Date, closedAt?: Date | null }> } };


export const PerformanceReportDocument = gql`
    query PerformanceReport($where: UserContributionWhereInput!) {
  performanceReport(where: $where) {
    createdDataCounts {
      crimeGroups
      incidents
      messages
      offenders
      updates
      vehicles
      bulletins
    }
    incidentSummary {
      totalIncidents
      lastIncidentDate
      incidentsReportedToPolice
      incidentsWherePoliceAttended
      mostCommonCrimeType
    }
    outcomeSummary {
      totalArrests
      totalCBOYears
      totalCBOCount
      totalFinesCount
      totalFinesValue
      totalPrisonSentenceCount
      totalPrisonSentenceMonths
      totalRehabOrders
    }
    crimeTypeDonut {
      label
      value
    }
    involvedTagCountDonut {
      label
      value
    }
    incidentDayOfWeekLine {
      label
      value
    }
    lossTotals {
      totalIncidents
      totalLostValue
      totalRecoveredValue
      averagePerIncident
      averageSuccessRate
      averageLossPerIncident
    }
    goodsTypeCountDonut {
      label
      value
    }
    goodsTypeValueDonut {
      label
      value
    }
    policeSummary {
      totalAttendedIncidents
      totalReportedIncidents
      totalPoliceImages
      totalVerifiedOffenders
    }
    investigationSummary {
      closed
      open
      opened
    }
    timeHeatMap {
      id
      data {
        x
        y
      }
    }
    priorityGraph {
      value
      label
    }
  }
  offendersPerformance(where: $where) {
    total
    offenderPerformance {
      primaryPhoto
      alertId
      name
      totalIncidents
      totalLostValue
      totalRecoveredValue
      totalSuccessRate
      lastIncidentDate
      id
      totalBulletins
    }
  }
  businessContribution(where: $where) {
    businessContributions {
      name
      totalUsers
      totalIncidents
      totalOffenders
      totalUpdates
      totalMessages
      totalLogins
      totalSuccessRate
      totalRecoveredValue
      totalLostValue
      mostCommonGoodLost
      highestTotalValueGoodLost
      averageLossValue
    }
    total
  }
  crimeGroupPerformance(where: $where) {
    crimeGroupPerformance {
      totalSuccessRate
      totalRecoveredValue
      totalOffenders
      totalLostValue
      totalIncidents
      lastIncident
      alias
      alertId
    }
    total
  }
  userContributions(where: $where) {
    total
    userContributions {
      name
      totalIncidents
      totalOffenders
      totalUpdates
      totalMessages
      totalLogins
    }
  }
  targetedGoods(where: $where) {
    targetedGoods {
      alertId
      name
      totalIncidents
      totalOffenders
      totalLostValue
      totalRecoveredValue
      totalSuccessRate
      averageLossValue
    }
    total
  }
  incidentHeatPerformance(where: $where) {
    total
    incidents {
      id
      location {
        id
        geoLat
        geoLng
      }
    }
  }
  investigationPerformance(where: $where) {
    total
    investigationPerformance {
      id
      alertId
      name
      status
      totalIncidents
      totalOffenders
      totalValue
      createdAt
      closedAt
    }
  }
}
    `;
export function usePerformanceReportQuery(baseOptions: Apollo.QueryHookOptions<PerformanceReportQuery, PerformanceReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PerformanceReportQuery, PerformanceReportQueryVariables>(PerformanceReportDocument, options);
      }
export function usePerformanceReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PerformanceReportQuery, PerformanceReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PerformanceReportQuery, PerformanceReportQueryVariables>(PerformanceReportDocument, options);
        }
export type PerformanceReportQueryHookResult = ReturnType<typeof usePerformanceReportQuery>;
export type PerformanceReportLazyQueryHookResult = ReturnType<typeof usePerformanceReportLazyQuery>;
export type PerformanceReportQueryResult = Apollo.QueryResult<PerformanceReportQuery, PerformanceReportQueryVariables>;