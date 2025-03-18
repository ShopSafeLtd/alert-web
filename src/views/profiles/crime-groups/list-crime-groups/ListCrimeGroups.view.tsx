import type { ListCrimeGroupsQuery } from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';
import type { SortOrder } from 'graphql/types';
import type { Moment } from 'moment';
import type { CrimeGroupFilters } from 'state/data-model';
import type { DateType } from 'types/DataType';

import { faFilter, faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Drawer, Input, Row, Table, Tooltip } from 'antd';
import CrimeGroupFilter from 'components/crimeGroups/CrimeGroupFilter';
import AddInvestigation from 'components/form-components/Investigation/AddInvestigation';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import moment from 'moment';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import FormatCalendar from 'utils/format-calendar-24h';

import useStyles from './ListCrimeGroups.styles';

interface Props {
  addInvestigation: string;
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
  toggleAddInvestigation: (value: string) => void;
  toggleSortFilter: () => void;
  variables: CrimeGroupFilters;
}

const ListCrimeGroups = ({
  addInvestigation,
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
  toggleAddInvestigation,
  toggleSortFilter,
  variables,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
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
            render: (value: number | undefined) => `${value?.toFixed(0) || 0}%`,
            title: intl.formatMessage({
              defaultMessage: 'Loss Rate',
            }),
          },
          {
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (value: Date | Moment) => FormatCalendar(value || moment()),
            sorter: (a, b) =>
              new Date(a.updatedAt).valueOf() - new Date(b.updatedAt).valueOf(),
            title: intl.formatMessage({
              defaultMessage: 'Updated At',
            }),
          },
          {
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
              // <FontAwesomeIcon
              //   icon={faArrowUpRightFromSquare}
              //   onClick={() => navigate(`view/${record.key}`)}
              // />
              <Button
                onClick={() => toggleAddInvestigation(record.key)}
                type="ghost"
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  size="1x"
                  style={{ marginRight: 8 }}
                />
                {intl.formatMessage({
                  defaultMessage: 'Investigation',
                })}
              </Button>
            ),
            title: '',
            width: 120,
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
      {/* investigation */}
      <Drawer
        onClose={() => toggleAddInvestigation('')}
        open={!!addInvestigation}
        title={intl.formatMessage({
          defaultMessage: 'Add New Investigation',
        })}
        width="500"
      >
        {addInvestigation ? (
          <AddInvestigation
            onClose={() => toggleAddInvestigation('')}
            vehicleId={addInvestigation}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default ListCrimeGroups;
