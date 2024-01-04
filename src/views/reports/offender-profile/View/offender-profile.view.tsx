import React from 'react';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Row,
  Skeleton,
  Spin,
  Statistic,
  Table,
  Tag,
  Typography,
} from 'antd';
import OffenderSideList from 'components/offenders/OffenderSideList';
import type { OffenderProfileQuery } from 'graphql/generated';
import { Role, Age, Build, Gender, Race } from 'graphql/generated';
import { getAge, getBuild, getEthnicity, getSex } from 'utils';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/pro-light-svg-icons';
import { useStoreState } from 'state';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { useIntl } from 'react-intl';
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
  const role = useStoreState((state) => state.user.role);
  const publicOffenderDOB =
    useStoreState((state) => state.scheme.defaultPublicOffenderDOB) ||
    role !== Role.User;
  const intl = useIntl();
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
                  {intl.formatMessage({
                    defaultMessage: 'Download Report',
                    id: 'iHdvdj',
                  })}
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
                      {intl.formatMessage(
                        {
                          defaultMessage: 'Alert ID: {ref}',
                          id: 'umL9sI',
                        },
                        {
                          ref: offenderProfileData?.offender?.reference,
                        }
                      )}
                    </Text>
                    <Title level={4} type="secondary">
                      {intl.formatMessage({
                        defaultMessage: 'Offender Details',
                        id: 'fQT6Wx',
                      })}
                    </Title>
                    <Descriptions column={2} className={classes.descriptions}>
                      <Descriptions.Item
                        className={classes.descItem}
                        label={intl.formatMessage({
                          defaultMessage: 'Gender',
                          id: 'm8/n8c',
                        })}
                      >
                        {getSex(
                          offenderProfileData?.offender?.gender ||
                            Gender.Unknown
                        )}
                      </Descriptions.Item>
                      {publicOffenderDOB &&
                        !offenderProfileData?.offender?.dateOfBirth && (
                          <Descriptions.Item
                            className={classes.descItem}
                            label={intl.formatMessage({
                              defaultMessage: 'Age',
                              id: '9oNQSC',
                            })}
                          >
                            {getAge(
                              offenderProfileData?.offender?.age || Age.Unknown
                            )}
                          </Descriptions.Item>
                        )}
                      {publicOffenderDOB &&
                        offenderProfileData?.offender?.dateOfBirth && (
                          <Descriptions.Item
                            className={classes.descItem}
                            label={intl.formatMessage({
                              defaultMessage: 'Date of Birth',
                              id: 'e9Z+tg',
                            })}
                          >
                            {moment(
                              offenderProfileData?.offender?.dateOfBirth
                            ).format('DD/MM/YYYY')}
                          </Descriptions.Item>
                        )}
                      {offenderProfileData?.offender?.dateSource && (
                        <Descriptions.Item
                          className={classes.descItem}
                          label={intl.formatMessage({
                            defaultMessage: 'DoB Source',
                            id: 'buqD4b',
                          })}
                        >
                          {offenderProfileData?.offender?.dateSource}
                        </Descriptions.Item>
                      )}
                      <Descriptions.Item
                        className={classes.descItem}
                        label={intl.formatMessage({
                          defaultMessage: 'Build',
                          id: 'RSctv1',
                        })}
                      >
                        {getBuild(
                          offenderProfileData?.offender?.build || Build.Unknown
                        )}
                      </Descriptions.Item>
                      <Descriptions.Item
                        className={classes.descItem}
                        label={intl.formatMessage({
                          defaultMessage: 'Ethnicity',
                          id: 'XtCAFo',
                        })}
                      >
                        {getEthnicity(
                          offenderProfileData?.offender?.race || Race.Unknown
                        )}
                      </Descriptions.Item>
                    </Descriptions>
                    <Descriptions column={1}>
                      <Descriptions.Item
                        className={classes.descItem}
                        label={intl.formatMessage({
                          defaultMessage: 'Hair',
                          id: 'e4YBbX',
                        })}
                      >
                        {offenderProfileData?.offender?.hair ||
                          intl.formatMessage({
                            defaultMessage: 'Unknown',
                            id: '5jeq8P',
                          })}
                      </Descriptions.Item>
                      <Descriptions.Item
                        className={classes.descItem}
                        label={intl.formatMessage({
                          defaultMessage: 'Characteristics',
                          id: 'xksukL',
                        })}
                      >
                        {offenderProfileData?.offender?.peculiarities ||
                          intl.formatMessage({
                            defaultMessage: 'None documented',
                            id: '+CkDvs',
                          })}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              </Card>
              <div className={classes.incidentSummary}>
                <Title level={3}>
                  {intl.formatMessage({
                    defaultMessage: 'Incident Summary',
                    id: 'OgfKP9',
                  })}
                </Title>
                <Row gutter={16}>
                  <Col>
                    <Card>
                      <Statistic
                        value={
                          offenderProfileData?.offender?.totalIncidents || 0
                        }
                        title={intl.formatMessage({
                          defaultMessage: 'Total Incidents',
                          id: 'pUlxda',
                        })}
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
                            : intl.formatMessage({
                                defaultMessage: 'None',
                                id: '450Fty',
                              })
                        }
                        title={intl.formatMessage({
                          defaultMessage: 'Last Active',
                          id: 'l/6hum',
                        })}
                      />
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Statistic
                        value={`£${
                          offenderProfileData?.offender?.totalValue || 0
                        }`}
                        title={intl.formatMessage({
                          defaultMessage: 'Total Value Lost',
                          id: 'fWpZ4S',
                        })}
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
                        title={intl.formatMessage({
                          defaultMessage: 'Total Value Recovered',
                          id: 't+iLve',
                        })}
                      />
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Statistic
                        value={`${
                          offenderProfileData?.offender?.totalTheftSuccess || 0
                        }%`}
                        title={intl.formatMessage({
                          defaultMessage: 'Success Rate',
                          id: 'IaZkrc',
                        })}
                      />
                    </Card>
                  </Col>
                </Row>
                <Card>
                  <Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Incidents over the last 12 months',
                      id: 'I/u2cD',
                    })}
                  </Title>
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
                        legend: intl.formatMessage({
                          defaultMessage: 'Incidents',
                          id: 'mtr3R4',
                        }),
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
                      ariaLabel="bar chart"
                    />
                  </div>
                </Card>
                <Card>
                  <Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'All Incidents',
                      id: 'wE2z2t',
                    })}
                  </Title>
                  <Table
                    size="small"
                    pagination={false}
                    columns={[
                      {
                        key: 'reference',
                        dataIndex: 'reference',
                        title: intl.formatMessage({
                          defaultMessage: 'Alert ID',
                          id: 'k8ZNgH',
                        }),
                      },
                      {
                        key: 'date',
                        dataIndex: 'date',
                        title: intl.formatMessage({
                          defaultMessage: 'Date',
                          id: 'P7PLVj',
                        }),
                        render: (value: Date) =>
                          moment(value).format('DD/MM/YY'),
                      },
                      {
                        key: 'value',
                        dataIndex: 'value',
                        title: intl.formatMessage({
                          defaultMessage: 'Value',
                          id: 'GufXy5',
                        }),
                        render: (value: string) => `£${value}`,
                      },
                      {
                        key: 'recoveredValue',
                        dataIndex: 'recoveredValue',
                        title: intl.formatMessage({
                          defaultMessage: 'Recovered Value',
                          id: 'bGwFFv',
                        }),
                        render: (value: string) => `£${value}`,
                      },
                      {
                        key: 'createdBy',
                        dataIndex: 'createdBy',
                        title: intl.formatMessage({
                          defaultMessage: 'Created By',
                          id: 'uAfuJA',
                        }),
                      },
                      {
                        key: 'crimeTypes',
                        dataIndex: 'crimeTypes',
                        title: intl.formatMessage({
                          defaultMessage: 'Types',
                          id: 'kxP9GJ',
                        }),
                        render: (value: { id: string; name: string }[]) =>
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
                      <Title level={4}>
                        {intl.formatMessage({
                          defaultMessage: 'Incidents by Hour',
                          id: '++g1VR',
                        })}
                      </Title>
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
                        />
                      </div>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Title level={4}>
                        {intl.formatMessage({
                          defaultMessage: 'Incidents by Day',
                          id: 'YiU0H0',
                        })}
                      </Title>
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
                        />
                      </div>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Title level={4}>
                        {intl.formatMessage({
                          defaultMessage: 'Incidents by Month',
                          id: '+Prn0X',
                        })}
                      </Title>
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
                        />
                      </div>
                    </Card>
                  </Col>
                </Row>
                <Card>
                  <Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Targeted Goods',
                      id: 'dLBbg0',
                    })}
                  </Title>
                  <Table
                    columns={[
                      {
                        key: 'name',
                        dataIndex: 'name',
                        title: intl.formatMessage({
                          defaultMessage: 'Name',
                          id: 'HAlOn1',
                        }),
                      },
                      {
                        key: 'lost',
                        dataIndex: 'lost',
                        title: intl.formatMessage({
                          defaultMessage: 'Total Lost',
                          id: 'TpqK2W',
                        }),
                        render: (value: number) => `£${value.toFixed(2)}`,
                      },
                      {
                        key: 'recovered',
                        dataIndex: 'recovered',
                        title: intl.formatMessage({
                          defaultMessage: 'Total Recovered',
                          id: '/YBJ85',
                        }),
                        render: (value: number) => `£${value.toFixed(2)}`,
                      },
                      {
                        key: 'successRate',
                        dataIndex: 'successRate',
                        title: intl.formatMessage({
                          defaultMessage: 'Success Rate',
                          id: 'IaZkrc',
                        }),
                        render: (value: number) => `${value.toFixed(0)}%`,
                      },
                      {
                        key: 'avgLost',
                        dataIndex: 'avgLost',
                        title: intl.formatMessage({
                          defaultMessage: 'Avg Lost',
                          id: 'C70bmG',
                        }),
                        render: (value: number) => `£${value.toFixed(2)}`,
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
                  <Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Crime Groups',
                      id: 'a0aLil',
                    })}
                  </Title>
                  <Table
                    size="small"
                    columns={[
                      {
                        key: 'reference',
                        dataIndex: 'reference',
                        title: intl.formatMessage({
                          defaultMessage: 'Alert ID',
                          id: 'k8ZNgH',
                        }),
                      },
                      {
                        key: 'alias',
                        dataIndex: 'alias',
                        title: intl.formatMessage({
                          defaultMessage: 'Alias',
                          id: 'Ri9jA7',
                        }),
                      },
                      {
                        key: 'members',
                        dataIndex: 'members',
                        title: intl.formatMessage({
                          defaultMessage: 'Members',
                          id: '+a+2ug',
                        }),
                      },
                      {
                        key: 'value',
                        dataIndex: 'value',
                        title: intl.formatMessage({
                          defaultMessage: 'Value',
                          id: 'GufXy5',
                        }),
                      },
                      {
                        key: 'recoveredValue',
                        dataIndex: 'recoveredValue',
                        title: intl.formatMessage({
                          defaultMessage: 'Recovered Value',
                          id: 'bGwFFv',
                        }),
                      },
                      {
                        key: 'lastActivity',
                        dataIndex: 'lastActivity',
                        title: intl.formatMessage({
                          defaultMessage: 'Last Incident',
                          id: 'kJuP0b',
                        }),
                      },
                    ]}
                  />
                </Card>
                <Card>
                  <Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Vehicles',
                      id: 'r6wuJ3',
                    })}
                  </Title>
                  <Table
                    size="small"
                    columns={[
                      {
                        key: 'make',
                        dataIndex: 'make',
                        title: intl.formatMessage({
                          defaultMessage: 'Make',
                          id: '6AAM0P',
                        }),
                      },
                      {
                        key: 'model',
                        dataIndex: 'model',
                        title: intl.formatMessage({
                          defaultMessage: 'Model',
                          id: 'rhSI1/',
                        }),
                      },
                      {
                        key: 'registration',
                        dataIndex: 'registration',
                        title: intl.formatMessage({
                          defaultMessage: 'Registration',
                          id: 'qv7ied',
                        }),
                      },
                      {
                        key: 'colour',
                        dataIndex: 'colour',
                        title: intl.formatMessage({
                          defaultMessage: 'Colour',
                          id: '+e8vAT',
                        }),
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
