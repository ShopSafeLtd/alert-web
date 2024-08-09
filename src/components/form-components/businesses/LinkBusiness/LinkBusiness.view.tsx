import type { ListBusinessesQuery } from 'graphql/businesses/queries/__generated__/list-businesses.generated';

import { Button, Col, Input, Row, Table } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  currentPage: number;
  currentPageSize: number;
  data: ListBusinessesQuery | undefined;
  loading: boolean;
  onClose: () => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  onSearchBusiness: (value: string) => void;
  onSubmit: () => void;
  onTableChange: (selectedRowKeys: React.Key[]) => void;
  saving: boolean;
  searchValue: string;
  selectedValue: React.Key[] | undefined;
}

const AddBusiness = ({
  currentPage,
  currentPageSize,
  data,
  loading,
  onClose,
  onPaginationChange,
  onSearchBusiness,
  onSubmit,
  onTableChange,
  saving,
  searchValue,
  selectedValue,
}: Props) => {
  const intl = useIntl();

  return (
    <>
      <Input
        onChange={(e) => onSearchBusiness(e.target.value)}
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
          data?.listBusinesses.businesses.map((business) => ({
            address: business.locations[0]?.full,
            key: business.id,
            name: business.name,
          })) || []
        }
        loading={loading}
        pagination={{
          current: currentPage,
          defaultPageSize: 50,
          hideOnSinglePage: true,
          onChange: onPaginationChange,
          pageSize: currentPageSize,
          total: data?.listBusinesses.total,
        }}
        rowSelection={{
          onChange: onTableChange,
          selectedRowKeys: selectedValue,
          type: 'radio',
        }}
        size="small"
      />
      <Row gutter={16} justify="end">
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
