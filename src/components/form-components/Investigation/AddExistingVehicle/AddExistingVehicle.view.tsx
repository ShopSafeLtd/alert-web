import type { ListVehiclesQuery } from 'graphql/vehicles/queries/__generated__/list-vehicles.generated';

import { Button, Col, Input, Row, Table } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  data: ListVehiclesQuery | undefined;
  loading: boolean;
  onClose: () => void;
  onSelect: (item: { key: string }) => void;
  onSubmit: () => void;
  saving: boolean;
  search: string;
  setSearch: (value: string) => void;
}

const AddExistingVehicle = ({
  data,
  loading,
  onClose,
  onSelect,
  onSubmit,
  saving,
  search,
  setSearch,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <div className="add-existing-offender">
      <Row className="search-offender" gutter={8}>
        <Col span={18}>
          <Input
            allowClear
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search Vehicles...',
            })}
            value={search}
          />
        </Col>
      </Row>

      <Table
        columns={[
          {
            dataIndex: 'make',
            key: 'make',
            title: intl.formatMessage({
              defaultMessage: 'Make',
            }),
          },
          {
            dataIndex: 'colour',
            key: 'colour',
            title: intl.formatMessage({
              defaultMessage: 'Colour',
            }),
          },
          {
            dataIndex: 'model',
            key: 'model',
            title: intl.formatMessage({
              defaultMessage: 'Model',
            }),
          },
          {
            dataIndex: 'totalOffenders',
            key: 'totalOffenders',
            title: intl.formatMessage({
              defaultMessage: 'Members',
            }),
          },
          {
            dataIndex: 'totalIncidents',
            key: 'totalIncidents',
            title: intl.formatMessage({
              defaultMessage: 'Incidents',
            }),
          },
          {
            dataIndex: 'totalCrimeGroups',
            key: 'totalCrimeGroups',
            title: intl.formatMessage({
              defaultMessage: 'Crime Groups',
            }),
          },
          {
            dataIndex: 'registration',
            key: 'registration',
            title: intl.formatMessage({
              defaultMessage: 'Registration',
            }),
          },
        ]}
        dataSource={data?.listVehicles?.vehicles.map((vehicle) => ({
          colour: vehicle.colour,
          key: vehicle.id,
          make: vehicle.make,
          model: vehicle.model,
          registration: vehicle.registration,
          totalCrimeGroup: vehicle.totalCrimeGroups,
          totalIncidents: vehicle.totalIncidents,
          totalOffenders: vehicle.totalOffenders,
          updatedAt: vehicle.updatedAt,
        }))}
        loading={loading}
        rowSelection={{
          onSelect,
          type: 'radio',
        }}
        size="small"
      />
      <Row gutter={16} justify="end" style={{ paddingBottom: 30 }}>
        <Col>
          <Button disabled={saving} onClick={onClose} type="text">
            {intl.formatMessage({
              defaultMessage: 'Cancel',
            })}
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
              defaultMessage: 'Add Vehicle',
            })}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default AddExistingVehicle;
