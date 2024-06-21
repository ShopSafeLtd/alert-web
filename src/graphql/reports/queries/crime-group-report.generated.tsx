import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CrimeGroupReportQueryVariables = Types.Exact<{
  where: Types.CrimeGroupReportInput;
  whereContribution: Types.UserContributionWhereInput;
  whereCrimeGroup: Types.CrimeGroupWhereUniqueInput;
}>;

export type CrimeGroupReportQuery = {
  __typename?: 'Query';
  crimeGroup: {
    __typename?: 'CrimeGroup';
    id: string;
    reference?: number | null;
    alias?: string | null;
  };
  crimeGroupReport: {
    __typename?: 'CrimeGroupReport';
    crimeGroupMap: {
      __typename?: 'CrimeGroupMap';
      offenderMarkers?: Array<{
        __typename?: 'MapMarker';
        name?: string | null;
        coords: { __typename?: 'HeatMapLatLng'; lng: number; lat: number };
      }> | null;
      incidentsCoords?: Array<{
        __typename?: 'HeatMapLatLng';
        lng: number;
        lat: number;
      }> | null;
    };
    crimeTypeByOffender: Array<{
      __typename?: 'RadialGraph';
      label: string;
      data: Array<{ __typename?: 'Graph'; value: number; label: string }>;
    }>;
    goodsTypeLossRecovered: Array<{
      __typename?: 'RadialGraph';
      label: string;
      data: Array<{ __typename?: 'Graph'; value: number; label: string }>;
    }>;
    incidentDayOfWeekGraph: Array<{
      __typename?: 'Graph';
      value: number;
      label: string;
    }>;
    incidentMonthGraph: Array<{
      __typename?: 'Graph';
      value: number;
      label: string;
    }>;
    incidentSummary: {
      __typename?: 'IncidentSummary';
      mostCommonCrimeType: string;
      totalIncidents: number;
      lastIncidentDate?: Date | null;
      incidentsWherePoliceAttended: number;
      incidentsReportedToPolice: number;
    };
    incidentTimeOfDayDonut: Array<{
      __typename?: 'Graph';
      value: number;
      label: string;
    }>;
    incidentsTable: {
      __typename?: 'ListIncidents';
      total: number;
      incidents: Array<{
        __typename?: 'Incident';
        id: string;
        reference?: number | null;
        date: Date;
        totalOffenders: number;
        policeReported: boolean;
        policeInvolved: boolean;
        policeRef?: string | null;
        incidentItems: Array<{
          __typename?: 'IncidentItem';
          value?: number | null;
          recoveredValue?: number | null;
        }>;
        location?: {
          __typename?: 'Address';
          full: string;
          alias?: string | null;
          id: string;
          geoLat?: number | null;
          geoLng?: number | null;
        } | null;
        crimeTypes: Array<{ __typename?: 'Tag'; name: string; id: string }>;
      }>;
    };
    lossTotals: {
      __typename?: 'LossTotals';
      totalRecoveredValue: number;
      totalLostValue: number;
      totalIncidents: number;
      averagePerIncident: number;
      averageSuccessRate: number;
    };
    offenderGoodsTypeValue: Array<{
      __typename?: 'RadialGraph';
      label: string;
      data: Array<{ __typename?: 'Graph'; label: string; value: number }>;
    }>;
  };
  offendersPerformance: {
    __typename?: 'ListOffenderPerformance';
    total: number;
    offenderPerformance: Array<{
      __typename?: 'OffenderPerformance';
      primaryPhoto?: string | null;
      alertId: string;
      name: string;
      totalIncidents: number;
      totalLostValue: number;
      totalRecoveredValue: number;
      totalSuccessRate: number;
      lastIncidentDate?: Date | null;
    }>;
  };
  businessContribution: {
    __typename?: 'ListBusinessContribution';
    total: number;
    businessContributions: Array<{
      __typename?: 'BusinessContributions';
      name: string;
      totalUsers: number;
      totalIncidents: number;
      totalOffenders: number;
      totalUpdates: number;
      totalMessages: number;
      totalLogins: number;
      totalLostValue: number;
      totalRecoveredValue: number;
      totalSuccessRate: number;
      mostCommonGoodLost?: string | null;
      highestTotalValueGoodLost?: number | null;
      averageLossValue?: number | null;
    }>;
  };
  targetedGoods: {
    __typename?: 'ListTargetedGoods';
    total: number;
    targetedGoods: Array<{
      __typename?: 'TargetedGood';
      alertId: string;
      name: string;
      totalIncidents: number;
      totalOffenders: number;
      totalLostValue: number;
      totalRecoveredValue: number;
      totalSuccessRate: number;
      averageLossValue: number;
    }>;
  };
};

export const CrimeGroupReportDocument = gql`
  query CrimeGroupReport(
    $where: CrimeGroupReportInput!
    $whereContribution: UserContributionWhereInput!
    $whereCrimeGroup: CrimeGroupWhereUniqueInput!
  ) {
    crimeGroup(where: $whereCrimeGroup) {
      id
      reference
      alias
    }
    crimeGroupReport(where: $where) {
      crimeGroupMap {
        offenderMarkers {
          coords {
            lng
            lat
          }
          name
        }
        incidentsCoords {
          lng
          lat
        }
      }
      crimeTypeByOffender {
        label
        data {
          value
          label
        }
      }
      goodsTypeLossRecovered {
        label
        data {
          value
          label
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
        mostCommonCrimeType
        totalIncidents
        lastIncidentDate
        incidentsWherePoliceAttended
        incidentsReportedToPolice
      }
      incidentTimeOfDayDonut {
        value
        label
      }
      incidentsTable {
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
        total
      }
      lossTotals {
        totalRecoveredValue
        totalLostValue
        totalIncidents
        averagePerIncident
        averageSuccessRate
      }
      offenderGoodsTypeValue {
        label
        data {
          label
          value
        }
      }
    }
    offendersPerformance(where: $whereContribution) {
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
      }
    }
    businessContribution(where: $whereContribution) {
      total
      businessContributions {
        name
        totalUsers
        totalIncidents
        totalOffenders
        totalUpdates
        totalMessages
        totalLogins
        totalLostValue
        totalRecoveredValue
        totalSuccessRate
        mostCommonGoodLost
        highestTotalValueGoodLost
        averageLossValue
      }
    }
    targetedGoods(where: $whereContribution) {
      total
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
    }
  }
`;
export function useCrimeGroupReportQuery(
  baseOptions: Apollo.QueryHookOptions<
    CrimeGroupReportQuery,
    CrimeGroupReportQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CrimeGroupReportQuery, CrimeGroupReportQueryVariables>(
    CrimeGroupReportDocument,
    options
  );
}
export function useCrimeGroupReportLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CrimeGroupReportQuery,
    CrimeGroupReportQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    CrimeGroupReportQuery,
    CrimeGroupReportQueryVariables
  >(CrimeGroupReportDocument, options);
}
export type CrimeGroupReportQueryHookResult = ReturnType<
  typeof useCrimeGroupReportQuery
>;
export type CrimeGroupReportLazyQueryHookResult = ReturnType<
  typeof useCrimeGroupReportLazyQuery
>;
export type CrimeGroupReportQueryResult = Apollo.QueryResult<
  CrimeGroupReportQuery,
  CrimeGroupReportQueryVariables
>;
