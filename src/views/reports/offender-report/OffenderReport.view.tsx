import type { RefObject } from 'react';
import React from 'react';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Empty,
  Row,
  Select,
  Skeleton,
  Statistic,
  Table,
  Typography,
} from 'antd';
import type { OffenderReportQuery } from 'graphql/generated';
import { Age, Build, Gender, Race } from 'graphql/generated';
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
import type { PointTooltipProps } from '@nivo/line';
import { ResponsiveLine } from '@nivo/line';
import moment from 'moment/moment';
import { ResponsiveRadialBar } from '@nivo/radial-bar';
import { GoogleMap, HeatmapLayer, Marker } from '@react-google-maps/api';
import Page from 'components/shared-components/AntD/Page/Page';
import useStyles from './OffenderReport.styles';
import type { SelectOptions } from './useOffenderReport';
import WatermarkImage from '../../../components/images/WatermarkImage.view';
import {
  getAge,
  getBuild,
  getEthnicity,
  getSex,
  shouldPrint,
} from '../../../utils';

const containerStyle = {
  width: '100%',
  height: '600px',
};

const { Title, Text } = Typography;

interface Props {
  loading: boolean;
  data: OffenderReportQuery | undefined;
  groups: SelectOptions[];
  groupsLoading: boolean;
  dateRange: { startDate: Date; endDate: Date };
  setDateRange: (dateRange: { startDate: Date; endDate: Date }) => void;
  setSelectedGroups: (groups: string[]) => void;
  selectedGroups: string[];
  selectedBusiness: string[];
  setSelectedBusiness: (businesses: string[]) => void;
  businesses: SelectOptions[];
  componentRef: RefObject<HTMLDivElement>;
  handlePrint: () => void;
}

