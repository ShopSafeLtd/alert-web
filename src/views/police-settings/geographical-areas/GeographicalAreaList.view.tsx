import { formatRadius } from '#/utils/coordinate-conversion';
import {
  faEdit,
  faMapMarkerAlt,
  faPlus,
  faSearch,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Input,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type {
  CircleGeometry,
  GeographicalArea,
  PolygonGeometry,
} from './types';

const { Title } = Typography;
const { Search } = Input;

interface GeographicalAreaListViewProps {
  areas: GeographicalArea[];
  loading: boolean;
  onCreate: () => void;
  onDelete: (id: string) => void;
  onEdit: (area: GeographicalArea) => void;
  onSearchChange: (value: string) => void;
  searchText: string;
}

export const GeographicalAreaListView: React.FC<
  GeographicalAreaListViewProps
> = ({
  areas,
  loading,
  onCreate,
  onDelete,
  onEdit,
  onSearchChange,
  searchText,
}) => {
  const intl = useIntl();

  const columns = [
    {
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <Space>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <strong>{name}</strong>
        </Space>
      ),
      title: intl.formatMessage({ defaultMessage: 'Name' }),
    },
    {
      dataIndex: 'description',
      key: 'description',
      render: (desc: string) => desc || '-',
      title: intl.formatMessage({ defaultMessage: 'Description' }),
    },
    {
      dataIndex: 'areaType',
      key: 'areaType',
      render: (type: string) => (
        <Tag color={type === 'CIRCLE' ? 'blue' : 'green'}>
          {type === 'CIRCLE'
            ? intl.formatMessage({ defaultMessage: 'Circle' })
            : intl.formatMessage({ defaultMessage: 'Polygon' })}
        </Tag>
      ),
      title: intl.formatMessage({ defaultMessage: 'Type' }),
    },
    {
      key: 'details',
      render: (_: unknown, record: GeographicalArea) => {
        if (record.areaType === 'CIRCLE' && record.circle) {
          const circle: CircleGeometry =
            typeof record.circle === 'string'
              ? (JSON.parse(record.circle) as CircleGeometry)
              : record.circle;
          return formatRadius(circle.radiusMeters);
        }
        if (record.areaType === 'POLYGON' && record.polygon) {
          const polygon: PolygonGeometry =
            typeof record.polygon === 'string'
              ? (JSON.parse(record.polygon) as PolygonGeometry)
              : record.polygon;
          const pointCount = polygon.coordinates?.length - 1 || 0;
          return intl.formatMessage(
            { defaultMessage: '{count} points' },
            { count: pointCount }
          );
        }
        return '-';
      },
      title: intl.formatMessage({ defaultMessage: 'Details' }),
    },
    {
      dataIndex: 'color',
      key: 'color',
      render: (color: string) =>
        color ? (
          <div
            style={{
              backgroundColor: color,
              border: '1px solid #d9d9d9',
              borderRadius: 4,
              height: 24,
              width: 24,
            }}
          />
        ) : (
          '-'
        ),
      title: intl.formatMessage({ defaultMessage: 'Color' }),
    },
    {
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: Date) => new Date(date).toLocaleDateString(),
      title: intl.formatMessage({ defaultMessage: 'Created' }),
    },
    {
      key: 'actions',
      render: (_: unknown, record: GeographicalArea) => (
        <Space>
          <Button
            icon={<FontAwesomeIcon icon={faEdit} />}
            onClick={() => onEdit(record)}
            size="small"
          >
            <FormattedMessage defaultMessage="Edit" />
          </Button>
          <Popconfirm
            cancelText={intl.formatMessage({ defaultMessage: 'Cancel' })}
            description={
              <FormattedMessage
                defaultMessage='Are you sure you want to delete "{name}"?'
                values={{ name: record.name }}
              />
            }
            okText={intl.formatMessage({ defaultMessage: 'Delete' })}
            okType="danger"
            onConfirm={() => onDelete(record.id)}
            title={
              <FormattedMessage defaultMessage="Delete geographical area?" />
            }
          >
            <Button
              danger
              icon={<FontAwesomeIcon icon={faTrash} />}
              size="small"
            >
              <FormattedMessage defaultMessage="Delete" />
            </Button>
          </Popconfirm>
        </Space>
      ),
      title: intl.formatMessage({ defaultMessage: 'Actions' }),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <Title level={3} style={{ margin: 0 }}>
            <FormattedMessage defaultMessage="Geographical Areas" />
          </Title>
          <Button
            icon={<FontAwesomeIcon icon={faPlus} />}
            onClick={onCreate}
            type="primary"
          >
            <FormattedMessage defaultMessage="Create Area" />
          </Button>
        </div>

        <Search
          allowClear
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={intl.formatMessage({
            defaultMessage: 'Search areas by name or description',
          })}
          prefix={<FontAwesomeIcon icon={faSearch} />}
          style={{ marginBottom: 16, maxWidth: 400 }}
          value={searchText}
        />

        <Table
          columns={columns}
          dataSource={areas}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) =>
              intl.formatMessage(
                { defaultMessage: 'Total {count} areas' },
                { count: total }
              ),
          }}
          rowKey="id"
        />
      </Card>
    </div>
  );
};

export default GeographicalAreaListView;
