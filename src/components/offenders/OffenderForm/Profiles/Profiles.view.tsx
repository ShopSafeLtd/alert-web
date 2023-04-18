import React, { useState } from 'react';
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
  faMagnifyingGlass,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import type { CrimeGroupData, VehicleData } from 'types/DataType';

import type { ListVehiclesQuery } from 'graphql/generated';
import ProfileDrawer from '../ProfileDrawer';

const { Title, Paragraph } = Typography;

interface Props {
  // titleOrder: number;
  // adminRights: boolean;
  saving: boolean;
  // editCrimeGroupId: string;
  // setEditCrimeGroupId: (value: string) => void;
  listVehiclesData: ListVehiclesQuery | undefined;
  titleNumber?: number;
  vehiclesData: VehicleData[];
  onAddVehicle: (data: VehicleData, existing: boolean) => void;
  onRemoveVehicle: (vehicleId: string) => void;
  onRemoveCrimeGroup: (crimeGroupId: string) => void;
  crimeGroupsData: CrimeGroupData[];
  onEditVehicle: (data: VehicleData) => void;
  onAddCrimeGroup: (value: CrimeGroupData) => void;
}

const Profiles = ({
  saving,
  titleNumber,
  vehiclesData,
  onAddVehicle,
  crimeGroupsData,
  listVehiclesData,
  onEditVehicle,
  onAddCrimeGroup,
  onRemoveCrimeGroup,
  onRemoveVehicle,
}: Props): JSX.Element => {
  const [addNewVehicle, setAddNewVehicle] = useState(false);
  const [addExistingVehicle, setAddExistingVehicle] = useState(false);
  const [editVehicleId, setEditVehicleId] = useState<string>('');
  const [addExistingCrimeGroup, setAddExistingCrimeGroup] = useState(false);

  const toggleAddExistingCrimeGroup = () => {
    setAddExistingCrimeGroup(!addExistingCrimeGroup);
  };
  const toggleAddNewVehicle = () => {
    setAddNewVehicle(!addNewVehicle);
  };
  const toggleAddExistingVehicle = () => {
    setAddExistingVehicle(!addExistingVehicle);
  };

  return (
    <div style={{ width: '100%' }}>
      <Row
        gutter={10}
        align="middle"
        style={{ marginBottom: 20, width: '100%' }}
      >
        <Col>
          <Title style={{ marginBottom: 0 }} level={4}>
            {titleNumber}.
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
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: 5 }}
                      />
                    ),
                    onClick: () => toggleAddNewVehicle(),
                  },
                ]}
              />
            }
          >
            <Button
              style={{ color: 'red' }}
              icon={
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
              }
            >
              Vehicles
            </Button>
          </Dropdown>
        </Col>
        <Col>
          <Button
            style={{ color: 'red' }}
            onClick={toggleAddExistingCrimeGroup}
            icon={<FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />}
          >
            Crime Groups
          </Button>
        </Col>
      </Row>

      <Row gutter={20} style={{ marginTop: 10 }}>
        <Col flex={1}>
          {(vehiclesData && vehiclesData.length > 0) ||
          (crimeGroupsData && crimeGroupsData.length > 0) ? (
            <>
              {vehiclesData && vehiclesData.length > 0 ? (
                <>
                  <Divider>Vehicles</Divider>
                  <Table
                    columns={[
                      {
                        key: 'reference',
                        dataIndex: 'reference',
                        title: 'Alert ID',
                        width: 100,
                      },
                      {
                        key: 'images',
                        title: 'Image',
                        dataIndex: 'images',
                        width: 150,
                        render: (
                          _,
                          record
                          // images?: { id: string; optimised: string }[],
                        ) => {
                          if (record.images && record.images.length > 0) {
                            return (
                              <img
                                style={{ width: 80 }}
                                key={record.images[0]?.id || ''}
                                src={record.images[0]?.optimised || ''}
                                alt={record.images[0]?.optimised || ''}
                              />
                            );
                          }
                          return <div />;
                        },
                      },
                      {
                        key: 'registration',
                        dataIndex: 'registration',
                        title: 'Registration',
                      },
                      {
                        key: 'make',
                        dataIndex: 'make',
                        title: 'Make',
                      },
                      {
                        key: 'model',
                        dataIndex: 'model',
                        title: 'Model',
                      },
                      {
                        key: 'colour',
                        dataIndex: 'colour',
                        title: 'Colour',
                      },
                      // {
                      //   key: 'edit',
                      //   title: 'Edit',
                      //   dataIndex: '',
                      //   width: 50,
                      //   render: (_, record) => (
                      //     <Button
                      //       onClick={() => setEditVehicleId(record.key)}
                      //       disabled
                      //       icon={<FontAwesomeIcon icon={faEdit} />}
                      //     />
                      //   ),
                      // },
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
                              onRemoveVehicle(record.key);
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
                      reference: vehicle.reference,
                      make: vehicle.make,
                      colour: vehicle.colour,
                      model: vehicle.model,
                      registration: vehicle.registration,
                      images: vehicle.images,
                    }))}
                    size="small"
                    pagination={
                      vehiclesData && vehiclesData.length > 5
                        ? {
                            pageSize: 5,
                          }
                        : false
                    }
                  />
                </>
              ) : null}
              {crimeGroupsData && crimeGroupsData.length > 0 ? (
                <>
                  <Divider>Crime Groups</Divider>
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
                      // {
                      //   key: 'edit',
                      //   title: 'Edit',
                      //   dataIndex: '',
                      //   width: 50,
                      //   render: (_, record) => (
                      //     <Button
                      //       onClick={() => setEditVehicleId(record.key)}
                      //       disabled
                      //       icon={<FontAwesomeIcon icon={faEdit} />}
                      //     />
                      //   ),
                      // },
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
                              onRemoveCrimeGroup(record.key);
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
                      alias: crimeGroup.alias,
                      totalOffenders: crimeGroup.totalOffenders,
                      totalIncidents: crimeGroup.totalIncidents,
                      totalValue: crimeGroup.totalValue,
                      totalRecoveredValue: crimeGroup.totalRecoveredValue,
                      totalTheftSuccess: crimeGroup.totalTheftSuccess,
                    }))}
                    size="small"
                    pagination={
                      crimeGroupsData && crimeGroupsData.length > 5
                        ? {
                            pageSize: 5,
                          }
                        : false
                    }
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
      <ProfileDrawer
        addExistingVehicle={addExistingVehicle}
        editVehicleId={editVehicleId}
        setEditVehicleId={setEditVehicleId}
        toggleAddNewVehicle={toggleAddNewVehicle}
        toggleAddExistingVehicle={toggleAddExistingVehicle}
        vehiclesData={vehiclesData}
        onAddVehicle={onAddVehicle}
        addExistingCrimeGroup={addExistingCrimeGroup}
        toggleAddExistingCrimeGroup={toggleAddExistingCrimeGroup}
        crimeGroupsData={crimeGroupsData}
        fromOffender
        onEditVehicle={onEditVehicle}
        onAddCrimeGroup={onAddCrimeGroup}
        addNewVehicle={addNewVehicle}
      />
    </div>
  );
};
export default Profiles;
