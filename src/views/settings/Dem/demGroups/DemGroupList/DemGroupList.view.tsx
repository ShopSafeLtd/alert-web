import type { UpsertDemGroupMutation } from '#/components/form-components/DemGroup/AddDemGroup/graphql/mutations/__generated__/upsert-dem-group.generated';
import type { DemGroupData } from '#/types/DataType';
import type { MutationUpdaterFn } from '@apollo/client';

import AddDemGroup from '#/components/form-components/DemGroup/AddDemGroup';
import { faEdit, faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Drawer, Input, Row, Table } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import type { DemGroupsQuery } from '../graphql/queries/__generated__/dem-groups.generated';

interface Props {
  addDemGroup: boolean;
  data: DemGroupsQuery | undefined;
  editData: DemGroupData | undefined;
  loading: boolean;
  pagination: { page: number; pageSize: number };
  resetPage: () => void;
  search: string;
  setEditData: (value: DemGroupData | undefined) => void;
  setPagination: (value: { page: number; pageSize: number }) => void;
  setSearch: (value: string) => void;
  toggleAddDemGroup: () => void;
  updateDemGroupList: MutationUpdaterFn<UpsertDemGroupMutation>;
}
interface TableItem {
  demGroup: DemGroupData;
  demId: string;
  id: string;
  name: string;
  totalDevices: number;
}

const DemGroupList = ({
  addDemGroup,
  data,
  editData,
  loading,
  pagination,
  resetPage,
  search,
  setEditData,
  setPagination,
  setSearch,
  toggleAddDemGroup,
  updateDemGroupList,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <Row gutter={8} style={{ marginBottom: 10 }}>
        <Col span={8}>
          <Input
            allowClear
            onChange={(event) => {
              resetPage();
              setSearch(event.target.value);
            }}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for a Dem Group...',
            })}
            value={search}
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Button
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            onClick={toggleAddDemGroup}
            type="primary"
          >
            <FormattedMessage defaultMessage="New Dem Group" />
          </Button>
        </Col>
      </Row>
      <Table<TableItem>
        columns={[
          {
            dataIndex: 'name',
            key: 'name',
            render: (name: string, item: TableItem) => (
              <Link to={`/app/scheme-settings/dem/dem-groups/view/${item.id}`}>
                {name}
              </Link>
            ),
            title: intl.formatMessage({
              defaultMessage: 'Name',
            }),
          },
          {
            dataIndex: 'demId',
            ellipsis: true,
            key: 'demId',
            title: intl.formatMessage({
              defaultMessage: 'Dem ID',
            }),
          },
          {
            dataIndex: 'totalDevices',
            ellipsis: true,
            key: 'totalDevices',
            sorter: (a: TableItem, b: TableItem) =>
              a.totalDevices - b.totalDevices,
            title: intl.formatMessage({
              defaultMessage: 'Total Devices',
            }),
          },
          {
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
              <Button
                onClick={() => {
                  setEditData(record.demGroup);
                }}
                size="small"
                type="text"
              >
                <FontAwesomeIcon icon={faEdit} size="lg" />
              </Button>
            ),
            title: '',
            width: 100,
          },
        ]}
        dataSource={data?.demGroups.edges.map(({ node: demGroup }) => ({
          demGroup: {
            demDevices: demGroup.demDevices.map(({ id }) => id),
            id: demGroup.id,
            name: demGroup.name,
          },
          demId: demGroup.demId,
          id: demGroup.id,
          name: demGroup.name,
          totalDevices: demGroup.totalDevices,
        }))}
        loading={loading}
        pagination={{
          current: pagination.page,
          hideOnSinglePage: true,
          onChange: (page, pageSize) => {
            setPagination({ page, pageSize });
          },
          pageSize: pagination.pageSize,
          total: data?.demGroups.totalCount,
        }}
        size="small"
      />

      <Drawer
        onClose={toggleAddDemGroup}
        open={addDemGroup}
        title={intl.formatMessage({
          defaultMessage: 'Create New Dem Group',
        })}
        width="400"
      >
        {addDemGroup ? (
          <AddDemGroup
            onClose={toggleAddDemGroup}
            update={updateDemGroupList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setEditData(undefined)}
        open={!!editData}
        title={intl.formatMessage({
          defaultMessage: 'Manage Dem Group Devices',
        })}
        width="400"
      >
        {editData ? (
          <AddDemGroup
            editData={editData}
            onClose={() => setEditData(undefined)}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default DemGroupList;
