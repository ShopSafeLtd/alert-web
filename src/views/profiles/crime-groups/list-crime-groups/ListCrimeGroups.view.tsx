import type { Dayjs } from 'dayjs';
import type { ListCrimeGroupsQuery } from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';
import type { SortOrder } from 'graphql/types';
import type { CrimeGroupFilters } from 'state/data-model';
import type { DateType } from 'types/DataType';

import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { faFilter } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Drawer, Input, Row, Table, Tooltip } from 'antd';
import CrimeGroupFilter from 'components/crimeGroups/CrimeGroupFilter';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import FormatCalendar from 'utils/format-calendar-24h';

import useStyles from './ListCrimeGroups.styles';

interface Props {
  clearFilters: () => void;
  data: ListCrimeGroupsQuery | undefined;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  loading: boolean;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  setGallery: (values: string[]) => void;
  setGroupsFilter: (value: string[]) => void;
  setOrder: (value: SortOrder) => void;
  setSearch: (value: string) => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  variables: CrimeGroupFilters;
}

const ListCrimeGroups = ({
  clearFilters,
  data,
  groups,
  groupsLoading,
  loading,
  setCreatedAtFilter,
  setGallery,
  setGroupsFilter,
  setOrder,
  setSearch,
  sortFilter,
  toggleSortFilter,
  variables,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  const navigate = useNavigate();
  const { gallery, search } = variables;
  const galleryOptions = [
    {
      label: intl.formatMessage({
        defaultMessage: 'Followed Groups',
      }),
      value: 'FOLLOWED_GROUPS',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'My Groups',
      }),
      value: 'MY_GROUPS',
    },
  ];
  const currency = useAtomValue(currencyAtom);

  return (
    <div className={classes.page}>
      <Row align="middle" className={classes.headerRow} gutter={12}>
        <Col span={8} xxl={6}>
          <Input
            allowClear
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search crime groups...',
            })}
            value={search}
          />
        </Col>
        <Col flex={1}>
          <CheckTags
            mode="check"
            noGutter
            onChange={setGallery}
            options={galleryOptions}
            value={gallery}
          />
        </Col>
        <Col>
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Sort & Filter',
            })}
          >
            <Button
              icon={<FontAwesomeIcon icon={faFilter} size="lg" />}
              onClick={toggleSortFilter}
            />
          </Tooltip>
        </Col>
        <Col>
          <Link to="create">
            <Button type="primary">
              {intl.formatMessage({
                defaultMessage: 'Create Crime Group',
              })}
            </Button>
          </Link>
        </Col>
      </Row>
      <Table
        columns={[
          {
            dataIndex: 'reference',
            key: 'reference',
            render: (value, item) => (
              <Link to={`view/${item.key}`}>{value}</Link>
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
                currency,
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
                currency,
                style: 'currency',
              }),
            title: intl.formatMessage({
              defaultMessage: 'Recovered Value',
            }),
          },
          {
            dataIndex: 'totalTheftSuccess',
            key: 'totalTheftSuccess',
            render: (value: number | undefined) => `${value?.toFixed(0) || 0}%`,
            title: intl.formatMessage({
              defaultMessage: 'Loss Rate',
            }),
          },
          {
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (value: Date | Dayjs) =>
              FormatCalendar(value || dayjs(), intl),
            sorter: (a, b) =>
              new Date(a.updatedAt).valueOf() - new Date(b.updatedAt).valueOf(),
            title: intl.formatMessage({
              defaultMessage: 'Updated At',
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
          updatedAt: crimeGroup.updatedAt,
        }))}
        loading={loading}
        onRow={(record) => ({
          onClick: () => navigate(`view/${record.key}`),
          style: { cursor: 'pointer' },
        })}
        pagination={{
          defaultPageSize: 20,
          hideOnSinglePage: true,
          pageSize: 20,
        }}
        size="small"
      />
      <Drawer
        onClose={toggleSortFilter}
        open={sortFilter}
        title={intl.formatMessage({
          defaultMessage: 'Crime Group Filters',
        })}
        width={500}
      >
        <CrimeGroupFilter
          clearFilters={clearFilters}
          groups={groups}
          groupsLoading={groupsLoading}
          setCreatedAtFilter={setCreatedAtFilter}
          setGroupsFilter={setGroupsFilter}
          setOrder={setOrder}
          variables={variables}
        />
      </Drawer>
    </div>
  );
};

export default ListCrimeGroups;
