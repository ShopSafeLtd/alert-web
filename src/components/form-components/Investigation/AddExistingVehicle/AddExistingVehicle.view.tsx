import React from 'react';
import { useIntl } from 'react-intl';
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
              id: 'LwoWFl',
              defaultMessage: 'Search Vehicles...',
            })}
            allowClear
          />
        </Col>
      </Row>

      <Table
        columns={[
          {
            key: 'make',
            dataIndex: 'make',
            title: intl.formatMessage({
              id: '6AAM0P',
              defaultMessage: 'Make',
            }),
          },
          {
            key: 'colour',
            dataIndex: 'colour',
            title: intl.formatMessage({
              id: '+e8vAT',
              defaultMessage: 'Colour',
            }),
          },
          {
            key: 'model',
            dataIndex: 'model',
            title: intl.formatMessage({
              id: 'rhSI1/',
              defaultMessage: 'Model',
            }),
          },
          {
            key: 'totalOffenders',
            dataIndex: 'totalOffenders',
            title: intl.formatMessage({
              id: '+a+2ug',
              defaultMessage: 'Members',
            }),
          },
          {
            key: 'totalIncidents',
            dataIndex: 'totalIncidents',
            title: intl.formatMessage({
              id: 'mtr3R4',
              defaultMessage: 'Incidents',
            }),
          },
          {
            key: 'totalCrimeGroups',
            dataIndex: 'totalCrimeGroups',
            title: intl.formatMessage({
              id: 'a0aLil',
              defaultMessage: 'Crime Groups',
            }),
          },
          {
            key: 'registration',
            dataIndex: 'registration',
            title: intl.formatMessage({
              id: 'qv7ied',
              defaultMessage: 'Registration',
            }),
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
        loading={loading}
        size="small"
      />
      <Row gutter={16} style={{ paddingBottom: 30 }} justify="end">
        <Col>
          <Button onClick={onClose} disabled={saving} type="text">
            {intl.formatMessage({
              id: '47FYwb',
              defaultMessage: 'Cancel',
            })}
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
              id: '7vPZdr',
              defaultMessage: 'Add Vehicle',
            })}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default AddExistingVehicle;
