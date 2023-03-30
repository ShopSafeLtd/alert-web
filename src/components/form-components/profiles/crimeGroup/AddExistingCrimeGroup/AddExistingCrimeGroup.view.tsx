import React from 'react';
import type { ListCrimeGroupsQuery } from 'graphql/generated';
import { Button, Col, Input, Row, Table } from 'antd';

interface Props {
  onClose: () => void;
  onSubmit: () => void;
  saving: boolean;
  data: ListCrimeGroupsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onSelect: (item: { key: string }) => void;
}

const AddExistingCrimeGroup = ({
  onClose,
  onSubmit,
  saving,
  data,
  loading,
  search,
  setSearch,
  onSelect,
}: // onPaginationChange,
// setCurrentId,
// openLightbox,
// selectedOffender,
// lightBoxOpen,
Props): JSX.Element => (
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
          key: 'alias',
          dataIndex: 'alias',
          title: 'Alias',
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
      ]}
      dataSource={data?.listCrimeGroups?.crimeGroups.map((crimeGroup) => ({
        key: crimeGroup.id,
        reference: crimeGroup.reference,
        totalOffenders: crimeGroup.totalOffenders,
        totalIncidents: crimeGroup.totalIncidents,
        totalValue: crimeGroup.totalValue,
        totalRecoveredValue: crimeGroup.totalRecoveredValue,
        totalTheftSuccess: crimeGroup.totalTheftSuccess,
        alias: crimeGroup.alias,
      }))}
      rowSelection={{
        type: 'radio',
        onSelect,
      }}
      // pagination={{
      //   total: data?.listIncidents?.total,
      //   onChange: onPaginationChange,
      //   pageSize: 24,
      //   showSizeChanger: false,
      //   position: ['bottomCenter'],
      // }}
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
          Add Crime Group
        </Button>
      </Col>
    </Row>
  </div>
);

export default AddExistingCrimeGroup;
