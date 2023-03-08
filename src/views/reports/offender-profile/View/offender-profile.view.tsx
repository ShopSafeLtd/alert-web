import React from 'react';
import {
  Col,
  Row,
  Spin,
  Typography,
  Image,
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
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/pro-light-svg-icons';
import Chart from 'react-apexcharts';
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
            <Card bodyStyle={{ padding: 0, overflow: 'hidden' }}>
              <Row wrap={false}>
                <Col className={classes.imageCol} span={8}>
                  {offenderProfileData?.offender?.images &&
                  offenderProfileData?.offender?.images.length > 0 ? (
                    <Image
                      className={classes.image}
                      src={
                        offenderProfileData?.offender?.images[0]?.optimised ||
                        ''
                      }
                    />
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
                        offenderProfileData?.offender?.gender || Gender.Unknown
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
                        {offenderProfileData?.offender?.dateOfBirth}
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
                      value={offenderProfileData?.offender?.totalIncidents || 0}
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
                        offenderProfileData?.offender?.totalRecoveredValue || 0
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
                <Chart
                  options={{
                    chart: {
                      id: 'incidents-line',
                      redrawOnParentResize: false,
                      toolbar: {
                        show: false,
                      },
                    },
                    xaxis: {
                      categories:
                        offenderProfileData?.offender?.incidentTotals?.months,
                    },
                  }}
                  series={offenderProfileData?.offender?.incidentTotals?.data?.map(
                    (item) => ({
                      name: item?.name,
                      data: item?.count,
                    })
                  )}
                  type="bar"
                  width="95%"
                  height="200"
                />
              </Card>
              <Card>
                <Title level={4}>All Incidents</Title>
                <Table
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
                      data: incident.date,
                      crimeTypes: incident.crimeTypes,
                      value: incident.value || 0,
                      recoveredValue: incident.recoveredValue || 0,
                      createdBy: incident.createdBy.businesses[0]?.name,
                    })
                  )}
                />
              </Card>
              <Title level={3}>Crime Groups</Title>
              <Card>
                <Table
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
              <Title level={3}>Vehicles</Title>
              <Card>
                <Table
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
        )}
      </Col>
    </Row>
  );
};

export default OffenderProfile;
