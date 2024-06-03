import React from 'react';
import { Button, Col, Drawer, Input, Row, Table, Tooltip } from 'antd';
import type { ListCrimeGroupsQuery, SortOrder } from 'graphql/generated';
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
        id: 'Ly+ku5',
      }),
      value: 'FOLLOWED_GROUPS',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'My Groups',
        id: 'kkghcT',
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
              id: 'q5vT3Z',
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
              id: 'f2g3SM',
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
                id: 'Bju8fW',
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
              id: 'k8ZNgH',
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
            render: (value: number | undefined) => `${value?.toFixed(0) || 0}%`,
          },
          {
            key: 'updatedAt',
            dataIndex: 'updatedAt',
            title: intl.formatMessage({
              defaultMessage: 'Updated At',
              id: 'ECx6bx',
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
                  id: 'tNseQe',
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
          id: 'Dz/qC3',
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
          id: 'QaKS9A',
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
