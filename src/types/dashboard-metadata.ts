// Enums from DashboardGraphTemplate
export enum GraphType {
  area = 'area',
  bar = 'bar',
  gauge = 'gauge',
  line = 'line',
  pie = 'pie',
}

export enum DataType {
  activities = 'activities',
  incidents = 'incidents',
  offenders = 'offenders',
}

export enum IncidentXAxis {
  brands = 'brands',
  businesses = 'businesses',
  contentGroups = 'contentGroups',
  dateRange = 'dateRange',
  goodsTypes = 'goodsTypes',
  incidentTags = 'incidentTags',
  incidentTypes = 'incidentTypes',
}

export enum IncidentYAxis {
  count = 'count',
  value = 'value',
}

export enum ActivityXAxis {
  business = 'business',
  dateRange = 'dateRange',
  group = 'group',
  status = 'status',
}

export enum ActivityYAxis {
  count = 'count',
}

export enum DatePeriod {
  day = 'day',
  month = 'month',
  quarter = 'quarter',
  week = 'week',
  year = 'year',
}

export enum GaugeMetric {
  activityStatus = 'activityStatus',
  incidentApproval = 'incidentApproval',
}

// Main metadata interface
export interface DashboardGraphMetadata {
  barOrientation: 'horizontal' | 'vertical';
  colorScheme: string;
  dataType: DataType;
  dateRange: DatePeriod;
  filterBusinesses?: string[];
  filterDatePeriod?: number;
  filterGroups?: string[];
  filterUsers?: string[];
  gaugeMax: number;
  gaugeMetric?: GaugeMetric;
  gaugeMin: number;
  gaugeSegments: number;
  gaugeTarget?: number;
  graphType: GraphType;
  innerRadiusRatio: number;
  legendPosition: 'bottom' | 'left' | 'right' | 'top';
  numberOfRecords?: number;
  sectorLabelType: 'both' | 'percentage' | 'value';
  showCalloutLines: boolean;
  showLegend: boolean;
  showSectorLabels: boolean;
  showSubtitle: boolean;
  showTitle: boolean;
  strokeWidth: number;
  subtitle: string;
  title: string;
  xAxis: ActivityXAxis | IncidentXAxis;
  xAxisLabel: string;
  yAxis: ActivityYAxis | IncidentYAxis;
  yAxisLabel: string;
}

// Type for the overall component metadata store
export type ComponentMetadata = Record<string, DashboardGraphMetadata>;
