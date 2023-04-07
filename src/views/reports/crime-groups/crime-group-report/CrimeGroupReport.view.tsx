import React from 'react';
import {
  Card,
  Col,
  Empty,
  Row,
  Select,
  Statistic,
  Table,
  Typography,
} from 'antd';
import type { CrimeGroupReportQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faChartLineDown,
  faClipboard,
  faExclamationCircle,
  faMoneyBill,
  faUserPolice,
  faUserPoliceTie,
} from '@fortawesome/pro-light-svg-icons';
import DatePicker from 'components/util-components/DatePicker';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import type { PointTooltipProps } from '@nivo/line';
import { ResponsiveLine } from '@nivo/line';
import moment from 'moment/moment';
import { ResponsiveRadialBar } from '@nivo/radial-bar';
import { GoogleMap, HeatmapLayer, Marker } from '@react-google-maps/api';
import CrimeGroupSideList from 'components/crimeGroups/sidelist';
import type { SelectOptions } from './useCrimeGroupReport';
import useStyles from './CrimeGroupReport.styles';
import filteredBarData from './utils/FilteredBarData';

const containerStyle = {
  width: '100%',
  height: '600px',
};

const { Title } = Typography;

interface Props {
  loading: boolean;
  data: CrimeGroupReportQuery | undefined;
  groups: SelectOptions[];
  groupsLoading: boolean;
  dateRange: { startDate: Date; endDate: Date };
  setDateRange: (dateRange: { startDate: Date; endDate: Date }) => void;
  setSelectedGroups: (groups: string[]) => void;
  selectedGroups: string[];
  selectedCrimeGroup: string;
  selectedBusiness: string[];
  setSelectedBusiness: (businesses: string[]) => void;
  businesses: SelectOptions[];
}

