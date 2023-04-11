import React from 'react';
import type {
  CreateTagMutation,
  ListVehiclesQuery,
  ViewOffenderQuery,
} from 'graphql/generated';

import type { FormInstance } from 'antd';
import {
  Button,
  Card,
  Col,
  Drawer,
  Empty,
  Form,
  PageHeader,
  Popconfirm,
  Row,
  Select,
  Skeleton,
  Table,
  Tag,
  Typography,
  Upload,
} from 'antd';

import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import {
  calcDuration,
  calcExpired,
} from 'utils/offender/get-offender-exclusion';
import type { MutationUpdaterFn } from '@apollo/client';
import AddExclusion from 'components/form-components/offender/exclusion/AddExclusion';
import EditExclusion from 'components/form-components/offender/exclusion/EditExclusion';

import AddOffenderTag from 'components/form-components/tags/offenderWarnings/AddOffenderWarning';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faPlus,
  faTrash,
  faUpload,
} from '@fortawesome/pro-light-svg-icons';
import moment from 'moment';
import OffenderDetails from 'components/offenders/OffenderForm/OffenderDetails';
import type { BanData, CrimeGroupData, VehicleData } from 'types/DataType';
import Profiles from 'components/offenders/OffenderForm/Profiles';
// import ProfileDrawer from 'components/offenders/OffenderForm/ProfileDrawer';
import NewOffenderAddress from 'components/form-components/addresses/NewOffenderAddress';
import EditOffenderAddress from 'components/form-components/addresses/EditOffenderAddress';
import type { FormData } from './useEditOffender';

const { Title, Text, Paragraph } = Typography;

interface AddressForm {
  alias: string;
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
}

interface AddressesData {
  id: string;
  alias: string;
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
}

interface EditAddressForm {
  id: string;
  alias: string;
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
}

// interface BanType {
//   id: string;
//   endDate: Date;
//   startDate: Date;
//   location: string;
//   description?: string | null;
//   new: boolean;
//   updated: boolean;
//   deleted: boolean;
// }
interface BanType extends BanData {
  new: boolean;
  updated: boolean;
  deleted: boolean;
}

interface Props {
  onSubmit: (value: FormData) => void;
  data: ViewOffenderQuery | undefined;
  loading: boolean;
  saving: boolean;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  imgChange: UploadProps['onChange'];
  onPreview: (value: UploadFile) => void;
  beforeUpload: (value: RcFile) => void;
  fileList: UploadFile[];
  addExclusion: boolean;
  toggleAddExclusion: () => void;
  editExclusion: boolean;
  toggleEditExclusion: () => void;
  addOffenderTag: boolean;
  toggleAddOffenderTag: () => void;
  updateOffenderTag: MutationUpdaterFn<CreateTagMutation>;
  onUpdateExclusion: (value: BanData) => void;
  onAddExclusion: (value: BanData) => void;
  setBanData: (value: BanType) => void;
  bansData: BanType[];
  banData: BanType | null;
  addressesData: AddressesData[] | null;
  deleteConfirm: (value: string) => void;
  ageCheck: boolean;
  setAgeCheck: (value: boolean) => void;
  reviewed: boolean;
  onReject: () => void;
  adminRights: boolean;
  selectedItems: string[];
  setSelectedItems: (value: string[]) => void;
  form: FormInstance<FormData> | undefined;
  listVehiclesData: ListVehiclesQuery | undefined;
  // listCrimeGroupsData: ListCrimeGroupsQuery | undefined;
  addNewVehicle: boolean;
  addExistingVehicle: boolean;
  toggleAddNewVehicle: () => void;
  toggleAddExistingVehicle: () => void;
  editVehicleId: string;
  setEditVehicleId: (value: string) => void;
  vehiclesData: VehicleData[];
  updateVehiclesData: (value: VehicleData) => void;
  removeVehicle: (vehicleId: string) => void;
  removeCrimeGroup: (crimeGroupId: string) => void;
  addNewCrimeGroup: boolean;
  addExistingCrimeGroup: boolean;
  toggleAddNewCrimeGroup: () => void;
  toggleAddExistingCrimeGroup: () => void;
  editCrimeGroupId: string;
  setEditCrimeGroupId: (value: string) => void;
  crimeGroupsData: CrimeGroupData[];
  updateCrimeGroupsData: (value: CrimeGroupData) => void;
  onValuesChange?: (changedValues: FormData, values: FormData) => void;
  idVerified: boolean;
  onSubmitAddress: (data: AddressForm) => void;
  addAddress: boolean;
  toggleAddAddress: () => void;
  editAddress: string | null;
  toggleEditAddress: (value: string | null) => void;
  onEditAddress: (data: EditAddressForm) => void;
  onDeleteAddress: (addressId: string) => void;
}

