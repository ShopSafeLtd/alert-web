import React, { useState } from 'react';
import { Col, Input, Row, Table } from 'antd';
import type { ListCrimeGroupsQuery } from 'graphql/generated';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import useStyles from './ListCrimeGroups.styles';
import ReportsSideMenu from '#/components/reports/ReportsSideMenu/ReportsSideMenu.view';

interface Props {
  data: ListCrimeGroupsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
}

const ListCrimeGroups = ({ data, loading, search, setSearch }: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Row>
      <Col style={{ width: collapsed ? 0 : undefined }}>
        <ReportsSideMenu collapsed={collapsed} setCollapsed={setCollapsed} />
      </Col>
      <Col flex={1} className={classes.page}>
        <Row gutter={16} className={classes.headerRow}>
          <Col flex={1}>
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              allowClear
              className={classes.searchInput}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search crime groups...',
                id: 'q5vT3Z',
              })}
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
              title: intl.formatMessage({
                defaultMessage: 'Alert ID',
                id: 'k8ZNgH',
              }),
              render: (value: string, item) => (
                <Link to={`${item.key}`}>
                  {intl.formatMessage(
                    { defaultMessage: 'CG-{id}', id: 'ryBmoZ' },
                    {
                      id: value,
                    }
                  )}
                </Link>
              ),
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
              key: 'totalOffenders',
              dataIndex: 'totalOffenders',
              title: intl.formatMessage({
                defaultMessage: 'Members',
                id: '+a+2ug',
              }),
            },
            {
              key: 'totalIncidents',
              dataIndex: 'totalIncidents',
              title: intl.formatMessage({
                defaultMessage: 'Incidents',
                id: 'mtr3R4',
              }),
            },
            {
              key: 'totalValue',
              dataIndex: 'totalValue',
              title: intl.formatMessage({
                defaultMessage: 'Lost Value',
                id: '3YYDlc',
              }),
              render: (value: number | undefined) => `£${value || 0}`,
            },
            {
              key: 'totalRecoveredValue',
              dataIndex: 'totalRecoveredValue',
              title: intl.formatMessage({
                defaultMessage: 'Recovered Value',
                id: 'bGwFFv',
              }),
              render: (value: number | undefined) => `£${value || 0}`,
            },
            {
              key: 'totalTheftSuccess',
              dataIndex: 'totalTheftSuccess',
              title: intl.formatMessage({
                defaultMessage: 'Loss Rate',
                id: 'mQPFSj',
              }),
              render: (value: number | undefined) =>
                `${value?.toFixed(0) || 0}%`,
            },
          ]}
        />
      </Col>
    </Row>
  );
};

export default ListCrimeGroups;
