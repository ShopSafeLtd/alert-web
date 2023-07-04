import React from 'react';
import { Button, Col, Drawer, Input, Row, Table } from 'antd';
import type { ListCrimeGroupsQuery, SortOrder } from 'graphql/generated';
import { Link } from 'react-router-dom';
import moment from 'moment';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import CrimeGroupFilter from 'components/crimeGroups/CrimeGroupFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/pro-light-svg-icons';
import type { DateType } from 'types/DataType';
import { useIntl } from 'react-intl';
import formatCalendar from 'utils/format-calendar-24h';
import useStyles from './ListCrimeGroups.styles';

interface Props {
  data: ListCrimeGroupsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  clearFilters: () => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  gallery: string[];
  setGallery: (values: string[]) => void;
  groupsFilter: string[];
  setGroupsFilter: (value: string[]) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  order: SortOrder;
  setOrder: (value: SortOrder) => void;
}

const ListCrimeGroups = ({
  data,
  loading,
  search,
  setSearch,
  groupsFilter,
  setGroupsFilter,
  setCreatedAtFilter,
  clearFilters,
  sortFilter,
  toggleSortFilter,
  gallery,
  setGallery,
  order,
  setOrder,
  groups,
  groupsLoading,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
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
      <Row align="middle" gutter={16} className={classes.headerRow}>
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
            value={gallery}
            onChange={setGallery}
            options={galleryOptions}
          />
        </Col>
        <Col>
          <Button
            onClick={toggleSortFilter}
            icon={
              <FontAwesomeIcon
                icon={faFilter}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
          >
            {intl.formatMessage({
              defaultMessage: 'Sort & Filter',
              id: 'f2g3SM',
            })}
          </Button>
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
              // eslint-disable-next-line formatjs/no-literal-string-in-jsx
              <Link to={`view/${item.key}`}>CG-{value}</Link>
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
              defaultMessage: 'Success Rate',
              id: 'IaZkrc',
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
            render: (value: Date | undefined) =>
              formatCalendar(value || moment()),
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
        visible={sortFilter}
        onClose={toggleSortFilter}
        width={500}
      >
        <CrimeGroupFilter
          order={order}
          setOrder={setOrder}
          groupsFilter={groupsFilter}
          setGroupsFilter={setGroupsFilter}
          clearFilters={clearFilters}
          setCreatedAtFilter={setCreatedAtFilter}
          groups={groups}
          groupsLoading={groupsLoading}
        />
      </Drawer>
    </div>
  );
};

export default ListCrimeGroups;