const EditOffender = ({
  onSubmit,
  data,
  loading,
  saving,
  groups,
  groupsLoading,
  tags,
  tagsLoading,
  imgChange,
  onPreview,
  beforeUpload,
  fileList,
  addOffenderTag,
  toggleAddOffenderTag,
  updateOffenderTag,
  addExclusion,
  toggleAddExclusion,
  editExclusion,
  toggleEditExclusion,
  banData,
  bansData,
  onAddExclusion,
  onUpdateExclusion,
  setBanData,
  deleteConfirm,
  ageCheck,
  setAgeCheck,
  reviewed,
  onReject,
  selectedItems,
  setSelectedItems,
  form,
  adminRights,
  addNewVehicle,
  addExistingVehicle,
  editVehicleId,
  setEditVehicleId,
  toggleAddNewVehicle,
  toggleAddExistingVehicle,
  vehiclesData,
  updateVehiclesData,
  removeVehicle,
  addNewCrimeGroup,
  addExistingCrimeGroup,
  editCrimeGroupId,
  setEditCrimeGroupId,
  toggleAddNewCrimeGroup,
  toggleAddExistingCrimeGroup,
  crimeGroupsData,
  updateCrimeGroupsData,
  removeCrimeGroup,
  listVehiclesData,
  // listCrimeGroupsData,
  onValuesChange,
  idVerified,
  addAddress,
  toggleAddAddress,
  onSubmitAddress,
  addressesData,
  editAddress,
  toggleEditAddress,
  onDeleteAddress,
  onEditAddress,
}: Props): JSX.Element => (
  <div className="list-view">
    <PageHeader
      onBack={() => window.history.back()}
      title={reviewed ? 'Review Offender' : 'Edit Offender'}
    />
    {loading ? (
      <Skeleton />
    ) : (
      <>
        <Form
          onFinish={onSubmit}
          onValuesChange={onValuesChange}
          layout="vertical"
          form={form}
          initialValues={{
            name: data?.offender?.name || null,
            age: data?.offender?.age || null,
            gender: data?.offender?.gender || null,
            race: data?.offender?.race || null,
            build: data?.offender?.build || null,
            hair: data?.offender?.hair || null,
            ageCheck: !!data?.offender?.dateOfBirth,
            peculiarities: data?.offender?.peculiarities || null,
            dateOfBirth: data?.offender?.dateOfBirth
              ? moment(data?.offender?.dateOfBirth, 'YYYY-MM-DD')
              : null,
            dateSource: data?.offender?.dateSource || null,
            groups:
              data?.offender?.groups && data?.offender?.groups.length > 0
                ? data?.offender?.groups.map(({ id }) => id)
                : [],
            tags:
              data?.offender?.tags && data?.offender?.tags.length > 0
                ? data?.offender?.tags.map(({ id }) => id)
                : [],
            idVerified: data?.offender?.idVerified || false,
            idSource: data?.offender?.idSource,
          }}
        >
          <Card>
            <OffenderDetails
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              tags={tags}
              tagsLoading={tagsLoading}
              saving={saving}
              ageCheck={ageCheck}
              setAgeCheck={setAgeCheck}
              adminRights={adminRights}
              toggleAddOffenderTag={toggleAddOffenderTag}
              idVerified={idVerified}
            />
          </Card>
          {adminRights && (
            <Card>
              <Row align="middle" style={{ marginBottom: 20 }}>
                <Col>
                  <Title style={{ marginBottom: 0 }} level={4}>
                    2.
                  </Title>
                </Col>
                <Col>
                  <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                    Addresses
                  </Title>
                </Col>
                {adminRights && (
                  <>
                    <Col style={{ marginRight: 5 }}>
                      <Paragraph
                        style={{ marginBottom: 1, marginLeft: 5 }}
                        type="secondary"
                        italic
                      >
                        - Add any of the known addresses for the offender.
                      </Paragraph>
                    </Col>
                    <Col>
                      <Button
                        disabled={saving}
                        onClick={toggleAddAddress}
                        style={{ marginTop: -30, marginLeft: 15, color: 'red' }}
                        icon={
                          <FontAwesomeIcon
                            icon={faPlus}
                            style={{ marginRight: 5 }}
                          />
                        }
                      >
                        Add Address
                      </Button>
                    </Col>
                  </>
                )}
              </Row>
              <Table
                size="small"
                pagination={{
                  defaultPageSize: 20,
                  pageSize: 20,
                }}
                columns={[
                  {
                    key: 'alias',
                    title: 'Alias',
                    dataIndex: 'alias',
                  },
                  {
                    key: 'street',
                    title: 'Street',
                    dataIndex: 'street',
                  },
                  {
                    key: 'townCity',
                    title: 'City',
                    dataIndex: 'townCity',
                  },
                  {
                    key: 'county',
                    title: 'County',
                    dataIndex: 'county',
                  },
                  {
                    key: 'postcode',
                    title: 'Postcode',
                    dataIndex: 'postcode',
                  },
                  {
                    key: 'Edit',
                    title: 'Edit',
                    width: 50,
                    dataIndex: 'Edit',
                    render: (_, record) => (
                      <Button
                        disabled={saving}
                        onClick={() => toggleEditAddress(record.key)}
                        icon={<FontAwesomeIcon icon={faPenToSquare} />}
                      />
                    ),
                  },
                  {
                    key: 'Delete',
                    title: 'Delete',
                    dataIndex: 'Delete',
                    width: 60,
                    render: (_, record) => (
                      <Popconfirm
                        title="Are you sure?"
                        okText="Delete"
                        onConfirm={() => onDeleteAddress(record.key)}
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
                dataSource={
                  addressesData?.map((address) => ({
                    key: address.id,
                    alias: address.alias,
                    street: address.street,
                    townCity: address.townCity,
                    county: address.county,
                    postcode: address.postcode,
                  })) || []
                }
              />
            </Card>
          )}
          <Card>
            <Profiles
              saving={saving}
              // adminRights={adminRights}
              setEditVehicleId={setEditVehicleId}
              toggleAddNewVehicle={toggleAddNewVehicle}
              toggleAddExistingVehicle={toggleAddExistingVehicle}
              vehiclesData={vehiclesData}
              removeVehicle={removeVehicle}
              removeCrimeGroup={removeCrimeGroup}
              // setEditCrimeGroupId={setEditCrimeGroupId}
              toggleAddNewCrimeGroup={toggleAddNewCrimeGroup}
              toggleAddExistingCrimeGroup={toggleAddExistingCrimeGroup}
              crimeGroupsData={crimeGroupsData}
              listVehiclesData={listVehiclesData}
              // listCrimeGroupsData={listCrimeGroupsData}
              titleNumber={adminRights ? 3 : 2}
              addNewVehicle={addNewVehicle}
              addExistingVehicle={addExistingVehicle}
              editVehicleId={editVehicleId}
              updateVehiclesData={updateVehiclesData}
              addNewCrimeGroup={addNewCrimeGroup}
              addExistingCrimeGroup={addExistingCrimeGroup}
              editCrimeGroupId={editCrimeGroupId}
              setEditCrimeGroupId={setEditCrimeGroupId}
              updateCrimeGroupsData={updateCrimeGroupsData}
            />
          </Card>
          <Card>
            <Row align="middle" style={{ marginBottom: 20 }}>
              <Col>
                <Title style={{ marginBottom: 0 }} level={4}>
                  {adminRights ? 4 : 3}.
                </Title>
              </Col>
              <Col>
                <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                  Exclusions
                </Title>
              </Col>
              <Col style={{ marginRight: 5 }}>
                <Paragraph
                  style={{ marginBottom: 1, marginLeft: 5 }}
                  type="secondary"
                  italic
                >
                  - Create exclusions for this offender to exclusion them from
                  areas or premises.
                </Paragraph>
              </Col>
              <Col>
                <Button
                  disabled={saving}
                  onClick={toggleAddExclusion}
                  style={{ marginTop: -30, marginLeft: 15, color: 'red' }}
                  icon={
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                  }
                >
                  Add Exclusion
                </Button>
              </Col>
            </Row>

            {bansData && bansData.length > 0 ? (
              <Row gutter={20}>
                <Col>
                  <Table
                    size="small"
                    pagination={{
                      defaultPageSize: 20,
                      pageSize: 20,
                    }}
                    columns={[
                      {
                        key: 'duration',
                        title: 'Duration',
                        dataIndex: 'duration',
                        width: 350,
                        render: (value, record) => (
                          <>
                            <Text>{value}</Text>
                            {calcExpired(new Date(record.endDate)) && (
                              <Tag
                                color="red"
                                style={{
                                  marginLeft: 10,
                                }}
                              >
                                EXPIRED
                              </Tag>
                            )}
                          </>
                        ),
                      },

                      {
                        key: 'activeDay',
                        title: 'Active Days',
                        dataIndex: 'activeDay',
                        width: 150,
                      },
                      {
                        key: 'location',
                        title: 'Location',
                        dataIndex: 'location',
                        ellipsis: true,
                      },
                      {
                        key: 'description',
                        title: 'Description',
                        dataIndex: 'description',
                        ellipsis: true,
                      },
                      {
                        key: 'type',
                        title: 'Type',
                        dataIndex: 'type',
                      },
                      {
                        key: 'Edit',
                        title: 'Edit',
                        width: 50,
                        dataIndex: 'Edit',
                        render: (_, record) => (
                          <Button
                            disabled={saving}
                            onClick={() => {
                              setBanData(record.item);
                              toggleEditExclusion();
                            }}
                            icon={<FontAwesomeIcon icon={faPenToSquare} />}
                          />
                        ),
                      },
                      {
                        key: 'Delete',
                        title: 'Delete',
                        dataIndex: 'Delete',
                        width: 60,
                        render: (_, record) => (
                          <Button
                            disabled={saving}
                            onClick={() => {
                              deleteConfirm(record.key || '');
                            }}
                            icon={<FontAwesomeIcon icon={faTrash} />}
                          />
                        ),
                      },
                    ]}
                    dataSource={bansData.map((ban) => ({
                      endDate: ban.endDate,
                      key: ban.id,
                      item: ban,
                      duration: `${new Date(
                        ban?.startDate
                      ).toDateString()}  -->  ${new Date(
                        ban?.endDate
                      ).toDateString()}`,
                      activeDay: calcDuration(
                        new Date(ban?.startDate),
                        new Date(ban?.endDate)
                      ),
                      location: ban.location,
                      description: ban.description,
                      type: ban.type,
                    }))}
                  />
                </Col>
              </Row>
            ) : (
              <>
                <Row justify="start">
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="There are no exclusion for this offender."
                    style={{ marginLeft: 50 }}
                  />
                </Row>
                {/* <Divider /> */}
              </>
            )}
          </Card>
          <Card>
            <Row>
              <Col>
                <Row align="middle" style={{ marginBottom: 20 }}>
                  <Col>
                    <Title style={{ marginBottom: 0 }} level={4}>
                      {adminRights ? 5 : 4}.{' '}
                    </Title>
                  </Col>
                  <Col>
                    <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                      Images
                    </Title>
                  </Col>
                  <Col>
                    <Paragraph
                      style={{ marginBottom: 1, marginLeft: 5 }}
                      type="secondary"
                      italic
                    >
                      - Please add any images that you have of the offender.
                    </Paragraph>
                  </Col>
                  <Col style={{ marginLeft: 30 }}>
                    <Upload
                      action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT}
                      fileList={fileList}
                      onChange={imgChange}
                      beforeUpload={beforeUpload}
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
                  </Col>
                </Row>

                <Form.Item name="images">
                  <Upload
                    action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT}
                    listType="picture-card"
                    fileList={fileList}
                    onChange={imgChange}
                    onPreview={onPreview}
                    beforeUpload={beforeUpload}
                    accept=".png,.jpeg,.webp"
                  >
                    {fileList.length < 10 && '+ Upload'}
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card>
            {groups.length > 1 && (
              <>
                <Row align="bottom">
                  <Col>
                    <Title style={{ marginBottom: 0 }} level={4}>
                      {adminRights ? 6 : 5}.{' '}
                    </Title>
                  </Col>
                  <Col>
                    <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                      Who is it visible to?
                    </Title>
                  </Col>
                  <Col>
                    <Paragraph
                      style={{ marginBottom: 1, marginLeft: 5 }}
                      type="secondary"
                      italic
                    >
                      - Please select the groups that this incident is for
                    </Paragraph>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Form.Item
                      name="groups"
                      label="Groups"
                      tooltip="Select the groups that you would like this offender to be visible to."
                      rules={[
                        {
                          required: true,
                          message:
                            'Please select at least one group for the offender.',
                        },
                      ]}
                    >
                      <Select
                        loading={groupsLoading}
                        disabled={saving}
                        mode="multiple"
                        maxTagCount={3}
                      >
                        {groups.map((group) => (
                          <Select.Option key={group.value} value={group.value}>
                            {group.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
          </Card>

          <Form.Item>
            <Row style={{ marginTop: 30 }} gutter={10} justify="end">
              <Col>
                <Button
                  disabled={saving}
                  onClick={() =>
                    reviewed ? onReject() : window.history.back()
                  }
                >
                  {reviewed ? 'Reject' : 'Cancel'}
                </Button>
              </Col>
              <Col>
                <Button
                  disabled={saving}
                  loading={saving}
                  type="primary"
                  htmlType="submit"
                >
                  {reviewed ? 'Approve' : 'Save'}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
        <Drawer
          title="Add Offender Warning"
          visible={addOffenderTag}
          width="400"
          onClose={toggleAddOffenderTag}
        >
          {addOffenderTag ? (
            <AddOffenderTag
              update={updateOffenderTag}
              onClose={toggleAddOffenderTag}
            />
          ) : (
            <div />
          )}
        </Drawer>
        <Drawer
          title="Add Exclusion"
          visible={addExclusion}
          width="400"
          onClose={toggleAddExclusion}
        >
          {addExclusion ? (
            <AddExclusion
              update={onAddExclusion}
              onClose={toggleAddExclusion}
              // offenderId={data?.offender?.id}
            />
          ) : (
            <div />
          )}
        </Drawer>
        <Drawer
          title="Edit Exclusion"
          visible={editExclusion}
          width="400"
          onClose={toggleEditExclusion}
        >
          {editExclusion ? (
            <EditExclusion
              update={onUpdateExclusion}
              onClose={toggleEditExclusion}
              banData={banData}
            />
          ) : (
            <div />
          )}
        </Drawer>
        <Drawer
          title="Add Address"
          visible={addAddress}
          width="600"
          onClose={toggleAddAddress}
        >
          {addAddress && (
            <NewOffenderAddress
              onClose={toggleAddAddress}
              onSubmit={onSubmitAddress}
            />
          )}
        </Drawer>
        <Drawer
          title="Edit Address"
          visible={editAddress !== null}
          width="600"
          onClose={() => toggleEditAddress(null)}
        >
          {editAddress && (
            <EditOffenderAddress
              onClose={() => toggleEditAddress(null)}
              onSubmit={onEditAddress}
              data={addressesData?.find(({ id }) => id === editAddress)}
            />
          )}
        </Drawer>
      </>
    )}
  </div>
);
export default EditOffender;
