import type { OffenderProfileQuery } from 'graphql/reports/queries/__generated__/offender-profile.generated';

import ReportsSideMenu from '#/components/reports/ReportsSideMenu/ReportsSideMenu.view';
import { faDownload } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
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
import WatermarkImage from 'components/images/WatermarkImage.view';
import OffenderSideList from 'components/offenders/OffenderSideList';
import { Age, Build, Gender, Race, Role } from 'graphql/types';
import moment from 'moment';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import { getAge, getBuild, getEthnicity, getSex } from 'utils';

import useStyles from './offender-profile.styles';

const { Text, Title } = Typography;

interface Props {
  offenderProfileData: OffenderProfileQuery | undefined;
  offenderProfileLoading: boolean;
  reportId: string | undefined;
  selectedOffender: string | undefined;
}

const OffenderProfile = ({
  offenderProfileData,
  offenderProfileLoading,
  reportId,
  selectedOffender,
}: Props) => {
  const classes = useStyles();
  const theme = useStoreState((state) => state.theme.currentTheme);
  const role = useStoreState((state) => state.user.role);
  const publicOffenderDOB =
    useStoreState((state) => state.scheme.defaultPublicOffenderDOB) ||
    role !== Role.User;
  const intl = useIntl();
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Row wrap={false}>
      <Col>
        <ReportsSideMenu
          collapsed={collapsed}
          selectedId={reportId ?? ''}
          setCollapsed={setCollapsed}
        />
      </Col>
      <Col>
        <OffenderSideList
          current={selectedOffender || ''}
          to="/app/reports/offender-profile/"
        />
      </Col>
      <Col flex={1}>
        {offenderProfileLoading ? (
          <div className={classes.loadingPage}>
            <Spin />
          </div>
        ) : (
          <div className={classes.page}>
            <Row className={classes.actionBar} justify="end">
              <Col>
                <Button type="primary">
                  <FontAwesomeIcon
                    className={classes.buttonIcon}
                    icon={faDownload}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'Download Report',
                  })}
                </Button>
              </Col>
            </Row>
            <div>
              <Card bodyStyle={{ overflow: 'hidden', padding: 0 }}>
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
                        },
                        {
                          ref: offenderProfileData?.offender?.reference,
                        }
                      )}
                    </Text>
                    <Title level={4} type="secondary">
                      {intl.formatMessage({
                        defaultMessage: 'Offender Details',
                      })}
                    </Title>
                    <Descriptions className={classes.descriptions} column={2}>
                      <Descriptions.Item
                        className={classes.descItem}
                        label={intl.formatMessage({
                          defaultMessage: 'Gender',
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
                          })}
                        >
                          {offenderProfileData?.offender?.dateSource}
                        </Descriptions.Item>
                      )}
                      <Descriptions.Item
                        className={classes.descItem}
                        label={intl.formatMessage({
                          defaultMessage: 'Build',
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
                        })}
                      >
                        {offenderProfileData?.offender?.hair ||
                          intl.formatMessage({
                            defaultMessage: 'Unknown',
                          })}
                      </Descriptions.Item>
                      <Descriptions.Item
                        className={classes.descItem}
                        label={intl.formatMessage({
                          defaultMessage: 'Characteristics',
                        })}
                      >
                        {offenderProfileData?.offender?.peculiarities ||
                          intl.formatMessage({
                            defaultMessage: 'None documented',
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
                  })}
                </Title>
                <Row gutter={16}>
                  <Col>
                    <Card>
                      <Statistic
                        title={intl.formatMessage({
                          defaultMessage: 'Total Incidents',
                        })}
                        value={
                          offenderProfileData?.offender?.totalIncidents || 0
                        }
                      />
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Statistic
                        title={intl.formatMessage({
                          defaultMessage: 'Last Active',
                        })}
                        value={
                          offenderProfileData?.offender?.lastActive?.date
                            ? moment(
                                offenderProfileData?.offender?.lastActive?.date
                              ).format('DD/MM/YY')
                            : intl.formatMessage({
                                defaultMessage: 'None',
                              })
                        }
                      />
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Statistic
                        title={intl.formatMessage({
                          defaultMessage: 'Total Value Lost',
                        })}
                        value={`£${
                          offenderProfileData?.offender?.totalValue || 0
                        }`}
                      />
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Statistic
                        title={intl.formatMessage({
                          defaultMessage: 'Total Value Recovered',
                        })}
                        value={`£${
                          offenderProfileData?.offender?.totalRecoveredValue ||
                          0
                        }`}
                      />
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Statistic
                        title={intl.formatMessage({
                          defaultMessage: 'Loss Rate',
                        })}
                        value={`${
                          offenderProfileData?.offender?.totalTheftSuccess || 0
                        }%`}
                      />
                    </Card>
                  </Col>
                </Row>
                <Card>
                  <Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Incidents over the last 12 months',
                    })}
                  </Title>
                  <div
                    className="printable-table"
                    style={{ height: 300, width: 950 }}
                  >
                    <ResponsiveBar
                      ariaLabel="bar chart"
                      axisBottom={{
                        legend: 'Month',
                        legendOffset: 32,
                        legendPosition: 'middle',
                        tickPadding: 5,
                        tickRotation: 0,
                        tickSize: 5,
                      }}
                      axisLeft={{
                        legend: intl.formatMessage({
                          defaultMessage: 'Incidents',
                        }),
                        legendOffset: -40,
                        legendPosition: 'middle',
                        tickPadding: 5,
                        tickRotation: 0,
                        tickSize: 5,
                      }}
                      axisRight={null}
                      axisTop={null}
                      borderColor={{
                        from: 'color',
                        modifiers: [['darker', 1.6]],
                      }}
                      colors={{ scheme: 'pastel1' }}
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
                      defs={[
                        {
                          background: 'inherit',
                          color: '#38bcb2',
                          id: 'dots',
                          padding: 1,
                          size: 4,
                          stagger: true,
                          type: 'patternDots',
                        },
                        {
                          background: 'inherit',
                          color: '#eed312',
                          id: 'lines',
                          lineWidth: 6,
                          rotation: -45,
                          spacing: 10,
                          type: 'patternLines',
                        },
                      ]}
                      indexBy="month"
                      indexScale={{ round: true, type: 'band' }}
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
                      labelSkipHeight={12}
                      labelSkipWidth={12}
                      labelTextColor={{
                        from: 'color',
                        modifiers: [['darker', 1.6]],
                      }}
                      legends={[
                        {
                          anchor: 'bottom-right',
                          dataFrom: 'keys',
                          direction: 'column',
                          effects: [
                            {
                              on: 'hover',
                              style: {
                                itemOpacity: 1,
                              },
                            },
                          ],
                          itemDirection: 'left-to-right',
                          itemHeight: 20,
                          itemOpacity: 0.85,
                          itemTextColor: theme === 'light' ? '#333' : '#FFF',
                          itemWidth: 100,
                          itemsSpacing: 2,
                          justify: false,
                          symbolSize: 20,
                          translateX: 120,
                          translateY: 0,
                        },
                      ]}
                      margin={{ bottom: 50, left: 60, right: 130, top: 50 }}
                      padding={0.3}
                      role="application"
                      theme={{
                        axis: {
                          domain: {},
                          legend: {
                            text: {
                              fill: theme === 'light' ? '#333' : '#FFF',
                            },
                          },
                          ticks: {
                            line: {
                              fill: theme === 'light' ? '#333' : '#FFF',
                            },
                            text: {
                              fill: theme === 'light' ? '#333' : '#FFF',
                            },
                          },
                        },
                      }}
                      valueScale={{ type: 'linear' }}
                    />
                  </div>
                </Card>
                <Card>
                  <Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'All Incidents',
                    })}
                  </Title>
                  <Table
                    columns={[
                      {
                        dataIndex: 'reference',
                        key: 'reference',
                        title: intl.formatMessage({
                          defaultMessage: 'Alert ID',
                        }),
                      },
                      {
                        dataIndex: 'date',
                        key: 'date',
                        render: (value: Date) =>
                          moment(value).format('DD/MM/YY'),
                        title: intl.formatMessage({
                          defaultMessage: 'Date',
                        }),
                      },
                      {
                        dataIndex: 'value',
                        key: 'value',
                        render: (value: string) => `£${value}`,
                        title: intl.formatMessage({
                          defaultMessage: 'Value',
                        }),
                      },
                      {
                        dataIndex: 'recoveredValue',
                        key: 'recoveredValue',
                        render: (value: string) => `£${value}`,
                        title: intl.formatMessage({
                          defaultMessage: 'Recovered Value',
                        }),
                      },
                      {
                        dataIndex: 'createdBy',
                        key: 'createdBy',
                        title: intl.formatMessage({
                          defaultMessage: 'Created By',
                        }),
                      },
                      {
                        dataIndex: 'crimeTypes',
                        key: 'crimeTypes',
                        render: (value: { id: string; name: string }[]) =>
                          value.map(
                            // eslint-disable-next-line
                            ({ id, name }: { id: string; name: string }) => (
                              <Tag key={id}>{name}</Tag>
                            )
                          ),
                        title: intl.formatMessage({
                          defaultMessage: 'Types',
                        }),
                      },
                    ]}
                    dataSource={offenderProfileData?.offender?.incidents.map(
                      (incident) => ({
                        createdBy: incident.createdBy.businesses[0]?.name,
                        crimeTypes: incident.crimeTypes,
                        date: incident.date,
                        key: incident.id,
                        recoveredValue: incident.recoveredValue || 0,
                        reference: incident.reference,
                        value: incident.value || 0,
                      })
                    )}
                    pagination={false}
                    size="small"
                  />
                </Card>
                <Row className={classes.dateRow} gutter={8}>
                  <Col>
                    <Card>
                      <Title level={4}>
                        {intl.formatMessage({
                          defaultMessage: 'Incidents by Hour',
                        })}
                      </Title>
                      <div
                        className="printable-table"
                        style={{ height: 300, width: 298 }}
                      >
                        <ResponsivePie
                          arcLabelsSkipAngle={10}
                          arcLabelsTextColor={{
                            from: 'color',
                            modifiers: [['darker', 2]],
                          }}
                          arcLinkLabelsColor={{ from: 'color' }}
                          arcLinkLabelsSkipAngle={10}
                          arcLinkLabelsTextColor={
                            theme === 'light' ? '#333' : '#FFF'
                          }
                          arcLinkLabelsThickness={2}
                          borderColor={{
                            from: 'color',
                            modifiers: [['darker', 0.2]],
                          }}
                          borderWidth={1}
                          colors={{ scheme: 'pastel2' }}
                          data={
                            offenderProfileData?.offender?.incidentsByHour.map(
                              (item) => ({
                                id: item.name,
                                label: item.name,
                                value: item.count,
                              })
                            ) || []
                          }
                          defs={[
                            {
                              background: 'inherit',
                              color: 'rgba(255, 255, 255, 0.3)',
                              id: 'dots',
                              padding: 1,
                              size: 4,
                              stagger: true,
                              type: 'patternDots',
                            },
                            {
                              background: 'inherit',
                              color: 'rgba(255, 255, 255, 0.3)',
                              id: 'lines',
                              lineWidth: 6,
                              rotation: -45,
                              spacing: 10,
                              type: 'patternLines',
                            },
                          ]}
                          innerRadius={0.5}
                          margin={{ bottom: 80, left: 80, right: 80, top: 40 }}
                        />
                      </div>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Title level={4}>
                        {intl.formatMessage({
                          defaultMessage: 'Incidents by Day',
                        })}
                      </Title>
                      <div
                        className="printable-table"
                        style={{ height: 300, width: 298 }}
                      >
                        <ResponsivePie
                          arcLabelsSkipAngle={10}
                          arcLabelsTextColor={{
                            from: 'color',
                            modifiers: [['darker', 2]],
                          }}
                          arcLinkLabelsColor={{ from: 'color' }}
                          arcLinkLabelsSkipAngle={10}
                          arcLinkLabelsTextColor={
                            theme === 'light' ? '#333' : '#FFF'
                          }
                          arcLinkLabelsThickness={2}
                          borderColor={{
                            from: 'color',
                            modifiers: [['darker', 0.2]],
                          }}
                          borderWidth={1}
                          colors={{ scheme: 'pastel2' }}
                          data={
                            offenderProfileData?.offender?.incidentsByDayOfWeek.map(
                              (item) => ({
                                id: item.name,
                                label: item.name,
                                value: item.count,
                              })
                            ) || []
                          }
                          defs={[
                            {
                              background: 'inherit',
                              color: 'rgba(255, 255, 255, 0.3)',
                              id: 'dots',
                              padding: 1,
                              size: 4,
                              stagger: true,
                              type: 'patternDots',
                            },
                            {
                              background: 'inherit',
                              color: 'rgba(255, 255, 255, 0.3)',
                              id: 'lines',
                              lineWidth: 6,
                              rotation: -45,
                              spacing: 10,
                              type: 'patternLines',
                            },
                          ]}
                          innerRadius={0.5}
                          margin={{ bottom: 80, left: 80, right: 80, top: 40 }}
                        />
                      </div>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Title level={4}>
                        {intl.formatMessage({
                          defaultMessage: 'Incidents by Month',
                        })}
                      </Title>
                      <div
                        className="printable-table"
                        style={{ height: 300, width: 298 }}
                      >
                        <ResponsivePie
                          arcLabelsSkipAngle={10}
                          arcLabelsTextColor={{
                            from: 'color',
                            modifiers: [['darker', 2]],
                          }}
                          arcLinkLabelsColor={{ from: 'color' }}
                          arcLinkLabelsSkipAngle={10}
                          arcLinkLabelsTextColor={
                            theme === 'light' ? '#333' : '#FFF'
                          }
                          arcLinkLabelsThickness={2}
                          borderColor={{
                            from: 'color',
                            modifiers: [['darker', 0.2]],
                          }}
                          borderWidth={1}
                          colors={{ scheme: 'pastel2' }}
                          data={
                            offenderProfileData?.offender?.incidentsByMonth.map(
                              (item) => ({
                                id: item.name,
                                label: item.name,
                                value: item.count,
                              })
                            ) || []
                          }
                          defs={[
                            {
                              background: 'inherit',
                              color: 'rgba(255, 255, 255, 0.3)',
                              id: 'dots',
                              padding: 1,
                              size: 4,
                              stagger: true,
                              type: 'patternDots',
                            },
                            {
                              background: 'inherit',
                              color: 'rgba(255, 255, 255, 0.3)',
                              id: 'lines',
                              lineWidth: 6,
                              rotation: -45,
                              spacing: 10,
                              type: 'patternLines',
                            },
                          ]}
                          innerRadius={0.5}
                          margin={{ bottom: 80, left: 80, right: 80, top: 40 }}
                        />
                      </div>
                    </Card>
                  </Col>
                </Row>
                <Card>
                  <Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Targeted Goods',
                    })}
                  </Title>
                  <Table
                    columns={[
                      {
                        dataIndex: 'name',
                        key: 'name',
                        title: intl.formatMessage({
                          defaultMessage: 'Name',
                        }),
                      },
                      {
                        dataIndex: 'lost',
                        key: 'lost',
                        render: (value: number) => `£${value.toFixed(2)}`,
                        title: intl.formatMessage({
                          defaultMessage: 'Total Lost',
                        }),
                      },
                      {
                        dataIndex: 'recovered',
                        key: 'recovered',
                        render: (value: number) => `£${value.toFixed(2)}`,
                        title: intl.formatMessage({
                          defaultMessage: 'Total Recovered',
                        }),
                      },
                      {
                        dataIndex: 'successRate',
                        key: 'successRate',
                        render: (value: number) => `${value.toFixed(0)}%`,
                        title: intl.formatMessage({
                          defaultMessage: 'Loss Rate',
                        }),
                      },
                      {
                        dataIndex: 'avgLost',
                        key: 'avgLost',
                        render: (value: number) => `£${value.toFixed(2)}`,
                        title: intl.formatMessage({
                          defaultMessage: 'Avg Lost',
                        }),
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
                        avgLost: type.avgLostValue || 0,
                        avgRecovered: type.avgRecoveredValue || 0,
                        incidents: type.count || 0,
                        key: type.goodsType?.id,
                        lost: type.totalLostValue || 0,
                        name: type.goodsType?.name,
                        recovered: type.totalRecoveredValue || 0,
                        successRate: type.successRate || 0,
                      }))}
                    pagination={false}
                    size="small"
                  />
                </Card>
                <Card>
                  <Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Crime Groups',
                    })}
                  </Title>
                  <Table
                    columns={[
                      {
                        dataIndex: 'reference',
                        key: 'reference',
                        title: intl.formatMessage({
                          defaultMessage: 'Alert ID',
                        }),
                      },
                      {
                        dataIndex: 'alias',
                        key: 'alias',
                        title: intl.formatMessage({
                          defaultMessage: 'Alias',
                        }),
                      },
                      {
                        dataIndex: 'members',
                        key: 'members',
                        title: intl.formatMessage({
                          defaultMessage: 'Members',
                        }),
                      },
                      {
                        dataIndex: 'value',
                        key: 'value',
                        title: intl.formatMessage({
                          defaultMessage: 'Value',
                        }),
                      },
                      {
                        dataIndex: 'recoveredValue',
                        key: 'recoveredValue',
                        title: intl.formatMessage({
                          defaultMessage: 'Recovered Value',
                        }),
                      },
                      {
                        dataIndex: 'lastActivity',
                        key: 'lastActivity',
                        title: intl.formatMessage({
                          defaultMessage: 'Last Incident',
                        }),
                      },
                    ]}
                    size="small"
                  />
                </Card>
                <Card>
                  <Title level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'Vehicles',
                    })}
                  </Title>
                  <Table
                    columns={[
                      {
                        dataIndex: 'make',
                        key: 'make',
                        title: intl.formatMessage({
                          defaultMessage: 'Make',
                        }),
                      },
                      {
                        dataIndex: 'model',
                        key: 'model',
                        title: intl.formatMessage({
                          defaultMessage: 'Model',
                        }),
                      },
                      {
                        dataIndex: 'registration',
                        key: 'registration',
                        title: intl.formatMessage({
                          defaultMessage: 'Registration',
                        }),
                      },
                      {
                        dataIndex: 'colour',
                        key: 'colour',
                        title: intl.formatMessage({
                          defaultMessage: 'Colour',
                        }),
                      },
                    ]}
                    size="small"
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
