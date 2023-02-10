import React from 'react';
import { Button, Col, Input, Row, Table } from 'antd';
import { ListCrimeGroupsQuery } from 'graphql/generated';
import { Link } from 'react-router-dom';
import useStyles from './ListCrimeGroups.styles';

interface Props {
  data: ListCrimeGroupsQuery | undefined;
  loading: boolean;
}

const ListCrimeGroups = ({ data, loading }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Row className={classes.headerRow}>
        <Col flex={1}>
          <Input
            className={classes.searchInput}
            placeholder="Search crime groups..."
          />
        </Col>
        <Col>
          <Link to="create">
            <Button type="primary">Create Crime Group</Button>
          </Link>
        </Col>
      </Row>
      <Table
        dataSource={data?.listCrimeGroups.crimeGroups.map((crimeGroup) => ({
          key: crimeGroup.id,
          reference: crimeGroup.reference,
          totalOffenders: crimeGroup.totalOffenders,
          totalIncidents: crimeGroup.totalIncidents,
          totalValue: crimeGroup.totalValue,
          totalRecoveredValue: crimeGroup.totalRecoveredValue,
          totalTheftSuccess: crimeGroup.totalTheftSuccess,
        }))}
        loading={loading}
        size="small"
        columns={[
          {
            key: 'reference',
            dataIndex: 'reference',
            title: 'Reference',
            render: (value, item) => (
              <Link to={`view/${item.key}`}>CG-{value}</Link>
            ),
          },
          {
            key: 'totalOffenders',
            dataIndex: 'totalOffenders',
            title: 'Members',
          },
          {
            key: 'totalIncidents',
            dataIndex: 'totalIncidents',
            title: 'Incidents',
          },
          {
            key: 'totalValue',
            dataIndex: 'totalValue',
            title: 'Lost Value',
            render: (value) => `£${value || 0}`,
          },
          {
            key: 'totalRecoveredValue',
            dataIndex: 'totalRecoveredValue',
            title: 'Recovered Value',
            render: (value) => `£${value || 0}`,
          },
          {
            key: 'totalTheftSuccess',
            dataIndex: 'totalTheftSuccess',
            title: 'Success Rate',
            render: (value) => `${value?.toFixed(0) || 0}%`,
          },
        ]}
      />
    </div>
  );
};

export default ListCrimeGroups;
