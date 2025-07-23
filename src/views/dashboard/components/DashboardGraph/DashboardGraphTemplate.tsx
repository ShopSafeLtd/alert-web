import type { FilterConfig } from '#/components/form-components/FiltersController';
// import type { AvailableDashboardElements } from '#/state/dashboard-model';
import type { DashboardGraphMetadata } from '#/types/dashboard-metadata';
import type { IconDefinition } from '@fortawesome/pro-light-svg-icons';
import type { AgChartOptions } from 'ag-charts-community';

import {
  FilterType,
  FiltersController,
} from '#/components/form-components/FiltersController';
// import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  DataType as GraphQLDataType,
  DatePeriod as GraphQLDatePeriod,
  GraphType as GraphQLGraphType,
} from '#/graphql/types';
import {
  ActivityXAxis,
  ActivityYAxis,
  DataType,
  DatePeriod,
  GaugeMetric,
  GraphType,
  IncidentXAxis,
  IncidentYAxis,
} from '#/types/dashboard-metadata';
import {
  faAreaChart,
  faArrowsLeftRight,
  faBarChart,
  faBuildings,
  faCalendar,
  faChartColumn,
  faCheckCircle,
  faCogs,
  faExclamationCircle,
  faGauge,
  faInputNumeric,
  faInventory,
  faLineChart,
  faMoneyBill,
  faPallet,
  faPeopleGroup,
  faPieChart,
  faSquareCheck,
  faTags,
  faTasks,
  faTrash,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AgCharts } from 'ag-charts-react';
import {
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Slider,
  Switch,
  Tooltip,
  Typography,
  message,
} from 'antd';
import { useStoreState } from 'easy-peasy';
// import { useAtomValue } from 'jotai';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';

import { useCustomGraphQuery } from './__generated__/custom-graph.generated';

// Enums are now imported from dashboard-metadata.ts

// Predefined color schemes
const colorSchemes = {
  corporate: [
    '#1f77b4',
    '#ff7f0e',
    '#2ca02c',
    '#d62728',
    '#9467bd',
    '#8c564b',
    '#e377c2',
    '#7f7f7f',
    '#bcbd22',
  ],
  default: [
    '#5470c6',
    '#91cc75',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4',
    '#ea7ccc',
  ],
  forest: [
    '#2d4a2b',
    '#3e5a3c',
    '#4f6a4d',
    '#607a5e',
    '#718a6f',
    '#829a80',
    '#93aa91',
    '#a4baa2',
    '#b5cab3',
  ],
  monochrome: [
    '#000000',
    '#2c2c2c',
    '#555555',
    '#7f7f7f',
    '#a8a8a8',
    '#d1d1d1',
    '#e8e8e8',
    '#f5f5f5',
    '#ffffff',
  ],
  ocean: [
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    '#ffa600',
    '#ffd600',
  ],
  pastel: [
    '#b8d4f1',
    '#c3e9b4',
    '#fde3a7',
    '#f7b7a3',
    '#d5c4e7',
    '#a3d5c7',
    '#fdbcae',
    '#c9b3d9',
    '#f5c2dd',
  ],
  sunset: [
    '#ff6b6b',
    '#f06595',
    '#cc5de8',
    '#845ef7',
    '#5c7cfa',
    '#339af0',
    '#22b8cf',
    '#20c997',
    '#51cf66',
  ],
  vibrant: [
    '#ff6384',
    '#36a2eb',
    '#ffce56',
    '#4bc0c0',
    '#9966ff',
    '#ff9f40',
    '#ff6384',
    '#c9cbcf',
    '#4bc0c0',
  ],
};

interface IconRadio {
  disabled?: boolean;
  onChange?: (value: string) => void;
  options: {
    disabled?: boolean;
    icon: IconDefinition;
    label: string;
    tooltip?: string;
    value: string;
  }[];
  value?: string;
}

const IconRadio = ({ disabled, onChange, options, value }: IconRadio) => (
  <Row gutter={[8, 8]} wrap>
    {options.map((option) => (
      <Col key={option.value}>
        <Tooltip placement="top" title={option.tooltip} trigger="hover">
          <Button
            disabled={disabled || option.disabled}
            ghost={value === option.value}
            onClick={() => onChange && onChange(option.value)}
            style={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'row',
              gap: 8,
              height: 40,
              justifyContent: 'flex-start',
              paddingLeft: 12,
              paddingRight: 16,
              ...(value === option.value && {
                borderColor: 'var(--ant-primary-color)',
                color: 'var(--ant-primary-color)',
              }),
            }}
            type={value === option.value ? 'primary' : 'default'}
          >
            <FontAwesomeIcon
              icon={option.icon}
              size="lg"
              style={{
                opacity: value === option.value ? 1 : 0.65,
              }}
            />
            <span style={{ fontSize: 14 }}>{option.label}</span>
          </Button>
        </Tooltip>
      </Col>
    ))}
  </Row>
);

// Helper function for currency formatting
const formatCurrency = (value: number) =>
  `£${value.toLocaleString('en-GB', { maximumFractionDigits: 0, minimumFractionDigits: 0 })}`;

