import React from 'react';
import { Button, Col, Input, Row, Table } from 'antd';
import type { ListBusinessesQuery } from 'graphql/generated';

interface Props {
  data: ListBusinessesQuery | undefined;
  onSubmit: () => void;
  saving: boolean;
  searchValue: string;
  onSearchBusiness: (value: string) => void;
  loading: boolean;
  selectedValue: React.Key[] | undefined;
  currentPage: number;
  currentPageSize: number;
  onPaginationChange: (page: number, pageSize: number) => void;
  onClose: () => void;
  onTableChange: (selectedRowKeys: React.Key[]) => void;
}

const AddBusiness = ({
  currentPage,
  currentPageSize,
  data,
  loading,
  onPaginationChange,
  onSearchBusiness,
  onSubmit,
  saving,
  selectedValue,
  onClose,
  onTableChange,
  searchValue,
}: Props) => (
  <>
    <Input
      style={{ marginBottom: 20 }}
      placeholder="Search for a business..."
      value={searchValue}
      onChange={(e) => onSearchBusiness(e.target.value)}
    />
    <Table
      columns={[
        {
          key: 'name',
          dataIndex: 'name',
          title: 'Name',
        },
        {
          key: 'address',
          dataIndex: 'address',
          title: 'Address',
        },
      ]}
      dataSource={
        data?.listBusinesses.businesses.map((business) => ({
          key: business.id,
          name: business.name,
          address: business.locations[0]?.full,
        })) || []
      }
      pagination={{
        hideOnSinglePage: true,
        current: currentPage,
        defaultPageSize: 50,
        onChange: onPaginationChange,
        total: data?.listBusinesses.total,
        pageSize: currentPageSize,
      }}
      rowSelection={{
        type: 'radio',
        onChange: onTableChange,
        selectedRowKeys: selectedValue,
      }}
      loading={loading}
      size="small"
    />
    <Row gutter={16} justify="end">
      <Col>
        <Button onClick={onClose}>Cancel</Button>
      </Col>
      <Col>
        <Button
          loading={saving}
          disabled={saving}
          type="primary"
          onClick={onSubmit}
        >
          Link Business
        </Button>
      </Col>
    </Row>
  </>
);

export default AddBusiness;
