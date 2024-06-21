import React from 'react';
import { useIntl } from 'react-intl';

import { Button, Col, Input, Row, Table } from 'antd';
import type { ListVehiclesQuery } from 'graphql/vehicles/queries/list-vehicles.generated';

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
              defaultMessage: 'Make',
            }),
          },
          {
            key: 'colour',
            dataIndex: 'colour',
            title: intl.formatMessage({
              defaultMessage: 'Colour',
            }),
          },
          {
            key: 'model',
            dataIndex: 'model',
            title: intl.formatMessage({
              defaultMessage: 'Model',
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
            key: 'totalCrimeGroups',
            dataIndex: 'totalCrimeGroups',
            title: intl.formatMessage({
              defaultMessage: 'Crime Groups',
            }),
          },
          {
            key: 'registration',
            dataIndex: 'registration',
            title: intl.formatMessage({
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
              defaultMessage: 'Add Vehicle',
            })}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default AddExistingVehicle;
