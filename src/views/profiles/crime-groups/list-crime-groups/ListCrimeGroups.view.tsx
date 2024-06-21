import React from 'react';
import { Button, Col, Drawer, Input, Row, Table, Tooltip } from 'antd';

import { Link } from 'react-router-dom';
import type { Moment } from 'moment';
import moment from 'moment';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import CrimeGroupFilter from 'components/crimeGroups/CrimeGroupFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faPlus } from '@fortawesome/pro-light-svg-icons';
import type { DateType } from 'types/DataType';
import { useIntl } from 'react-intl';
import FormatCalendar from 'utils/format-calendar-24h';
import AddInvestigation from 'components/form-components/Investigation/AddInvestigation';
import type { CrimeGroupFilters } from 'state/data-model';
import useStyles from './ListCrimeGroups.styles';
import type { ListCrimeGroupsQuery } from 'graphql/crime-groups/queries/list-crime-groups.generated';
import type { SortOrder } from 'graphql/types';

interface Props {
  data: ListCrimeGroupsQuery | undefined;
  loading: boolean;
  setSearch: (value: string) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  clearFilters: () => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  setGallery: (values: string[]) => void;
  setGroupsFilter: (value: string[]) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  setOrder: (value: SortOrder) => void;
  addInvestigation: string;
  toggleAddInvestigation: (value: string) => void;
  variables: CrimeGroupFilters;
}

const ListCrimeGroups = ({
  data,
  loading,
  setSearch,
  setGroupsFilter,
  setCreatedAtFilter,
  clearFilters,
  sortFilter,
  toggleSortFilter,
  setGallery,
  variables,
  setOrder,
  groups,
  groupsLoading,
  addInvestigation,
  toggleAddInvestigation,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  const { search, gallery } = variables;
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
      <Row align="middle" gutter={12} className={classes.headerRow}>
        <Col span={8} xxl={6}>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            allowClear
            placeholder={intl.formatMessage({
              defaultMessage: 'Search crime groups...',
            })}
          />
        </Col>
        <Col flex={1}>
          <CheckTags
            mode="check"
            noGutter
            value={gallery}
            onChange={setGallery}
            options={galleryOptions}
          />
        </Col>
        <Col>
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Sort & Filter',
            })}
          >
            <Button
              onClick={toggleSortFilter}
              icon={<FontAwesomeIcon icon={faFilter} size="lg" />}
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
        dataSource={data?.listCrimeGroups.crimeGroups.map((crimeGroup) => ({
          key: crimeGroup.id,
          reference: crimeGroup.reference,
          totalOffenders: crimeGroup.totalOffenders,
          totalIncidents: crimeGroup.totalIncidents,
          totalValue: crimeGroup.totalValue,
          totalRecoveredValue: crimeGroup.totalRecoveredValue,
          totalTheftSuccess: crimeGroup.totalTheftSuccess,
          alias: crimeGroup.alias,
          updatedAt: crimeGroup.updatedAt,
        }))}
        loading={loading}
        size="small"
        columns={[
          {
            key: 'reference',
            dataIndex: 'reference',
            title: intl.formatMessage({
              defaultMessage: 'Alert ID',
            }),
            render: (value, item) => (
              <Link to={`view/${item.key}`}>{value}</Link>
            ),
          },
          {
            key: 'alias',
            dataIndex: 'alias',
            title: intl.formatMessage({
              defaultMessage: 'Alias',
            }),
          },
          {
            key: 'totalOffenders',
            dataIndex: 'totalOffenders',
            title: intl.formatMessage({
              defaultMessage: 'Members',
            }),
          },
          {
            key: 'totalIncidents',
            dataIndex: 'totalIncidents',
            title: intl.formatMessage({
              defaultMessage: 'Incidents',
            }),
          },
          {
            key: 'totalValue',
            dataIndex: 'totalValue',
            title: intl.formatMessage({
              defaultMessage: 'Lost Value',
            }),
            render: (value: number | undefined) => `£${value || 0}`,
          },
          {
            key: 'totalRecoveredValue',
            dataIndex: 'totalRecoveredValue',
            title: intl.formatMessage({
              defaultMessage: 'Recovered Value',
            }),
            render: (value: number | undefined) => `£${value || 0}`,
          },
          {
            key: 'totalTheftSuccess',
            dataIndex: 'totalTheftSuccess',
            title: intl.formatMessage({
              defaultMessage: 'Loss Rate',
            }),
            render: (value: number | undefined) => `${value?.toFixed(0) || 0}%`,
          },
          {
            key: 'updatedAt',
            dataIndex: 'updatedAt',
            title: intl.formatMessage({
              defaultMessage: 'Updated At',
            }),
            render: (value: Date | Moment) => FormatCalendar(value || moment()),
            sorter: (a, b) =>
              new Date(a.updatedAt).valueOf() - new Date(b.updatedAt).valueOf(),
          },
          {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            width: 120,
            render: (_, record) => (
              // <FontAwesomeIcon
              //   icon={faArrowUpRightFromSquare}
              //   onClick={() => navigate(`view/${record.key}`)}
              // />
              <Button
                type="ghost"
                onClick={() => toggleAddInvestigation(record.key)}
              >
                <FontAwesomeIcon
                  size="1x"
                  style={{ marginRight: 8 }}
                  icon={faPlus}
                />
                {intl.formatMessage({
                  defaultMessage: 'Investigation',
                })}
              </Button>
            ),
          },
        ]}
        pagination={{
          hideOnSinglePage: true,
          defaultPageSize: 20,
          pageSize: 20,
        }}
      />
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Crime Group Filters',
        })}
        open={sortFilter}
        onClose={toggleSortFilter}
        width={500}
      >
        <CrimeGroupFilter
          variables={variables}
          setOrder={setOrder}
          setGroupsFilter={setGroupsFilter}
          clearFilters={clearFilters}
          setCreatedAtFilter={setCreatedAtFilter}
          groups={groups}
          groupsLoading={groupsLoading}
        />
      </Drawer>
      {/* investigation */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add New Investigation',
        })}
        open={!!addInvestigation}
        width="500"
        onClose={() => toggleAddInvestigation('')}
      >
        {addInvestigation ? (
          <AddInvestigation
            vehicleId={addInvestigation}
            onClose={() => toggleAddInvestigation('')}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default ListCrimeGroups;
