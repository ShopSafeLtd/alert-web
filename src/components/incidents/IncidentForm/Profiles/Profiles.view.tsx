import React from 'react';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Dropdown,
  Input,
  Menu,
  Modal,
  Popconfirm,
  Row,
  Skeleton,
  Table,
  Tooltip,
  Typography,
  Upload,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faPlus,
  faTrash,
  faUpload,
} from '@fortawesome/pro-light-svg-icons';
import type { OffenderData, VehicleData } from 'types/DataType';
import {
  calcAge,
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import type { ListOffendersQuery } from 'graphql/generated';
import type { UploadChangeParam } from 'antd/lib/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import ProfileDrawer from 'components/incidents/IncidentForm/ProfileDrawer';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { useIntl } from 'react-intl';

const { Title, Paragraph } = Typography;
type Offender = Exclude<
  ListOffendersQuery['listOffenders'],
  null | undefined
>['offenders'][0];

interface Props {
  addExistingOffender: boolean;
  addExistingVehicle: boolean;
  addNewVehicle: boolean;
  addOffender: boolean;
  addRecentOffender: Offender | null;
  editOffenderId: string;
  offenderImgChange: (
    info: UploadChangeParam<UploadFile>,
    currentId: string
  ) => void;
  offendersData: OffenderData[];
  recentOffenderData: ListOffendersQuery | undefined;
  recentOffenderLoading: boolean;
  removeOffender: (offenderId: string) => void;
  saving: boolean;
  searchOffenders: string;
  setAddRecentOffender: (value: Offender | null) => void;
  setEditOffenderId: (value: string) => void;
  setSearchOffenders: (value: string) => void;
  toggleAddExistingOffender: () => void;
  toggleAddExistingVehicle: () => void;
  toggleAddNewVehicle: () => void;
  toggleAddOffender: () => void;
  updateOffender: (value: OffenderData) => void;
  vehiclesData: VehicleData[];
  onAddOffender: (value: OffenderData, existing: boolean) => void;
  onAddVehicle: (data: VehicleData, existing: boolean) => void;
  onRemoveVehicle: (vehicleId: string) => void;
}

const Profiles = ({
  saving,
  toggleAddNewVehicle,
  toggleAddExistingVehicle,
  vehiclesData,
  offendersData,
  removeOffender,
  setEditOffenderId,
  toggleAddOffender,
  toggleAddExistingOffender,
  recentOffenderData,
  recentOffenderLoading,
  setAddRecentOffender,
  searchOffenders,
  setSearchOffenders,
  offenderImgChange,
  addExistingOffender,
  addExistingVehicle,
  addNewVehicle,
  addOffender,
  addRecentOffender,
  editOffenderId,
  updateOffender,
  onAddOffender,
  onAddVehicle,
  onRemoveVehicle,
}: Props): JSX.Element => {
  const intl = useIntl();
  const ageLabel = intl.formatMessage({ defaultMessage: 'Age', id: '9oNQSC' });
  const buildLabel = intl.formatMessage({
    defaultMessage: 'Build',
    id: 'RSctv1',
  });
  const ethnicityLabel = intl.formatMessage({
    defaultMessage: 'Ethnicity',
    id: 'XtCAFo',
  });
  const sexLabel = intl.formatMessage({ defaultMessage: 'Sex', id: 'eWJHGp' });
  const hairLabel = intl.formatMessage({
    defaultMessage: 'Hair',
    id: 'e4YBbX',
  });
  const peculiaritiesLabel = intl.formatMessage({
    defaultMessage: 'Peculiarities',
    id: '9s+ZmX',
  });

  return (
    <>
      <Row gutter={10} align="middle">
        <Col>
          <Title style={{ marginBottom: 0 }} level={4}>
            {intl.formatMessage({
              id: 'j5X+WR',
              defaultMessage: 'Which profiles were involved?',
            })}
          </Title>
        </Col>
        <Col style={{ marginRight: 20 }}>
          <Paragraph
            style={{ marginBottom: 1 }}
            type={
              vehiclesData?.length > 0 || offendersData?.length > 0
                ? 'secondary'
                : 'danger'
            }
            italic={vehiclesData?.length > 0 || offendersData?.length > 0}
            strong={vehiclesData?.length === 0 && offendersData?.length === 0}
          >
            {intl.formatMessage({
              id: 'jum0CL',
              defaultMessage:
                '- Please add at least one offender that was involved in the incident',
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
                      id: 'w4XD3a',
                      defaultMessage: 'Add Existing Offender',
                    }),
                    key: '1',
                    icon: (
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        style={{ marginRight: 5 }}
                      />
                    ),
                    onClick: () => toggleAddExistingOffender(),
                  },
                  {
                    label: intl.formatMessage({
                      id: '58ir77',
                      defaultMessage: 'Create New Offender',
                    }),
                    key: '2',
                    icon: (
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: 5 }}
                      />
                    ),
                    onClick: () => toggleAddOffender(),
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
                id: 'xb54TN',
                defaultMessage: 'Offenders',
              })}
            </Button>
          </Dropdown>
        </Col>

        <Col>
          <Dropdown
            overlay={
              <Menu
                items={[
                  {
                    label: intl.formatMessage({
                      id: '0Q9dlW',
                      defaultMessage: 'Add Existing Vehicle',
                    }),
                    key: '1',
                    icon: (
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        style={{ marginRight: 5 }}
                      />
                    ),
                    onClick: () => toggleAddExistingVehicle(),
                  },
                  {
                    label: intl.formatMessage({
                      id: 'xiAZxN',
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
                id: 'r6wuJ3',
                defaultMessage: 'Vehicles',
              })}
            </Button>
          </Dropdown>
        </Col>
      </Row>

      <Row gutter={20} style={{ marginTop: 10 }}>
        <Col flex={1}>
          {(offendersData && offendersData.length > 0) ||
          (vehiclesData && vehiclesData.length > 0) ? (
            <>
              {offendersData && offendersData.length > 0 ? (
                <>
                  {/* <Title level={4} style={{ marginLeft: 20 }}>
                      Offenders
                    </Title> */}
                  <Divider>
                    {intl.formatMessage({
                      id: 'xb54TN',
                      defaultMessage: 'Offenders',
                    })}
                  </Divider>
                  <Table
                    size="small"
                    columns={[
                      {
                        key: 'reference',
                        dataIndex: 'reference',
                        title: intl.formatMessage({
                          id: 'k8ZNgH',
                          defaultMessage: 'Alert ID',
                        }),
                        width: 100,
                      },
                      {
                        key: 'images',
                        title: intl.formatMessage({
                          id: '+0zv6g',
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
                          return (
                            <Upload
                              action={
                                import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT
                              }
                              onChange={(info) =>
                                offenderImgChange(info, record.key)
                              }
                              accept=".png,.jpeg,.webp"
                              showUploadList={false}
                            >
                              <Button
                                icon={
                                  <FontAwesomeIcon
                                    icon={faUpload}
                                    style={{ marginRight: 5 }}
                                  />
                                }
                                style={{ color: 'red' }}
                              >
                                {intl.formatMessage({
                                  id: 'MntrZe',
                                  defaultMessage: 'Upload Image',
                                })}
                              </Button>
                            </Upload>
                          );
                        },
                      },

                      {
                        key: 'name',
                        title: intl.formatMessage({
                          id: 'HAlOn1',
                          defaultMessage: 'Name',
                        }),
                        dataIndex: 'name',
                      },
                      {
                        key: 'age',
                        title: intl.formatMessage({
                          id: '9oNQSC',
                          defaultMessage: 'Age',
                        }),
                        dataIndex: 'age',
                      },
                      {
                        key: 'build',
                        title: intl.formatMessage({
                          id: 'RSctv1',
                          defaultMessage: 'Build',
                        }),
                        dataIndex: 'build',
                      },
                      {
                        key: 'gender',
                        title: intl.formatMessage({
                          id: 'eWJHGp',
                          defaultMessage: 'Sex',
                        }),
                        dataIndex: 'gender',
                      },
                      {
                        key: 'race',
                        title: intl.formatMessage({
                          id: 'XtCAFo',
                          defaultMessage: 'Ethnicity',
                        }),
                        dataIndex: 'race',
                      },
                      // {
                      //   key: 'edit',
                      //   title: 'Edit',
                      //   dataIndex: '',
                      //   width: 50,
                      //   render: (_, record) => (
                      //     <Button
                      //       onClick={() => setEditOffenderId(record.key)}
                      //       disabled
                      //       icon={<FontAwesomeIcon icon={faEdit} />}
                      //     />
                      //   ),
                      // },
                      {
                        key: 'delete',
                        title: intl.formatMessage({
                          id: 'K3r6DQ',
                          defaultMessage: 'Delete',
                        }),
                        dataIndex: 'delete',
                        width: 50,
                        render: (_, record) => (
                          <Popconfirm
                            placement="topLeft"
                            title={intl.formatMessage({
                              id: 'ttuPSC',
                              defaultMessage: 'Remove the offender?',
                            })}
                            onConfirm={() => {
                              removeOffender(record.key);
                            }}
                            okText={intl.formatMessage({
                              id: 'a5msuh',
                              defaultMessage: 'Yes',
                            })}
                            cancelText={intl.formatMessage({
                              id: 'oUWADl',
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
                    dataSource={offendersData.map((offender) => ({
                      key: offender.id,
                      reference: offender.reference,
                      name: offender.name,
                      age: offender?.dateOfBirth
                        ? calcAge(offender?.dateOfBirth)
                        : getOffenderAge(offender?.age),
                      gender: getOffenderGender(offender.gender),
                      build: getOffenderBuild(offender.build),
                      race: getOffenderRace(offender.race),
                      images: offender.images,
                    }))}
                    pagination={
                      offendersData && offendersData.length > 5
                        ? {
                            pageSize: 5,
                          }
                        : false
                    }
                  />
                </>
              ) : null}

              {vehiclesData && vehiclesData.length > 0 ? (
                <>
                  <Divider>
                    {intl.formatMessage({
                      id: 'r6wuJ3',
                      defaultMessage: 'Vehicles',
                    })}
                  </Divider>
                  <Table
                    columns={[
                      {
                        key: 'reference',
                        dataIndex: 'reference',
                        title: intl.formatMessage({
                          id: 'k8ZNgH',
                          defaultMessage: 'Alert ID',
                        }),
                        width: 100,
                      },
                      {
                        key: 'images',
                        title: intl.formatMessage({
                          id: '+0zv6g',
                          defaultMessage: 'Image',
                        }),
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
                        title: intl.formatMessage({
                          id: 'qv7ied',
                          defaultMessage: 'Registration',
                        }),
                      },
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
                        title: intl.formatMessage({
                          id: 'K3r6DQ',
                          defaultMessage: 'Delete',
                        }),
                        dataIndex: 'delete',
                        width: 50,
                        render: (_, record) => (
                          <Popconfirm
                            placement="topLeft"
                            title={intl.formatMessage({
                              id: 'hHs0lD',
                              defaultMessage: 'Remove the vehicle?',
                            })}
                            onConfirm={() => {
                              onRemoveVehicle(record.key);
                            }}
                            okText={intl.formatMessage({
                              id: 'a5msuh',
                              defaultMessage: 'Yes',
                            })}
                            cancelText={intl.formatMessage({
                              id: 'oUWADl',
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
            </>
          ) : (
            <div>
              <Row gutter={8} style={{ marginBottom: 15 }}>
                <Col>
                  <Input
                    style={{ width: 600 }}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Search all existing offenders...',
                      id: 'leIGMx',
                    })}
                    value={searchOffenders}
                    onChange={(e) => setSearchOffenders(e.target.value)}
                  />
                </Col>
              </Row>
              {searchOffenders.length === 0 && (
                <Paragraph
                  style={{ fontSize: 14, fontWeight: 500 }}
                  type="secondary"
                >
                  {intl.formatMessage({
                    defaultMessage: `Recently Active Offenders`,
                    id: '3CqKJ0',
                  })}
                </Paragraph>
              )}
              {recentOffenderLoading ? (
                <Row gutter={8}>
                  {[1, 2, 3, 4].map((key) => (
                    <Col key={key}>
                      <Skeleton.Avatar
                        active
                        shape="square"
                        style={{
                          height: 120,
                          width: 120,
                          borderRadius: '0.625rem',
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              ) : (
                <Row
                  gutter={8}
                  style={{
                    overflow: 'auto',
                    flexWrap: 'nowrap',
                    marginBottom: 20,
                  }}
                >
                  {recentOffenderData?.listOffenders?.offenders.map(
                    (offender) => (
                      <Col key={offender.id}>
                        <Tooltip
                          placement="bottom"
                          title={intl.formatMessage(
                            {
                              defaultMessage: `Add {name} to incident`,
                              id: 'RZ0IMu',
                            },
                            { name: offender?.name }
                          )}
                        >
                          <Card
                            onClick={() => setAddRecentOffender(offender)}
                            bodyStyle={{
                              width: 120,
                              height: 120,
                              position: 'relative',
                              padding: 0,
                              borderRadius: '0.625rem',
                              overflow: 'hidden',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                            }}
                          >
                            <WatermarkImage
                              url={offender.images[0]?.optimised}
                              position={offender.images[0]?.position}
                            />
                            {/* {offender.images.length === 0 && (
                                <FontAwesomeIcon
                                  style={{ color: 'rgb(114, 132, 154)' }}
                                  icon={faUser}
                                  size="3x"
                                />
                              )} */}
                            <Paragraph
                              style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                background: 'rgba(0,0,0,.5)',
                                color: '#FFF',
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                margin: 0,
                                padding: '3px 10px 3px',
                              }}
                            >
                              {offender.name}
                            </Paragraph>
                          </Card>
                        </Tooltip>
                      </Col>
                    )
                  )}
                </Row>
              )}
            </div>
          )}
        </Col>
      </Row>

      <ProfileDrawer
        addExistingOffender={addExistingOffender}
        addExistingVehicle={addExistingVehicle}
        addNewVehicle={addNewVehicle}
        addOffender={addOffender}
        editOffenderId={editOffenderId}
        fromIncident
        offendersData={offendersData}
        setEditOffenderId={setEditOffenderId}
        toggleAddExistingOffender={toggleAddExistingOffender}
        toggleAddExistingVehicle={toggleAddExistingVehicle}
        toggleAddNewVehicle={toggleAddNewVehicle}
        toggleAddOffender={toggleAddOffender}
        updateOffender={updateOffender}
        vehiclesData={vehiclesData}
        onAddOffender={onAddOffender}
        onAddVehicle={onAddVehicle}
      />
      <Modal
        onCancel={() => setAddRecentOffender(null)}
        visible={addRecentOffender !== null}
        onOk={() => {
          if (addRecentOffender) onAddOffender(addRecentOffender, true);
          setAddRecentOffender(null);
        }}
        okText={intl.formatMessage({
          defaultMessage: 'Add to incident',
          id: 'd1U1M+',
        })}
        title={intl.formatMessage(
          {
            defaultMessage: 'Are you sure you want to add {name}?',
            id: 'CTToP/',
          },
          { name: addRecentOffender?.name }
        )}
        bodyStyle={{
          padding: 0,
        }}
      >
        <Row>
          {addRecentOffender && addRecentOffender.images.length > 0 && (
            <Col span={8}>
              <div
                style={{
                  width: 180,
                  height: 200,
                }}
              >
                <WatermarkImage
                  url={addRecentOffender?.images[0]?.optimised}
                  position={addRecentOffender?.images[0]?.position}
                />
              </div>
            </Col>
          )}

          <Col span={16} style={{ padding: '10px 20px' }}>
            <Descriptions column={1} size="small">
              <Descriptions.Item label={ageLabel}>
                {getOffenderAge(addRecentOffender?.age)}
              </Descriptions.Item>
              <Descriptions.Item label={buildLabel}>
                {getOffenderBuild(addRecentOffender?.build) ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                    id: '5jeq8P',
                  })}
              </Descriptions.Item>
              <Descriptions.Item label={ethnicityLabel}>
                {getOffenderRace(addRecentOffender?.race)}
              </Descriptions.Item>
              <Descriptions.Item label={sexLabel}>
                {getOffenderGender(addRecentOffender?.gender) ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                    id: '5jeq8P',
                  })}
              </Descriptions.Item>
              <Descriptions.Item label={hairLabel}>
                {addRecentOffender?.hair ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                    id: '5jeq8P',
                  })}
              </Descriptions.Item>
              <Descriptions.Item label={peculiaritiesLabel}>
                {addRecentOffender?.peculiarities ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                    id: '5jeq8P',
                  })}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default Profiles;
