/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { ListCrimeGroupsQuery } from 'graphql/generated';
import { Row, Col, Input, Table, Button } from 'antd';

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
}: Props): JSX.Element => (
  <div className="add-existing-offender">
    <Row gutter={8} className="search-offender">
      <Col span={18}>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search Crime Groups..."
          allowClear
        />
      </Col>
    </Row>

    <Table
      columns={[
        {
          key: 'reference',
          dataIndex: 'reference',
          title: 'Alert ID',
        },
        {
          key: 'totalOffenders',
          dataIndex: 'totalOffenders',
          title: 'Members',
        },
        {
          key: 'totalIncidents',
          dataIndex: 'totalIncidents',
          title: 'Incidents',
        },
        {
          key: 'totalValue',
          dataIndex: 'totalValue',
          title: 'Lost Value',
          render: (value) => `£${value || 0}`,
        },
        {
          key: 'totalRecoveredValue',
          dataIndex: 'totalRecoveredValue',
          title: 'Recovered Value',
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
        total: data?.listCrimeGroups?.total,
        onChange: onPaginationChange,
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
          Link Crime Group
        </Button>
      </Col>
    </Row>
  </div>
);

export default LinkCrimeGroup;
