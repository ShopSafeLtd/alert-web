import React from 'react';

import { Button, Col, Row, Table } from 'antd';
import { useIntl } from 'react-intl';
import type { ListDemCompaniesQuery } from 'graphql/dem/queries/list-companies.generated';

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
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <div className="add-existing-offender">
      <Table
        columns={[
          {
            title: intl.formatMessage({ defaultMessage: 'Name' }),
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
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
          </Button>
        </Col>
        <Col>
          <Button
            loading={saving}
            disabled={saving}
            onClick={onSubmit}
            type="primary"
          >
            {intl.formatMessage({
              defaultMessage: 'Link DEM Company',
            })}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default LinkDemCompany;
