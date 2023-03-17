import React from 'react';
import {
  Col,
  Row,
  Spin,
  Typography,
  Skeleton,
  Descriptions,
  Statistic,
  Card,
  Table,
  Tag,
  Button,
} from 'antd';
import OffenderSideList from 'components/offenders/OffenderSideList';
import {
  Age,
  Build,
  Gender,
  OffenderProfileQuery,
  Race,
} from 'graphql/generated';
import { getAge, getBuild, getEthnicity, getSex } from 'utils';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/pro-light-svg-icons';
import { useStoreState } from 'state';
import WatermarkImage from 'components/images/WatermarkImage.view';
import useStyles from './offender-profile.styles';

const { Title, Text } = Typography;

interface Props {
  offenderProfileData: OffenderProfileQuery | undefined;
  offenderProfileLoading: boolean;
  selectedOffender: string | undefined;
}

const OffenderProfile = ({
  offenderProfileData,
  offenderProfileLoading,
  selectedOffender,
}: Props) => {
  const classes = useStyles();
  const theme = useStoreState((state) => state.theme.currentTheme);
  return (
    <Row wrap={false}>
      <Col>
        <OffenderSideList
          to="/app/reports/offender-profile/"
          current={selectedOffender || ''}
        />
      </Col>
      <Col flex={1}>
        {offenderProfileLoading ? (
          <div className={classes.loadingPage}>
            <Spin />
          </div>
        ) : (
          <div className={classes.page}>
            <Row justify="end" className={classes.actionBar}>
              <Col>
                <Button type="primary">
                  <FontAwesomeIcon
                    icon={faDownload}
                    className={classes.buttonIcon}
                  />
                  Download Report
                </Button>
              </Col>
            </Row>
            <div>
              <Card bodyStyle={{ padding: 0, overflow: 'hidden' }}>
                <Row wrap={false}>
                  <Col className={classes.imageCol} span={6}>
                    {offenderProfileData?.offender?.images &&
                    offenderProfileData?.offender?.images.length > 0 ? (
                      <div className={classes.image}>
                        <WatermarkImage
                          url={
                            offenderProfileData?.offender?.images[0]?.optimised
                          }
                        />
                      </div>
                    ) : (
                      <Skeleton.Image className={classes.imageSkeleton} />
                    )}
                  </Col>
                  <Col className={classes.detailsBody}>
                    <Title className={classes.title} level={2}>
                      {offenderProfileData?.offender?.name}
                    </Title>
                    <Text type="secondary">
                      Alert ID: {offenderProfileData?.offender?.reference}
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
                          offenderProfileData?.offender?.gender ||
                            Gender.Unknown
                        )}
                      </Descriptions.Item>
                      {!offenderProfileData?.offender?.dateOfBirth && (
                        <Descriptions.Item
                          className={classes.descItem}
                          label="Age"
                        >
                          {getAge(
                            offenderProfileData?.offender?.age || Age.Unknown
                          )}
                        </Descriptions.Item>
                      )}
                      {offenderProfileData?.offender?.dateOfBirth && (
                        <Descriptions.Item
                          className={classes.descItem}
                          label="Date of Birth"
                        >
                          {moment(
                            offenderProfileData?.offender?.dateOfBirth
                          ).format('DD/MM/YYYY')}
                        </Descriptions.Item>
                      )}
                      {offenderProfileData?.offender?.dateSource && (
                        <Descriptions.Item
                          className={classes.descItem}
                          label="DoB Source"
                        >
                          {offenderProfileData?.offender?.dateSource}
                        </Descriptions.Item>
                      )}
                      <Descriptions.Item
                        className={classes.descItem}
                        label="Build"
                      >
                        {getBuild(
                          offenderProfileData?.offender?.build || Build.Unknown
                        )}
                      </Descriptions.Item>
                      <Descriptions.Item
                        className={classes.descItem}
                        label="Ethnicity"
                      >
                        {getEthnicity(
                          offenderProfileData?.offender?.race || Race.Unknown
                        )}
                      </Descriptions.Item>
                    </Descriptions>
                    <Descriptions column={1}>
                      <Descriptions.Item
                        className={classes.descItem}
                        label="Hair"
                      >
                        {offenderProfileData?.offender?.hair || 'Unknown'}
                      </Descriptions.Item>
                      <Descriptions.Item
                        className={classes.descItem}
                        label="Peculiarities"
                      >
                        {offenderProfileData?.offender?.peculiarities ||
                          'None documented'}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              </Card>
              <div className={classes.incidentSummary}>
                <Title level={3}>Incident Summery</Title>
                <Row gutter={16}>
                  <Col>
                    <Card>
                      <Statistic
                        value={
                          offenderProfileData?.offender?.totalIncidents || 0
                        }
                        title="Total Incidents"
                      />
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Statistic
                        value={
                          offenderProfileData?.offender?.lastActive?.date
                            ? moment(
                                offenderProfileData?.offender?.lastActive?.date
                              ).format('DD/MM/YY')
                            : 'None'
                        }
                        title="Last Incident"
                      />
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Statistic
                        value={`£${
                          offenderProfileData?.offender?.totalValue || 0
                        }`}
                        title="Total Value Lost"
                      />
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Statistic
                        value={`£${
                          offenderProfileData?.offender?.totalRecoveredValue ||
                          0
                        }`}
                        title="Total Value Recovered"
                      />
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Statistic
                        value={`${
                          offenderProfileData?.offender?.totalTheftSuccess || 0
                        }%`}
                        title="Success Rate"
                      />
                    </Card>
                  </Col>
                </Row>
                <Card>
                  <Title level={4}>Incidents Over Last 12 Months</Title>
                  <div
                    className="printable-table"
                    style={{ height: 300, width: 950 }}
                  >
                    <ResponsiveBar
                      data={
                        offenderProfileData?.offender?.incidentTotals?.map(
                          (item) => {
                            let tags: { [index: string]: number } = {};

                            if (item.data) {
                              for (
                                let index = 0;
                                index < item.data.length;
                                index++
                              ) {
                                const element = item.data[index];
                                tags = {
                                  ...tags,
                                  [element.name]: element.count,
                                };
                              }
                            }

                            return {
                              month: item.month,
                              ...tags,
                            };
                          }
                        ) || []
                      }
                      keys={
                        [
                          ...new Set(
                            offenderProfileData?.offender?.incidentTotals
                              ?.map((item) => {
                                if (item.data) {
                                  return item.data.map(({ name }) => name);
                                }
                                return [];
                              })
                              .flat()
                          ),
                        ] || []
                      }
                      indexBy="month"
                      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                      padding={0.3}
                      valueScale={{ type: 'linear' }}
                      indexScale={{ type: 'band', round: true }}
                      colors={{ scheme: 'pastel1' }}
                      defs={[
                        {
                          id: 'dots',
                          type: 'patternDots',
                          background: 'inherit',
                          color: '#38bcb2',
                          size: 4,
                          padding: 1,
                          stagger: true,
                        },
                        {
                          id: 'lines',
                          type: 'patternLines',
                          background: 'inherit',
                          color: '#eed312',
                          rotation: -45,
                          lineWidth: 6,
                          spacing: 10,
                        },
                      ]}
                      fill={[
                        {
                          match: {
                            id: 'fries',
                          },
                          id: 'dots',
                        },
                        {
                          match: {
                            id: 'sandwich',
                          },
                          id: 'lines',
                        },
                      ]}
                      borderColor={{
                        from: 'color',
                        modifiers: [['darker', 1.6]],
                      }}
                      axisTop={null}
                      axisRight={null}
                      axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Month',
                        legendPosition: 'middle',
                        legendOffset: 32,
                      }}
                      axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Incidents',
                        legendPosition: 'middle',
                        legendOffset: -40,
                      }}
                      labelSkipWidth={12}
                      labelSkipHeight={12}
                      labelTextColor={{
                        from: 'color',
                        modifiers: [['darker', 1.6]],
                      }}
                      theme={{
                        axis: {
                          domain: {},
                          ticks: {
                            line: {
                              fill: theme === 'light' ? '#333' : '#FFF',
                            },
                            text: {
                              fill: theme === 'light' ? '#333' : '#FFF',
                            },
                          },
                          legend: {
                            text: {
                              fill: theme === 'light' ? '#333' : '#FFF',
                            },
                          },
                        },
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
                          itemTextColor: theme === 'light' ? '#333' : '#FFF',
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
                      role="application"
                      ariaLabel="Nivo bar chart demo"
                    />
                  </div>
                </Card>
                <Card>
                  <Title level={4}>All Incidents</Title>
                  <Table
                    size="small"
                    pagination={false}
                    columns={[
                      {
                        key: 'reference',
                        dataIndex: 'reference',
                        title: 'Alert ID',
                      },
                      {
                        key: 'date',
                        dataIndex: 'date',
                        title: 'Date',
                        render: (value) => moment(value).format('DD/MM/YY'),
                      },
                      {
                        key: 'value',
                        dataIndex: 'value',
                        title: 'Value',
                        render: (value) => `£${value}`,
                      },
                      {
                        key: 'recoveredValue',
                        dataIndex: 'recoveredValue',
                        title: 'Recovered Value',
                        render: (value) => `£${value}`,
                      },
                      {
                        key: 'createdBy',
                        dataIndex: 'createdBy',
                        title: 'Created by',
                      },
                      {
                        key: 'crimeTypes',
                        dataIndex: 'crimeTypes',
                        title: 'Types',
                        render: (value) =>
                          value.map(
                            // eslint-disable-next-line
                            ({ id, name }: { id: string; name: string }) => (
                              <Tag key={id}>{name}</Tag>
                            )
                          ),
                      },
                    ]}
                    dataSource={offenderProfileData?.offender?.incidents.map(
                      (incident) => ({
                        key: incident.id,
                        reference: incident.reference,
                        date: incident.date,
                        crimeTypes: incident.crimeTypes,
                        value: incident.value || 0,
                        recoveredValue: incident.recoveredValue || 0,
                        createdBy: incident.createdBy.businesses[0]?.name,
                      })
                    )}
                  />
                </Card>
                <Row gutter={8} className={classes.dateRow}>
                  <Col>
                    <Card>
                      <Title level={4}>Incidents By Hour</Title>
                      <div
                        className="printable-table"
                        style={{ height: 300, width: 298 }}
                      >
                        <ResponsivePie
                          data={
                            offenderProfileData?.offender?.incidentsByHour.map(
                              (item) => ({
                                id: item.name,
                                label: item.name,
                                value: item.count,
                              })
                            ) || []
                          }
                          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                          innerRadius={0.5}
                          borderWidth={1}
                          borderColor={{
                            from: 'color',
                            modifiers: [['darker', 0.2]],
                          }}
                          arcLinkLabelsSkipAngle={10}
                          arcLinkLabelsTextColor={
                            theme === 'light' ? '#333' : '#FFF'
                          }
                          arcLinkLabelsThickness={2}
                          arcLinkLabelsColor={{ from: 'color' }}
                          arcLabelsSkipAngle={10}
                          arcLabelsTextColor={{
                            from: 'color',
                            modifiers: [['darker', 2]],
                          }}
                          colors={{ scheme: 'pastel2' }}
                          defs={[
                            {
                              id: 'dots',
                              type: 'patternDots',
                              background: 'inherit',
                              color: 'rgba(255, 255, 255, 0.3)',
                              size: 4,
                              padding: 1,
                              stagger: true,
                            },
                            {
                              id: 'lines',
                              type: 'patternLines',
                              background: 'inherit',
                              color: 'rgba(255, 255, 255, 0.3)',
                              rotation: -45,
                              lineWidth: 6,
                              spacing: 10,
                            },
                          ]}
                          fill={[
                            {
                              match: {
                                id: 'ruby',
                              },
                              id: 'dots',
                            },
                            {
                              match: {
                                id: 'c',
                              },
                              id: 'dots',
                            },
                            {
                              match: {
                                id: 'go',
                              },
                              id: 'dots',
                            },
                            {
                              match: {
                                id: 'python',
                              },
                              id: 'dots',
                            },
                            {
                              match: {
                                id: 'scala',
                              },
                              id: 'lines',
                            },
                            {
                              match: {
                                id: 'lisp',
                              },
                              id: 'lines',
                            },
                            {
                              match: {
                                id: 'elixir',
                              },
                              id: 'lines',
                            },
                            {
                              match: {
                                id: 'javascript',
                              },
                              id: 'lines',
                            },
                          ]}
                        />
                      </div>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Title level={4}>Incidents By Day</Title>
                      <div
                        className="printable-table"
                        style={{ height: 300, width: 298 }}
                      >
                        <ResponsivePie
                          data={
                            offenderProfileData?.offender?.incidentsByDayOfWeek.map(
                              (item) => ({
                                id: item.name,
                                label: item.name,
                                value: item.count,
                              })
                            ) || []
                          }
                          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                          innerRadius={0.5}
                          borderWidth={1}
                          borderColor={{
                            from: 'color',
                            modifiers: [['darker', 0.2]],
                          }}
                          arcLinkLabelsSkipAngle={10}
                          arcLinkLabelsTextColor={
                            theme === 'light' ? '#333' : '#FFF'
                          }
                          arcLinkLabelsThickness={2}
                          arcLinkLabelsColor={{ from: 'color' }}
                          arcLabelsSkipAngle={10}
                          arcLabelsTextColor={{
                            from: 'color',
                            modifiers: [['darker', 2]],
                          }}
                          colors={{ scheme: 'pastel2' }}
                          defs={[
                            {
                              id: 'dots',
                              type: 'patternDots',
                              background: 'inherit',
                              color: 'rgba(255, 255, 255, 0.3)',
                              size: 4,
                              padding: 1,
                              stagger: true,
                            },
                            {
                              id: 'lines',
                              type: 'patternLines',
                              background: 'inherit',
                              color: 'rgba(255, 255, 255, 0.3)',
                              rotation: -45,
                              lineWidth: 6,
                              spacing: 10,
                            },
                          ]}
                          fill={[
                            {
                              match: {
                                id: 'ruby',
                              },
                              id: 'dots',
                            },
                            {
                              match: {
                                id: 'c',
                              },
                              id: 'dots',
                            },
                            {
                              match: {
                                id: 'go',
                              },
                              id: 'dots',
                            },
                            {
                              match: {
                                id: 'python',
                              },
                              id: 'dots',
                            },
                            {
                              match: {
                                id: 'scala',
                              },
                              id: 'lines',
                            },
                            {
                              match: {
                                id: 'lisp',
                              },
                              id: 'lines',
                            },
                            {
                              match: {
                                id: 'elixir',
                              },
                              id: 'lines',
                            },
                            {
                              match: {
                                id: 'javascript',
                              },
                              id: 'lines',
                            },
                          ]}
                        />
                      </div>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Title level={4}>Incidents by Month</Title>
                      <div
                        className="printable-table"
                        style={{ height: 300, width: 298 }}
                      >
                        <ResponsivePie
                          data={
                            offenderProfileData?.offender?.incidentsByMonth.map(
                              (item) => ({
                                id: item.name,
                                label: item.name,
                                value: item.count,
                              })
                            ) || []
                          }
                          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                          innerRadius={0.5}
                          borderWidth={1}
                          borderColor={{
                            from: 'color',
                            modifiers: [['darker', 0.2]],
                          }}
                          arcLinkLabelsSkipAngle={10}
                          arcLinkLabelsTextColor={
                            theme === 'light' ? '#333' : '#FFF'
                          }
                          arcLinkLabelsThickness={2}
                          arcLinkLabelsColor={{ from: 'color' }}
                          arcLabelsSkipAngle={10}
                          arcLabelsTextColor={{
                            from: 'color',
                            modifiers: [['darker', 2]],
                          }}
                          colors={{ scheme: 'pastel2' }}
                          defs={[
                            {
                              id: 'dots',
                              type: 'patternDots',
                              background: 'inherit',
                              color: 'rgba(255, 255, 255, 0.3)',
                              size: 4,
                              padding: 1,
                              stagger: true,
                            },
                            {
                              id: 'lines',
                              type: 'patternLines',
                              background: 'inherit',
                              color: 'rgba(255, 255, 255, 0.3)',
                              rotation: -45,
                              lineWidth: 6,
                              spacing: 10,
                            },
                          ]}
                          fill={[
                            {
                              match: {
                                id: 'ruby',
                              },
                              id: 'dots',
                            },
                            {
                              match: {
                                id: 'c',
                              },
                              id: 'dots',
                            },
                            {
                              match: {
                                id: 'go',
                              },
                              id: 'dots',
                            },
                            {
                              match: {
                                id: 'python',
                              },
                              id: 'dots',
                            },
                            {
                              match: {
                                id: 'scala',
                              },
                              id: 'lines',
                            },
                            {
                              match: {
                                id: 'lisp',
                              },
                              id: 'lines',
                            },
                            {
                              match: {
                                id: 'elixir',
                              },
                              id: 'lines',
                            },
                            {
                              match: {
                                id: 'javascript',
                              },
                              id: 'lines',
                            },
                          ]}
                        />
                      </div>
                    </Card>
                  </Col>
                </Row>
                <Card>
                  <Title level={4}>Targeted Goods</Title>
                  <Table
                    columns={[
                      {
                        key: 'name',
                        dataIndex: 'name',
                        title: 'Name',
                      },
                      {
                        key: 'lost',
                        dataIndex: 'lost',
                        title: 'Total Lost',
                        render: (value) => `£${value.toFixed(2)}`,
                      },
                      {
                        key: 'recovered',
                        dataIndex: 'recovered',
                        title: 'Total Recovered',
                        render: (value) => `£${value.toFixed(2)}`,
                      },
                      {
                        key: 'successRate',
                        dataIndex: 'successRate',
                        title: 'Success Rate',
                        render: (value) => `${value.toFixed(0)}%`,
                      },
                      {
                        key: 'avgLost',
                        dataIndex: 'avgLost',
                        title: 'Avg Loss',
                        render: (value) => `£${value.toFixed(2)}`,
                      },
                    ]}
                    dataSource={offenderProfileData?.offender?.goodsTypesTotals
                      ?.filter(
                        (type) =>
                          type.avgLostValue ||
                          type.avgRecoveredValue ||
                          type.successRate ||
                          type.totalLostValue ||
                          type.totalRecoveredValue
                      )
                      .map((type) => ({
                        key: type.goodsType?.id,
                        name: type.goodsType?.name,
                        lost: type.totalLostValue || 0,
                        recovered: type.totalRecoveredValue || 0,
                        successRate: type.successRate || 0,
                        incidents: type.count || 0,
                        avgLost: type.avgLostValue || 0,
                        avgRecovered: type.avgRecoveredValue || 0,
                      }))}
                    size="small"
                    pagination={false}
                  />
                </Card>
                <Card>
                  <Title level={4}>Crime Groups</Title>
                  <Table
                    size="small"
                    columns={[
                      {
                        key: 'reference',
                        dataIndex: 'reference',
                        title: 'Alert ID',
                      },
                      {
                        key: 'alias',
                        dataIndex: 'alias',
                        title: 'Alias',
                      },
                      {
                        key: 'members',
                        dataIndex: 'members',
                        title: 'Members',
                      },
                      {
                        key: 'value',
                        dataIndex: 'value',
                        title: 'Value',
                      },
                      {
                        key: 'recoveredValue',
                        dataIndex: 'recoveredValue',
                        title: 'Recovered Value',
                      },
                      {
                        key: 'lastActivity',
                        dataIndex: 'lastActivity',
                        title: 'Last Incident',
                      },
                    ]}
                  />
                </Card>
                <Card>
                  <Title level={4}>Vehicles</Title>
                  <Table
                    size="small"
                    columns={[
                      {
                        key: 'make',
                        dataIndex: 'make',
                        title: 'Make',
                      },
                      {
                        key: 'model',
                        dataIndex: 'model',
                        title: 'Model',
                      },
                      {
                        key: 'registration',
                        dataIndex: 'registration',
                        title: 'Registration',
                      },
                      {
                        key: 'colour',
                        dataIndex: 'colour',
                        title: 'Colour',
                      },
                    ]}
                  />
                </Card>
              </div>
            </div>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default OffenderProfile;
