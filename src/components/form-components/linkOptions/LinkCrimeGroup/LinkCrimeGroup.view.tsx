/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';

import { Row, Col, Input, Table, Button } from 'antd';
import { useIntl } from 'react-intl';
import type { ListCrimeGroupsQuery } from 'graphql/crime-groups/queries/list-crime-groups.generated';

interface Props {
  onClose: () => void;
  onSubmit: () => void;
  saving: boolean;
  data: ListCrimeGroupsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  onSelect: (item: { key: string }) => void;
}

const LinkCrimeGroup = ({
  onClose,
  onSubmit,
  saving,
  data,
  loading,
  search,
  setSearch,
  onPaginationChange,
  onSelect,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <div className="add-existing-offender">
      <Row gutter={8} className="search-offender">
        <Col span={18}>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search Crime Groups...',
            })}
            allowClear
          />
        </Col>
      </Row>

      <Table
        columns={[
          {
            key: 'reference',
            dataIndex: 'reference',
            title: intl.formatMessage({
              defaultMessage: 'Alert ID',
            }),
          },
          {
            key: 'totalOffenders',
            dataIndex: 'totalOffenders',
            title: intl.formatMessage({
              defaultMessage: 'Members',
            }),
          },
          {
            key: 'totalIncidents',
            dataIndex: 'totalIncidents',
            title: intl.formatMessage({
              defaultMessage: 'Incidents',
            }),
          },
          {
            key: 'totalValue',
            dataIndex: 'totalValue',
            title: intl.formatMessage({
              defaultMessage: 'Lost Value',
            }),
            render: (value) => `£${value || 0}`,
          },
          {
            key: 'totalRecoveredValue',
            dataIndex: 'totalRecoveredValue',
            title: intl.formatMessage({
              defaultMessage: 'Recovered Value',
            }),
            render: (value) => `£${value || 0}`,
          },
        ]}
        dataSource={data?.listCrimeGroups?.crimeGroups.map((crimeGroup) => ({
          reference: crimeGroup.reference,
          totalOffenders: crimeGroup.totalOffenders,
          totalIncidents: crimeGroup.totalIncidents,
          totalValue: crimeGroup.totalValue,
          totalRecoveredValue: crimeGroup.totalRecoveredValue,
          key: crimeGroup.id,
        }))}
        rowSelection={{
          type: 'radio',
          onSelect,
        }}
        pagination={{
          hideOnSinglePage: true,
          total: data?.listCrimeGroups?.total,
          onChange: onPaginationChange,
          pageSize: 24,
          showSizeChanger: false,
          position: ['bottomCenter'],
        }}
        loading={loading}
        size="small"
      />
      <Row gutter={16} style={{ marginTop: 30 }} justify="end">
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
              defaultMessage: 'Link Crime Group',
            })}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default LinkCrimeGroup;
