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
  faEdit,
  faMagnifyingGlass,
  faPlus,
  faTrash,
  faUpload,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import { CrimeGroupData, OffenderData, VehicleData } from 'types/DataType';
import {
  calcAge,
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import { ListOffendersQuery } from 'graphql/generated';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/es/upload/interface';
import ProfileDrawer from 'components/incidents/IncidentForm/ProfileDrawer';
import WatermarkImage from 'components/images/WatermarkImage.view';

const { Title, Paragraph } = Typography;
type Offender = Exclude<
  ListOffendersQuery['listOffenders'],
  null | undefined
>['offenders'][0];
interface Props {
  addExistingCrimeGroup: boolean;
  addExistingOffender: boolean;
  addExistingVehicle: boolean;
  addNewCrimeGroup: boolean;
  addNewVehicle: boolean;
  addOffender: boolean;
  addRecentOffender: Offender | null;
  crimeGroupsData: CrimeGroupData[];
  editCrimeGroupId: string;
  editOffenderId: string;
  editVehicleId: string;
  offenderImgChange: (
    info: UploadChangeParam<UploadFile>,
    currentId: string
  ) => void;
  offendersData: OffenderData[];
  recentOffenderData: ListOffendersQuery | undefined;
  recentOffenderLoading: boolean;
  removeCrimeGroup: (crimeGroupId: string) => void;
  removeOffender: (offenderId: string) => void;
  removeVehicle: (vehicleId: string) => void;
  saving: boolean;
  searchOffenders: string;
  setAddRecentOffender: (value: Offender | null) => void;
  setEditCrimeGroupId: (value: string) => void;
  setEditOffenderId: (value: string) => void;
  setEditVehicleId: (value: string) => void;
  setSearchOffenders: (value: string) => void;
  titleOrder: number;
  toggleAddExistingCrimeGroup: () => void;
  toggleAddExistingOffender: () => void;
  toggleAddExistingVehicle: () => void;
  toggleAddNewCrimeGroup: () => void;
  toggleAddNewVehicle: () => void;
  toggleAddOffender: () => void;
  updateCrimeGroupsData: (value: CrimeGroupData) => void;
  updateOffender: (value: OffenderData) => void;
  updateOffendersData: (value: OffenderData) => void;
  updateVehiclesData: (value: VehicleData) => void;
  vehiclesData: VehicleData[];
}

const Profiles = ({
  titleOrder,
  saving,
  toggleAddNewVehicle,
  toggleAddExistingVehicle,
  setEditVehicleId,
  vehiclesData,
  removeVehicle,
  toggleAddNewCrimeGroup,
  toggleAddExistingCrimeGroup,
  crimeGroupsData,
  removeCrimeGroup,
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
  addExistingCrimeGroup,
  addExistingOffender,
  addExistingVehicle,
  addNewCrimeGroup,
  addNewVehicle,
  addOffender,
  addRecentOffender,
  editCrimeGroupId,
  editOffenderId,
  editVehicleId,
  setEditCrimeGroupId,
  updateCrimeGroupsData,
  updateOffender,
  updateOffendersData,
  updateVehiclesData,
}: Props): JSX.Element => (
  <>
    <Row gutter={10} align="middle">
      <Col>
        <Title style={{ marginBottom: 0 }} level={4}>
          {`${titleOrder}.`}
        </Title>
      </Col>
      <Col>
        <Title style={{ marginBottom: 0 }} level={4}>
          Which profiles were involved?
        </Title>
      </Col>
      <Col style={{ marginRight: 20 }}>
        <Paragraph style={{ marginBottom: 1 }} type="secondary" italic>
          - Please add at least one profile that was involved in the incident.
        </Paragraph>
      </Col>
      <Col>
        <Dropdown
          overlay={
            <Menu
              items={[
                {
                  label: 'Add Existing Offenders',
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
                  label: 'Create New Offender',
                  key: '2',
                  icon: (
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                  ),
                  onClick: () => toggleAddOffender(),
                },
              ]}
            />
          }
        >
          <Button
            style={{ color: 'red' }}
            icon={<FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />}
          >
            Offenders
          </Button>
        </Dropdown>
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
        {(offendersData && offendersData.length) ||
        (vehiclesData && vehiclesData.length) ||
        (crimeGroupsData && crimeGroupsData.length) ? (
          <>
            {offendersData && offendersData.length ? (
              <>
                {/* <Title level={4} style={{ marginLeft: 20 }}>
                  Offenders
                </Title> */}
                <Divider>Offenders</Divider>
                <Table
                  size="small"
                  pagination={{
                    defaultPageSize: 20,
                    pageSize: 20,
                  }}
                  // title="Offenders"
                  columns={[
                    {
                      key: 'images',
                      title: '',
                      dataIndex: 'images',
                      width: 150,
                      render: (
                        _,
                        record
                        // images?: { id: string; optimised: string }[],
                      ) => {
                        if (record.images && record.images.length) {
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
                              Upload Image
                            </Button>
                          </Upload>
                        );
                      },
                    },
                    {
                      key: 'name',
                      title: 'Name',
                      dataIndex: 'name',
                    },
                    {
                      key: 'age',
                      title: 'Age',
                      dataIndex: 'age',
                    },
                    {
                      key: 'build',
                      title: 'Build',
                      dataIndex: 'build',
                    },
                    {
                      key: 'gender',
                      title: 'Sex',
                      dataIndex: 'gender',
                    },
                    {
                      key: 'race',
                      title: 'Ethnicity',
                      dataIndex: 'race',
                    },
                    {
                      key: 'edit',
                      title: 'Edit',
                      dataIndex: '',
                      width: 50,
                      render: (_, record) => (
                        <Button
                          onClick={() => setEditOffenderId(record.key)}
                          disabled
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
                          title="Remove the offender?"
                          onConfirm={() => {
                            removeOffender(record.key);
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
                  dataSource={offendersData.map((offender) => ({
                    key: offender.id,
                    name: offender.name,
                    age: offender?.dateOfBirth
                      ? calcAge(offender?.dateOfBirth)
                      : getOffenderAge(offender?.age),
                    gender: getOffenderGender(offender.gender),
                    build: getOffenderBuild(offender.build),
                    race: getOffenderRace(offender.race),
                    images: offender.images,
                  }))}
                />
              </>
            ) : null}

            {crimeGroupsData && crimeGroupsData.length ? (
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
                    {
                      key: 'edit',
                      title: 'Edit',
                      dataIndex: '',
                      width: 50,
                      render: (_, record) => (
                        <Button
                          onClick={() => setEditVehicleId(record.key)}
                          disabled
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
                    alias: crimeGroup.alias,
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
                      key: 'edit',
                      title: 'Edit',
                      dataIndex: '',
                      width: 50,
                      render: (_, record) => (
                        <Button
                          onClick={() => setEditVehicleId(record.key)}
                          disabled
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
          <div>
            <Row gutter={8} style={{ marginBottom: 15 }}>
              <Col>
                <Input
                  style={{ width: 600 }}
                  placeholder="Search all existing offenders... "
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
                Recently Active Offenders
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
                        title={`Add ${offender.name} to incident`}
                      >
                        <Card
                          onClick={() => setAddRecentOffender(offender)}
                          className="offender-card"
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
                          <WatermarkImage url={offender.images[0]?.optimised} />
                          {offender.images.length === 0 && (
                            <FontAwesomeIcon
                              style={{ color: 'rgb(114, 132, 154)' }}
                              icon={faUser}
                              size="3x"
                            />
                          )}
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
      addExistingCrimeGroup={addExistingCrimeGroup}
      addExistingOffender={addExistingOffender}
      addExistingVehicle={addExistingVehicle}
      addNewCrimeGroup={addNewCrimeGroup}
      addNewVehicle={addNewVehicle}
      addOffender={addOffender}
      crimeGroupsData={crimeGroupsData}
      editCrimeGroupId={editCrimeGroupId}
      editOffenderId={editOffenderId}
      editVehicleId={editVehicleId}
      isIncident
      offendersData={offendersData}
      setEditCrimeGroupId={setEditCrimeGroupId}
      setEditOffenderId={setEditOffenderId}
      setEditVehicleId={setEditVehicleId}
      toggleAddExistingCrimeGroup={toggleAddExistingCrimeGroup}
      toggleAddExistingOffender={toggleAddExistingOffender}
      toggleAddExistingVehicle={toggleAddExistingVehicle}
      toggleAddNewCrimeGroup={toggleAddNewCrimeGroup}
      toggleAddNewVehicle={toggleAddNewVehicle}
      toggleAddOffender={toggleAddOffender}
      updateCrimeGroupsData={updateCrimeGroupsData}
      updateOffender={updateOffender}
      updateOffendersData={updateOffendersData}
      updateVehiclesData={updateVehiclesData}
      vehiclesData={vehiclesData}
    />
    <Modal
      onCancel={() => setAddRecentOffender(null)}
      visible={addRecentOffender !== null}
      onOk={() => {
        if (addRecentOffender) updateOffendersData(addRecentOffender);
        setAddRecentOffender(null);
      }}
      okText="Add to incident"
      title={`Are you sure you want to add ${addRecentOffender?.name}?`}
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
              <WatermarkImage url={addRecentOffender?.images[0]?.optimised} />
            </div>
          </Col>
        )}

        <Col span={16} style={{ padding: '10px 20px' }}>
          <Descriptions column={1} size="small">
            <Descriptions.Item label="Age">
              {getOffenderAge(addRecentOffender?.age)}
            </Descriptions.Item>
            <Descriptions.Item label="Build">
              {getOffenderBuild(addRecentOffender?.build) || 'Unknown'}
            </Descriptions.Item>
            <Descriptions.Item label="Ethnicity">
              {getOffenderRace(addRecentOffender?.race)}
            </Descriptions.Item>
            <Descriptions.Item label="Sex">
              {getOffenderGender(addRecentOffender?.gender) || 'Unknown'}
            </Descriptions.Item>
            <Descriptions.Item label="Hair">
              {addRecentOffender?.hair || 'Unknown'}
            </Descriptions.Item>
            <Descriptions.Item label="Peculiarities">
              {addRecentOffender?.peculiarities || 'Unknown'}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Modal>
  </>
);
export default Profiles;
