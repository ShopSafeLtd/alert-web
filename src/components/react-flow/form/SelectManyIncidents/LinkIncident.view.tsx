/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { ListIncidentsQuery } from 'graphql/generated';
import { Button, Col, Input, Row, Table } from 'antd';

interface Props {
  onClose: () => void;
  onSubmit: () => void;
  saving: boolean;
  data: ListIncidentsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  selectedRowKeys: React.Key[];

  onSelect: (
    selectedRowKeys: React.Key[],
    selectedRows: IncidentTable[]
  ) => void;
}

export interface IncidentTable {
  key?: string | undefined | null;
  reference?: number | undefined | null;
  subject?: string | undefined | null;
  date?: string | undefined | null;
  location?: string | undefined | null;
  offenders?: string | undefined | null;
}

const LinkIncident = ({
  onClose,
  onSubmit,
  saving,
  data,
  loading,
  search,
  setSearch,
  onPaginationChange,
  onSelect,
  selectedRowKeys,
}: Props): JSX.Element => (
  <div className="add-existing-offender">
    <Row gutter={8} className="search-offender">
      <Col span={18}>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search Incidents..."
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
          key: 'subject',
          dataIndex: 'subject',
          title: 'Subject',
        },
        {
          key: 'date',
          dataIndex: 'date',
          title: 'Date',
        },
        {
          key: 'location',
          dataIndex: 'location',
          title: 'Location',
        },
        {
          key: 'offenders',
          dataIndex: 'offenders',
          title: 'Offenders',
        },
      ]}
      dataSource={data?.listIncidents?.incidents.map((incident) => ({
        subject: incident.subject,
        reference: incident.reference,
        type: incident.crimeTypes
          .map((type, index) => `${index > 0 ? ' ' : ''}${type.name}`)
          .toString(),
        date: incident.dayTime,
        location: incident.createdBy.businesses[0]?.name,
        offenders: incident.offenders
          .map((type, index) => `${index > 0 ? ' ' : ''}${type.name}`)
          .toString(),
        key: incident.id,
      }))}
      rowSelection={{
        type: 'checkbox',
        onChange: onSelect,
        selectedRowKeys,
        preserveSelectedRowKeys: true,
      }}
      pagination={{
        hideOnSinglePage: true,
        total: data?.listIncidents?.total,
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
          Add Incidents
        </Button>
      </Col>
    </Row>
  </div>
);

export default LinkIncident;
