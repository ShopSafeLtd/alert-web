/* eslint-disable @typescript-eslint/restrict-template-expressions */
import type { ListVehiclesQuery } from 'graphql/vehicles/queries/__generated__/list-vehicles.generated';
import type { CrimeGroupData, VehicleData } from 'types/DataType';

import {
  faMagnifyingGlass,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import ProfileDrawer from '../ProfileDrawer';

const { Paragraph, Title } = Typography;

interface Props {
  crimeGroupsData: CrimeGroupData[];
  listVehiclesData: ListVehiclesQuery | undefined;
  onAddCrimeGroup: (value: CrimeGroupData) => void;
  onAddVehicle: (data: VehicleData, existing: boolean) => void;
  onRemoveCrimeGroup: (crimeGroupId: string) => void;
  onRemoveVehicle: (vehicleId: string) => void;
  saving: boolean;
  titleNumber?: number;
  vehiclesData: VehicleData[];
}

const Profiles = ({
  crimeGroupsData,
  listVehiclesData,
  onAddCrimeGroup,
  onAddVehicle,
  onRemoveCrimeGroup,
  onRemoveVehicle,
  saving,
  titleNumber,
  vehiclesData,
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
        align="middle"
        gutter={10}
        style={{ marginBottom: 20, width: '100%' }}
      >
        <Col>
          <Title level={4} style={{ marginBottom: 0 }}>
            {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
            {titleNumber}.
          </Title>
        </Col>
        <Col>
          <Title level={4} style={{ marginBottom: 0 }}>
            {intl.formatMessage({
              defaultMessage: 'Profiles',
            })}
          </Title>
        </Col>
        <Col style={{ marginRight: 20 }}>
          <Paragraph italic style={{ marginBottom: 1 }} type="secondary">
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
                    disabled: !listVehiclesData?.listVehicles.total,
                    icon: (
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        style={{ marginRight: 5 }}
                      />
                    ),
                    key: '1',
                    label: intl.formatMessage({
                      defaultMessage: 'Add Existing Vehicles',
                    }),
                    onClick: () => toggleAddExistingVehicle(),
                  },
                  {
                    icon: (
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: 5 }}
                      />
                    ),
                    key: '2',
                    label: intl.formatMessage({
                      defaultMessage: 'Create New Vehicle',
                    }),
                    onClick: () => toggleAddNewVehicle(),
                  },
                ]}
              />
            }
          >
            <Button
              icon={
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
              }
              style={{ color: 'red' }}
            >
              {intl.formatMessage({
                defaultMessage: 'Vehicles',
              })}
            </Button>
          </Dropdown>
        </Col>
        <Col>
          <Button
            icon={<FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />}
            onClick={toggleAddExistingCrimeGroup}
            style={{ color: 'red' }}
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
                        dataIndex: 'reference',
                        key: 'reference',
                        title: intl.formatMessage({
                          defaultMessage: 'Alert ID',
                        }),
                        width: 100,
                      },
                      {
                        dataIndex: 'images',
                        key: 'images',
                        render: (_, record) => {
                          if (record.images && record.images.length > 0) {
                            return (
                              <img
                                alt={record.images[0]?.optimised || ''}
                                key={record.images[0]?.id || ''}
                                src={record.images[0]?.optimised || ''}
                                style={{ width: 80 }}
                              />
                            );
                          }
                          return <div />;
                        },
                        title: intl.formatMessage({
                          defaultMessage: 'Image',
                        }),
                        width: 150,
                      },
                      {
                        dataIndex: 'registration',
                        key: 'registration',
                        title: intl.formatMessage({
                          defaultMessage: 'Registration',
                        }),
                      },
                      {
                        dataIndex: 'make',
                        key: 'make',
                        title: intl.formatMessage({
                          defaultMessage: 'Make',
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
                        dataIndex: 'colour',
                        key: 'colour',
                        title: intl.formatMessage({
                          defaultMessage: 'Colour',
                        }),
                      },
                      {
                        dataIndex: 'delete',
                        key: 'delete',
                        render: (_, record) => (
                          <Popconfirm
                            cancelText={intl.formatMessage({
                              defaultMessage: 'No',
                            })}
                            okText={intl.formatMessage({
                              defaultMessage: 'Yes',
                            })}
                            onConfirm={() => {
                              onRemoveVehicle(record.key);
                            }}
                            overlayInnerStyle={{ padding: 10 }}
                            placement="topLeft"
                            title={intl.formatMessage({
                              defaultMessage: 'Remove the vehicle?',
                            })}
                          >
                            <Button
                              disabled={saving}
                              icon={<FontAwesomeIcon icon={faTrash} />}
                            />
                          </Popconfirm>
                        ),
                        title: intl.formatMessage({
                          defaultMessage: 'Delete',
                        }),
                        width: 50,
                      },
                    ]}
                    dataSource={vehiclesData.map((vehicle) => ({
                      colour: vehicle.colour,
                      images: vehicle.images,
                      key: vehicle.id,
                      make: vehicle.make,
                      model: vehicle.model,
                      reference: vehicle.reference,
                      registration: vehicle.registration,
                    }))}
                    pagination={
                      vehiclesData && vehiclesData.length > 5
                        ? {
                            pageSize: 5,
                          }
                        : false
                    }
                    size="small"
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
                        dataIndex: 'reference',
                        key: 'reference',
                        title: intl.formatMessage({
                          defaultMessage: 'Alert ID',
                        }),
                      },
                      {
                        dataIndex: 'alias',
                        key: 'alias',
                        title: intl.formatMessage({
                          defaultMessage: 'Alias',
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
                        dataIndex: 'totalValue',
                        key: 'totalValue',
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        render: (value) =>
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                          intl.formatNumber(value || 0, {
                            currency: 'GBP',
                            style: 'currency',
                          }),
                        title: intl.formatMessage({
                          defaultMessage: 'Lost Value',
                        }),
                      },
                      {
                        dataIndex: 'totalRecoveredValue',
                        key: 'totalRecoveredValue',
                        render: (value) =>
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                          intl.formatNumber(value || 0, {
                            currency: 'GBP',
                            style: 'currency',
                          }),
                        title: intl.formatMessage({
                          defaultMessage: 'Recovered Value',
                        }),
                      },
                      {
                        dataIndex: 'totalTheftSuccess',
                        key: 'totalTheftSuccess',
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                        render: (value) => `${value?.toFixed(0) || 0}%`,
                        title: intl.formatMessage({
                          defaultMessage: 'Loss Rate',
                        }),
                      },
                      {
                        dataIndex: 'delete',
                        key: 'delete',
                        render: (_, record) => (
                          <Popconfirm
                            cancelText={intl.formatMessage({
                              defaultMessage: 'No',
                            })}
                            okText={intl.formatMessage({
                              defaultMessage: 'Yes',
                            })}
                            onConfirm={() => {
                              onRemoveCrimeGroup(record.key);
                            }}
                            overlayInnerStyle={{ padding: 10 }}
                            placement="topLeft"
                            title={intl.formatMessage({
                              defaultMessage: 'Remove the crime group?',
                            })}
                          >
                            <Button
                              disabled={saving}
                              icon={<FontAwesomeIcon icon={faTrash} />}
                            />
                          </Popconfirm>
                        ),
                        title: intl.formatMessage({
                          defaultMessage: 'Delete',
                        }),
                        width: 50,
                      },
                    ]}
                    dataSource={crimeGroupsData.map((crimeGroup) => ({
                      alias: crimeGroup.alias,
                      key: crimeGroup.id,
                      reference: crimeGroup.reference,
                      totalIncidents: crimeGroup.totalIncidents,
                      totalOffenders: crimeGroup.totalOffenders,
                      totalRecoveredValue: crimeGroup.totalRecoveredValue,
                      totalTheftSuccess: crimeGroup.totalTheftSuccess,
                      totalValue: crimeGroup.totalValue,
                    }))}
                    pagination={
                      crimeGroupsData && crimeGroupsData.length > 5
                        ? {
                            pageSize: 5,
                          }
                        : false
                    }
                    size="small"
                  />
                </>
              ) : null}
            </>
          ) : (
            <Row justify="center">
              <Empty
                description={intl.formatMessage({
                  defaultMessage: 'No profiles added yet.',
                })}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </Row>
          )}
        </Col>
      </Row>

      <ProfileDrawer
        addExistingCrimeGroup={addExistingCrimeGroup}
        addExistingVehicle={addExistingVehicle}
        addNewVehicle={addNewVehicle}
        crimeGroupsData={crimeGroupsData}
        fromOffender
        onAddCrimeGroup={onAddCrimeGroup}
        onAddVehicle={onAddVehicle}
        toggleAddExistingCrimeGroup={toggleAddExistingCrimeGroup}
        toggleAddExistingVehicle={toggleAddExistingVehicle}
        toggleAddNewVehicle={toggleAddNewVehicle}
        vehiclesData={vehiclesData}
      />
    </div>
  );
};

export default Profiles;
