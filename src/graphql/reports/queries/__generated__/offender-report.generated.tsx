import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OffenderReportQueryVariables = Types.Exact<{
  where: Types.OffenderReportInput;
  targetedWhere: Types.UserContributionWhereInput;
}>;


export type OffenderReportQuery = { __typename?: 'Query', offenderReport: { __typename?: 'OffenderReport', crimeTypeBusinessRadial: Array<{ __typename?: 'RadialGraph', label: string, data: Array<{ __typename?: 'Graph', value: number, label: string }> }>, crimeTypeDonut: Array<{ __typename?: 'Graph', label: string, value: number }>, goodsTypeLossRecovered: Array<{ __typename?: 'RadialGraph', label: string, data: Array<{ __typename?: 'Graph', label: string, value: number }> }>, incidentDayOfWeekGraph: Array<{ __typename?: 'Graph', value: number, label: string }>, incidentMonthGraph: Array<{ __typename?: 'Graph', value: number, label: string }>, incidentSummary: { __typename?: 'IncidentSummary', totalIncidents: number, mostCommonCrimeType: string, lastIncidentDate?: Date | null, incidentsWherePoliceAttended: number, incidentsReportedToPolice: number }, incidentTimeOfDayDonut: Array<{ __typename?: 'Graph', value: number, label: string }>, incidentsTable: { __typename?: 'ListIncidents', total: number, incidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, date: Date, totalOffenders: number, policeReported: boolean, policeInvolved: boolean, policeRef?: string | null, incidentItems: Array<{ __typename?: 'IncidentItem', value?: number | null, recoveredValue?: number | null }>, location?: { __typename?: 'Address', full: string, alias?: string | null, id: string, geoLat?: number | null, geoLng?: number | null } | null, crimeTypes: Array<{ __typename?: 'Tag', name: string, id: string }> }> }, lossTotals: { __typename?: 'LossTotals', totalRecoveredValue: number, totalLostValue: number, averagePerIncident: number, averageSuccessRate: number, totalIncidents: number }, offenderSummary?: { __typename?: 'Offender', id: string, age?: Types.Age | null, dateSource?: string | null, peculiarities?: string | null, dateOfBirth?: Date | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, race?: Types.Race | null, reference?: number | null, gender?: Types.Gender | null, name?: string | null, addresses: Array<{ __typename?: 'Address', id: string, geoLng?: number | null, geoLat?: number | null, full: string }>, images: Array<{ __typename?: 'Image', optimisedPersisted?: string | null, position: Types.ImagePosition, rotation: number }> } | null }, targetedGoods: { __typename?: 'ListTargetedGoods', total: number, targetedGoods: Array<{ __typename?: 'TargetedGood', totalSuccessRate: number, totalRecoveredValue: number, totalOffenders: number, totalLostValue: number, totalIncidents: number, name: string, averageLossValue: number, alertId: string }> }, businessContribution: { __typename?: 'ListBusinessContribution', total: number, businessContributions: Array<{ __typename?: 'BusinessContributions', name: string, totalIncidents: number, totalOffenders: number, totalLostValue: number, totalRecoveredValue: number, totalSuccessRate: number, mostCommonGoodLost?: string | null, highestTotalValueGoodLost?: number | null, averageLossValue?: number | null }> } };


export const OffenderReportDocument = gql`
    query OffenderReport($where: OffenderReportInput!, $targetedWhere: UserContributionWhereInput!) {
  offenderReport(where: $where) {
    crimeTypeBusinessRadial {
      label
      data {
        value
        label
      }
    }
    crimeTypeDonut {
      label
      value
    }
    goodsTypeLossRecovered {
      label
      data {
        label
        value
      }
    }
    incidentDayOfWeekGraph {
      value
      label
    }
    incidentMonthGraph {
      value
      label
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
          geoLat
          geoLng
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
    lossTotals {
      totalRecoveredValue
      totalLostValue
      averagePerIncident
      averageSuccessRate
      totalIncidents
    }
    offenderSummary {
      id
      age
      dateSource
      peculiarities
      dateOfBirth
      build
      height
      hair
      race
      reference
      gender
      addresses {
        id
        geoLng
        geoLat
        full
      }
      name
      images {
        optimisedPersisted
        position
        rotation
      }
    }
  }
  targetedGoods(where: $targetedWhere) {
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
  businessContribution(where: $targetedWhere) {
    total
    businessContributions {
      name
      totalIncidents
      totalOffenders
      totalLostValue
      totalRecoveredValue
      totalSuccessRate
      mostCommonGoodLost
      highestTotalValueGoodLost
      averageLossValue
    }
  }
}
    `;
export function useOffenderReportQuery(baseOptions: Apollo.QueryHookOptions<OffenderReportQuery, OffenderReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OffenderReportQuery, OffenderReportQueryVariables>(OffenderReportDocument, options);
      }
export function useOffenderReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OffenderReportQuery, OffenderReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OffenderReportQuery, OffenderReportQueryVariables>(OffenderReportDocument, options);
        }
export type OffenderReportQueryHookResult = ReturnType<typeof useOffenderReportQuery>;
export type OffenderReportLazyQueryHookResult = ReturnType<typeof useOffenderReportLazyQuery>;
export type OffenderReportQueryResult = Apollo.QueryResult<OffenderReportQuery, OffenderReportQueryVariables>;