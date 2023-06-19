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
  const galleryOptions = [
    {
      label: 'Following',
      value: 'FOLLOWING',
    },
    {
      label: 'My Data',
      value: 'MYDATA',
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
            placeholder="Search crime groups..."
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
            Sort &amp; Filter
          </Button>
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
          alias: crimeGroup.alias,
          updatedAt: crimeGroup.updatedAt,
        }))}
        loading={loading}
        size="small"
        columns={[
          {
            key: 'reference',
            dataIndex: 'reference',
            title: 'Alert ID',
            render: (value, item) => (
              <Link to={`view/${item.key}`}>CG-{value}</Link>
            ),
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
          {
            key: 'updatedAt',
            dataIndex: 'updatedAt',
            title: 'UpdatedAt',
            render: (value) => moment(value || moment()).calendar('DD/MM/YYYY'),
          },
        ]}
        pagination={{
          hideOnSinglePage: true,
          defaultPageSize: 20,
          pageSize: 20,
        }}
      />
      <Drawer
        title="Crime Group Filters"
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