const PerformanceReport = ({
  data,
  loading,
  setDateRange,
  dateRange,
  groups,
  setSelectedGroups,
  groupsLoading,
  selectedGroups,
  setSelectedBusiness,
  selectedBusiness,
  businesses,
  componentRef,
  handlePrint,
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

  const logo = localStorage.getItem('logo');
  return (
    <Page>
      <div ref={componentRef}>
        <div className="logo">
          <img
            style={{ height: '100%', width: '25 %' }}
            src={logo || ''}
            alt="logo"
          />
        </div>
        <Title level={2} className="print-title">
          Offender Report: {data?.offenderReport?.offenderSummary?.name} -{' '}
          {dateRange.startDate.toLocaleDateString()} -{' '}
          {dateRange.endDate.toLocaleDateString()}
        </Title>
        <Row className="no-print" style={{ marginBottom: 10 }}>
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

          <Col span={10}>
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
          <Col>
            <Button type="primary" onClick={handlePrint}>
              Print
            </Button>
          </Col>
        </Row>
        <Card
          style={{ width: '100%' }}
          bodyStyle={{ width: '100%' }}
          loading={loading}
        >
          <Card bodyStyle={{ padding: 0, overflow: 'hidden', width: '100%' }}>
            <Row wrap={false}>
              <Col className={classes.imageCol} span={6}>
                {data?.offenderReport?.offenderSummary?.images &&
                data?.offenderReport?.offenderSummary?.images.length > 0 ? (
                  <div className={classes.image}>
                    <WatermarkImage
                      url={
                        data?.offenderReport?.offenderSummary?.images[0]
                          ?.optimisedPersisted
                      }
                      position={
                        data?.offenderReport?.offenderSummary?.images[0]
                          ?.position
                      }
                    />
                  </div>
                ) : (
                  <Skeleton.Image className={classes.imageSkeleton} />
                )}
              </Col>
              <Col className={classes.detailsBody}>
                <Title className={classes.title} level={2}>
                  {data?.offenderReport?.offenderSummary?.name}
                </Title>
                <Text type="secondary">
                  Alert ID: {data?.offenderReport?.offenderSummary?.reference}
                </Text>
                <Title level={4} type="secondary">
                  Details
                </Title>
                <Descriptions column={2} className={classes.descriptions}>
                  <Descriptions.Item
                    className={classes.descItem}
                    label="Gender"
                  >
                    {getSex(
                      data?.offenderReport?.offenderSummary?.gender ||
                        Gender.Unknown
                    )}
                  </Descriptions.Item>
                  {!data?.offenderReport?.offenderSummary?.dateOfBirth && (
                    <Descriptions.Item className={classes.descItem} label="Age">
                      {getAge(
                        data?.offenderReport?.offenderSummary?.age ||
                          Age.Unknown
                      )}
                    </Descriptions.Item>
                  )}
                  {data?.offenderReport?.offenderSummary?.dateOfBirth && (
                    <Descriptions.Item
                      className={classes.descItem}
                      label="Date of Birth"
                    >
                      {moment(
                        data?.offenderReport?.offenderSummary?.dateOfBirth
                      ).format('DD/MM/YYYY')}
                    </Descriptions.Item>
                  )}
                  {data?.offenderReport?.offenderSummary?.dateSource && (
                    <Descriptions.Item
                      className={classes.descItem}
                      label="DoB Source"
                    >
                      {data?.offenderReport?.offenderSummary?.dateSource}
                    </Descriptions.Item>
                  )}
                  <Descriptions.Item className={classes.descItem} label="Build">
                    {getBuild(
                      data?.offenderReport?.offenderSummary?.build ||
                        Build.Unknown
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className={classes.descItem}
                    label="Ethnicity"
                  >
                    {getEthnicity(
                      data?.offenderReport?.offenderSummary?.race ||
                        Race.Unknown
                    )}
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions column={1}>
                  <Descriptions.Item className={classes.descItem} label="Hair">
                    {data?.offenderReport?.offenderSummary?.hair || 'Unknown'}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className={classes.descItem}
                    label="Peculiarities"
                  >
                    {data?.offenderReport?.offenderSummary?.peculiarities ||
                      'None documented'}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </Card>
          <Row gutter={16} style={{ marginTop: 24, marginBottom: 12 }}>
            <Col span={12}>
              <Title level={4}>Incidents Summary</Title>
            </Col>
            <Row gutter={64}>
              <Col>
                <Statistic
                  title="Total Incidents"
                  value={
                    data?.offenderReport?.incidentSummary?.totalIncidents || 0
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
                    data?.offenderReport?.incidentSummary?.lastIncidentDate
                      ? new Date(
                          data?.offenderReport?.incidentSummary?.lastIncidentDate
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
                    data?.offenderReport?.incidentSummary
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
                    data?.offenderReport?.incidentSummary
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
                    data?.offenderReport?.incidentSummary
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
                    data?.offenderReport?.lossTotals?.totalLostValue
                      ? `£${data?.offenderReport?.lossTotals?.totalLostValue.toFixed(
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
                    data?.offenderReport?.lossTotals?.totalRecoveredValue
                      ? `£${data?.offenderReport?.lossTotals?.totalRecoveredValue.toFixed(
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
                    data?.offenderReport?.lossTotals?.averageSuccessRate || 0
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
                    `£${data?.offenderReport?.lossTotals?.averagePerIncident.toFixed(
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
            <Col span={12}>
              <div style={{ height: 400 }}>
                <Typography.Title level={4}>Crime Types</Typography.Title>
                {data?.offenderReport?.crimeTypeDonut &&
                data?.offenderReport?.crimeTypeDonut.length > 0 ? (
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
                    arcLinkLabelsTextColor={{
                      from: 'color',
                      modifiers: [],
                    }}
                    data={data?.offenderReport?.crimeTypeDonut?.map((item) => ({
                      id: item?.label || '',
                      label: item?.label || '',
                      value: item?.value || 0,
                    }))}
                  />
                ) : (
                  <Empty description="No crime types" />
                )}
              </div>
            </Col>
            <Col span={12}>
              <div style={{ height: 400 }} className="graph-container">
                <Typography.Title level={4}>
                  Crime types by business
                </Typography.Title>
                {data?.offenderReport?.crimeTypeBusinessRadial &&
                data?.offenderReport?.crimeTypeBusinessRadial.length > 0 ? (
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
                    data={data?.offenderReport?.crimeTypeBusinessRadial?.map(
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
                  <Empty description="No business crime types" />
                )}
              </div>
            </Col>
          </Row>
        </Card>

        <Card
          style={{ marginTop: 24 }}
          className={`no-break ${shouldPrint(
            data?.offenderReport?.goodsTypeLossRecovered &&
              data?.offenderReport?.goodsTypeLossRecovered?.length > 0
          )}}`}
          loading={loading}
        >
          <Row gutter={16}>
            <Col span={12}>
              <div
                style={{
                  height: `${
                    data?.offenderReport?.goodsTypeLossRecovered &&
                    data?.offenderReport?.goodsTypeLossRecovered?.length > 0
                      ? '400px'
                      : 'min-content'
                  }`,
                }}
              >
                <Typography.Title level={4}>
                  Goods loss/recovered
                </Typography.Title>
                {data?.offenderReport?.goodsTypeLossRecovered &&
                data?.offenderReport?.goodsTypeLossRecovered.length > 0 ? (
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
                    data={data?.offenderReport?.goodsTypeLossRecovered?.map(
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

        <Card
          style={{ marginTop: 24, width: '100%' }}
          bodyStyle={{ width: '100%' }}
          loading={loading}
        >
          <Row gutter={16}>
            <Col span={12}>
              <div
                className={`no-break ${shouldPrint(
                  data?.offenderReport?.incidentTimeOfDayDonut?.length,
                  data?.offenderReport?.incidentMonthGraph?.length
                )}}`}
                style={{
                  height: 400,
                }}
              >
                <Typography.Title level={4}>
                  Incidents by time of day
                </Typography.Title>
                {data?.offenderReport?.incidentTimeOfDayDonut &&
                data?.offenderReport?.incidentTimeOfDayDonut.length > 0 ? (
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
                    arcLinkLabelsTextColor={{
                      from: 'color',
                      modifiers: [],
                    }}
                    arcLinkLabel={(e) => `${e?.label}`}
                    data={data?.offenderReport?.incidentTimeOfDayDonut?.map(
                      (item) => ({
                        id: item?.label || '',
                        label: `${item?.label}:00` || '',
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
                  Incidents by day of month
                </Typography.Title>
                {data?.offenderReport?.incidentMonthGraph &&
                data?.offenderReport?.incidentMonthGraph.length > 0 ? (
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
                    arcLinkLabelsTextColor={{
                      from: 'color',
                      modifiers: [],
                    }}
                    data={data?.offenderReport?.incidentMonthGraph?.map(
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

        <Card
          style={{ marginTop: 24, width: '100%' }}
          bodyStyle={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
          loading={loading}
        >
          <Typography.Title level={4}>
            Incidents by day of week
          </Typography.Title>

          <div className="printable-graph">
            <ResponsiveLine
              data={[
                {
                  id: 'incidents',
                  data:
                    data?.offenderReport?.incidentDayOfWeekGraph?.map(
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
        </Card>

        <Row gutter={16}>
          <Col span={24}>
            <Card
              loading={loading}
              style={{ height: '100%' }}
              className="no-break"
            >
              <Title level={4}>Incidents</Title>
              <Table
                size="small"
                pagination={{
                  total: data?.offenderReport?.incidentsTable?.total || 0,
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
                dataSource={data?.offenderReport?.incidentsTable?.incidents?.map(
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
                      incident.crimeTypes?.map((t) => t.name).join(', ') || '',
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
                    sorter: (a, b) => a.commonLost.localeCompare(b.commonLost),
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
            <Card
              className="no-break"
              loading={loading}
              style={{ height: '100%' }}
            >
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
        <Card
          style={{ marginTop: 24 }}
          className={shouldPrint(
            data?.offenderReport?.incidentsTable?.incidents[0]?.location
              ?.geoLat,
            data?.offenderReport?.offenderSummary?.addresses.length
          )}
          loading={loading}
        >
          <Typography.Title level={4}>Incidents heatmap</Typography.Title>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
              lat:
                data?.offenderReport?.incidentsTable?.incidents[0]?.location
                  ?.geoLat || 51.5081,
              lng:
                data?.offenderReport?.incidentsTable?.incidents[0]?.location
                  ?.geoLng || 0.0759,
            }}
            zoom={10}
            clickableIcons={false}
            options={{
              streetViewControl: false,
              styles: [
                {
                  elementType: 'geometry',
                  stylers: [{ color: '#242f3e' }],
                },
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
                data?.offenderReport?.incidentsTable?.incidents
                  ?.filter(
                    (incident) =>
                      incident.location?.geoLat && incident.location.geoLng
                  )
                  .map(
                    (incident) =>
                      new google.maps.LatLng(
                        incident?.location?.geoLat || 0,
                        incident?.location?.geoLng || 0
                      )
                  ) || []
              }
              options={{
                radius: 50,
                opacity: 0.8,
              }}
            />

            {data?.offenderReport?.offenderSummary?.addresses &&
              data?.offenderReport?.offenderSummary?.addresses.length > 0 &&
              data?.offenderReport?.offenderSummary?.addresses.map(
                (address) => (
                  <Marker
                    label={address.full || ''}
                    key={address.id}
                    position={{
                      lat: address.geoLat || 0,
                      lng: address.geoLng || 0,
                    }}
                  />
                )
              )}
          </GoogleMap>
        </Card>
      </div>
    </Page>
  );
};

export default PerformanceReport;
