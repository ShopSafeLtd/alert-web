import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TargetedBusinessReportQueryVariables = Types.Exact<{
  where: Types.BusinessReportInput;
  businessWhere: Types.BusinessWhereUniqueInput;
}>;


export type TargetedBusinessReportQuery = { __typename?: 'Query', businessReport: { __typename?: 'BusinessReport', crimeTypeDonut?: Array<{ __typename?: 'Graph', label: string, value: number }> | null, goodsTypeLossRecovered?: Array<{ __typename?: 'RadialGraph', label: string, data: Array<{ __typename?: 'Graph', value: number, label: string }> }> | null, incidentDayOfWeekGraph?: Array<{ __typename?: 'Graph', value: number, label: string }> | null, incidentMonthGraph?: Array<{ __typename?: 'Graph', value: number, label: string }> | null, targetedGoods?: { __typename?: 'ListTargetedGoods', total: number, targetedGoods: Array<{ __typename?: 'TargetedGood', totalSuccessRate: number, totalRecoveredValue: number, totalOffenders: number, totalLostValue: number, totalIncidents: number, name: string, averageLossValue: number, alertId: string }> } | null, incidentSummary?: { __typename?: 'IncidentSummary', totalIncidents: number, mostCommonCrimeType: string, lastIncidentDate?: Date | null, incidentsWherePoliceAttended: number, incidentsReportedToPolice: number } | null, incidentTimeOfDayDonut?: Array<{ __typename?: 'Graph', value: number, label: string }> | null, incidentsTable?: { __typename?: 'ListIncidents', total: number, incidents: Array<{ __typename?: 'Incident', id?: string | null, reference?: number | null, date?: Date | null, totalOffenders: number, policeReported?: boolean | null, policeInvolved?: boolean | null, policeRef?: string | null, incidentItems: Array<{ __typename?: 'IncidentItem', value?: number | null, recoveredValue?: number | null }>, location?: { __typename?: 'Address', full?: string | null, alias?: string | null, id: string } | null, crimeTypes?: Array<{ __typename?: 'Tag', name?: string | null, id?: string | null }> | null }> } | null, involvedTagDonut?: Array<{ __typename?: 'Graph', value: number, label: string }> | null, lossTotals?: { __typename?: 'LossTotals', totalRecoveredValue: number, totalLostValue: number, totalIncidents: number, averageSuccessRate: number, averagePerIncident: number } | null }, business: { __typename?: 'Business', id: string, name?: string | null } };


export const TargetedBusinessReportDocument = gql`
    query TargetedBusinessReport($where: BusinessReportInput!, $businessWhere: BusinessWhereUniqueInput!) {
  businessReport(where: $where) {
    crimeTypeDonut {
      label
      value
    }
    goodsTypeLossRecovered {
      data {
        value
        label
      }
      label
    }
    incidentDayOfWeekGraph {
      value
      label
    }
    incidentMonthGraph {
      value
      label
    }
    targetedGoods {
      total
      targetedGoods {
        totalSuccessRate
        totalRecoveredValue
        totalOffenders
        totalLostValue
        totalIncidents
        name
        averageLossValue
        alertId
      }
    }
    incidentSummary {
      totalIncidents
      mostCommonCrimeType
      lastIncidentDate
      incidentsWherePoliceAttended
      incidentsReportedToPolice
    }
    incidentTimeOfDayDonut {
      value
      label
    }
    incidentsTable {
      total
      incidents {
        id
        reference
        date
        incidentItems {
          value
          recoveredValue
        }
        location {
          full
          alias
          id
        }
        totalOffenders
        crimeTypes {
          name
          id
        }
        policeReported
        policeInvolved
        policeRef
      }
    }
    involvedTagDonut {
      value
      label
    }
    lossTotals {
      totalRecoveredValue
      totalLostValue
      totalIncidents
      averageSuccessRate
      averagePerIncident
    }
  }
  business(where: $businessWhere) {
    id
    name
  }
}
    `;
export function useTargetedBusinessReportQuery(baseOptions: Apollo.QueryHookOptions<TargetedBusinessReportQuery, TargetedBusinessReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TargetedBusinessReportQuery, TargetedBusinessReportQueryVariables>(TargetedBusinessReportDocument, options);
      }
export function useTargetedBusinessReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TargetedBusinessReportQuery, TargetedBusinessReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TargetedBusinessReportQuery, TargetedBusinessReportQueryVariables>(TargetedBusinessReportDocument, options);
        }
export type TargetedBusinessReportQueryHookResult = ReturnType<typeof useTargetedBusinessReportQuery>;
export type TargetedBusinessReportLazyQueryHookResult = ReturnType<typeof useTargetedBusinessReportLazyQuery>;
export type TargetedBusinessReportQueryResult = Apollo.QueryResult<TargetedBusinessReportQuery, TargetedBusinessReportQueryVariables>;