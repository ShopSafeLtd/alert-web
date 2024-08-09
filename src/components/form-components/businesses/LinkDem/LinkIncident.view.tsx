import type { ListDemCompaniesQuery } from 'graphql/dem/queries/__generated__/list-companies.generated';

import { Button, Col, Row, Table } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  data: ListDemCompaniesQuery | undefined;
  loading: boolean;
  onClose: () => void;
  onSelect: (item: { key: string }) => void;
  onSubmit: () => void;
  saving: boolean;
}

const LinkDemCompany = ({
  data,
  loading,
  onClose,
  onSelect,
  onSubmit,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <div className="add-existing-offender">
      <Table
        columns={[
          {
            dataIndex: 'name',
            key: 'name',
            title: intl.formatMessage({ defaultMessage: 'Name' }),
          },
        ]}
        dataSource={data?.listDemCompanies?.demCompanies?.map((company) => ({
          id: company.id || '',
          key: company.id || '',
          name: company.name || '',
        }))}
        loading={loading}
        pagination={{
          hideOnSinglePage: true,
          pageSize: 24,
          position: ['bottomCenter'],
          showSizeChanger: false,
          total: data?.listDemCompanies?.total,
        }}
        rowSelection={{
          onSelect,
          type: 'radio',
        }}
        size="small"
      />
      <Row gutter={16} justify="end" style={{ paddingBottom: 30 }}>
        <Col>
          <Button disabled={saving} onClick={onClose} type="text">
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
              defaultMessage: 'Link DEM Company',
            })}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default LinkDemCompany;
