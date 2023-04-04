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
import type { PerformanceReportQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faCar,
  faChartLineDown,
  faClipboard,
  faComments,
  faExclamationCircle,
  faMoneyBill,
  faPenToSquare,
  faUserPolice,
  faUserPoliceTie,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import DatePicker from 'components/util-components/DatePicker';
import { ResponsivePie } from '@nivo/pie';
import type { PointTooltipProps } from '@nivo/line';
import { ResponsiveLine } from '@nivo/line';
import { GoogleMap, HeatmapLayer } from '@react-google-maps/api';
import useStyles from './OffenderReport.styles';
import type { SelectOptions } from './useOffenderReport';

const { Title } = Typography;

const containerStyle = {
  width: '100%',
  height: '600px',
};

interface Props {
  loading: boolean;
  data: PerformanceReportQuery | undefined;
  groups: SelectOptions[];
  groupsLoading: boolean;
  dateRange: { startDate: Date; endDate: Date };
  setDateRange: (dateRange: { startDate: Date; endDate: Date }) => void;
  setSelectedGroups: (groups: string[]) => void;
  selectedGroups: string[];
}

interface ContributorTable {
  key: string;
  fullName: string;
  incidentsCreated: number;
  offendersCreated: number;
  updatesCreated: number;
  messagesSent: number;
  logins: number;
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
    <div className={classes.page}>
      <Title level={2}>Performance Report</Title>
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
            style={{ width: '100%' }}
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
                        value?.[1] || new Date(new Date().setHours(23, 59, 59)),
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
        <Row gutter={16}>
          <Col span={12}>
            <Title level={4}>Created Summary</Title>
          </Col>
          <Row gutter={64}>
            <Col>
              <Statistic
                title="Incidents Created"
                value={
                  data?.performanceReport?.createdDataCounts?.incidents || 0
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
                title="Offenders Created"
                value={
                  data?.performanceReport?.createdDataCounts?.offenders || 0
                }
                prefix={
                  <FontAwesomeIcon
                    className={classes.prefixIcon}
                    icon={faUsers}
                  />
                }
              />
            </Col>
            <Col>
              <Statistic
                title="Updated Submitted"
                value={data?.performanceReport?.createdDataCounts?.updates || 0}
                prefix={
                  <FontAwesomeIcon
                    className={classes.prefixIcon}
                    icon={faPenToSquare}
                  />
                }
              />
            </Col>
            <Col>
              <Statistic
                title="Messages Sent"
                value={
                  data?.performanceReport?.createdDataCounts?.messages || 0
                }
                prefix={
                  <FontAwesomeIcon
                    className={classes.prefixIcon}
                    icon={faComments}
                  />
                }
              />
            </Col>
            <Col>
              <Statistic
                title="Vehicles Created"
                value={
                  data?.performanceReport?.createdDataCounts?.vehicles || 0 || 0
                }
                prefix={
                  <FontAwesomeIcon
                    className={classes.prefixIcon}
                    icon={faCar}
                  />
                }
              />
            </Col>
            <Col>
              <Statistic
                title="Crime Groups Created"
                value={
                  data?.performanceReport?.createdDataCounts?.crimeGroups || 0
                }
                prefix={
                  <FontAwesomeIcon
                    className={classes.prefixIcon}
                    icon={faUsers}
                  />
                }
              />
            </Col>
          </Row>
        </Row>
        <Row gutter={16} style={{ marginTop: 24, marginBottom: 12 }}>
          <Col span={12}>
            <Title level={4}>Incidents Summary</Title>
          </Col>
          <Row gutter={64}>
            {/* <Col> */}
            {/*  <Statistic */}
            {/*    title="Total Incidents" */}
            {/*    value={ */}
            {/*      data?.performanceReport?.incidentSummary?.totalIncidents || 0 */}
            {/*    } */}
            {/*    prefix={ */}
            {/*      <FontAwesomeIcon */}
            {/*        className={classes.prefixIcon} */}
            {/*        icon={faExclamationCircle} */}
            {/*      /> */}
            {/*    } */}
            {/*  /> */}
            {/* </Col> */}
            <Col>
              <Statistic
                title="Last Incident (in range)"
                value={
                  data?.performanceReport?.incidentSummary?.lastIncidentDate
                    ? new Date(
                        data?.performanceReport?.incidentSummary?.lastIncidentDate
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
                  data?.performanceReport?.incidentSummary
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
                  data?.performanceReport?.incidentSummary
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
                  data?.performanceReport?.incidentSummary
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
            <Col>
              <Statistic
                title="Crime Groups"
                value={
                  data?.performanceReport?.createdDataCounts?.crimeGroups || 0
                }
                prefix={
                  <FontAwesomeIcon
                    className={classes.prefixIcon}
                    icon={faUsers}
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
                  data?.performanceReport?.lossTotals?.totalLostValue
                    ? `£${data?.performanceReport?.lossTotals?.totalLostValue.toFixed(
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
                  data?.performanceReport?.lossTotals?.totalRecoveredValue
                    ? `£${data?.performanceReport?.lossTotals?.totalRecoveredValue.toFixed(
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
                  (data?.performanceReport?.lossTotals?.averageSuccessRate ||
                    0) * 100
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
                  `£${data?.performanceReport?.lossTotals?.averagePerIncident.toFixed(
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
              {data?.performanceReport?.crimeTypeDonut &&
              data?.performanceReport?.crimeTypeDonut.length > 0 ? (
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
                  data={data?.performanceReport?.crimeTypeDonut?.map(
                    (item) => ({
                      id: item?.label || '',
                      label: item?.label || '',
                      value: item?.value || 0,
                    })
                  )}
                />
              ) : (
                <Empty description="No crime types" />
              )}
            </div>
          </Col>
          <Col span={12}>
            <div style={{ height: 400 }}>
              <Typography.Title level={4}>Involved Tag</Typography.Title>
              {data?.performanceReport?.involvedTagCountDonut &&
              data?.performanceReport?.involvedTagCountDonut.length > 0 ? (
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
                  data={data?.performanceReport?.involvedTagCountDonut?.map(
                    (item) => ({
                      id: item?.label || '',
                      label: item?.label || '',
                      value: item?.value || 0,
                    })
                  )}
                />
              ) : (
                <Empty description="No involved tags" />
              )}
            </div>
          </Col>
        </Row>
      </Card>

      <Card style={{ marginTop: 24 }} loading={loading}>
        <Row gutter={16}>
          <Col span={12}>
            <div style={{ height: 400 }}>
              <Typography.Title level={4}>Goods type count</Typography.Title>
              {data?.performanceReport?.goodsTypeCountDonut &&
              data?.performanceReport?.goodsTypeCountDonut.length > 0 ? (
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
                  data={data?.performanceReport?.goodsTypeCountDonut?.map(
                    (item) => ({
                      id: item?.label || '',
                      label: item?.label || '',
                      value: item?.value || 0,
                    })
                  )}
                />
              ) : (
                <Empty description="No goods count" />
              )}
            </div>
          </Col>
          <Col span={12}>
            <div style={{ height: 400 }}>
              <Typography.Title level={4}>Goods type value</Typography.Title>
              {data?.performanceReport?.goodsTypeValueDonut &&
              data?.performanceReport?.goodsTypeValueDonut.length > 0 ? (
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
                  data={data?.performanceReport?.goodsTypeValueDonut?.map(
                    (item) => ({
                      id: item?.label || '',
                      label: `£${item?.label}` || '',
                      value: item?.value || 0,
                    })
                  )}
                />
              ) : (
                <Empty description="No goods values" />
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
                      data?.performanceReport?.incidentDayOfWeekLine?.map(
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
                  legend: 'Calls',
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

      <Card style={{ marginTop: 24 }} loading={loading}>
        <Typography.Title level={4}>Incidents heatmap</Typography.Title>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{
            lat:
              data?.incidentHeatPerformance?.incidents[0]?.location?.geoLat ||
              51.5081,
            lng:
              data?.incidentHeatPerformance?.incidents[0]?.location?.geoLng ||
              0.0759,
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
              data?.incidentHeatPerformance?.incidents
                ?.filter(
                  (incident) =>
                    incident.location?.geoLat && incident.location.geoLng
                )
                .map(
                  (incident) =>
                    new google.maps.LatLng(
                      incident.location?.geoLat || 0,
                      incident.location?.geoLng || 0
                    )
                ) || []
            }
            options={{
              radius: 50,
              opacity: 0.8,
            }}
          />
        </GoogleMap>
      </Card>

      <Row gutter={16}>
        <Col span={12}>
          <Card loading={loading} style={{ height: '100%' }}>
            <Title level={4}>Business Contributions</Title>
            <Table
              size="small"
              pagination={{
                total: data?.businessContribution?.total || 0,
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
                  key: 'updatesCreated',
                  dataIndex: 'updatesCreated',
                  title: 'Updates',
                  sorter: (a, b) => a.updatesCreated - b.updatesCreated,
                },
                {
                  key: 'messagesSent',
                  dataIndex: 'messagesSent',
                  title: 'Messages',
                  sorter: (a, b) => a.messagesSent - b.messagesSent,
                },
                {
                  key: 'logins',
                  dataIndex: 'logins',
                  title: 'Logins',
                  sorter: (a, b) => a.logins - b.logins,
                },
                {
                  key: 'users',
                  dataIndex: 'users',
                  title: 'Users',
                  sorter: (a, b) => a.users - b.users,
                },
              ]}
              dataSource={data?.businessContribution?.businessContributions?.map(
                (business, i) => ({
                  key: business.name + i,
                  fullName: business.name,
                  incidentsCreated: business.totalIncidents,
                  offendersCreated: business.totalOffenders,
                  updatesCreated: business.totalUpdates,
                  messagesSent: business.totalMessages,
                  logins: business.totalLogins,
                  users: business.totalUsers,
                })
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card loading={loading} style={{ height: '100%' }}>
            <Title level={4}>Top Contributors</Title>
            <Table<ContributorTable>
              size="small"
              pagination={{
                total: data?.userContributions?.total || 0,
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
                  key: 'updatesCreated',
                  dataIndex: 'updatesCreated',
                  title: 'Updates',
                  sorter: (a, b) => a.updatesCreated - b.updatesCreated,
                },
                {
                  key: 'messagesSent',
                  dataIndex: 'messagesSent',
                  title: 'Messages',
                  sorter: (a, b) => a.messagesSent - b.messagesSent,
                },
                {
                  key: 'logins',
                  dataIndex: 'logins',
                  title: 'Logins',
                  sorter: (a, b) => a.logins - b.logins,
                },
              ]}
              dataSource={data?.userContributions?.userContributions?.map(
                (user, index) => ({
                  key: user.name + index,
                  fullName: user.name,
                  incidentsCreated: user.totalIncidents,
                  offendersCreated: user.totalOffenders,
                  updatesCreated: user.totalUpdates,
                  messagesSent: user.totalMessages,
                  logins: user.totalLogins,
                })
              )}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 24, marginBottom: 24 }}>
        <Col span={12}>
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
                  render: (text) => <Typography.Text>{text}%</Typography.Text>,
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
                    ? new Date(offender.lastIncidentDate).toLocaleDateString()
                    : 'N/A',
                  lostValue: offender.totalLostValue.toFixed(2),
                  recoveredValue: offender.totalRecoveredValue.toFixed(2),
                  successRate: ((offender.totalSuccessRate || 0) * 100).toFixed(
                    2
                  ),
                })
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card loading={loading} style={{ height: '100%' }}>
            <Title level={4}>Crime group table</Title>
            <Table
              size="small"
              pagination={{
                total: data?.crimeGroupPerformance?.total || 0,
                defaultPageSize: 10,
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total}`,
              }}
              columns={[
                {
                  key: 'fullName',
                  dataIndex: 'fullName',
                  title: 'Alias',
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
                  key: 'totalOffenders',
                  dataIndex: 'totalOffenders',
                  title: 'Offenders',
                  sorter: (a, b) => a.totalOffenders - b.totalOffenders,
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
                  render: (text) => <Typography.Text>{text}%</Typography.Text>,
                },
              ]}
              dataSource={data?.crimeGroupPerformance?.crimeGroupPerformance?.map(
                (crimeGroup, i) => ({
                  totalIncidents: crimeGroup.totalIncidents,
                  key: crimeGroup.alias + i,
                  alertId: crimeGroup.alertId,
                  fullName: crimeGroup.alias,
                  totalOffenders: crimeGroup.totalOffenders,
                  lostValue: crimeGroup.totalLostValue.toFixed(2),
                  recoveredValue: crimeGroup.totalRecoveredValue.toFixed(2),
                  successRate: (
                    (crimeGroup.totalSuccessRate || 0) * 100
                  ).toFixed(2),
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
                  render: (text) => <Typography.Text>{text}%</Typography.Text>,
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
                  successRate: ((business.totalSuccessRate || 0) * 100).toFixed(
                    2
                  ),
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
                  render: (text) => <Typography.Text>{text}%</Typography.Text>,
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
                  successRate: ((good.totalSuccessRate || 0) * 100).toFixed(2),
                  avgLost: good?.averageLossValue?.toFixed(2),
                }))}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PerformanceReport;
