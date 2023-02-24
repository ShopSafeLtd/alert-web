import React from 'react';
import {
  Button,
  Col,
  Divider,
  Dropdown,
  Empty,
  Menu,
  Popconfirm,
  Row,
  Table,
  Typography,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faMagnifyingGlass,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { CrimeGroupData, VehicleData } from 'types/DataType';

import { ListCrimeGroupsQuery, ListVehiclesQuery } from 'graphql/generated';

const { Title, Paragraph } = Typography;

interface Props {
  // titleOrder: number;
  // adminRights: boolean;
  saving: boolean;
  toggleAddNewVehicle: () => void;
  toggleAddExistingVehicle: () => void;
  setEditVehicleId: (value: string) => void;
  vehiclesData: VehicleData[];
  removeVehicle: (vehicleId: string) => void;
  removeCrimeGroup: (crimeGroupId: string) => void;
  toggleAddNewCrimeGroup: () => void;
  toggleAddExistingCrimeGroup: () => void;
  // editCrimeGroupId: string;
  // setEditCrimeGroupId: (value: string) => void;
  crimeGroupsData: CrimeGroupData[];
  listVehiclesData: ListVehiclesQuery | undefined;
  listCrimeGroupsData: ListCrimeGroupsQuery | undefined;
}

const Profiles = ({
  saving,
  listVehiclesData,
  toggleAddNewVehicle,
  toggleAddExistingVehicle,
  setEditVehicleId,
  vehiclesData,
  removeVehicle,
  listCrimeGroupsData,
  toggleAddNewCrimeGroup,
  toggleAddExistingCrimeGroup,
  crimeGroupsData,
  removeCrimeGroup,
}: Props): JSX.Element => (
  <>
    <Row gutter={10} align="middle" style={{ marginTop: 70, marginBottom: 20 }}>
      <Col>
        <Title style={{ marginBottom: 0 }} level={4}>
          2.
        </Title>
      </Col>
      <Col>
        <Title style={{ marginBottom: 0 }} level={4}>
          Profiles
        </Title>
      </Col>
      <Col style={{ marginRight: 20 }}>
        <Paragraph style={{ marginBottom: 1 }} type="secondary" italic>
          - Please add the profiles that were involved in the offender.
        </Paragraph>
      </Col>

      <Col>
        <Dropdown
          overlay={
            <Menu
              items={[
                {
                  label: 'Add Existing Crime Groups',
                  key: '1',
                  icon: (
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      style={{ marginRight: 5 }}
                    />
                  ),
                  disabled: !listCrimeGroupsData?.listCrimeGroups?.total,
                  onClick: () => toggleAddExistingCrimeGroup(),
                },
                {
                  label: 'Create New Crime Group',
                  key: '2',
                  icon: (
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                  ),
                  onClick: () => toggleAddNewCrimeGroup(),
                },
              ]}
            />
          }
        >
          <Button
            style={{ color: 'red' }}
            icon={<FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />}
          >
            Crime Groups
          </Button>
        </Dropdown>
      </Col>
      <Col>
        <Dropdown
          overlay={
            <Menu
              items={[
                {
                  label: 'Add Existing Vehicles',
                  key: '1',
                  icon: (
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      style={{ marginRight: 5 }}
                    />
                  ),
                  disabled: !listVehiclesData?.listVehicles.total,
                  onClick: () => toggleAddExistingVehicle(),
                },
                {
                  label: 'Create New Vehicle',
                  key: '2',
                  icon: (
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                  ),
                  onClick: () => toggleAddNewVehicle(),
                },
              ]}
            />
          }
        >
          <Button
            style={{ color: 'red' }}
            icon={<FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />}
          >
            Vehicles
          </Button>
        </Dropdown>
      </Col>
    </Row>

    <Row gutter={20} style={{ marginTop: 10 }}>
      <Col flex={1}>
        {(vehiclesData && vehiclesData.length) ||
        (crimeGroupsData && crimeGroupsData.length) ? (
          <>
            {crimeGroupsData && crimeGroupsData.length ? (
              <>
                <Divider>Crime Groups</Divider>
                <Table
                  columns={[
                    {
                      key: 'reference',
                      dataIndex: 'reference',
                      title: 'Reference',
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
                    {
                      key: 'totalTheftSuccess',
                      dataIndex: 'totalTheftSuccess',
                      title: 'Success Rate',
                      render: (value) => `${value?.toFixed(0) || 0}%`,
                    },
                    {
                      key: 'edit',
                      title: 'Edit',
                      dataIndex: '',
                      width: 50,
                      render: (_, record) => (
                        <Button
                          onClick={() => setEditVehicleId(record.key)}
                          disabled={saving}
                          icon={<FontAwesomeIcon icon={faEdit} />}
                        />
                      ),
                    },
                    {
                      key: 'delete',
                      title: 'Delete',
                      dataIndex: 'delete',
                      width: 50,
                      render: (_, record) => (
                        <Popconfirm
                          placement="topLeft"
                          title="Remove the crime group?"
                          onConfirm={() => {
                            removeCrimeGroup(record.key);
                          }}
                          okText="Yes"
                          cancelText="No"
                          overlayInnerStyle={{ padding: 10 }}
                        >
                          <Button
                            disabled={saving}
                            icon={<FontAwesomeIcon icon={faTrash} />}
                          />
                        </Popconfirm>
                      ),
                    },
                  ]}
                  dataSource={crimeGroupsData.map((crimeGroup) => ({
                    key: crimeGroup.id,
                    reference: crimeGroup.reference,
                    totalOffenders: crimeGroup.totalOffenders,
                    totalIncidents: crimeGroup.totalIncidents,
                    totalValue: crimeGroup.totalValue,
                    totalRecoveredValue: crimeGroup.totalRecoveredValue,
                    totalTheftSuccess: crimeGroup.totalTheftSuccess,
                  }))}
                  size="small"
                />
              </>
            ) : null}
            {vehiclesData && vehiclesData.length ? (
              <>
                <Divider>Vehicles</Divider>
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
                      key: 'registration',
                      dataIndex: 'registration',
                      title: 'Registration',
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
                      key: 'edit',
                      title: 'Edit',
                      dataIndex: '',
                      width: 50,
                      render: (_, record) => (
                        <Button
                          onClick={() => setEditVehicleId(record.key)}
                          disabled={saving}
                          icon={<FontAwesomeIcon icon={faEdit} />}
                        />
                      ),
                    },
                    {
                      key: 'delete',
                      title: 'Delete',
                      dataIndex: 'delete',
                      width: 50,
                      render: (_, record) => (
                        <Popconfirm
                          placement="topLeft"
                          title="Remove the vehicle?"
                          onConfirm={() => {
                            removeVehicle(record.key);
                          }}
                          okText="Yes"
                          cancelText="No"
                          overlayInnerStyle={{ padding: 10 }}
                        >
                          <Button
                            disabled={saving}
                            icon={<FontAwesomeIcon icon={faTrash} />}
                          />
                        </Popconfirm>
                      ),
                    },
                  ]}
                  dataSource={vehiclesData.map((vehicle) => ({
                    key: vehicle.id,
                    make: vehicle.make,
                    colour: vehicle.colour,
                    model: vehicle.model,
                    registration: vehicle.registration,
                    totalCrimeGroup: vehicle.crimeGroup?.length || 0,
                    totalOffenders: vehicle.offenders?.length || 0,
                    totalIncidents: vehicle.incidents?.length || 0,
                  }))}
                  size="small"
                />
              </>
            ) : null}
          </>
        ) : (
          <Row justify="start">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No Data!"
              style={{ marginLeft: 150 }}
            />
          </Row>
        )}
      </Col>
    </Row>
  </>
);
export default Profiles;
