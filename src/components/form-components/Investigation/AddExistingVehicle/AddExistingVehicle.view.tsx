import React from 'react';
import type { ListVehiclesQuery } from 'graphql/generated';
import { Button, Col, Input, Row, Table } from 'antd';

interface Props {
  onClose: () => void;
  onSubmit: () => void;
  saving: boolean;
  data: ListVehiclesQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onSelect: (item: { key: string }) => void;
}

const AddExistingVehicle = ({
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
          placeholder="Search Vehicles..."
          allowClear
        />
      </Col>
    </Row>

    <Table
      columns={[
        {
          key: 'make',
          dataIndex: 'make',
          title: 'Make',
        },
        {
          key: 'colour',
          dataIndex: 'colour',
          title: 'Colour',
        },
        {
          key: 'model',
          dataIndex: 'model',
          title: 'Model',
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
          key: 'totalCrimeGroups',
          dataIndex: 'totalCrimeGroups',
          title: 'Crime Groups',
        },
        {
          key: 'registration',
          dataIndex: 'registration',
          title: 'Registration',
          // render: (value) => `${value?.toFixed(0) || 0}%`,
        },
      ]}
      dataSource={data?.listVehicles?.vehicles.map((vehicle) => ({
        key: vehicle.id,
        make: vehicle.make,
        colour: vehicle.colour,
        model: vehicle.model,
        registration: vehicle.registration,
        updatedAt: vehicle.updatedAt,
        totalCrimeGroup: vehicle.totalCrimeGroups,
        totalOffenders: vehicle.totalOffenders,
        totalIncidents: vehicle.totalIncidents,
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
          Add Vehicle
        </Button>
      </Col>
    </Row>
  </div>
);

export default AddExistingVehicle;
