import type { ListCrimeGroupsQuery } from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';

import ReportsSideMenu from '#/components/reports/ReportsSideMenu/ReportsSideMenu.view';
import { Col, Input, Row, Table } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Link, useParams } from 'react-router-dom';

import useStyles from './ListCrimeGroups.styles';

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
  const { reportId } = useParams();

  return (
    <Row>
      <Col style={{ width: collapsed ? 0 : undefined }}>
        <ReportsSideMenu
          collapsed={collapsed}
          selectedId={reportId ?? ''}
          setCollapsed={setCollapsed}
        />
      </Col>
      <Col className={classes.page} flex={1}>
        <Row className={classes.headerRow} gutter={16}>
          <Col flex={1}>
            <Input
              allowClear
              className={classes.searchInput}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search crime groups...',
              })}
              value={search}
            />
          </Col>
        </Row>
        <Table
          columns={[
            {
              dataIndex: 'reference',
              key: 'reference',
              render: (value: string, item) => (
                <Link to={`${item.key}`}>
                  {intl.formatMessage(
                    { defaultMessage: 'CG-{id}' },
                    {
                      id: value,
                    }
                  )}
                </Link>
              ),
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
              dataIndex: 'totalOffenders',
              key: 'totalOffenders',
              title: intl.formatMessage({
                defaultMessage: 'Members',
              }),
            },
            {
              dataIndex: 'totalIncidents',
              key: 'totalIncidents',
              title: intl.formatMessage({
                defaultMessage: 'Incidents',
              }),
            },
            {
              dataIndex: 'totalValue',
              key: 'totalValue',
              render: (value: number | undefined) =>
                intl.formatNumber(value || 0, {
                  currency: 'GBP',
                  style: 'currency',
                }),

              title: intl.formatMessage({
                defaultMessage: 'Lost Value',
              }),
            },
            {
              dataIndex: 'totalRecoveredValue',
              key: 'totalRecoveredValue',
              render: (value: number | undefined) =>
                intl.formatNumber(value || 0, {
                  currency: 'GBP',
                  style: 'currency',
                }),
              title: intl.formatMessage({
                defaultMessage: 'Recovered Value',
              }),
            },
            {
              dataIndex: 'totalTheftSuccess',
              key: 'totalTheftSuccess',
              render: (value: number | undefined) =>
                `${value?.toFixed(0) || 0}%`,
              title: intl.formatMessage({
                defaultMessage: 'Loss Rate',
              }),
            },
          ]}
          dataSource={data?.listCrimeGroups.crimeGroups.map((crimeGroup) => ({
            alias: crimeGroup.alias,
            key: crimeGroup.id,
            reference: crimeGroup.reference,
            totalIncidents: crimeGroup.totalIncidents,
            totalOffenders: crimeGroup.totalOffenders,
            totalRecoveredValue: crimeGroup.totalRecoveredValue,
            totalTheftSuccess: crimeGroup.totalTheftSuccess,
            totalValue: crimeGroup.totalValue,
          }))}
          loading={loading}
          size="small"
        />
      </Col>
    </Row>
  );
};

export default ListCrimeGroups;