interface FormValues {
  // Bar chart specific options
  barOrientation: 'horizontal' | 'vertical';
  colorScheme: string;
  dataType: DataType;
  dateRange: DatePeriod;
  filterBusinesses?: string[];
  // Filter fields
  filterDatePeriod?: number; // Number of days to look back
  filterGroups?: string[];
  filterUsers?: string[];
  gaugeMax: number;
  gaugeMetric?: GaugeMetric;
  // Gauge specific options
  gaugeMin: number;
  gaugeSegments: number;
  gaugeTarget?: number;
  graphType: GraphType;
  // Pie chart specific options
  innerRadiusRatio: number;
  legendPosition: 'bottom' | 'left' | 'right' | 'top';
  numberOfRecords?: number; // Combined field for limiting records/dates
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

const DashboardGraph = ({
  elementId,
  metadata,
  removeItem,
  updateMetadata,
}: {
  elementId?: string;
  metadata?: DashboardGraphMetadata;
  removeItem: (item: string) => void;
  updateMetadata?: (metadata: DashboardGraphMetadata) => void;
}) => {
  const intl = useIntl();
  const isDark =
    useStoreState(
      (state: { theme: { currentTheme: string } }) => state.theme.currentTheme
    ) === 'dark';

  const [form] = Form.useForm<FormValues>();
  const [configOpen, setConfigOpen] = useState(false);
  const [chartHeight, setChartHeight] = useState(300);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  // Get filter configuration based on data type
  const getFilterConfig = (): Record<string, FilterConfig> => {
    const filters: Record<string, FilterConfig> = {};

    switch (dataType) {
      case DataType.incidents: {
        filters.datePeriod = {
          label: intl.formatMessage({ defaultMessage: 'Date Period' }),
          name: 'filterDatePeriod',
          type: FilterType.DATE_PERIOD,
        };
        filters.businesses = {
          label: intl.formatMessage({ defaultMessage: 'Businesses' }),
          name: 'filterBusinesses',
          type: FilterType.BUSINESS_SELECT,
        };
        filters.users = {
          label: intl.formatMessage({ defaultMessage: 'Users' }),
          name: 'filterUsers',
          type: FilterType.USER_SELECT,
        };

        break;
      }
      case DataType.activities: {
        filters.datePeriod = {
          label: intl.formatMessage({ defaultMessage: 'Date Period' }),
          name: 'filterDatePeriod',
          type: FilterType.DATE_PERIOD,
        };
        filters.groups = {
          label: intl.formatMessage({ defaultMessage: 'Groups' }),
          name: 'filterGroups',
          type: FilterType.GROUP_SELECT,
        };
        filters.users = {
          label: intl.formatMessage({ defaultMessage: 'Users' }),
          name: 'filterUsers',
          type: FilterType.USER_SELECT,
        };

        break;
      }
      case DataType.offenders: {
        filters.datePeriod = {
          label: intl.formatMessage({ defaultMessage: 'Date Period' }),
          name: 'filterDatePeriod',
          type: FilterType.DATE_PERIOD,
        };
        filters.groups = {
          label: intl.formatMessage({ defaultMessage: 'Groups' }),
          name: 'filterGroups',
          type: FilterType.GROUP_SELECT,
        };

        break;
      }
      // No default
    }

    return filters;
  };

  // Get x-axis options based on data type
  const getXAxisOptions = () => {
    if (dataType === DataType.activities) {
      return [
        {
          icon: faCheckCircle,
          label: intl.formatMessage({ defaultMessage: 'Status' }),
          value: ActivityXAxis.status,
        },
        {
          icon: faCalendar,
          label: intl.formatMessage({ defaultMessage: 'Date Range' }),
          value: ActivityXAxis.dateRange,
        },
        {
          icon: faBuildings,
          label: intl.formatMessage({ defaultMessage: 'Business' }),
          value: ActivityXAxis.business,
        },
        {
          icon: faPeopleGroup,
          label: intl.formatMessage({ defaultMessage: 'Group' }),
          value: ActivityXAxis.group,
        },
      ];
    }
    // Default incident x-axis options
    return [
      {
        icon: faCalendar,
        label: intl.formatMessage({ defaultMessage: 'Date Range' }),
        value: IncidentXAxis.dateRange,
      },
      {
        icon: faBuildings,
        label: intl.formatMessage({ defaultMessage: 'Businesses' }),
        value: IncidentXAxis.businesses,
      },
      {
        icon: faInventory,
        label: intl.formatMessage({ defaultMessage: 'Goods Types' }),
        value: IncidentXAxis.goodsTypes,
      },
      {
        icon: faSquareCheck,
        label: intl.formatMessage({ defaultMessage: 'Incident Types' }),
        value: IncidentXAxis.incidentTypes,
      },
      {
        icon: faTags,
        label: intl.formatMessage({ defaultMessage: 'Incident Tags' }),
        value: IncidentXAxis.incidentTags,
      },
      {
        icon: faPallet,
        label: intl.formatMessage({ defaultMessage: 'Brands' }),
        value: IncidentXAxis.brands,
      },
      {
        icon: faPeopleGroup,
        label: intl.formatMessage({ defaultMessage: 'Content Groups' }),
        value: IncidentXAxis.contentGroups,
      },
    ];
  };

  // Get y-axis options based on data type
  const getYAxisOptions = () => {
    if (dataType === DataType.activities) {
      return [
        {
          icon: faInputNumeric,
          label: intl.formatMessage({ defaultMessage: 'Count' }),
          value: ActivityYAxis.count,
        },
      ];
    }
    // Default incident y-axis options
    return [
      {
        icon: faInputNumeric,
        label: intl.formatMessage({ defaultMessage: 'Count' }),
        value: IncidentYAxis.count,
      },
      {
        icon: faMoneyBill,
        label: intl.formatMessage({ defaultMessage: 'Total Retail Value' }),
        value: IncidentYAxis.value,
      },
    ];
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        for (const entry of entries) {
          const { height } = entry.contentRect;
          setChartHeight(height);
        }
      }
    );

