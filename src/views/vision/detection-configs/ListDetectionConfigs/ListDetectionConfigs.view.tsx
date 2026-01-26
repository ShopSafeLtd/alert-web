import type { FilterValue, SorterResult } from 'antd/es/table/interface';

import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import DebouncedInput from '#/utils/debounced-input';
import { Button, Card, Col, PageHeader, Row, Table } from 'antd';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

import type { DetectionConfigItem } from './types';
import type { FilterState } from './useListDetectionConfigs';

import useCreateColumns from './types';

interface Props {
  data: DetectionConfigItem[];
  filterState: FilterState;
  loading: boolean;
  onSearchChange: (value: null | string) => void;
  onTableChange: (
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<DetectionConfigItem>
      | SorterResult<DetectionConfigItem>[]
  ) => void;
  search?: string;
  setPage: (page: number) => void;
  totalCount: number;
}

const ListDetectionConfigsView = ({
  data,
  filterState,
  loading,
  onSearchChange,
  onTableChange,
  search: _,
  setPage,
  totalCount,
}: Props) => {
  const navigate = useNavigate();
  const intl = useIntl();

  const columns = useCreateColumns({ filterState });

  return (
    <div>
      <PageHeader
        extra={[
          <PermissionCheckWrapper
            key="create-button"
            permission={{
              method: PermissionMethod.Edit,
              model: PermissionModel.VisionAi,
            }}
            unauthorizedElement={<div />}
          >
            <Button key="1" onClick={() => navigate('add')} type="primary">
              <FormattedMessage defaultMessage="Create Detection Config" />
            </Button>
          </PermissionCheckWrapper>,
        ]}
        title={<FormattedMessage defaultMessage="Detection Configs" />}
      />
      <Card
        bodyStyle={{
          padding: 0,
        }}
        style={{
          margin: `${[0, 16, 16, 16].join('px ')}px`,
        }}
      >
        <Row gutter={8} style={{ padding: 16 }}>
          <Col span={6}>
            <DebouncedInput
              allowClear
              onChange={(event) => {
                onSearchChange(event.target.value || null);
              }}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search for anything in detection configs...',
              })}
              size="small"
            />
          </Col>
        </Row>
        <Table<DetectionConfigItem>
          columns={columns}
          dataSource={data}
          loading={loading}
          onChange={(pagination, filters, sorter) => {
            onTableChange(filters, sorter);
            if (pagination.current) {
              setPage(pagination.current);
            }
          }}
          pagination={{
            defaultPageSize: 20,
            hideOnSinglePage: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} detection configs`,
            total: totalCount,
          }}
          size="small"
        />
      </Card>
    </div>
  );
};

export default ListDetectionConfigsView;
