/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import type { ListDemCompaniesQuery } from 'graphql/generated';
import { Button, Col, Row, Table } from 'antd';

interface Props {
  onClose: () => void;
  onSubmit: () => void;
  saving: boolean;
  data: ListDemCompaniesQuery | undefined;
  loading: boolean;
  onSelect: (item: { key: string }) => void;
}

const LinkDemCompany = ({
  onClose,
  onSubmit,
  saving,
  data,
  loading,
  onSelect,
}: Props): JSX.Element => (
  <div className="add-existing-offender">
    <Table
      columns={[
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
      ]}
      dataSource={data?.listDemCompanies?.demCompanies?.map((company) => ({
        name: company.name || '',
        id: company.id || '',
        key: company.id || '',
      }))}
      rowSelection={{
        type: 'radio',
        onSelect,
      }}
      pagination={{
        hideOnSinglePage: true,
        total: data?.listDemCompanies?.total,
        pageSize: 24,
        showSizeChanger: false,
        position: ['bottomCenter'],
      }}
      loading={loading}
      size="small"
    />
    <Row gutter={16} style={{ paddingBottom: 30 }} justify="end">
      <Col>
        <Button onClick={onClose} disabled={saving} type="text">
          Cancel
        </Button>
      </Col>
      <Col>
        <Button
          loading={saving}
          disabled={saving}
          onClick={onSubmit}
          type="primary"
        >
          Link DEM Company
        </Button>
      </Col>
    </Row>
  </div>
);

export default LinkDemCompany;
