import React from 'react';
import {
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  Input,
  Menu,
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
import {
  ListCrimeGroupsQuery,
  ListOffendersQuery,
  ListVehiclesQuery,
} from 'graphql/generated';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/es/upload/interface';

const { Title, Paragraph } = Typography;
type Offender = Exclude<
  ListOffendersQuery['listOffenders'],
  null | undefined
>['offenders'][0];
interface Props {
  titleOrder: number;
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
  offendersData: OffenderData[];
  searchOffenders: string;
  setSearchOffenders: (value: string) => void;
  setEditOffenderId: (arg0: string) => void;
  listOffendersData: ListOffendersQuery | undefined;
  recentOffenderData: ListOffendersQuery | undefined;
  recentOffenderLoading: boolean;
  removeOffender: (offenderId: string) => void;
  setAddRecentOffender: (value: Offender | null) => void;
  toggleAddExistingOffender: () => void;
  toggleAddOffender: () => void;
  offenderImgChange: (
    info: UploadChangeParam<UploadFile>,
    currentId: string
  ) => void;
}

const Profiles = ({
  titleOrder,
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
  offendersData,
  removeOffender,
  setEditOffenderId,
  toggleAddOffender,
  toggleAddExistingOffender,
  listOffendersData,
  recentOffenderData,
  recentOffenderLoading,
  setAddRecentOffender,
  searchOffenders,
  setSearchOffenders,
  offenderImgChange,
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
          - Please add the profiles that were involved in the incident.
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
                  disabled: !listOffendersData?.listOffenders?.total,
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
                            backgroundImage: `url(${offender.images[0]?.optimised})`,
                            backgroundSize: 'cover',
                            padding: 0,
                            borderRadius: '0.625rem',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                        >
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
  </>
);
export default Profiles;
