import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PerformanceCoreSummariesQueryVariables = Types.Exact<{
  where: Types.UserContributionWhereInput;
}>;


export type PerformanceCoreSummariesQuery = { __typename?: 'Query', performanceReport: { __typename?: 'PerformanceReport', createdDataCounts: { __typename?: 'CreatedDataCounts', crimeGroups: number, incidents: number, messages: number, offenders: number, updates: number, vehicles: number, bulletins: number }, incidentSummary: { __typename?: 'IncidentSummary', totalIncidents: number, lastIncidentDate?: Date | null, incidentsReportedToPolice: number, incidentsWherePoliceAttended: number, mostCommonCrimeType: string }, outcomeSummary: { __typename?: 'OutcomeSummary', totalArrests: number, totalCBOYears: number, totalCBOCount: number, totalFinesCount: number, totalFinesValue: number, totalPrisonSentenceCount: number, totalPrisonSentenceMonths: number, totalRehabOrders: number }, crimeTypeDonut: Array<{ __typename?: 'Graph', label: string, value: number }>, involvedTagCountDonut: Array<{ __typename?: 'Graph', label: string, value: number }>, incidentDayOfWeekLine: Array<{ __typename?: 'Graph', label: string, value: number }>, lossTotals: { __typename?: 'LossTotals', totalIncidents: number, totalLostValue: number, totalRecoveredValue: number, averagePerIncident: number, averageSuccessRate: number, averageLossPerIncident: number }, goodsTypeCountDonut: Array<{ __typename?: 'Graph', label: string, value: number }>, goodsTypeValueDonut: Array<{ __typename?: 'Graph', label: string, value: number }>, policeSummary: { __typename?: 'PoliceSummary', totalAttendedIncidents: number, totalReportedIncidents: number, totalPoliceImages: number, totalVerifiedOffenders: number }, investigationSummary: { __typename?: 'InvestigationSummary', closed: number, open: number, opened: number }, timeHeatMap: Array<{ __typename?: 'TimeHeatMap', id: string, data: Array<{ __typename?: 'HourCountXY', x: string, y: number }> }>, priorityGraph: Array<{ __typename?: 'Graph', value: number, label: string }> } };


export const PerformanceCoreSummariesDocument = gql`
    query PerformanceCoreSummaries($where: UserContributionWhereInput!) {
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
}
    `;
export function usePerformanceCoreSummariesQuery(baseOptions: Apollo.QueryHookOptions<PerformanceCoreSummariesQuery, PerformanceCoreSummariesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PerformanceCoreSummariesQuery, PerformanceCoreSummariesQueryVariables>(PerformanceCoreSummariesDocument, options);
      }
export function usePerformanceCoreSummariesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PerformanceCoreSummariesQuery, PerformanceCoreSummariesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PerformanceCoreSummariesQuery, PerformanceCoreSummariesQueryVariables>(PerformanceCoreSummariesDocument, options);
        }
export type PerformanceCoreSummariesQueryHookResult = ReturnType<typeof usePerformanceCoreSummariesQuery>;
export type PerformanceCoreSummariesLazyQueryHookResult = ReturnType<typeof usePerformanceCoreSummariesLazyQuery>;
export type PerformanceCoreSummariesQueryResult = Apollo.QueryResult<PerformanceCoreSummariesQuery, PerformanceCoreSummariesQueryVariables>;