const CrimeGroupReport = ({
  data,
  loading,
  setDateRange,
  dateRange,
  groups,
  setSelectedGroups,
  groupsLoading,
  selectedGroups,
  selectedCrimeGroup,
  setSelectedBusiness,
  selectedBusiness,
  businesses,
}: Props) => {
  const classes = useStyles();

  const tooltip = ({ point }: PointTooltipProps) => (
    <div
      style={{
        background: 'white',
        padding: '9px 12px',
        border: '1px solid #ccc',
      }}
    >
      <Typography.Text strong>{point.data.xFormatted}: </Typography.Text>
      <Typography.Text>{point.data.yFormatted} incidents</Typography.Text>
    </div>
  );

  return (
    <Row wrap={false}>
      <Col>
        <CrimeGroupSideList
          to="/app/reports/crime-groups/"
          current={selectedCrimeGroup || ''}
        />
      </Col>
      <Col flex={1}>
        <div className={classes.page}>
          <Title level={2}>
            Crime Group Report:{' '}
            {data?.crimeGroup?.alias ?? `CG-${data?.crimeGroup?.reference}`}
          </Title>
          <Row style={{ marginBottom: 10 }}>
            <Col span={6}>
              <Select
                placeholder="Select Groups"
                mode="multiple"
                maxTagCount="responsive"
                onChange={(value) => {
                  setSelectedGroups(value || []);
                }}
                value={selectedGroups}
                defaultValue={groups.map((group) => group.value)}
                style={{ width: '100%', marginRight: 10 }}
              >
                {groups?.map((group) => (
                  <Select.Option
                    loading={groupsLoading}
                    key={group.value}
                    value={group.value}
                  >
                    {group.label}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={6}>
              <Select
                placeholder="Select Business"
                mode="multiple"
                maxTagCount="responsive"
                onChange={(value) => {
                  setSelectedBusiness(value || []);
                }}
                value={selectedBusiness}
                defaultValue={businesses.map((business) => business.value)}
                style={{ width: '100%' }}
              >
                {businesses?.map((business) => (
                  <Select.Option
                    loading={groupsLoading}
                    key={business.value}
                    value={business.value}
                  >
                    {business.label}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={12}>
              <DatePicker.RangePicker
                style={{ marginLeft: 10 }}
                defaultValue={[dateRange.startDate, dateRange.endDate]}
                value={[dateRange.startDate, dateRange.endDate]}
                onChange={(value) => {
                  setDateRange(
                    value
                      ? {
                          startDate:
                            value?.[0] ||
                            new Date(
                              new Date(
                                new Date().setMonth(new Date().getMonth() - 1)
                              ).setHours(0, 0, 59)
                            ),
                          endDate:
                            value?.[1] ||
                            new Date(new Date().setHours(23, 59, 59)),
                        }
                      : {
                          startDate: new Date(
                            new Date(
                              new Date().setMonth(new Date().getMonth() - 1)
                            ).setHours(0, 0, 59)
                          ),
                          endDate: new Date(new Date().setHours(23, 59, 59)),
                        }
                  );
                }}
              />
            </Col>
          </Row>
          <Card loading={loading}>
            <Row gutter={16} style={{ marginTop: 24, marginBottom: 12 }}>
              <Col span={12}>
                <Title level={4}>Incidents Summary</Title>
              </Col>
              <Row gutter={64}>
                <Col>
                  <Statistic
                    title="Total Incidents"
                    value={
                      data?.crimeGroupReport?.incidentSummary?.totalIncidents ||
                      0
                    }
                    prefix={
                      <FontAwesomeIcon
                        className={classes.prefixIcon}
                        icon={faExclamationCircle}
                      />
                    }
                  />
                </Col>
                <Col>
                  <Statistic
                    title="Last Incident (in range)"
                    value={
                      data?.crimeGroupReport?.incidentSummary?.lastIncidentDate
                        ? new Date(
                            data?.crimeGroupReport?.incidentSummary?.lastIncidentDate
                          ).toLocaleDateString()
                        : 'unknown'
                    }
                    prefix={
                      <FontAwesomeIcon
                        className={classes.prefixIcon}
                        icon={faCalendar}
                      />
                    }
                  />
                </Col>
                <Col>
                  <Statistic
                    title="Reported to Police"
                    value={
                      data?.crimeGroupReport?.incidentSummary
                        ?.incidentsReportedToPolice || 0
                    }
                    prefix={
                      <FontAwesomeIcon
                        className={classes.prefixIcon}
                        icon={faUserPolice}
                      />
                    }
                  />
                </Col>
                <Col>
                  <Statistic
                    title="Police Attended"
                    value={
                      data?.crimeGroupReport?.incidentSummary
                        ?.incidentsWherePoliceAttended || 0
                    }
                    prefix={
                      <FontAwesomeIcon
                        className={classes.prefixIcon}
                        icon={faUserPoliceTie}
                      />
                    }
                  />
                </Col>
                <Col>
                  <Statistic
                    title="Most common crime type"
                    value={
                      data?.crimeGroupReport?.incidentSummary
                        ?.mostCommonCrimeType || ''
                    }
                    prefix={
                      <FontAwesomeIcon
                        className={classes.prefixIcon}
                        icon={faClipboard}
                      />
                    }
                  />
                </Col>
              </Row>
            </Row>
            <Row gutter={16} style={{ marginTop: 24 }}>
              <Col span={12}>
                <Title level={4}>Loss Summary</Title>
              </Col>
              <Row gutter={64}>
                <Col>
                  <Statistic
                    title="Total lost value"
                    value={
                      data?.crimeGroupReport?.lossTotals?.totalLostValue
                        ? `£${data?.crimeGroupReport?.lossTotals?.totalLostValue.toFixed(
                            2
                          )}`
                        : 'No Losses'
                    }
                    prefix={
                      <FontAwesomeIcon
                        className={classes.prefixIcon}
                        icon={faMoneyBill}
                        color="red"
                      />
                    }
                  />
                </Col>
                <Col>
                  <Statistic
                    title="Total recovered value"
                    value={
                      data?.crimeGroupReport?.lossTotals?.totalRecoveredValue
                        ? `£${data?.crimeGroupReport?.lossTotals?.totalRecoveredValue.toFixed(
                            2
                          )}`
                        : 'No Recoveries'
                    }
                    prefix={
                      <FontAwesomeIcon
                        className={classes.prefixIcon}
                        icon={faMoneyBill}
                        color="green"
                      />
                    }
                  />
                </Col>
                <Col>
                  <Statistic
                    title="Average Success Rate"
                    value={`${(
                      data?.crimeGroupReport?.lossTotals?.averageSuccessRate ||
                      0
                    ).toFixed(2)}%`}
                    prefix={
                      <FontAwesomeIcon
                        className={classes.prefixIcon}
                        icon={faChartLineDown}
                      />
                    }
                  />
                </Col>
                <Col>
                  <Statistic
                    title="Average Loss per Incident"
                    value={
                      `£${data?.crimeGroupReport?.lossTotals?.averagePerIncident.toFixed(
                        2
                      )}` || ''
                    }
                    prefix={
                      <FontAwesomeIcon
                        className={classes.prefixIcon}
                        icon={faMoneyBill}
                      />
                    }
                  />
                </Col>
                <Col />
              </Row>
            </Row>
          </Card>

          <Card style={{ marginTop: 24 }} loading={loading}>
            <Row gutter={16}>
              <Col span={24}>
                <Card loading={loading} style={{ height: '100%' }}>
                  <Title level={4}>Offenders Table</Title>
                  <Table
                    size="small"
                    pagination={{
                      total: data?.offendersPerformance?.total || 0,
                      defaultPageSize: 10,
                      showSizeChanger: true,
                      showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total}`,
                    }}
                    columns={[
                      {
                        key: 'fullName',
                        dataIndex: 'fullName',
                        title: 'Name',
                        sorter: (a, b) => a.fullName.localeCompare(b.fullName),
                      },
                      {
                        key: 'totalIncidents',
                        dataIndex: 'totalIncidents',
                        title: 'Incidents',
                        defaultSortOrder: 'descend',
                        sorter: (a, b) => a.totalIncidents - b.totalIncidents,
                      },
                      {
                        key: 'alertId',
                        dataIndex: 'alertId',
                        title: 'AlertId',
                      },
                      {
                        key: 'lastIncident',
                        dataIndex: 'lastIncident',
                        title: 'Last Incident',
                      },
                      {
                        key: 'lostValue',
                        dataIndex: 'lostValue',
                        title: 'Lost value',
                        sorter: (a, b) =>
                          Number.parseInt(a.lostValue || '0', 10) -
                          Number.parseInt(b.lostValue || '0', 10),
                      },
                      {
                        key: 'recoveredValue',
                        dataIndex: 'recoveredValue',
                        title: 'Recovered value',
                        sorter: (a, b) =>
                          Number.parseInt(a.recoveredValue || '0', 10) -
                          Number.parseInt(b.recoveredValue || '0', 10),
                      },
                      {
                        key: 'successRate',
                        dataIndex: 'successRate',
                        title: 'SuccessRate',
                        sorter: (a, b) =>
                          Number.parseInt(a.successRate || '0', 10) -
                          Number.parseInt(b.successRate || '0', 10),
                        render: (text) => (
                          <Typography.Text>{text}%</Typography.Text>
                        ),
                      },
                    ]}
                    dataSource={data?.offendersPerformance?.offenderPerformance?.map(
                      (offender, i) => ({
                        totalIncidents: offender.totalIncidents,
                        key: offender.name + i,
                        alertId: offender.alertId,
                        fullName: offender.name,
                        image: offender.primaryPhoto,
                        lastIncident: offender.lastIncidentDate
                          ? new Date(
                              offender.lastIncidentDate
                            ).toLocaleDateString()
                          : 'N/A',
                        lostValue: offender.totalLostValue.toFixed(2),
                        recoveredValue: offender.totalRecoveredValue.toFixed(2),
                        successRate: (
                          (offender.totalSuccessRate || 0) * 100
                        ).toFixed(2),
                      })
                    )}
                  />
                </Card>
              </Col>
            </Row>
          </Card>

          <Card style={{ marginTop: 24 }} loading={loading}>
            <Row gutter={16}>
              <Col span={12}>
                <div style={{ height: 400 }}>
                  <Typography.Title level={4}>
                    Crime Types By Offender
                  </Typography.Title>
                  {data?.crimeGroupReport?.crimeTypeByOffender &&
                  data?.crimeGroupReport?.crimeTypeByOffender.length > 0 &&
                  filteredBarData({
                    data: data?.crimeGroupReport?.crimeTypeByOffender,
                  }).length > 0 ? (
                    <ResponsiveBar
                      indexBy="label"
                      data={
                        filteredBarData({
                          data: data?.crimeGroupReport?.crimeTypeByOffender,
                        }) || [
                          {
                            country: 'No Data',
                            label: 'No Data',
                          },
                        ]
                      }
                      keys={
                        Object.keys(
                          filteredBarData({
                            data: data?.crimeGroupReport?.crimeTypeByOffender,
                            // eslint-disable-next-line unicorn/no-array-reduce
                          }).reduce((acc, cur) => ({
                            ...acc,
                            ...cur,
                          }))
                        ).filter((key) => key !== 'label') || []
                      }
                      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                      padding={0.3}
                      groupMode="grouped"
                      valueScale={{ type: 'linear' }}
                      indexScale={{ type: 'band', round: true }}
                      colors={{ scheme: 'nivo' }}
                      borderColor={{
                        from: 'color',
                        modifiers: [['darker', 1.6]],
                      }}
                      axisTop={null}
                      axisRight={null}
                      labelSkipWidth={12}
                      labelSkipHeight={12}
                      labelTextColor={{
                        from: 'color',
                        modifiers: [['darker', 1.6]],
                      }}
                      legends={[
                        {
                          dataFrom: 'keys',
                          anchor: 'bottom-right',
                          direction: 'column',
                          justify: false,
                          translateX: 120,
                          translateY: 0,
                          itemsSpacing: 2,
                          itemWidth: 100,
                          itemHeight: 20,
                          itemDirection: 'left-to-right',
                          itemOpacity: 0.85,
                          symbolSize: 20,
                          effects: [
                            {
                              on: 'hover',
                              style: {
                                itemOpacity: 1,
                              },
                            },
                          ],
                        },
                      ]}
                    />
                  ) : (
                    <Empty description="No crime types or offenders" />
                  )}
                </div>
              </Col>
              <Col span={12}>
                <div style={{ height: 400 }}>
                  <Typography.Title level={4}>
                    Goods Type Value By Offender
                  </Typography.Title>
                  {data?.crimeGroupReport?.offenderGoodsTypeValue &&
                  data?.crimeGroupReport?.offenderGoodsTypeValue.length > 0 &&
                  filteredBarData({
                    data: data?.crimeGroupReport?.offenderGoodsTypeValue,
                  }).length > 0 ? (
                    <ResponsiveBar
                      legends={[
                        {
                          dataFrom: 'keys',
                          anchor: 'bottom-right',
                          direction: 'column',
                          justify: false,
                          translateX: 120,
                          translateY: 0,
                          itemsSpacing: 2,
                          itemWidth: 100,
                          itemHeight: 20,
                          itemDirection: 'left-to-right',
                          itemOpacity: 0.85,
                          symbolSize: 20,
                          effects: [
                            {
                              on: 'hover',
                              style: {
                                itemOpacity: 1,
                              },
                            },
                          ],
                        },
                      ]}
                      indexBy="label"
                      data={
                        filteredBarData({
                          data: data?.crimeGroupReport?.offenderGoodsTypeValue,
                        }) || [
                          {
                            label: 'No Data',
                          },
                        ]
                      }
                      keys={
                        Object.keys(
                          filteredBarData({
                            data: data?.crimeGroupReport
                              ?.offenderGoodsTypeValue,
                            // eslint-disable-next-line unicorn/no-array-reduce
                          }).reduce((acc, cur) => ({
                            ...acc,
                            ...cur,
                          }))
                        ).filter((key) => key !== 'label') || []
                      }
                      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                      padding={0.3}
                      groupMode="grouped"
                      valueScale={{ type: 'linear' }}
                      indexScale={{ type: 'band', round: true }}
                      colors={{ scheme: 'nivo' }}
                      borderColor={{
                        from: 'color',
                        modifiers: [['darker', 1.6]],
                      }}
                      axisTop={null}
                      axisRight={null}
                      labelSkipWidth={12}
                      labelSkipHeight={12}
                      labelTextColor={{
                        from: 'color',
                        modifiers: [['darker', 1.6]],
                      }}
                    />
                  ) : (
                    <Empty description="No goods types or offenders" />
                  )}
                </div>
              </Col>
            </Row>
          </Card>

          <Card style={{ marginTop: 24 }} loading={loading}>
            <Row gutter={16}>
              <Col span={12}>
                <div style={{ height: 400 }}>
                  <Typography.Title level={4}>Loss/Recovered</Typography.Title>
                  {data?.crimeGroupReport?.goodsTypeLossRecovered &&
                  data?.crimeGroupReport?.goodsTypeLossRecovered.length > 0 ? (
                    <ResponsiveRadialBar
                      margin={{ top: 40, right: 80, bottom: 80, left: 0 }}
                      valueFormat=">-.2f"
                      padding={0.4}
                      cornerRadius={2}
                      radialAxisStart={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                      }}
                      circularAxisOuter={{
                        tickSize: 5,
                        tickPadding: 12,
                        tickRotation: 0,
                      }}
                      legends={[
                        {
                          anchor: 'right',
                          direction: 'column',
                          justify: false,
                          translateX: 80,
                          translateY: 0,
                          itemsSpacing: 6,
                          itemDirection: 'left-to-right',
                          itemWidth: 100,
                          itemHeight: 18,
                          itemTextColor: '#999',
                          symbolSize: 18,
                          symbolShape: 'square',
                          effects: [
                            {
                              on: 'hover',
                              style: {
                                itemTextColor: '#000',
                              },
                            },
                          ],
                        },
                      ]}
                      data={data?.crimeGroupReport?.goodsTypeLossRecovered?.map(
                        (item) => ({
                          id: item?.label || '',
                          data: item?.data
                            ? item?.data?.map((d) => ({
                                x: d?.label || '',
                                y: d?.value || 0,
                              }))
                            : [
                                {
                                  x: 'No data',
                                  y: 0,
                                },
                              ],
                        })
                      )}
                    />
                  ) : (
                    <Empty description="No goods lost/recovered" />
                  )}
                </div>
              </Col>
            </Row>
          </Card>

          <Card style={{ marginTop: 24 }} loading={loading}>
            <Row gutter={16}>
              <Col span={12}>
                <div style={{ height: 400 }}>
                  <Typography.Title level={4}>
                    Incidents by time of day
                  </Typography.Title>
                  {data?.crimeGroupReport?.incidentTimeOfDayDonut &&
                  data?.crimeGroupReport?.incidentTimeOfDayDonut.length > 0 ? (
                    <ResponsivePie
                      margin={{ top: 40, right: 80, bottom: 80, left: 0 }}
                      innerRadius={0.5}
                      padAngle={0.7}
                      cornerRadius={3}
                      activeOuterRadiusOffset={8}
                      borderWidth={1}
                      borderColor={{
                        from: 'color',
                        modifiers: [['darker', 0.2]],
                      }}
                      arcLinkLabelsSkipAngle={1}
                      arcLinkLabelsThickness={2}
                      arcLinkLabelsColor={{ from: '' }}
                      arcLabelsSkipAngle={1}
                      arcLinkLabelsTextColor={{ from: 'color', modifiers: [] }}
                      data={data?.crimeGroupReport?.incidentTimeOfDayDonut?.map(
                        (item) => ({
                          id: item?.label || '',
                          label: item?.label || '',
                          value: item?.value || 0,
                        })
                      )}
                    />
                  ) : (
                    <Empty description="No incidents" />
                  )}
                </div>
              </Col>
              <Col span={12}>
                <div style={{ height: 400 }}>
                  <Typography.Title level={4}>
                    Incidents by month
                  </Typography.Title>
                  {data?.crimeGroupReport?.incidentMonthGraph &&
                  data?.crimeGroupReport?.incidentMonthGraph.length > 0 ? (
                    <ResponsivePie
                      margin={{ top: 40, right: 80, bottom: 80, left: 0 }}
                      innerRadius={0.5}
                      padAngle={0.7}
                      cornerRadius={3}
                      activeOuterRadiusOffset={8}
                      borderWidth={1}
                      borderColor={{
                        from: 'color',
                        modifiers: [['darker', 0.2]],
                      }}
                      arcLinkLabelsSkipAngle={1}
                      arcLinkLabelsThickness={2}
                      arcLinkLabelsColor={{ from: '' }}
                      arcLabelsSkipAngle={1}
                      arcLinkLabelsTextColor={{ from: 'color', modifiers: [] }}
                      data={data?.crimeGroupReport?.incidentMonthGraph?.map(
                        (item) => ({
                          id: item?.label || '',
                          label: item?.label || '',
                          value: item?.value || 0,
                        })
                      )}
                    />
                  ) : (
                    <Empty description="No incidents" />
                  )}
                </div>
              </Col>
            </Row>
          </Card>

          <Card style={{ marginTop: 24 }} loading={loading}>
            <Row gutter={16}>
              <Col span={24}>
                <div style={{ height: 400 }}>
                  <Typography.Title level={4}>
                    Incidents by day of week
                  </Typography.Title>

                  <ResponsiveLine
                    data={[
                      {
                        id: 'incidents',
                        data:
                          data?.crimeGroupReport?.incidentDayOfWeekGraph?.map(
                            (item) => ({
                              x: item?.label || '',
                              y: item?.value || 0,
                            })
                          ) || [],
                      },
                    ]}
                    enableCrosshair={false}
                    margin={{
                      top: 50,
                      right: 50,
                      bottom: 50,
                      left: 50,
                    }}
                    xScale={{ type: 'point' }}
                    yScale={{
                      type: 'linear',
                      min: 0,
                      max: 'auto',
                      stacked: true,
                      reverse: false,
                    }}
                    axisLeft={{
                      tickPadding: 15,
                      tickSize: 1,
                      legend: 'Incidents',
                      legendOffset: -44,
                      legendPosition: 'middle',
                    }}
                    curve="linear"
                    colors={{
                      scheme: 'accent',
                    }}
                    // yFormat=" >-.2f"
                    pointSize={5}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'color', modifiers: [] }}
                    enablePointLabel
                    pointLabelYOffset={-12}
                    enableArea
                    areaOpacity={0.45}
                    useMesh
                    tooltip={tooltip}
                  />
                </div>
              </Col>
            </Row>
          </Card>

          <Row gutter={16}>
            <Col span={24}>
              <Card loading={loading} style={{ height: '100%' }}>
                <Title level={4}>Incidents</Title>
                <Table
                  size="small"
                  pagination={{
                    total: data?.crimeGroupReport?.incidentsTable?.total || 0,
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total, range) =>
                      `${range[0]}-${range[1]} of ${total}`,
                  }}
                  columns={[
                    {
                      key: 'alertId',
                      dataIndex: 'alertId',
                      title: 'Alert Id',
                    },
                    {
                      key: 'date',
                      dataIndex: 'date',
                      title: 'Date',
                      sorter: (
                        a,
                        b // string sort
                      ) => a.date.localeCompare(b.date),
                    },
                    {
                      key: 'value',
                      dataIndex: 'value',
                      title: 'Value lost',
                      defaultSortOrder: 'descend',
                      sorter: (a, b) => a.value.localeCompare(b.value),
                    },
                    {
                      key: 'valueRec',
                      dataIndex: 'valueRec',
                      title: 'Value recovered',
                      sorter: (a, b) => a.valueRec.localeCompare(b.valueRec),
                    },
                    {
                      key: 'location',
                      dataIndex: 'location',
                      title: 'Location',
                      sorter: (a, b) => a.location.localeCompare(b.location),
                    },
                    {
                      key: 'totalOffenders',
                      dataIndex: 'totalOffenders',
                      title: 'Offenders',
                      sorter: (a, b) => a.totalOffenders - b.totalOffenders,
                    },
                    {
                      key: 'crimeTypes',
                      dataIndex: 'crimeTypes',
                      title: 'Crime Types',
                    },
                    {
                      key: 'policeReported',
                      dataIndex: 'policeReported',
                      title: 'Police Reported',
                    },
                    {
                      key: 'policeAttended',
                      dataIndex: 'policeAttended',
                      title: 'Police Attended',
                    },
                    {
                      key: 'crimeRef',
                      dataIndex: 'crimeRef',
                      title: 'Crime Ref',
                    },
                  ]}
                  dataSource={data?.crimeGroupReport?.incidentsTable?.incidents?.map(
                    (incident) => ({
                      key: incident.id,
                      alertId: incident.reference,
                      date: moment(incident.date).format('DD/MM/YYYY'),
                      value: incident.incidentItems
                        ?.reduce((acc, item) => acc + item.value, 0)
                        .toFixed(2),
                      valueRec: incident.incidentItems
                        ?.reduce((acc, item) => acc + item.recoveredValue, 0)
                        .toFixed(2),
                      location: incident.location?.alias || '',
                      totalOffenders: incident.totalOffenders || 0,
                      crimeTypes:
                        incident.crimeTypes?.map((t) => t.name).join(', ') ||
                        '',
                      policeReported: incident.policeInvolved ? 'Yes' : 'No',
                      policeAttended: incident.policeReported ? 'Yes' : 'No',
                      crimeRef: incident.policeRef || '',
                    })
                  )}
                />
              </Card>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={24}>
              <Card loading={loading} style={{ height: '100%' }}>
                <Title level={4}>Targeted Business</Title>
                <Table
                  size="small"
                  pagination={{
                    total:
                      data?.businessContribution?.businessContributions?.filter(
                        (business) => business.totalIncidents > 0
                      ).length || 0,
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total, range) =>
                      `${range[0]}-${range[1]} of ${total}`,
                  }}
                  columns={[
                    {
                      key: 'fullName',
                      dataIndex: 'fullName',
                      title: 'Name',
                    },
                    {
                      key: 'incidentsCreated',
                      dataIndex: 'incidentsCreated',
                      title: 'Incidents',
                      defaultSortOrder: 'descend',
                      sorter: (a, b) => a.incidentsCreated - b.incidentsCreated,
                    },
                    {
                      key: 'offendersCreated',
                      dataIndex: 'offendersCreated',
                      title: 'Offenders',
                      sorter: (a, b) => a.offendersCreated - b.offendersCreated,
                    },
                    {
                      key: 'lostValue',
                      dataIndex: 'lostValue',
                      title: 'Lost value',
                      sorter: (a, b) =>
                        Number.parseInt(a.lostValue || '0', 10) -
                        Number.parseInt(b.lostValue || '0', 10),
                    },
                    {
                      key: 'recoveredValue',
                      dataIndex: 'recoveredValue',
                      title: 'Recovered value',
                      sorter: (a, b) =>
                        Number.parseInt(a.recoveredValue || '0', 10) -
                        Number.parseInt(b.recoveredValue || '0', 10),
                    },
                    {
                      key: 'successRate',
                      dataIndex: 'successRate',
                      title: 'SuccessRate',
                      sorter: (a, b) =>
                        Number.parseInt(a.successRate || '0', 10) -
                        Number.parseInt(b.successRate || '0', 10),
                      render: (text) => (
                        <Typography.Text>{text}%</Typography.Text>
                      ),
                    },
                    {
                      key: 'commonLost',
                      dataIndex: 'commonLost',
                      title: 'Most Common Lost',
                      sorter: (a, b) =>
                        a.commonLost.localeCompare(b.commonLost),
                    },
                    {
                      key: 'highestValueLost',
                      dataIndex: 'highestValueLost',
                      title: 'Highest Value Lost',
                      sorter: (a, b) => a.highestValueLost - b.highestValueLost,
                    },
                    {
                      key: 'avgLost',
                      dataIndex: 'avgLost',
                      title: 'Average Lost',
                      sorter: (a, b) =>
                        Number.parseInt(a.avgLost || '0', 10) -
                        Number.parseInt(b.avgLost || '0', 10),
                    },
                  ]}
                  dataSource={data?.businessContribution?.businessContributions
                    ?.filter((business) => business.totalIncidents > 0)

                    .map((business, i) => ({
                      key: business.name + i,
                      fullName: business.name,
                      incidentsCreated: business.totalIncidents,
                      offendersCreated: business.totalOffenders,
                      lostValue: business.totalLostValue.toFixed(2),
                      recoveredValue: business.totalRecoveredValue.toFixed(2),
                      successRate: (
                        (business.totalSuccessRate || 0) * 100
                      ).toFixed(2),
                      commonLost: business.mostCommonGoodLost || 'unknown',
                      highestValueLost: business.highestTotalValueGoodLost || 0,
                      avgLost: business?.averageLossValue?.toFixed(2),
                    }))}
                />
              </Card>
            </Col>
            <Col span={24} style={{ marginTop: 16 }}>
              <Card loading={loading} style={{ height: '100%' }}>
                <Title level={4}>Targeted Goods</Title>
                <Table
                  size="small"
                  pagination={{
                    total:
                      data?.targetedGoods?.targetedGoods?.filter(
                        (business) => business.totalIncidents > 0
                      ).length || 0,
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total, range) =>
                      `${range[0]}-${range[1]} of ${total}`,
                  }}
                  columns={[
                    {
                      key: 'fullName',
                      dataIndex: 'fullName',
                      title: 'Name',
                    },
                    {
                      key: 'incidentsCreated',
                      dataIndex: 'incidentsCreated',
                      title: 'Incidents',
                      defaultSortOrder: 'descend',
                      sorter: (a, b) => a.incidentsCreated - b.incidentsCreated,
                    },
                    {
                      key: 'offendersCreated',
                      dataIndex: 'offendersCreated',
                      title: 'Offenders',
                      sorter: (a, b) => a.offendersCreated - b.offendersCreated,
                    },
                    {
                      key: 'lostValue',
                      dataIndex: 'lostValue',
                      title: 'Lost value',
                      sorter: (a, b) =>
                        Number.parseInt(a.lostValue || '0', 10) -
                        Number.parseInt(b.lostValue || '0', 10),
                    },
                    {
                      key: 'recoveredValue',
                      dataIndex: 'recoveredValue',
                      title: 'Recovered value',
                      sorter: (a, b) =>
                        Number.parseInt(a.recoveredValue || '0', 10) -
                        Number.parseInt(b.recoveredValue || '0', 10),
                    },
                    {
                      key: 'successRate',
                      dataIndex: 'successRate',
                      title: 'SuccessRate',
                      sorter: (a, b) =>
                        Number.parseInt(a.successRate || '0', 10) -
                        Number.parseInt(b.successRate || '0', 10),
                      render: (text) => (
                        <Typography.Text>{text}%</Typography.Text>
                      ),
                    },

                    {
                      key: 'avgLost',
                      dataIndex: 'avgLost',
                      title: 'Average Lost',
                      sorter: (a, b) =>
                        Number.parseInt(a.avgLost || '0', 10) -
                        Number.parseInt(b.avgLost || '0', 10),
                    },
                  ]}
                  dataSource={data?.targetedGoods?.targetedGoods
                    ?.filter((good) => good.totalIncidents > 0)

                    .map((good, i) => ({
                      key: good.name + i,
                      fullName: good.name,
                      incidentsCreated: good.totalIncidents,
                      offendersCreated: good.totalOffenders,
                      lostValue: good.totalLostValue.toFixed(2),
                      recoveredValue: good.totalRecoveredValue.toFixed(2),
                      successRate: ((good.totalSuccessRate || 0) * 100).toFixed(
                        2
                      ),
                      avgLost: good?.averageLossValue?.toFixed(2),
                    }))}
                />
              </Card>
            </Col>
          </Row>
          <Card style={{ marginTop: 24 }} loading={loading}>
            <Typography.Title level={4}>Incidents heatmap</Typography.Title>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{
                lat:
                  data &&
                  data.crimeGroupReport &&
                  data.crimeGroupReport.crimeGroupMap &&
                  data.crimeGroupReport.crimeGroupMap.incidentsCoords &&
                  data.crimeGroupReport.crimeGroupMap.incidentsCoords[0] &&
                  data.crimeGroupReport.crimeGroupMap.incidentsCoords[0].lat
                    ? data.crimeGroupReport.crimeGroupMap.incidentsCoords[0].lat
                    : 51.5081,
                lng:
                  data &&
                  data.crimeGroupReport &&
                  data.crimeGroupReport.crimeGroupMap &&
                  data.crimeGroupReport.crimeGroupMap.incidentsCoords &&
                  data.crimeGroupReport.crimeGroupMap.incidentsCoords[0] &&
                  data.crimeGroupReport.crimeGroupMap.incidentsCoords[0].lng
                    ? data.crimeGroupReport.crimeGroupMap.incidentsCoords[0].lng
                    : 0.0759,
              }}
              zoom={10}
              clickableIcons={false}
              options={{
                streetViewControl: false,
                styles: [
                  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
                  {
                    elementType: 'labels.text.stroke',
                    stylers: [{ color: '#242f3e' }],
                  },
                  {
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#746855' }],
                  },
                  {
                    featureType: 'administrative.locality',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#d59563' }],
                  },
                  {
                    featureType: 'poi',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#d59563' }],
                  },
                  {
                    featureType: 'poi.park',
                    elementType: 'geometry',
                    stylers: [{ color: '#263c3f' }],
                  },
                  {
                    featureType: 'poi.park',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#6b9a76' }],
                  },
                  {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{ color: '#38414e' }],
                  },
                  {
                    featureType: 'road',
                    elementType: 'geometry.stroke',
                    stylers: [{ color: '#212a37' }],
                  },
                  {
                    featureType: 'road',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#9ca5b3' }],
                  },
                  {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [{ color: '#746855' }],
                  },
                  {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [{ color: '#1f2835' }],
                  },
                  {
                    featureType: 'road.highway',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#f3d19c' }],
                  },
                  {
                    featureType: 'transit',
                    elementType: 'geometry',
                    stylers: [{ color: '#2f3948' }],
                  },
                  {
                    featureType: 'transit.station',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#d59563' }],
                  },
                  {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [{ color: '#17263c' }],
                  },
                  {
                    featureType: 'water',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#515c6d' }],
                  },
                  {
                    featureType: 'water',
                    elementType: 'labels.text.stroke',
                    stylers: [{ color: '#17263c' }],
                  },
                ],
              }}
            >
              {/* Child components, such as markers, info windows, etc. */}
              <HeatmapLayer
                // required
                data={
                  data?.crimeGroupReport?.crimeGroupMap?.incidentsCoords
                    ?.filter((incident) => incident?.lat && incident?.lng)
                    .map(
                      (incident) =>
                        new google.maps.LatLng(
                          incident?.lat || 0,
                          incident?.lng || 0
                        )
                    ) || []
                }
                options={{
                  radius: 50,
                  opacity: 0.8,
                }}
              />

              {data?.crimeGroupReport?.crimeGroupMap?.offenderMarkers &&
                data?.crimeGroupReport?.crimeGroupMap?.offenderMarkers.length >
                  0 &&
                data?.crimeGroupReport?.crimeGroupMap?.offenderMarkers.map(
                  (address, i) => (
                    <Marker
                      label={address?.name || ''}
                      // eslint-disable-next-line react/no-array-index-key
                      key={(address?.name || '') + i}
                      position={{
                        lat: address?.coords?.lat || 0,
                        lng: address?.coords?.lng || 0,
                      }}
                    />
                  )
                )}
            </GoogleMap>
          </Card>
        </div>
      </Col>
    </Row>
  );
};

export default CrimeGroupReport;
