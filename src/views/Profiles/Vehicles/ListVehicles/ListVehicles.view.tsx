import React from 'react';
import { Button, Col, Drawer, Input, Row, Table } from 'antd';
import { CreateVehicleMutation, ListVehiclesQuery } from 'graphql/generated';
import { Link } from 'react-router-dom';
import { formatDate } from 'utils';
import { MutationUpdaterFn } from '@apollo/client';
import AddVehicle from 'components/form-components/Vehicle/AddVehicle';
import useStyles from './ListVehicles.styles';

interface Props {
  data: ListVehiclesQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addVehicle: boolean;
  toggleAddVehicle: () => void;
  updateVehicleList: MutationUpdaterFn<CreateVehicleMutation>;
}

const ListVehicles = ({
  data,
  loading,
  search,
  setSearch,
  addVehicle,
  toggleAddVehicle,
  updateVehicleList,
}: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Row className={classes.headerRow}>
        <Col flex={1}>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            allowClear
            className={classes.searchInput}
            placeholder="Search vehicles..."
          />
        </Col>
        <Col>
          <Button type="primary" onClick={toggleAddVehicle}>
            Add New Vehicle
          </Button>
        </Col>
      </Row>
      <Table
        dataSource={data?.listVehicles.vehicles.map((vehicle) => ({
          key: vehicle.id,
          make: vehicle.make,
          colour: vehicle.colour,
          model: vehicle.model,
          registration: vehicle.registration,
          // crimeGroup: vehicle.crimeGroup,
          updatedAt: vehicle.updatedAt,
          totalOffenders: vehicle.totalOffenders,
          totalIncidents: vehicle.totalIncidents,
        }))}
        loading={loading}
        size="small"
        columns={[
          {
            key: 'make',
            dataIndex: 'make',
            title: 'Make',
            render: (value, item) => (
              <Link to={`view/${item.key}`}>{value}</Link>
            ),
          },
          {
            key: 'updatedAt',
            dataIndex: 'updatedAt',
            title: 'updatedAt',
            render: (value) => formatDate(value),
          },
          {
            key: 'colour',
            dataIndex: 'colour',
            title: 'Colour',
            // render: (value) => `£${value || 0}`,
          },
          {
            key: 'model',
            dataIndex: 'model',
            title: 'Model',
            // render: (value) => `£${value || 0}`,
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
            key: 'registration',
            dataIndex: 'registration',
            title: 'Registration',
            // render: (value) => `${value?.toFixed(0) || 0}%`,
          },
          // {
          //   key: 'crimeGroup',
          //   dataIndex: 'crimeGroup',
          //   title: 'crimeGroup',
          //   render: (value,item) => `${item.crimeGroup.}%`,
          // },
        ]}
      />
      <Drawer
        title="Add New Vehicle"
        visible={addVehicle}
        width="600"
        onClose={toggleAddVehicle}
      >
        {addVehicle ? (
          <AddVehicle update={updateVehicleList} onClose={toggleAddVehicle} />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default ListVehicles;