    resizeObserver.observe(chartContainerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  // Load saved metadata on mount
  useEffect(() => {
    if (metadata && Object.keys(metadata).length > 0) {
      // Map metadata to form values directly
      const formValues: Partial<FormValues> = {
        ...(metadata.barOrientation && {
          barOrientation: metadata.barOrientation,
        }),
        ...(metadata.colorScheme && { colorScheme: metadata.colorScheme }),
        ...(metadata.dataType && { dataType: metadata.dataType }),
        ...(metadata.dateRange && { dateRange: metadata.dateRange }),
        ...(metadata.filterBusinesses && {
          filterBusinesses: metadata.filterBusinesses,
        }),
        ...(metadata.filterDatePeriod !== undefined && {
          filterDatePeriod: metadata.filterDatePeriod,
        }),
        ...(metadata.filterGroups && { filterGroups: metadata.filterGroups }),
        ...(metadata.filterUsers && { filterUsers: metadata.filterUsers }),
        ...(metadata.gaugeMax !== undefined && { gaugeMax: metadata.gaugeMax }),
        ...(metadata.gaugeMetric && { gaugeMetric: metadata.gaugeMetric }),
        ...(metadata.gaugeMin !== undefined && { gaugeMin: metadata.gaugeMin }),
        ...(metadata.gaugeSegments !== undefined && {
          gaugeSegments: metadata.gaugeSegments,
        }),
        ...(metadata.gaugeTarget !== undefined && {
          gaugeTarget: metadata.gaugeTarget,
        }),
        ...(metadata.graphType && { graphType: metadata.graphType }),
        ...(metadata.innerRadiusRatio !== undefined && {
          innerRadiusRatio: metadata.innerRadiusRatio,
        }),
        ...(metadata.legendPosition && {
          legendPosition: metadata.legendPosition,
        }),
        ...(metadata.numberOfRecords !== undefined && {
          numberOfRecords: metadata.numberOfRecords,
        }),
        ...(metadata.sectorLabelType && {
          sectorLabelType: metadata.sectorLabelType,
        }),
        ...(metadata.showCalloutLines !== undefined && {
          showCalloutLines: metadata.showCalloutLines,
        }),
        ...(metadata.showLegend !== undefined && {
          showLegend: metadata.showLegend,
        }),
        ...(metadata.showSectorLabels !== undefined && {
          showSectorLabels: metadata.showSectorLabels,
        }),
        ...(metadata.showSubtitle !== undefined && {
          showSubtitle: metadata.showSubtitle,
        }),
        ...(metadata.showTitle !== undefined && {
          showTitle: metadata.showTitle,
        }),
        ...(metadata.strokeWidth !== undefined && {
          strokeWidth: metadata.strokeWidth,
        }),
        ...(metadata.subtitle && { subtitle: metadata.subtitle }),
        ...(metadata.title && { title: metadata.title }),
        ...(metadata.xAxis && { xAxis: metadata.xAxis }),
        ...(metadata.xAxisLabel && { xAxisLabel: metadata.xAxisLabel }),
        ...(metadata.yAxis && { yAxis: metadata.yAxis }),
        ...(metadata.yAxisLabel && { yAxisLabel: metadata.yAxisLabel }),
      };

      form.setFieldsValue(formValues);
    }
  }, [metadata]);

  const toggleConfig = () => {
    setConfigOpen(!configOpen);
  };

  const handleSave = () => {
    const formValues = form.getFieldsValue();
    // Clean the form values - remove empty filterDatePeriod
    if (
      formValues.filterDatePeriod === null ||
      formValues.filterDatePeriod === undefined
    ) {
      delete formValues.filterDatePeriod;
    }
    if (updateMetadata) {
      updateMetadata(formValues);
      void message.success(
        intl.formatMessage({
          defaultMessage: 'Graph configuration saved successfully',
        })
      );
    }
    toggleConfig();
  };

  const graphType = Form.useWatch('graphType', form);
  const dataType = Form.useWatch('dataType', form);
  const xAxis = Form.useWatch('xAxis', form);
  const yAxis = Form.useWatch('yAxis', form);
  const title = Form.useWatch('title', form);
  const subtitle = Form.useWatch('subtitle', form);
  const dateRange = Form.useWatch('dateRange', form);
  const numberOfRecords = Form.useWatch('numberOfRecords', form);
  const showTitle = Form.useWatch('showTitle', form);
  const showSubtitle = Form.useWatch('showSubtitle', form);
  const xAxisLabel = Form.useWatch('xAxisLabel', form);
  const yAxisLabel = Form.useWatch('yAxisLabel', form);
  const showLegend = Form.useWatch('showLegend', form);
  const legendPosition = Form.useWatch('legendPosition', form);
  const colorScheme = Form.useWatch('colorScheme', form);
  const innerRadiusRatio = Form.useWatch('innerRadiusRatio', form);
  const showSectorLabels = Form.useWatch('showSectorLabels', form);
  const sectorLabelType = Form.useWatch('sectorLabelType', form);
  const showCalloutLines = Form.useWatch('showCalloutLines', form);
  const strokeWidth = Form.useWatch('strokeWidth', form);
  const barOrientation = Form.useWatch('barOrientation', form);
  const gaugeMin = Form.useWatch('gaugeMin', form);
  const gaugeMax = Form.useWatch('gaugeMax', form);
  const gaugeSegments = Form.useWatch('gaugeSegments', form);
  const gaugeTarget = Form.useWatch('gaugeTarget', form);
  const gaugeMetric = Form.useWatch('gaugeMetric', form);

  const showDataType = useMemo(() => graphType !== undefined, [graphType]);
  const showGaugeMetric = useMemo(
    () => graphType === GraphType.gauge && dataType !== undefined,
    [graphType, dataType]
  );
  const showXAxis = useMemo(
    () => dataType !== undefined && graphType !== GraphType.gauge,
    [dataType, graphType]
  );
  const showYAxis = useMemo(
    () => xAxis !== undefined && graphType !== GraphType.gauge,
    [xAxis, graphType]
  );
  const showDateOptions = useMemo(
    () =>
      (dataType === DataType.incidents && xAxis === IncidentXAxis.dateRange) ||
      (dataType === DataType.activities && xAxis === ActivityXAxis.dateRange),
    [xAxis, dataType]
  );

  // Check if graph configuration is complete
  const isGraphConfigComplete = useMemo(() => {
    // Gauge charts need dataType and gaugeMetric (min/max are always 0-100)
    if (graphType === GraphType.gauge) {
      return dataType !== undefined && gaugeMetric !== undefined;
    }

    const basicConfigComplete = graphType && dataType && xAxis && yAxis;
    if (!basicConfigComplete) return false;

    // If date range is selected, also check if numberOfRecords and dateRange are set
    if (
      (dataType === DataType.incidents && xAxis === IncidentXAxis.dateRange) ||
      (dataType === DataType.activities && xAxis === ActivityXAxis.dateRange)
    ) {
      return numberOfRecords && dateRange;
    }

    // For activities with status x-axis, no additional requirements
    if (dataType === DataType.activities && xAxis === ActivityXAxis.status) {
      return true;
    }

    // For other x-axis options, check if numberOfRecords is set
    return numberOfRecords && numberOfRecords > 0;
  }, [
    graphType,
    dataType,
    xAxis,
    yAxis,
    numberOfRecords,
    dateRange,
    gaugeMin,
    gaugeMax,
    gaugeMetric,
  ]);

  // Build query variables from metadata
  const queryVariables = useMemo(() => {
    // Only build query variables if we have metadata
    if (!metadata) return null;

    // GraphQL types are imported at the top of the file

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
        filterBusinesses: metadata.filterBusinesses,
        filterDatePeriod: metadata.filterDatePeriod,
        filterGroups: metadata.filterGroups,
        filterUsers: metadata.filterUsers,
        gaugeMetric: metadata.gaugeMetric,
        graphType: graphTypeMap[metadata.graphType] || metadata.graphType,
        numberOfRecords: metadata.numberOfRecords,
        xAxis: metadata.xAxis || '',
        xAxisLabel: metadata.xAxisLabel || '',
        yAxis: metadata.yAxis || '',
        yAxisLabel: metadata.yAxisLabel || '',
      },
    };
  }, [metadata]);

  // Use the custom graph query with metadata
  const { data: queryData, loading: queryLoading } = useCustomGraphQuery({
    skip: !queryVariables,
    variables: queryVariables!,
  });

  const loading = queryLoading;

  const getChartSeries = (
    useMetadata = false
  ): Array<Record<string, unknown>> => {
    // Use metadata values when displaying, form values when configuring
    const cfg =
      useMetadata && metadata
        ? {
            barOrientation: metadata.barOrientation,
            colorScheme: metadata.colorScheme,
            dataType: metadata.dataType,
            dateRange: metadata.dateRange,
            graphType: metadata.graphType,
            innerRadiusRatio: metadata.innerRadiusRatio,
            showCalloutLines: metadata.showCalloutLines,
            showSectorLabels: metadata.showSectorLabels,
            strokeWidth: metadata.strokeWidth,
            xAxis: metadata.xAxis,
            yAxis: metadata.yAxis,
          }
        : {
            barOrientation,
            colorScheme,
            dataType,
            dateRange,
            graphType,
            innerRadiusRatio,
            showCalloutLines,
            showSectorLabels,
            strokeWidth,
            xAxis,
            yAxis,
          };
    if (cfg.graphType === GraphType.pie) {
      // For pie charts, we need different configuration
      return [
        {
          angleKey: cfg.yAxis,
          angleName: cfg.yAxis === IncidentYAxis.count ? 'Count' : 'Value',
          callout: {
            enabled: cfg.showCalloutLines !== false,
            strokeWidth: cfg.strokeWidth || 1,
          },
          calloutLabelKey:
            cfg.xAxis === IncidentXAxis.dateRange ? cfg.dateRange : 'category',
          fills:
            colorSchemes[cfg.colorScheme as keyof typeof colorSchemes] ||
            colorSchemes.default,
          innerRadiusRatio: cfg.innerRadiusRatio || 0,
          sectorLabel: cfg.showSectorLabels
            ? {
                formatter: (params: {
                  angleKey: string;
                  datum: Record<string, number>;
                }) => {
                  const value = params.datum[params.angleKey];
                  // Note: The actual total will be calculated at runtime
                  return `${value}`;
                },
              }
            : undefined,
          sectorLabelKey: showSectorLabels ? yAxis : undefined,
          strokeWidth: strokeWidth || 1,
          tooltip: {
            renderer:
              cfg.yAxis === IncidentYAxis.value
                ? (params: { datum: Record<string, unknown> }) => ({
                    content: formatCurrency(params.datum[cfg.yAxis] as number),
                    title: params.datum.category as string,
                  })
                : undefined,
          },
          type: innerRadiusRatio > 0 ? 'donut' : 'pie',
        },
      ];
    } else if (graphType === GraphType.gauge) {
      // For gauge charts, we use radial-column
      return [
        {
          angleKey: 'category',
          fill:
            colorSchemes[colorScheme as keyof typeof colorSchemes]?.[0] ||
            '#5470c6',
          fillOpacity: 0.8,
          label: {
            enabled: true,
            fontSize: 24,
            fontWeight: 'bold',
            formatter: (params: { datum: { value: number } }) =>
              `${params.datum.value}`,
          },
          radiusKey: 'value',
          radiusName: 'Value',
          stroke: isDark ? '#333' : '#fff',
          strokeWidth: 1,
          tooltip: {
            enabled: true,
            renderer: (params: { datum: { max?: number; value: number } }) => ({
              content: `${params.datum.value} / ${params.datum.max || gaugeMax}`,
              title: 'Current Value',
            }),
          },
          type: 'radial-column' as const,
        },
      ];
    } else {
      // For non-date range x-axis options
      const isDateRange =
        (cfg.dataType === DataType.incidents &&
          cfg.xAxis === IncidentXAxis.dateRange) ||
        (cfg.dataType === DataType.activities &&
          cfg.xAxis === ActivityXAxis.dateRange);
      return [
        {
          type:
            cfg.graphType === GraphType.line
              ? 'line'
              : cfg.graphType === GraphType.area
                ? 'area'
                : 'bar',
          xKey: isDateRange ? cfg.dateRange : cfg.xAxis,
          xName: isDateRange ? cfg.dateRange : cfg.xAxis,
          yKey: cfg.yAxis,
          yName: cfg.yAxis,
          ...(cfg.graphType === GraphType.bar &&
          cfg.barOrientation === 'horizontal'
            ? { direction: 'horizontal' }
            : {}),
          ...(cfg.graphType === GraphType.area ? { fillOpacity: 0.5 } : {}),
          tooltip: {
            renderer:
              cfg.yAxis === IncidentYAxis.value
                ? (params: { datum: Record<string, unknown> }) => ({
                    content: formatCurrency(params.datum[cfg.yAxis] as number),
                  })
                : undefined,
          },
        },
      ];
    }
    return [];
  };

  const sampleOptions = useMemo(() => {
    // Use query data if available, otherwise use sample data
    const chartData = queryData?.customGraph || [];
    const hasRealData = chartData.length > 0 && !!metadata;

    // For display mode with metadata, use metadata values and real data
    // For configuration mode, use form values and sample data
    const isDisplayMode = !!metadata && !configOpen;

    // Determine which values to use - metadata takes precedence
    const displayGraphType = metadata?.graphType || graphType;
    const displayXAxis = metadata?.xAxis || xAxis;
    const displayYAxis = metadata?.yAxis || yAxis;
    const displayDateRange = metadata?.dateRange || dateRange;
    const displayNumberOfRecords = metadata?.numberOfRecords || numberOfRecords;
    const displayColorScheme = metadata?.colorScheme || colorScheme;
    const displayTitle = metadata?.title || title;
    const displaySubtitle = metadata?.subtitle || subtitle;
    const displayShowTitle = metadata?.showTitle ?? showTitle;
    const displayShowSubtitle = metadata?.showSubtitle ?? showSubtitle;
    const displayXAxisLabel = metadata?.xAxisLabel || xAxisLabel;
    const displayYAxisLabel = metadata?.yAxisLabel || yAxisLabel;
    const displayShowLegend = metadata?.showLegend ?? showLegend;
    const displayLegendPosition = metadata?.legendPosition || legendPosition;
    const displayInnerRadiusRatio =
      metadata?.innerRadiusRatio ?? innerRadiusRatio;
    const displayShowSectorLabels =
      metadata?.showSectorLabels ?? showSectorLabels;
    const displaySectorLabelType = metadata?.sectorLabelType || sectorLabelType;
    const displayShowCalloutLines =
      metadata?.showCalloutLines ?? showCalloutLines;
    const displayStrokeWidth = metadata?.strokeWidth ?? strokeWidth;
    const displayBarOrientation = metadata?.barOrientation || barOrientation;
    const displayDataType = metadata?.dataType || dataType;

    switch (displayGraphType) {
      case GraphType.pie: {
        // Pie chart configuration
        const pieData = hasRealData
          ? chartData.map((item) => ({
              category: item.label,
              value: item.value,
            }))
          : Array.from({ length: displayNumberOfRecords || 5 }, (_, i) => {
              const label =
                displayXAxis === IncidentXAxis.dateRange
                  ? `${displayDateRange} ${i + 1}`
                  : `Category ${i + 1}`;
              return {
                category: label,
                value: Math.floor(Math.random() * 100) + 10,
              };
            });

        return {
          background: {
            fill: 'transparent',
          },
          data: pieData,
          height: chartHeight,
          legend: displayShowLegend
            ? {
                position: displayLegendPosition || 'bottom',
              }
            : {
                enabled: false,
              },
          series: [
            {
              angleKey: hasRealData ? 'value' : displayYAxis,
              angleName:
                displayYAxis === IncidentYAxis.count ? 'Count' : 'Value',
              callout: {
                enabled: displayShowCalloutLines !== false,
                strokeWidth: displayStrokeWidth || 1,
              },
              calloutLabelKey:
                displayXAxis === IncidentXAxis.dateRange
                  ? displayDateRange
                  : 'category',
              fills:
                colorSchemes[displayColorScheme as keyof typeof colorSchemes] ||
                colorSchemes.default,
              innerRadiusRatio: displayInnerRadiusRatio || 0,
              sectorLabel: displayShowSectorLabels
                ? {
                    formatter: (params: {
                      angleKey: string;
                      datum: Record<string, number>;
                    }) => {
                      const value = params.datum[params.angleKey];
                      const total = pieData.reduce(
                        (sum, item) =>
                          sum +
                          Number(item[hasRealData ? 'value' : displayYAxis]),
                        0
                      );
                      if (displaySectorLabelType === 'percentage') {
                        return `${((value / total) * 100).toFixed(1)}%`;
                      } else if (displaySectorLabelType === 'both') {
                        return `${value} (${((value / total) * 100).toFixed(1)}%)`;
                      }
                      return `${value}`;
                    },
                  }
                : undefined,
              sectorLabelKey: displayShowSectorLabels
                ? hasRealData
                  ? 'value'
                  : displayYAxis
                : undefined,
              strokeWidth: displayStrokeWidth || 1,
              type: displayInnerRadiusRatio > 0 ? 'donut' : 'pie',
            },
          ],
          subtitle: displayShowSubtitle
            ? {
                text: displaySubtitle,
              }
            : undefined,
          theme: (isDark
            ? 'ag-default-dark'
            : 'ag-default') as AgChartOptions['theme'],
          title: displayShowTitle
            ? {
                text: displayTitle,
              }
            : undefined,
        };
      }
      case GraphType.gauge: {
        // Gauge chart configuration using donut chart
        let currentValue = 0;
        let gaugeLabel = 'Current Value';

        // Use real data if available
        if (hasRealData && chartData.length > 0) {
          // For gauge charts, we expect boolean data that we need to convert to percentages
          const displayGaugeMetric = metadata?.gaugeMetric || gaugeMetric;

          if (displayGaugeMetric === GaugeMetric.activityStatus) {
            // Count completed vs total activities
            const completedCount = chartData.filter(
              (item) => item.value === 1 // For boolean metrics, backend should return 1 for true, 0 for false
            ).length;
            const totalCount = chartData.length;
            currentValue =
              totalCount > 0
                ? Math.round((completedCount / totalCount) * 100)
                : 0;
            gaugeLabel = 'Completed Activities';
          } else if (displayGaugeMetric === GaugeMetric.incidentApproval) {
            // Count approved vs total incidents
            const approvedCount = chartData.filter(
              (item) => item.value === 1 // For boolean metrics, backend should return 1 for true, 0 for false
            ).length;
            const totalCount = chartData.length;
            currentValue =
              totalCount > 0
                ? Math.round((approvedCount / totalCount) * 100)
                : 0;
            gaugeLabel = 'Approved Incidents';
          }
        } else {
          // Sample data for configuration preview
          currentValue = Math.floor(Math.random() * 101); // 0-100%
        }

        // Ensure value is within bounds (0-100 for percentage)
        currentValue = Math.max(0, Math.min(100, currentValue));

        // Create donut chart data for gauge effect
        const gaugeData = [
          {
            category: 'Completed',
            color:
              colorSchemes[
                displayColorScheme as keyof typeof colorSchemes
              ]?.[0] || '#5470c6',
            value: currentValue,
          },
          {
            category: 'Remaining',
            color: isDark ? '#333' : '#f0f0f0',
            value: 100 - currentValue,
          },
        ];

        return {
          background: {
            fill: 'transparent',
          },
          data: gaugeData,
          height: chartHeight,
          legend: {
            enabled: false,
          },
          series: [
            {
              angleKey: 'value',
              callout: {
                enabled: false,
              },
              calloutLabelKey: 'category',
              fills: gaugeData.map((item) => item.color),
              innerRadiusRatio: 0.7,
              sectorLabel: {
                enabled: false,
              },
              strokeWidth: 0,
              tooltip: {
                enabled: true,
                renderer: ({ datum }: { datum: { category: string } }) => {
                  if (datum.category === 'Completed') {
                    return {
                      content: `${currentValue}%`,
                      title: gaugeLabel,
                    };
                  }
                  return {
                    content: '',
                    title: '',
                  };
                },
              },
              type: 'donut',
            },
          ],
          subtitle: displayShowSubtitle
            ? {
                text: displaySubtitle,
              }
            : undefined,
          theme: (isDark
            ? 'ag-default-dark'
            : 'ag-default') as AgChartOptions['theme'],
          title: displayShowTitle
            ? {
                text: displayTitle,
              }
            : undefined,
        };
      }
      case GraphType.bar:
      case GraphType.line:
      case GraphType.area: {
        // Generate sample data based on x-axis type
        const isDateRange =
          (displayDataType === DataType.incidents &&
            displayXAxis === IncidentXAxis.dateRange) ||
          (displayDataType === DataType.activities &&
            displayXAxis === ActivityXAxis.dateRange);
        const isActivityStatus =
          displayDataType === DataType.activities &&
          displayXAxis === ActivityXAxis.status;
        const itemCount = isDateRange
          ? displayNumberOfRecords
          : isActivityStatus
            ? 4
            : displayNumberOfRecords || 10;
        const labelGenerators: {
          activity: Record<ActivityXAxis, (index: number) => string>;
          incident: Record<IncidentXAxis, (index: number) => string>;
        } = {
          activity: {
            [ActivityXAxis.business]: (index: number) =>
              `Business ${index + 1}`,
            [ActivityXAxis.dateRange]: (index: number) => `Item ${index + 1}`,
            [ActivityXAxis.group]: (index: number) => `Group ${index + 1}`,
            [ActivityXAxis.status]: (index: number) => {
              const statuses = [
                'Pending',
                'In Progress',
                'Completed',
                'Cancelled',
              ];
              return statuses[index % statuses.length];
            },
          },
          incident: {
            [IncidentXAxis.brands]: (index: number) => `Brand ${index + 1}`,
            [IncidentXAxis.businesses]: (index: number) =>
              `Business ${index + 1}`,
            [IncidentXAxis.contentGroups]: (index: number) =>
              `Group ${index + 1}`,
            [IncidentXAxis.dateRange]: (index: number) => `Item ${index + 1}`,
            [IncidentXAxis.goodsTypes]: (index: number) => `Type ${index + 1}`,
            [IncidentXAxis.incidentTags]: (index: number) => `Tag ${index + 1}`,
            [IncidentXAxis.incidentTypes]: (index: number) =>
              `Incident Type ${index + 1}`,
          },
        };

        const generateIncidentLabel = (index: number, xAxis: IncidentXAxis) => {
          const generator = labelGenerators.incident[xAxis];
          return generator(index);
        };

        const generateActivityLabel = (index: number, xAxis: ActivityXAxis) => {
          const generator = labelGenerators.activity[xAxis];
          return generator(index);
        };

        const generateLabel = (index: number) => {
          // Handle date range cases for both data types
          if (
            (displayDataType === DataType.incidents &&
              displayXAxis === IncidentXAxis.dateRange) ||
            (displayDataType === DataType.activities &&
              displayXAxis === ActivityXAxis.dateRange)
          ) {
            return `${displayDateRange} ${index + 1}`;
          }

          // Handle incident-specific cases
          if (displayDataType === DataType.incidents) {
            return generateIncidentLabel(index, displayXAxis as IncidentXAxis);
          }

          // Handle activity-specific cases
          if (displayDataType === DataType.activities) {
            return generateActivityLabel(index, displayXAxis as ActivityXAxis);
          }

          return `Item ${index + 1}`;
        };

        const xKey = isDateRange ? displayDateRange : displayXAxis;

        const isHorizontalBar =
          displayBarOrientation === 'horizontal' &&
          displayGraphType === GraphType.bar;

        return {
          axes: [
            {
              position: isHorizontalBar ? 'left' : 'bottom',
              title: {
                enabled: isHorizontalBar ? false : !!displayXAxisLabel,
                text: displayXAxisLabel || displayXAxis,
              },
              type: 'category',
            },
            {
              label: {
                formatter:
                  (metadata?.yAxis || displayYAxis) === IncidentYAxis.value
                    ? (params: { value: number }) =>
                        formatCurrency(params.value)
                    : undefined,
              },
              position: isHorizontalBar ? 'bottom' : 'left',
              title: {
                enabled: !!displayYAxisLabel,
                text: displayYAxisLabel || displayYAxis,
              },
              type: 'number',
            },
          ],
          background: {
            fill: 'transparent',
          },
          data: hasRealData
            ? chartData.map((item) => ({
                [displayYAxis]: item.value,
                [xKey]: item.label,
              }))
            : Array.from({ length: itemCount || 10 }, (_, i) => ({
                [displayYAxis]: Math.floor(Math.random() * 100),
                [xKey]: generateLabel(i),
              })),
          height: chartHeight,
          label: {
            enabled: true,
          },
          legend: showLegend
            ? {
                position: legendPosition || 'bottom',
              }
            : {
                enabled: false,
              },
          series: getChartSeries(isDisplayMode).map((s, index) => {
            const schemeColors =
              colorSchemes[displayColorScheme as keyof typeof colorSchemes] ||
              colorSchemes.default;
            const color = schemeColors[index % schemeColors.length];
            return {
              ...s,
              fill: color,
              stroke: color,
            };
          }),
          subtitle: displayShowSubtitle
            ? {
                text: displaySubtitle,
              }
            : undefined,
          theme: (isDark
            ? 'ag-default-dark'
            : 'ag-default') as AgChartOptions['theme'],
          title: displayShowTitle
            ? {
                text: displayTitle,
              }
            : undefined,
        };
      }
      // No default
    }
    // Return a valid empty chart configuration instead of just height
    return {
      background: {
        fill: 'transparent',
      },
      data: [],
      height: chartHeight,
      legend: {
        enabled: false,
      },
      series: [],
      theme: isDark ? 'ag-default-dark' : 'ag-default',
    };
  }, [
    dataType,
    numberOfRecords,
    dateRange,
    graphType,
    barOrientation,
    subtitle,
    title,
    xAxis,
    yAxis,
    showTitle,
    showSubtitle,
    xAxisLabel,
    yAxisLabel,
    showLegend,
    legendPosition,
    isDark,
    colorScheme,
    innerRadiusRatio,
    showSectorLabels,
    sectorLabelType,
    showCalloutLines,
    strokeWidth,
    chartHeight,
    queryData,
    gaugeMin,
    gaugeMax,
    gaugeSegments,
    gaugeTarget,
    configOpen,
    metadata,
  ]);

  return (
    <Card
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '16px',
        position: 'relative',
      }}
      loading={loading}
      style={{ height: '100%' }}
    >
      <Row
        gutter={4}
        style={{ position: 'absolute', right: 10, top: 10, zIndex: 10 }}
      >
        <Col>
          <Button
            icon={<FontAwesomeIcon icon={faCogs} />}
            onClick={toggleConfig}
            type="text"
          />
        </Col>
        <Col>
          <Button
            icon={<FontAwesomeIcon color="red" icon={faTrash} />}
            onClick={() => removeItem(elementId || 'dashboardGraph')}
            type="text"
          />
        </Col>
      </Row>

      <div
        ref={chartContainerRef}
        style={{ flex: 1, minHeight: 0, position: 'relative', width: '100%' }}
      >
        {metadata || (isGraphConfigComplete && chartHeight > 0) ? (
          <>
            <AgCharts options={sampleOptions as AgChartOptions} />
            {/* Center text overlay for gauge charts */}
            {(metadata?.graphType || graphType) === GraphType.gauge && (
              <div
                style={{
                  left: '50%',
                  pointerEvents: 'none',
                  position: 'absolute',
                  textAlign: 'center',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                }}
              >
                <div
                  style={{
                    color: isDark ? '#ffffff' : '#000000',
                    fontSize: 32,
                    fontWeight: 'bold',
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {(() => {
                    // Get the current value from the chart data
                    const chartData = queryData?.customGraph || [];
                    const hasRealData = chartData.length > 0 && !!metadata;

                    if (hasRealData) {
                      const displayGaugeMetric =
                        metadata?.gaugeMetric || gaugeMetric;
                      let currentValue = 0;

                      if (displayGaugeMetric === GaugeMetric.activityStatus) {
                        const completedCount = chartData.filter(
                          (item) => item.value === 1 // For boolean metrics, backend should return 1 for true, 0 for false
                        ).length;
                        const totalCount = chartData.length;
                        currentValue =
                          totalCount > 0
                            ? Math.round((completedCount / totalCount) * 100)
                            : 0;
                      } else if (
                        displayGaugeMetric === GaugeMetric.incidentApproval
                      ) {
                        const approvedCount = chartData.filter(
                          (item) => item.value === 1 // For boolean metrics, backend should return 1 for true, 0 for false
                        ).length;
                        const totalCount = chartData.length;
                        currentValue =
                          totalCount > 0
                            ? Math.round((approvedCount / totalCount) * 100)
                            : 0;
                      }

                      return `${currentValue}%`;
                    } else {
                      // Sample data for configuration preview
                      const sampleValue = Math.floor(Math.random() * 101);
                      return `${sampleValue}%`;
                    }
                  })()}
                </div>
                <div
                  style={{
                    color: isDark ? '#cccccc' : '#666666',
                    fontSize: 14,
                    lineHeight: 1,
                  }}
                >
                  {(() => {
                    const displayGaugeMetric =
                      metadata?.gaugeMetric || gaugeMetric;
                    if (displayGaugeMetric === GaugeMetric.activityStatus) {
                      return 'Completed Activities';
                    } else if (
                      displayGaugeMetric === GaugeMetric.incidentApproval
                    ) {
                      return 'Approved Incidents';
                    }
                    return 'Current Value';
                  })()}
                </div>
              </div>
            )}
          </>
        ) : (
          <div
            style={{
              alignItems: 'center',
              color: '#8c8c8c',
              display: 'flex',
              fontSize: 14,
              height: '100%',
              justifyContent: 'center',
            }}
          >
            {intl.formatMessage({
              defaultMessage: 'Configure the graph settings to see preview',
            })}
          </div>
        )}
      </div>

      <Drawer
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button onClick={toggleConfig} style={{ marginRight: 8 }}>
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
            </Button>
            <Button onClick={handleSave} type="primary">
              {intl.formatMessage({ defaultMessage: 'Save' })}
            </Button>
          </div>
        }
        onClose={toggleConfig}
        style={{ zIndex: 1000 }}
        title={intl.formatMessage({ defaultMessage: 'Configure Graph' })}
        visible={configOpen}
        width={1000}
      >
        {isGraphConfigComplete && (
          <div style={{ height: 300, marginBottom: 24, width: '100%' }}>
            <AgCharts
              options={{ ...sampleOptions, height: 300 } as AgChartOptions}
            />
          </div>
        )}
        <Form<FormValues>
          form={form}
          initialValues={{
            barOrientation: 'vertical',
            colorScheme: 'default',
            filterDatePeriod: undefined, // No default filter
            gaugeMax: 100,
            gaugeMin: 0,
            gaugeSegments: 5,
            innerRadiusRatio: 0,
            legendPosition: 'bottom',
            numberOfRecords: 10, // Combined field for all record/date limits
            sectorLabelType: 'value',
            showCalloutLines: true,
            showLegend: true,
            showSectorLabels: true,
            showSubtitle: false,
            showTitle: true,
            strokeWidth: 1,
            subtitle: '',
            title: '',
            xAxisLabel: '',
            yAxisLabel: '',
          }}
          layout="vertical"
          style={{ marginTop: 24 }}
        >
          <Divider style={{ marginBottom: 24, marginTop: 0 }}>
            <Typography.Text strong style={{ fontSize: 16 }}>
              {intl.formatMessage({ defaultMessage: 'Graph Configuration' })}
            </Typography.Text>
          </Divider>

          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Graph Type' })}
            name="graphType"
            rules={[{ message: 'Please select a graph type', required: true }]}
          >
            <IconRadio
              options={[
                {
                  icon: faBarChart,
                  label: intl.formatMessage({ defaultMessage: 'Bar Graph' }),
                  value: GraphType.bar,
                },
                {
                  icon: faLineChart,
                  label: intl.formatMessage({ defaultMessage: 'Line Graph' }),
                  value: GraphType.line,
                },
                {
                  icon: faAreaChart,
                  label: intl.formatMessage({ defaultMessage: 'Area Graph' }),
                  value: GraphType.area,
                },
                {
                  disabled: true,
                  icon: faPieChart,
                  label: intl.formatMessage({ defaultMessage: 'Pie Chart' }),
                  value: GraphType.pie,
                },
                {
                  disabled: true,
                  icon: faGauge,
                  label: intl.formatMessage({ defaultMessage: 'Gauge' }),
                  value: GraphType.gauge,
                },
              ]}
            />
          </Form.Item>
          {graphType === GraphType.bar && (
            <Form.Item
              label={intl.formatMessage({ defaultMessage: 'Bar Orientation' })}
              name="barOrientation"
            >
              <IconRadio
                options={[
                  {
                    icon: faChartColumn,
                    label: intl.formatMessage({ defaultMessage: 'Vertical' }),
                    value: 'vertical',
                  },
                  {
                    icon: faArrowsLeftRight,
                    label: intl.formatMessage({ defaultMessage: 'Horizontal' }),
                    value: 'horizontal',
                  },
                ]}
              />
            </Form.Item>
          )}
          {showDataType && (
            <Form.Item
              label={intl.formatMessage({ defaultMessage: 'Data Type' })}
              name="dataType"
              rules={[
                {
                  message: 'Please select a data type for the graph',
                  required: true,
                },
              ]}
            >
              <IconRadio
                options={[
                  {
                    icon: faExclamationCircle,
                    label: intl.formatMessage({ defaultMessage: 'Incidents' }),
                    value: DataType.incidents,
                  },
                  {
                    disabled: true,
                    icon: faUsers,
                    label: intl.formatMessage({ defaultMessage: 'Offenders' }),
                    tooltip: intl.formatMessage({
                      defaultMessage: 'Coming soon...',
                    }),
                    value: DataType.offenders,
                  },
                  {
                    disabled: true,
                    icon: faTasks,
                    label: intl.formatMessage({ defaultMessage: 'Activities' }),
                    value: DataType.activities,
                  },
                ]}
              />
            </Form.Item>
          )}
          {showGaugeMetric && (
            <Form.Item
              label={intl.formatMessage({ defaultMessage: 'Gauge Metric' })}
              name="gaugeMetric"
              rules={[
                {
                  message: 'Please select a metric for the gauge',
                  required: true,
                },
              ]}
            >
              <IconRadio
                options={
                  dataType === DataType.activities
                    ? [
                        {
                          icon: faCheckCircle,
                          label: intl.formatMessage({
                            defaultMessage: 'Activity Status',
                          }),
                          value: GaugeMetric.activityStatus,
                        },
                      ]
                    : dataType === DataType.incidents
                      ? [
                          {
                            icon: faSquareCheck,
                            label: intl.formatMessage({
                              defaultMessage: 'Incident Approval',
                            }),
                            value: GaugeMetric.incidentApproval,
                          },
                        ]
                      : []
                }
              />
            </Form.Item>
          )}
          {showXAxis && (
            <Form.Item
              label={
                graphType === GraphType.pie
                  ? intl.formatMessage({ defaultMessage: 'Group By' })
                  : intl.formatMessage({ defaultMessage: 'X Axis' })
              }
              name="xAxis"
              rules={[
                {
                  message:
                    graphType === GraphType.pie
                      ? intl.formatMessage({
                          defaultMessage: 'Please select how to group the data',
                        })
                      : intl.formatMessage({
                          defaultMessage:
                            'Please select an X Axis for the graph',
                        }),
                  required: true,
                },
              ]}
            >
              <IconRadio options={getXAxisOptions()} />
            </Form.Item>
          )}
          {showDateOptions && (
            <Row gutter={16}>
              <Col>
                <Form.Item
                  label={intl.formatMessage({ defaultMessage: 'Date Range' })}
                  name="dateRange"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage:
                          'Please select a date range for the graph',
                      }),
                      required: true,
                    },
                  ]}
                >
                  <Select
                    options={[
                      { label: 'Quarter', value: DatePeriod.quarter },
                      { label: 'Month', value: DatePeriod.month },
                      { label: 'Week', value: DatePeriod.week },
                      { label: 'Day', value: DatePeriod.day },
                      { label: 'Year', value: DatePeriod.year },
                    ]}
                    style={{ minWidth: 200 }}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  extra={intl.formatMessage({
                    defaultMessage:
                      'Limits the number of periods for date ranges or records for other data',
                  })}
                  label={intl.formatMessage({
                    defaultMessage: 'Number of Items',
                  })}
                  name="numberOfRecords"
                  rules={[
                    {
                      message: 'Please select the number of items to show.',
                      required: true,
                    },
                  ]}
                >
                  <InputNumber max={50} min={1} />
                </Form.Item>
              </Col>
            </Row>
          )}
          {showXAxis &&
            !(
              dataType === DataType.incidents &&
              xAxis === IncidentXAxis.dateRange
            ) &&
            !(
              dataType === DataType.activities &&
              xAxis === ActivityXAxis.dateRange
            ) &&
            !(
              dataType === DataType.activities && xAxis === ActivityXAxis.status
            ) && (
              <Form.Item
                extra={intl.formatMessage({
                  defaultMessage:
                    'This represents the number of top records to fetch from the database',
                })}
                label={intl.formatMessage({
                  defaultMessage: 'Number of Records',
                })}
                name="numberOfRecords"
                rules={[
                  {
                    message: 'Please enter the number of records to display.',
                    required: true,
                  },
                ]}
              >
                <InputNumber max={50} min={1} />
              </Form.Item>
            )}
          {showYAxis && (
            <Form.Item
              label={intl.formatMessage({ defaultMessage: 'Y Axis' })}
              name="yAxis"
              rules={[
                {
                  message: 'Please select an Y Axis for the graph',
                  required: true,
                },
              ]}
            >
              <IconRadio options={getYAxisOptions()} />
            </Form.Item>
          )}

          {(isGraphConfigComplete || graphType === GraphType.gauge) && (
            <>
              {graphType !== GraphType.gauge && (
                <>
                  <Divider style={{ marginBottom: 24, marginTop: 32 }}>
                    <Typography.Text strong style={{ fontSize: 16 }}>
                      {intl.formatMessage({ defaultMessage: 'Graph Filters' })}
                    </Typography.Text>
                  </Divider>

                  <div style={{ marginBottom: 32 }}>
                    <FiltersController filters={getFilterConfig()} />
                  </div>
                </>
              )}

              <Divider style={{ margin: '32px 0' }}>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  {intl.formatMessage({ defaultMessage: 'Graph Appearance' })}
                </Typography.Title>
              </Divider>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={intl.formatMessage({ defaultMessage: 'Title' })}
                    style={{ marginBottom: 16 }}
                  >
                    <Row align="middle" gutter={8}>
                      <Col flex="auto">
                        <Form.Item
                          name="title"
                          noStyle
                          rules={[
                            {
                              message: intl.formatMessage({
                                defaultMessage: 'Please enter a title',
                              }),
                              required: showTitle,
                            },
                          ]}
                        >
                          <Input
                            disabled={!showTitle}
                            placeholder={intl.formatMessage({
                              defaultMessage: 'Enter graph title',
                            })}
                            style={{ opacity: showTitle ? 1 : 0.5 }}
                          />
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item
                          name="showTitle"
                          noStyle
                          valuePropName="checked"
                        >
                          <Switch />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label={intl.formatMessage({ defaultMessage: 'Subtitle' })}
                    style={{ marginBottom: 16 }}
                  >
                    <Row align="middle" gutter={8}>
                      <Col flex="auto">
                        <Form.Item
                          name="subtitle"
                          noStyle
                          rules={[
                            {
                              message: intl.formatMessage({
                                defaultMessage: 'Please enter a subtitle',
                              }),
                              required: showSubtitle,
                            },
                          ]}
                        >
                          <Input
                            disabled={!showSubtitle}
                            placeholder={intl.formatMessage({
                              defaultMessage: 'Enter graph subtitle',
                            })}
                            style={{ opacity: showSubtitle ? 1 : 0.5 }}
                          />
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item
                          name="showSubtitle"
                          noStyle
                          valuePropName="checked"
                        >
                          <Switch />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
              </Row>

              {graphType !== GraphType.pie && (
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label={intl.formatMessage({
                        defaultMessage: 'X Axis Label',
                      })}
                      name="xAxisLabel"
                    >
                      <Input
                        placeholder={intl.formatMessage({
                          defaultMessage: 'Custom X axis label (optional)',
                        })}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Y Axis Label',
                      })}
                      name="yAxisLabel"
                    >
                      <Input
                        placeholder={intl.formatMessage({
                          defaultMessage: 'Custom Y axis label (optional)',
                        })}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              )}

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={intl.formatMessage({ defaultMessage: 'Legend' })}
                    style={{ marginBottom: 16 }}
                  >
                    <Row align="middle" gutter={8}>
                      <Col flex="auto">
                        <Form.Item
                          initialValue="bottom"
                          name="legendPosition"
                          noStyle
                        >
                          <Select
                            disabled={!showLegend}
                            options={[
                              {
                                label: intl.formatMessage({
                                  defaultMessage: 'Top',
                                }),
                                value: 'top',
                              },
                              {
                                label: intl.formatMessage({
                                  defaultMessage: 'Bottom',
                                }),
                                value: 'bottom',
                              },
                              {
                                label: intl.formatMessage({
                                  defaultMessage: 'Left',
                                }),
                                value: 'left',
                              },
                              {
                                label: intl.formatMessage({
                                  defaultMessage: 'Right',
                                }),
                                value: 'right',
                              },
                            ]}
                            style={{ opacity: showLegend ? 1 : 0.5 }}
                          />
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item
                          name="showLegend"
                          noStyle
                          valuePropName="checked"
                        >
                          <Switch />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                initialValue="default"
                label={intl.formatMessage({ defaultMessage: 'Color Scheme' })}
                name="colorScheme"
                style={{ marginBottom: 16 }}
              >
                <Select
                  options={[
                    {
                      label: intl.formatMessage({ defaultMessage: 'Default' }),
                      value: 'default',
                    },
                    {
                      label: intl.formatMessage({ defaultMessage: 'Pastel' }),
                      value: 'pastel',
                    },
                    {
                      label: intl.formatMessage({ defaultMessage: 'Vibrant' }),
                      value: 'vibrant',
                    },
                    {
                      label: intl.formatMessage({ defaultMessage: 'Ocean' }),
                      value: 'ocean',
                    },
                    {
                      label: intl.formatMessage({ defaultMessage: 'Forest' }),
                      value: 'forest',
                    },
                    {
                      label: intl.formatMessage({ defaultMessage: 'Sunset' }),
                      value: 'sunset',
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Monochrome',
                      }),
                      value: 'monochrome',
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Corporate',
                      }),
                      value: 'corporate',
                    },
                  ]}
                />
              </Form.Item>

              <Row>
                <Col span={24}>
                  <div
                    style={{
                      display: 'flex',
                      gap: 4,
                      height: 20,
                      marginBottom: 16,
                      marginTop: -8,
                    }}
                  >
                    {colorSchemes[
                      colorScheme as keyof typeof colorSchemes
                    ]?.map((color, index) => (
                      <div
                        key={index}
                        style={{
                          backgroundColor: color,
                          borderRadius: 2,
                          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                          flex: 1,
                        }}
                      />
                    ))}
                  </div>
                </Col>
              </Row>
            </>
          )}

          {isGraphConfigComplete && graphType === GraphType.pie && (
            <>
              <Divider style={{ margin: '32px 0' }}>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  {intl.formatMessage({ defaultMessage: 'Pie Chart Options' })}
                </Typography.Title>
              </Divider>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    initialValue={0}
                    label={intl.formatMessage({
                      defaultMessage: 'Inner Radius (Donut)',
                    })}
                    name="innerRadiusRatio"
                  >
                    <Slider
                      marks={{
                        0: '0%',
                        0.3: '30%',
                        0.5: '50%',
                        0.7: '70%',
                        0.9: '90%',
                      }}
                      max={0.9}
                      min={0}
                      step={0.1}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    initialValue={1}
                    label={intl.formatMessage({
                      defaultMessage: 'Stroke Width',
                    })}
                    name="strokeWidth"
                  >
                    <Slider
                      marks={{
                        0: '0',
                        1: '1',
                        2: '2',
                        3: '3',
                        4: '4',
                        5: '5',
                      }}
                      max={5}
                      min={0}
                      step={1}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Sector Labels' })}
                style={{ marginBottom: 16 }}
              >
                <Row align="middle" gutter={8}>
                  <Col flex="auto">
                    <Form.Item
                      initialValue="value"
                      name="sectorLabelType"
                      noStyle
                    >
                      <Select
                        disabled={!showSectorLabels}
                        options={[
                          {
                            label: intl.formatMessage({
                              defaultMessage: 'Value Only',
                            }),
                            value: 'value',
                          },
                          {
                            label: intl.formatMessage({
                              defaultMessage: 'Percentage Only',
                            }),
                            value: 'percentage',
                          },
                          {
                            label: intl.formatMessage({
                              defaultMessage: 'Value & Percentage',
                            }),
                            value: 'both',
                          },
                        ]}
                        style={{ opacity: showSectorLabels ? 1 : 0.5 }}
                      />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      initialValue={true}
                      name="showSectorLabels"
                      noStyle
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Callout Lines' })}
                style={{ marginBottom: 16 }}
              >
                <Row align="middle" gutter={8}>
                  <Col>
                    <Typography.Text style={{ marginRight: 8 }}>
                      {intl.formatMessage({
                        defaultMessage: 'Show callout lines for labels',
                      })}
                    </Typography.Text>
                  </Col>
                  <Col>
                    <Form.Item
                      initialValue={true}
                      name="showCalloutLines"
                      noStyle
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
            </>
          )}

          {graphType === GraphType.gauge && (
            <>
              <Divider style={{ margin: '32px 0' }}>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  {intl.formatMessage({ defaultMessage: 'Gauge Options' })}
                </Typography.Title>
              </Divider>

              <div
                style={{
                  backgroundColor: isDark ? '#1f1f1f' : '#f6f6f6',
                  borderRadius: 6,
                  marginBottom: 16,
                  padding: '12px 16px',
                }}
              >
                <Typography.Text style={{ fontSize: 14 }} type="secondary">
                  {intl.formatMessage({
                    defaultMessage:
                      'Gauge displays percentage of true values from the selected metric (0-100%)',
                  })}
                </Typography.Text>
              </div>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    initialValue={0}
                    label={intl.formatMessage({
                      defaultMessage: 'Minimum Value',
                    })}
                    name="gaugeMin"
                  >
                    <InputNumber disabled style={{ width: '100%' }} value={0} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    initialValue={100}
                    label={intl.formatMessage({
                      defaultMessage: 'Maximum Value',
                    })}
                    name="gaugeMax"
                  >
                    <InputNumber
                      disabled
                      style={{ width: '100%' }}
                      value={100}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    extra={intl.formatMessage({
                      defaultMessage:
                        'Set a target percentage for comparison (e.g., 80%)',
                    })}
                    label={intl.formatMessage({
                      defaultMessage: 'Target Percentage (optional)',
                    })}
                    name="gaugeTarget"
                  >
                    <InputNumber
                      max={100}
                      min={0}
                      placeholder={intl.formatMessage({
                        defaultMessage: 'e.g., 80',
                      })}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
        </Form>
      </Drawer>
    </Card>
  );
};

export default DashboardGraph;
