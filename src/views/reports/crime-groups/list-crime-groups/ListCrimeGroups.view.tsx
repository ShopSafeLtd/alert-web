import React from 'react';
import { Col, Input, Row, Table } from 'antd';
import type { ListCrimeGroupsQuery } from 'graphql/generated';
import { Link } from 'react-router-dom';
import useStyles from './ListCrimeGroups.styles';

interface Props {
  data: ListCrimeGroupsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
}

const ListCrimeGroups = ({ data, loading, search, setSearch }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Row gutter={16} className={classes.headerRow}>
        <Col flex={1}>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            allowClear
            className={classes.searchInput}
            placeholder="Search crime groups..."
          />
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
          alias: crimeGroup.alias,
        }))}
        loading={loading}
        size="small"
        columns={[
          {
            key: 'reference',
            dataIndex: 'reference',
            title: 'Alert ID',
            render: (value, item) => <Link to={`${item.key}`}>CG-{value}</Link>,
          },
          {
            key: 'alias',
            dataIndex: 'alias',
            title: 'Alias',
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
