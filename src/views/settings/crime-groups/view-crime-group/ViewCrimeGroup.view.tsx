import React from 'react';
import { Card, Col, Row, Statistic, Table, Typography } from 'antd';
import { CrimeGroupQuery } from 'graphql/generated';
import useStyles from './ViewCrimeGroup.styles';

const { Title } = Typography;

interface Props {
  data: CrimeGroupQuery | undefined;
}

const ViewCrimeGroup = ({ data }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Title level={3}>Reference: {data?.crimeGroup?.reference}</Title>

      <Card>
        <Row gutter={64}>
          <Col>
            <Statistic
              title="Total Incidents"
              value={data?.crimeGroup?.totalIncidents || 0}
            />
          </Col>
          <Col>
            <Statistic
              title="Total Offenders"
              value={data?.crimeGroup?.totalOffenders || 0}
            />
          </Col>
          <Col>
            <Statistic
              title="Total Lost value"
              value={`£${data?.crimeGroup?.totalValue || 0}`}
            />
          </Col>
          <Col>
            <Statistic
              title="Total Recovered value"
              value={`£${data?.crimeGroup?.totalRecoveredValue || 0}`}
            />
          </Col>
          <Col>
            <Statistic
              title="Theft Success Rate"
              value={`${data?.crimeGroup?.totalTheftSuccess?.toFixed(0) || 0}%`}
            />
          </Col>
        </Row>
      </Card>

      <Card>
        <Title level={4}>Offenders</Title>
        <Table
          columns={[
            {
              key: 'reference',
              dataIndex: 'reference',
              title: 'Reference',
            },
            {
              key: 'name',
              dataIndex: 'name',
              title: 'Name',
            },
            {
              key: 'totalIncidents',
              dataIndex: 'totalIncidents',
              title: 'Total Incidents',
            },
          ]}
          size="small"
          dataSource={
            data?.crimeGroup?.offenders.map((offender) => ({
              key: offender.id,
              reference: offender.reference,
              name: offender.name,
              totalIncidents: offender.totalIncidents,
            })) || []
          }
        />
      </Card>

      <Card>
        <Title level={4}>Incidents</Title>
        <Table
          columns={[
            {
              key: 'reference',
              dataIndex: 'reference',
              title: 'Reference',
            },
            {
              key: 'policeRef',
              dataIndex: 'policeRef',
              title: 'Crime No.',
            },
            {
              key: 'subject',
              dataIndex: 'subject',
              title: 'Subject',
            },
            {
              key: 'date',
              dataIndex: 'date',
              title: 'Date',
            },
            {
              key: 'location',
              dataIndex: 'location',
              title: 'Location',
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
          ]}
          size="small"
        />
      </Card>
    </div>
  );
};

export default ViewCrimeGroup;
