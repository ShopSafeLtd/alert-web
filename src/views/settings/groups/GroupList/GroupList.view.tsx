import type { GroupSort } from '#/types/enums/group_sort';
import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateGroupMutation } from 'graphql/groups/mutations/__generated__/create-group.generated';
import type { SchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';

import { groupSortValues } from '#/types/enums/group_sort';
import {
  ColumnHeightOutlined,
  DownloadOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Drawer,
  Dropdown,
  Input,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from 'antd';
import AddGroup from 'components/form-components/group/AddGroup';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

interface Props {
  addGroup: boolean;
  data: SchemeGroupsQuery | undefined;
  loading: boolean;
  order: GroupSort;
  pageSize: number;
  search: string;
  setOrder: (order: GroupSort) => void;
  setPageSize: (pageSize: number) => void;
  setSearch: (value: string) => void;
  toggleAddGroup: () => void;
  updateGroupList: MutationUpdaterFn<CreateGroupMutation>;
}

interface TableData {
  businessesCount: number;
  description: null | string | undefined;
  key: string;
  name: string;
  usersCount: number;
}

const GroupList = ({
  addGroup,
  data,
  loading,
  order,
  pageSize,
  search,
  setOrder,
  setPageSize,
  setSearch,
  toggleAddGroup,
  updateGroupList,
}: Props): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [tableSize, setTableSize] = useState<'large' | 'middle' | 'small'>(
    'middle'
  );
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'name',
    'description',
    'usersCount',
    'businessesCount',
  ]);

  // Export to CSV functionality
  const handleExportCSV = () => {
    const csvData =
      data?.groups.map((group) => ({
        'Businesses Count': group.businessesCount || 0,
        Description: group.description || '',
        Name: group.name,
        'Users Count': group.usersCount || 0,
      })) || [];

    const headers = Object.keys(csvData[0] || {});
    const csvContent = [
      headers.join(','),
      ...csvData.map((row) =>
        headers
          .map((header) => `"${row[header as keyof typeof row]}"`)
          .join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `groups-${new Date().toISOString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.append(link);
    link.click();
    link.remove();
  };

  const densityMenuItems = [
    {
      key: 'small',
      label: intl.formatMessage({ defaultMessage: 'Compact' }),
      onClick: () => setTableSize('small'),
    },
    {
      key: 'middle',
      label: intl.formatMessage({ defaultMessage: 'Default' }),
      onClick: () => setTableSize('middle'),
    },
    {
      key: 'large',
      label: intl.formatMessage({ defaultMessage: 'Comfortable' }),
      onClick: () => setTableSize('large'),
    },
  ];

  const columnVisibilityItems = [
    {
      key: 'name',
      label: (
        <label>
          <input
            checked={visibleColumns.includes('name')}
            onChange={(e) => {
              if (e.target.checked) {
                setVisibleColumns([...visibleColumns, 'name']);
              } else {
                setVisibleColumns(visibleColumns.filter((c) => c !== 'name'));
              }
            }}
            style={{ marginRight: 8 }}
            type="checkbox"
          />
          {intl.formatMessage({ defaultMessage: 'Name' })}
        </label>
      ),
    },
    {
      key: 'description',
      label: (
        <label>
          <input
            checked={visibleColumns.includes('description')}
            onChange={(e) => {
              if (e.target.checked) {
                setVisibleColumns([...visibleColumns, 'description']);
              } else {
                setVisibleColumns(
                  visibleColumns.filter((c) => c !== 'description')
                );
              }
            }}
            style={{ marginRight: 8 }}
            type="checkbox"
          />
          {intl.formatMessage({ defaultMessage: 'Description' })}
        </label>
      ),
    },
    {
      key: 'usersCount',
      label: (
        <label>
          <input
            checked={visibleColumns.includes('usersCount')}
            onChange={(e) => {
              if (e.target.checked) {
                setVisibleColumns([...visibleColumns, 'usersCount']);
              } else {
                setVisibleColumns(
                  visibleColumns.filter((c) => c !== 'usersCount')
                );
              }
            }}
            style={{ marginRight: 8 }}
            type="checkbox"
          />
          {intl.formatMessage({ defaultMessage: 'Users' })}
        </label>
      ),
    },
    {
      key: 'businessesCount',
      label: (
        <label>
          <input
            checked={visibleColumns.includes('businessesCount')}
            onChange={(e) => {
              if (e.target.checked) {
                setVisibleColumns([...visibleColumns, 'businessesCount']);
              } else {
                setVisibleColumns(
                  visibleColumns.filter((c) => c !== 'businessesCount')
                );
              }
            }}
            style={{ marginRight: 8 }}
            type="checkbox"
          />
          {intl.formatMessage({ defaultMessage: 'Businesses' })}
        </label>
      ),
    },
  ];

  return (
    <div className="page-view">
      <Row style={{ marginBottom: 10 }}>
        <Col>
          <Typography.Title level={2} style={{ marginLeft: 10 }}>
            {intl.formatMessage({ defaultMessage: 'Content Groups' })}
          </Typography.Title>
        </Col>
        <Col flex={1} />
        <Col>
          <Space>
            <Input.Search
              allowClear
              onChange={(e) => setSearch(e.target.value)}
              onSearch={setSearch}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search groups...',
              })}
              style={{ width: 250 }}
              value={search}
            />
            <Select
              onChange={setOrder}
              options={groupSortValues}
              placeholder={intl.formatMessage({ defaultMessage: 'Sort by...' })}
              style={{ width: 150 }}
              value={order}
            />
            <Dropdown menu={{ items: densityMenuItems }}>
              <Button icon={<ColumnHeightOutlined />} />
            </Dropdown>
            <Dropdown menu={{ items: columnVisibilityItems }}>
              <Button icon={<SettingOutlined />} />
            </Dropdown>
            <Button icon={<DownloadOutlined />} onClick={handleExportCSV}>
              {intl.formatMessage({ defaultMessage: 'Export' })}
            </Button>
            <Button
              icon={
                <FontAwesomeIcon
                  icon={faPlus}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
              onClick={toggleAddGroup}
              type="primary"
            >
              <FormattedMessage defaultMessage="New Group" />
            </Button>
          </Space>
        </Col>
      </Row>
      <Card bodyStyle={{ overflow: 'hidden', padding: 0 }}>
        <Table<TableData>
          columns={[
            {
              dataIndex: 'name',
              key: 'name',
              title: intl.formatMessage({
                defaultMessage: 'Name',
              }),
            },
            {
              dataIndex: 'description',
              ellipsis: true,
              key: 'description',
              title: intl.formatMessage({
                defaultMessage: 'Description',
              }),
            },
            {
              dataIndex: 'usersCount',
              key: 'usersCount',
              title: intl.formatMessage({
                defaultMessage: 'Users',
              }),
            },
            {
              dataIndex: 'businessesCount',
              key: 'businessesCount',
              title: intl.formatMessage({
                defaultMessage: 'Businesses',
              }),
            },
          ].filter((column) => visibleColumns.includes(column.key))}
          dataSource={data?.groups.map((group) => ({
            businessesCount: group.businessesCount || 0,
            description: group.description,
            key: group.id,
            name: group.name,
            usersCount: group.usersCount || 0,
          }))}
          loading={loading}
          onRow={(record) => ({
            onClick: () => {
              navigate(`/app/scheme-settings/groups/view/${record?.key}`);
            },
            style: { cursor: 'pointer' },
          })}
          pagination={{
            hideOnSinglePage: true,
            onShowSizeChange: (_current, size) => {
              setPageSize(size);
            },
            pageSize,
            pageSizeOptions: ['10', '25', '50', '100'],
            showSizeChanger: true,
            total: data?.groups?.length ?? 0,
          }}
          size={tableSize}
        />
      </Card>

      <Drawer
        onClose={toggleAddGroup}
        open={addGroup}
        title={intl.formatMessage({
          defaultMessage: 'Create New Content Group',
        })}
        width="400"
      >
        {addGroup ? (
          <AddGroup onClose={toggleAddGroup} update={updateGroupList} />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default GroupList;
