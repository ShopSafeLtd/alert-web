import type { RoleSort } from '#/types/enums/role_sort';
import type { RolesQuery } from '#/views/roles/graphql/queries/__generated__/roles.generated';

import { roleSortValues } from '#/types/enums/role_sort';
import {
  ColumnHeightOutlined,
  DownloadOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

interface Props {
  basePath?: string;
  data: RolesQuery | undefined;
  fetchPage: (page: number) => void;
  loading: boolean;
  order: RoleSort;
  pageSize: number;
  search: string;
  setOrder: (order: RoleSort) => void;
  setPageSize: (pageSize: number) => void;
  setSearch: (search: string) => void;
}

interface TableData {
  approvalTier: boolean;
  key: string;
  name: string;
  noUsers: number;
  type: string;
}

const RolesView = ({
  basePath = '/app/scheme-settings',
  data,
  fetchPage,
  loading,
  order,
  pageSize,
  search,
  setOrder,
  setPageSize,
  setSearch,
}: Props) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [tableSize, setTableSize] = useState<'large' | 'middle' | 'small'>(
    'middle'
  );
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'name',
    'type',
    'noUsers',
    'approvalTier',
  ]);

  // Export to CSV functionality
  const handleExportCSV = () => {
    const csvData =
      data?.roles?.edges.map(({ node: role }) => ({
        'Approval Tier': role?.approvalTier ? 'Yes' : 'No',
        Name: role?.name,
        'No. Users': role?.usersCount || 0,
        Type: role?.type,
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
    link.setAttribute('download', `roles-${new Date().toISOString()}.csv`);
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
      key: 'type',
      label: (
        <label>
          <input
            checked={visibleColumns.includes('type')}
            onChange={(e) => {
              if (e.target.checked) {
                setVisibleColumns([...visibleColumns, 'type']);
              } else {
                setVisibleColumns(visibleColumns.filter((c) => c !== 'type'));
              }
            }}
            style={{ marginRight: 8 }}
            type="checkbox"
          />
          {intl.formatMessage({ defaultMessage: 'Type' })}
        </label>
      ),
    },
    {
      key: 'noUsers',
      label: (
        <label>
          <input
            checked={visibleColumns.includes('noUsers')}
            onChange={(e) => {
              if (e.target.checked) {
                setVisibleColumns([...visibleColumns, 'noUsers']);
              } else {
                setVisibleColumns(
                  visibleColumns.filter((c) => c !== 'noUsers')
                );
              }
            }}
            style={{ marginRight: 8 }}
            type="checkbox"
          />
          {intl.formatMessage({ defaultMessage: 'No. Users' })}
        </label>
      ),
    },
    {
      key: 'approvalTier',
      label: (
        <label>
          <input
            checked={visibleColumns.includes('approvalTier')}
            onChange={(e) => {
              if (e.target.checked) {
                setVisibleColumns([...visibleColumns, 'approvalTier']);
              } else {
                setVisibleColumns(
                  visibleColumns.filter((c) => c !== 'approvalTier')
                );
              }
            }}
            style={{ marginRight: 8 }}
            type="checkbox"
          />
          {intl.formatMessage({ defaultMessage: 'Approval Tier' })}
        </label>
      ),
    },
  ];

  return (
    <div className="page-view">
      <Row style={{ marginBottom: 10 }}>
        <Col>
          <Typography.Title level={2} style={{ marginLeft: 10 }}>
            {intl.formatMessage({ defaultMessage: 'Roles' })}
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
                defaultMessage: 'Search roles by name...',
              })}
              style={{ width: 250 }}
              value={search}
            />
            <Select
              onChange={setOrder}
              options={roleSortValues}
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
              onClick={() => navigate(`${basePath}/roles/create`)}
              type="primary"
            >
              {intl.formatMessage({
                defaultMessage: 'Create Role',
              })}
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
              dataIndex: 'type',
              key: 'type',
              title: intl.formatMessage({
                defaultMessage: 'Type',
              }),
            },
            {
              dataIndex: 'noUsers',
              key: 'noUsers',
              title: intl.formatMessage({
                defaultMessage: 'No. Users',
              }),
            },
            {
              dataIndex: 'approvalTier',
              key: 'approvalTier',
              render: (approvalTier: boolean) =>
                approvalTier ? (
                  <Tag color="blue">
                    {intl.formatMessage({ defaultMessage: 'Yes' })}
                  </Tag>
                ) : (
                  <Tag color="default">
                    {intl.formatMessage({ defaultMessage: 'No' })}
                  </Tag>
                ),
              title: intl.formatMessage({
                defaultMessage: 'Approval Tier',
              }),
            },
          ].filter((column) => visibleColumns.includes(column.key))}
          dataSource={data?.roles?.edges
            .filter(
              ({ node: role }) =>
                !search ||
                role?.name?.toLowerCase().includes(search.toLowerCase())
            )
            .map(({ node: role }) => ({
              approvalTier: role?.approvalTier || false,
              key: role?.id,
              name: role?.name,
              noUsers: role?.usersCount || 0,
              type:
                // eslint-disable-next-line no-unsafe-optional-chaining
                role?.type?.charAt(0).toUpperCase() +
                // eslint-disable-next-line no-unsafe-optional-chaining
                role?.type?.slice(1).toLowerCase().replaceAll('_', ' '),
            }))}
          loading={loading}
          onRow={(record) => ({
            onClick: () => {
              navigate(`${basePath}/roles/${record?.key}`);
            },
            style: { cursor: 'pointer' },
          })}
          pagination={{
            hideOnSinglePage: true,
            onChange: (page) => {
              fetchPage(page);
            },
            onShowSizeChange: (_current, size) => {
              setPageSize(size);
            },
            pageSize,
            pageSizeOptions: ['10', '25', '50', '100'],
            showSizeChanger: true,
            total: search
              ? data?.roles?.edges.filter(({ node: role }) =>
                  role?.name?.toLowerCase().includes(search.toLowerCase())
                ).length
              : data?.roles?.totalCount,
          }}
          size={tableSize}
        />
      </Card>
    </div>
  );
};

export default RolesView;
