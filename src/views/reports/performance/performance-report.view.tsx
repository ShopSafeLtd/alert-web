import React from 'react';
import { Card, Col, Row, Statistic, Table, Typography } from 'antd';
import { PerformanceReportQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faExclamationCircle,
  faPenToSquare,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import Chart from 'react-apexcharts';
import useStyles from './performance-report.styles';

const { Title } = Typography;

interface Props {
  data: PerformanceReportQuery | undefined;
  loading: boolean;
}

const PerformanceReport = ({ data, loading }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Title level={2}>Performance Report - {data?.scheme?.name}</Title>
      <Card loading={loading}>
        <Row gutter={64}>
          <Col>
            <Statistic
              title="Incidents Created"
              value={data?.scheme?.incidentsCreated || 0}
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
              value={data?.scheme?.offendersCreated || 0}
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
              value={data?.scheme?.updatesCreated || 0}
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
              value={data?.scheme?.messagesSent || 0}
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faComments}
                />
              }
            />
          </Col>
        </Row>
      </Card>
      <Card loading={loading}>
        <Title level={4}>Breakdown of Created Data</Title>
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
              categories: data?.scheme?.creationBreakdown?.scale,
            },
          }}
          series={data?.scheme?.creationBreakdown?.data?.map((item) => ({
            name: item?.name,
            data: item?.count,
          }))}
          type="bar"
          width="95%"
          height="200"
        />
      </Card>
      <Row gutter={16}>
        <Col span={12}>
          <Card loading={loading}>
            <Title level={4}>Created Incidents by Type</Title>
            <Chart
              options={{
                chart: {
                  id: 'incidents-line',
                  redrawOnParentResize: false,
                  toolbar: {
                    show: false,
                  },
                },
                labels: data?.scheme?.incidentsByType?.types || [],
              }}
              series={data?.scheme?.incidentsByType?.data || []}
              type="donut"
              width="95%"
              height="200"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card loading={loading}>
            <Title level={4}>Top Contributors</Title>
            <Table
              size="small"
              pagination={false}
              columns={[
                {
                  key: 'fullName',
                  dataIndex: 'fullName',
                  title: 'Name',
                },
                {
                  key: 'business',
                  dataIndex: 'business',
                  title: 'Business',
                },
                {
                  key: 'incidentsCreated',
                  dataIndex: 'incidentsCreated',
                  title: 'Incidents',
                  defaultSortOrder: 'descend',
                  sorter: true,
                },
                {
                  key: 'offendersCreated',
                  dataIndex: 'offendersCreated',
                  title: 'Offenders',
                  sorter: true,
                },
                {
                  key: 'updatesCreated',
                  dataIndex: 'updatesCreated',
                  title: 'Updates',
                  sorter: true,
                },
                {
                  key: 'messagesSent',
                  dataIndex: 'messagesSent',
                  title: 'Messages',
                  sorter: true,
                },
              ]}
              dataSource={data?.scheme?.topContributors?.map((user) => ({
                key: user.id,
                fullName: user.fullName,
                business: user.businesses[0]?.name,
                incidentsCreated: user.incidentsCreated,
                offendersCreated: user.offendersCreated,
                updatesCreated: user.updatesCreated,
                messagesSent: user.messagesSent,
              }))}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PerformanceReport;
