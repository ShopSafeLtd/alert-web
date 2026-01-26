import type { ColumnsType } from 'antd/es/table';

import {
  faChevronLeft,
  faChevronRight,
  faEdit,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, Space, Table, Tag, Tooltip, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { GeographicalArea } from '../types';

const { Search } = Input;
const { Text } = Typography;

interface AreasListSidebarProps {
  areas: GeographicalArea[];
  collapsed: boolean;
  loading: boolean;
  onCreateArea: () => void;
  onDeleteArea: (id: string) => void;
  onEditArea: (area: GeographicalArea) => void;
  onSearchChange: (value: string) => void;
  onSelectArea: (area: GeographicalArea) => void;
  onToggle: () => void;
  searchValue: string;
  selectedArea: GeographicalArea | null;
}

export const AreasListSidebar: React.FC<AreasListSidebarProps> = ({
  areas,
  collapsed,
  loading,
  onCreateArea,
  onDeleteArea,
  onEditArea,
  onSearchChange,
  onSelectArea,
  onToggle,
  searchValue,
  selectedArea,
}) => {
  const intl = useIntl();

  const filteredAreas = areas.filter((area) =>
    area.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const columns: ColumnsType<GeographicalArea> = [
    {
      dataIndex: 'name',
      ellipsis: true,
      key: 'name',
      render: (text: string, record: GeographicalArea) => (
        <Button
          onClick={() => onSelectArea(record)}
          style={{
            fontWeight: selectedArea?.id === record.id ? 'bold' : 'normal',
            height: 'auto',
            padding: 0,
          }}
          type="link"
        >
          {text}
        </Button>
      ),
      title: 'Name',
    },
    {
      dataIndex: 'areaType',
      key: 'areaType',
      render: (type: string) => (
        <Tag color={type === 'circle' ? 'blue' : 'green'}>
          {type === 'circle'
            ? intl.formatMessage({ defaultMessage: 'Circle' })
            : intl.formatMessage({ defaultMessage: 'Polygon' })}
        </Tag>
      ),
      title: 'Type',
      width: 80,
    },
    {
      dataIndex: 'color',
      key: 'color',
      render: (color: string) => (
        <div
          style={{
            backgroundColor: color || '#1890ff',
            border: '1px solid #d9d9d9',
            borderRadius: 4,
            height: 24,
            width: 24,
          }}
        />
      ),
      title: 'Color',
      width: 60,
    },
    {
      key: 'actions',
      render: (_text: unknown, record: GeographicalArea) => (
        <Space size="small">
          <Tooltip title={intl.formatMessage({ defaultMessage: 'Edit' })}>
            <Button
              icon={<FontAwesomeIcon icon={faEdit} />}
              onClick={(e) => {
                e.stopPropagation();
                onEditArea(record);
              }}
              size="small"
              type="text"
            />
          </Tooltip>
          <Tooltip title={intl.formatMessage({ defaultMessage: 'Delete' })}>
            <Button
              danger
              icon={<FontAwesomeIcon icon={faTrash} />}
              onClick={(e) => {
                e.stopPropagation();
                onDeleteArea(record.id);
              }}
              size="small"
              type="text"
            />
          </Tooltip>
        </Space>
      ),
      title: 'Actions',
      width: 80,
    },
  ];

  if (collapsed) {
    return (
      <div
        style={{
          alignItems: 'center',
          backgroundColor: '#fafafa',
          borderRight: '1px solid #f0f0f0',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          width: 40,
        }}
      >
        <Button
          icon={<FontAwesomeIcon icon={faChevronRight} />}
          onClick={onToggle}
          type="text"
        />
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: '#fafafa',
        borderRight: '1px solid #f0f0f0',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: 500,
      }}
    >
      <div
        style={{
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '16px',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Text strong>
            {intl.formatMessage(
              { defaultMessage: 'Reporting Areas ({count})' },
              { count: areas.length }
            )}
          </Text>
          <Button
            icon={<FontAwesomeIcon icon={faChevronLeft} />}
            onClick={onToggle}
            type="text"
          />
        </div>
        <Button
          block
          icon={<FontAwesomeIcon icon={faPlus} />}
          onClick={onCreateArea}
          type="primary"
        >
          {intl.formatMessage({ defaultMessage: 'Create Area' })}
        </Button>
      </div>

      <div style={{ borderBottom: '1px solid #f0f0f0', padding: '16px' }}>
        <Search
          allowClear
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={intl.formatMessage({
            defaultMessage: 'Search areas...',
          })}
          value={searchValue}
        />
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        <Table
          columns={columns}
          dataSource={filteredAreas}
          loading={loading}
          onRow={(record) => ({
            onClick: () => onSelectArea(record),
            style: {
              cursor: 'pointer',
            },
          })}
          pagination={false}
          rowClassName={(record) =>
            selectedArea?.id === record.id ? 'ant-table-row-selected' : ''
          }
          rowKey="id"
          size="small"
        />
      </div>
    </div>
  );
};

export default AreasListSidebar;
