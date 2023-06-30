import React from 'react';
import { Button, Col, Input, Row, Table } from 'antd';
import type { ListBusinessesQuery } from 'graphql/generated';
import { useIntl } from 'react-intl';

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
}: Props) => {
  const intl = useIntl();

  return (
    <>
      <Input
        style={{ marginBottom: 20 }}
        placeholder={intl.formatMessage({
          defaultMessage: 'Search for a business...',
          id: 'qaJxSS',
        })}
        value={searchValue}
        onChange={(e) => onSearchBusiness(e.target.value)}
      />
      <Table
        columns={[
          {
            key: 'name',
            dataIndex: 'name',
            title: intl.formatMessage({ defaultMessage: 'Name', id: 'HAlOn1' }),
          },
          {
            key: 'address',
            dataIndex: 'address',
            title: intl.formatMessage({
              defaultMessage: 'Address',
              id: 'e6Ph5+',
            }),
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
          <Button onClick={onClose}>
            {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
          </Button>
        </Col>
        <Col>
          <Button
            loading={saving}
            disabled={saving}
            type="primary"
            onClick={onSubmit}
          >
            {intl.formatMessage({
              defaultMessage: 'Link Business',
              id: 'G+A6Wv',
            })}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default AddBusiness;
