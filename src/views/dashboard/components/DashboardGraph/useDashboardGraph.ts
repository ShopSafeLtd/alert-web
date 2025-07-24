import type { DashboardGraphMetadata } from '#/types/dashboard-metadata';

import {
  DataType as GraphQLDataType,
  DatePeriod as GraphQLDatePeriod,
  GraphType as GraphQLGraphType,
} from '#/graphql/types';
import { isAdminAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useDashboardContext } from '#/views/dashboard/Dashboard.context';
import { useAtomValue } from 'jotai/index';
import { useMemo } from 'react';

import { useCustomGraphQuery } from './__generated__/custom-graph.generated';

interface Return {
  data: { label: string; value: number }[];
  loading: boolean;
}

const useDashboardGraph = (metadata?: DashboardGraphMetadata): Return => {
  const {
    variables: { gallery, groups: groupsFilter },
  } = useDashboardContext();
  const isAdmin = useAtomValue(isAdminAtom);

  console.log('DashboardGraph metadata:', metadata);

  // Build query variables from metadata
  const queryVariables = useMemo(() => {
    if (!metadata) {
      // Return null to skip query if no metadata
      return null;
    }

    // Map DataType to GraphQL enum values
    const dataTypeMap = {
      activities: GraphQLDataType.Activities,
      incidents: GraphQLDataType.Incidents,
      offenders: GraphQLDataType.Offenders,
    };

    // Map DatePeriod to GraphQL enum values
    const datePeriodMap = {
      day: GraphQLDatePeriod.Day,
      month: GraphQLDatePeriod.Month,
      quarter: GraphQLDatePeriod.Quarter,
      week: GraphQLDatePeriod.Week,
      year: GraphQLDatePeriod.Year,
    };

    // Map GraphType to GraphQL enum values (gauge is not supported in GraphQL)
    const graphTypeMap = {
      area: GraphQLGraphType.Area,
      bar: GraphQLGraphType.Bar,
      gauge: GraphQLGraphType.Pie, // Map gauge to pie since gauge is not supported
      line: GraphQLGraphType.Line,
      pie: GraphQLGraphType.Pie,
    };

    return {
      input: {
        dataType: dataTypeMap[metadata.dataType] || metadata.dataType,
        datePeriod: metadata.dateRange
          ? datePeriodMap[metadata.dateRange] || metadata.dateRange
          : undefined,
        filterBusinesses: metadata.filterBusinesses?.length
          ? metadata.filterBusinesses
          : undefined,
        filterDatePeriod: metadata.filterDatePeriod,
        filterGroups: metadata.filterGroups?.length
          ? metadata.filterGroups
          : groupsFilter?.length
            ? groupsFilter
            : undefined,
        filterUsers: metadata.filterUsers?.length
          ? metadata.filterUsers
          : undefined,
        graphType: graphTypeMap[metadata.graphType] || metadata.graphType,
        numberOfRecords: metadata.numberOfRecords,
        xAxis: metadata.xAxis,
        xAxisLabel: metadata.xAxisLabel,
        yAxis: metadata.yAxis,
        yAxisLabel: metadata.yAxisLabel,
        // Note: The following fields are not available in CustomGraphInput type:
        // - gaugeMetric
        // - useBusiness
        // - following
        // - myData
      },
    };
  }, [metadata, groupsFilter, gallery, isAdmin]);

  console.log('DashboardGraph queryVariables:', queryVariables);

  // Use the custom graph query with metadata
  const { data: queryData, loading } = useCustomGraphQuery({
    skip: !queryVariables,
    variables: queryVariables!,
  });

  const data = queryData?.customGraph ?? [];

  return {
    data,
    loading,
  };
};
export default useDashboardGraph;
