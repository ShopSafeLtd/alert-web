import { Button, Col, Input, Row, Table } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { ListBusinessesSelectQuery } from './graphql/__generated__/list-businesses-select.generated';

interface Props {
  data: ListBusinessesSelectQuery | undefined;
  loading: boolean;
  onClose: () => void;
  onSearchBusiness: (value: string) => void;
  onSelect: (item: { key: string }) => void;
  onSubmit: () => void;
  pagination: { page: number; pageSize: number };
  resetPage: () => void;
  saving: boolean;
  searchValue: string;
  setPagination: (value: { page: number; pageSize: number }) => void;
}

const AddBusiness = ({
  data,
  loading,
  onClose,
  onSearchBusiness,
  onSelect,
  onSubmit,
  pagination,
  resetPage,
  saving,
  searchValue,
  setPagination,
}: Props) => {
  const intl = useIntl();

  return (
    <>
      <Input
        onChange={(e) => {
          resetPage();
          onSearchBusiness(e.target.value);
        }}
        placeholder={intl.formatMessage({
          defaultMessage: 'Search for a business...',
        })}
        style={{ marginBottom: 20 }}
        value={searchValue}
      />
      <Table
        columns={[
          {
            dataIndex: 'name',
            key: 'name',
            title: intl.formatMessage({ defaultMessage: 'Name' }),
            width: '40%',
          },
          {
            dataIndex: 'address',
            key: 'address',
            title: intl.formatMessage({
              defaultMessage: 'Address',
            }),
          },
        ]}
        dataSource={
          data?.businessRelay.edges.map(({ node: business }) => ({
            address: business.locations[0]?.full,
            key: business.id,
            name: business.name,
          })) || []
        }
        loading={loading}
        pagination={{
          current: pagination.page,
          hideOnSinglePage: true,
          onChange: (page, pageSize) => {
            setPagination({ page, pageSize });
          },
          pageSize: pagination.pageSize,
          total: data?.businessRelay.totalCount,
        }}
        rowSelection={{
          onSelect,
          type: 'radio',
        }}
        size="small"
      />
      <Row gutter={16} justify="end" style={{ marginTop: 50 }}>
        <Col>
          <Button onClick={onClose}>
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
          </Button>
        </Col>
        <Col>
          <Button
            disabled={saving}
            loading={saving}
            onClick={onSubmit}
            type="primary"
          >
            {intl.formatMessage({
              defaultMessage: 'Link Business',
            })}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default AddBusiness;
