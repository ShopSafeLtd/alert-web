/* eslint-disable @typescript-eslint/restrict-template-expressions */
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

import { useIntl } from 'react-intl';
import ProfileDrawer from '../ProfileDrawer';
import type { ListVehiclesQuery } from 'graphql/vehicles/queries/list-vehicles.generated';

const { Title, Paragraph } = Typography;

interface Props {
  saving: boolean;
  listVehiclesData: ListVehiclesQuery | undefined;
  titleNumber?: number;
  vehiclesData: VehicleData[];
  onAddVehicle: (data: VehicleData, existing: boolean) => void;
  onRemoveVehicle: (vehicleId: string) => void;
  onRemoveCrimeGroup: (crimeGroupId: string) => void;
  crimeGroupsData: CrimeGroupData[];
  onAddCrimeGroup: (value: CrimeGroupData) => void;
}

const Profiles = ({
  saving,
  titleNumber,
  vehiclesData,
  onAddVehicle,
  crimeGroupsData,
  listVehiclesData,
  onAddCrimeGroup,
  onRemoveCrimeGroup,
  onRemoveVehicle,
}: Props): JSX.Element => {
  const [addNewVehicle, setAddNewVehicle] = useState(false);
  const [addExistingVehicle, setAddExistingVehicle] = useState(false);
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

  const intl = useIntl();

  return (
    <div style={{ width: '100%' }}>
      <Row
        gutter={10}
        align="middle"
        style={{ marginBottom: 20, width: '100%' }}
      >
        <Col>
          <Title style={{ marginBottom: 0 }} level={4}>
            {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
            {titleNumber}.
          </Title>
        </Col>
        <Col>
          <Title style={{ marginBottom: 0 }} level={4}>
            {intl.formatMessage({
              defaultMessage: 'Profiles',
            })}
          </Title>
        </Col>
        <Col style={{ marginRight: 20 }}>
          <Paragraph style={{ marginBottom: 1 }} type="secondary" italic>
            {intl.formatMessage({
              defaultMessage:
                '- Please add the profiles that were involved in the offender.',
            })}
          </Paragraph>
        </Col>

        <Col>
          <Dropdown
            overlay={
              <Menu
                items={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Add Existing Vehicles',
                    }),
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
                    label: intl.formatMessage({
                      defaultMessage: 'Create New Vehicle',
                    }),
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
              {intl.formatMessage({
                defaultMessage: 'Vehicles',
              })}
            </Button>
          </Dropdown>
        </Col>
        <Col>
          <Button
            style={{ color: 'red' }}
            onClick={toggleAddExistingCrimeGroup}
            icon={<FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />}
          >
            {intl.formatMessage({
              defaultMessage: 'Crime Groups',
            })}
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
                  <Divider>
                    {intl.formatMessage({
                      defaultMessage: 'Vehicles',
                    })}
                  </Divider>
                  <Table
                    columns={[
                      {
                        key: 'reference',
                        dataIndex: 'reference',
                        title: intl.formatMessage({
                          defaultMessage: 'Alert ID',
                        }),
                        width: 100,
                      },
                      {
                        key: 'images',
                        title: intl.formatMessage({
                          defaultMessage: 'Image',
                        }),
                        dataIndex: 'images',
                        width: 150,
                        render: (_, record) => {
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
                        title: intl.formatMessage({
                          defaultMessage: 'Registration',
                        }),
                      },
                      {
                        key: 'make',
                        dataIndex: 'make',
                        title: intl.formatMessage({
                          defaultMessage: 'Make',
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
                        key: 'colour',
                        dataIndex: 'colour',
                        title: intl.formatMessage({
                          defaultMessage: 'Colour',
                        }),
                      },
                      {
                        key: 'delete',
                        title: intl.formatMessage({
                          defaultMessage: 'Delete',
                        }),
                        dataIndex: 'delete',
                        width: 50,
                        render: (_, record) => (
                          <Popconfirm
                            placement="topLeft"
                            title={intl.formatMessage({
                              defaultMessage: 'Remove the vehicle?',
                            })}
                            onConfirm={() => {
                              onRemoveVehicle(record.key);
                            }}
                            okText={intl.formatMessage({
                              defaultMessage: 'Yes',
                            })}
                            cancelText={intl.formatMessage({
                              defaultMessage: 'No',
                            })}
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
                  <Divider>
                    {intl.formatMessage({
                      defaultMessage: 'Crime Groups',
                    })}
                  </Divider>
                  <Table
                    columns={[
                      {
                        key: 'reference',
                        dataIndex: 'reference',
                        title: intl.formatMessage({
                          defaultMessage: 'Alert ID',
                        }),
                      },
                      {
                        key: 'alias',
                        dataIndex: 'alias',
                        title: intl.formatMessage({
                          defaultMessage: 'Alias',
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
                        key: 'totalValue',
                        dataIndex: 'totalValue',
                        title: intl.formatMessage({
                          defaultMessage: 'Lost Value',
                        }),
                        render: (value) => `£${value || 0}`,
                      },
                      {
                        key: 'totalRecoveredValue',
                        dataIndex: 'totalRecoveredValue',
                        title: intl.formatMessage({
                          defaultMessage: 'Recovered Value',
                        }),
                        render: (value) => `£${value || 0}`,
                      },
                      {
                        key: 'totalTheftSuccess',
                        dataIndex: 'totalTheftSuccess',
                        title: intl.formatMessage({
                          defaultMessage: 'Loss Rate',
                        }),
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                        render: (value) => `${value?.toFixed(0) || 0}%`,
                      },
                      {
                        key: 'delete',
                        title: intl.formatMessage({
                          defaultMessage: 'Delete',
                        }),
                        dataIndex: 'delete',
                        width: 50,
                        render: (_, record) => (
                          <Popconfirm
                            placement="topLeft"
                            title={intl.formatMessage({
                              defaultMessage: 'Remove the crime group?',
                            })}
                            onConfirm={() => {
                              onRemoveCrimeGroup(record.key);
                            }}
                            okText={intl.formatMessage({
                              defaultMessage: 'Yes',
                            })}
                            cancelText={intl.formatMessage({
                              defaultMessage: 'No',
                            })}
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
            <Row justify="center">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={intl.formatMessage({
                  defaultMessage: 'No profiles added yet.',
                })}
              />
            </Row>
          )}
        </Col>
      </Row>

      <ProfileDrawer
        addExistingVehicle={addExistingVehicle}
        toggleAddNewVehicle={toggleAddNewVehicle}
        toggleAddExistingVehicle={toggleAddExistingVehicle}
        vehiclesData={vehiclesData}
        onAddVehicle={onAddVehicle}
        addExistingCrimeGroup={addExistingCrimeGroup}
        toggleAddExistingCrimeGroup={toggleAddExistingCrimeGroup}
        crimeGroupsData={crimeGroupsData}
        fromOffender
        onAddCrimeGroup={onAddCrimeGroup}
        addNewVehicle={addNewVehicle}
      />
    </div>
  );
};

export default Profiles;
