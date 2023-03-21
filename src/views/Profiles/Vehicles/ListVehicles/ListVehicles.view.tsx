import React from 'react';
import { Button, Col, Drawer, Input, Row, Table } from 'antd';
import { CreateVehicleMutation, ListVehiclesQuery } from 'graphql/generated';
import { Link } from 'react-router-dom';
import { MutationUpdaterFn } from '@apollo/client';
import AddVehicle from 'components/form-components/Vehicle/AddVehicle';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/pro-light-svg-icons';
import { useNavigate } from 'react-router';
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
  const navigate = useNavigate();

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
          reference: vehicle?.reference,
          colour: vehicle.colour,
          model: vehicle.model,
          registration: vehicle.registration,
          updatedAt: vehicle.updatedAt,
          totalCrimeGroup: vehicle.totalCrimeGroups,
          totalOffenders: vehicle.totalOffenders,
          totalIncidents: vehicle.totalIncidents,
        }))}
        loading={loading}
        size="small"
        onRow={(record) => ({
          onClick: () => <Link to={`view/${record.key}`} />,
        })}
        columns={[
          {
            key: 'reference',
            dataIndex: 'reference',
            title: 'Alert ID',
            render: (value, item) => (
              <Link to={`view/${item.key}`}>{value}</Link>
            ),
          },
          {
            key: 'registration',
            dataIndex: 'registration',
            title: 'Registration',
            render: (value, item) => (
              <Link to={`view/${item.key}`}>{value}</Link>
            ),
          },

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
            key: 'updatedAt',
            dataIndex: 'updatedAt',
            title: 'UpdatedAt',
            render: (value) => moment(value || moment()).calendar(),
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
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                onClick={() => navigate(`view/${record.key}`)}
              />
            ),
          },
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
