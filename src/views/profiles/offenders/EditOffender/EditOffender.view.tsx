import React from 'react';
import type {
  ImagePosition,
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
  Typography,
} from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import moment from 'moment';
import OffenderDetails from 'components/offenders/OffenderForm/OffenderDetails';
import type {
  BanData,
  CrimeGroupData,
  CustomGalleryData,
  TagData,
  VehicleData,
} from 'types/DataType';
import Profiles from 'components/offenders/OffenderForm/Profiles';
// import ProfileDrawer from 'components/offenders/OffenderForm/ProfileDrawer';
import NewOffenderAddress from 'components/form-components/addresses/NewOffenderAddress';
import EditOffenderAddress from 'components/form-components/addresses/EditOffenderAddress';
import OffenderExclusions from 'components/offenders/OffenderForm/OffenderExclusions';
import OffenderImage from 'components/offenders/OffenderForm/OffenderImage';
import type { BanType, FormData } from './useEditOffender';

const { Title, Paragraph } = Typography;

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

interface Image extends UploadFile {
  position?: ImagePosition;
  primary?: boolean;
  policeImage?: boolean;
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
  fileList: Image[];
  addExclusion: boolean;
  toggleAddExclusion: () => void;
  editExclusion: boolean;
  toggleEditExclusion: () => void;
  addOffenderTag: boolean;
  toggleAddOffenderTag: () => void;
  onAddVehicle: (data: VehicleData, existing: boolean) => void;
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

  form: FormInstance<FormData> | undefined;
  listVehiclesData: ListVehiclesQuery | undefined;
  vehiclesData: VehicleData[];
  onRemoveVehicle: (vehicleId: string) => void;
  crimeGroupsData: CrimeGroupData[];
  onValuesChange?: (changedValues: FormData, values: FormData) => void;
  idVerified: boolean;
  onSubmitAddress: (data: AddressForm) => void;
  addAddress: boolean;
  toggleAddAddress: () => void;
  editAddress: string | null;
  toggleEditAddress: (value: string | null) => void;
  onEditAddress: (data: EditAddressForm) => void;
  onDeleteAddress: (addressId: string) => void;
  onEditImage: (value: Image) => void;
  toggleEditImage: (value?: Image) => void;
  editImage: Image | null;
  onEditVehicle: (data: VehicleData) => void;
  onAddCrimeGroup: (value: CrimeGroupData) => void;
  onRemoveCrimeGroup: (crimeGroupId: string) => void;
  onRemoveImage: (imageId: string) => void;
  primaryImage: string;
  setPrimaryImage: (value: string) => void;
  customGalleries: { value: string; label: string }[];
  customGalleriesLoading: boolean;
  addCustomGallery: boolean;
  toggleAddCustomGallery: () => void;
  updateNewCustomGalleryData: (values: CustomGalleryData) => void;
  updateNewOffenderTagData: (values: TagData) => void;
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

  onAddVehicle,

  form,
  adminRights,
  vehiclesData,
  onRemoveVehicle,
  onEditVehicle,
  crimeGroupsData,
  listVehiclesData,
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
  editImage,
  onEditImage,
  toggleEditImage,
  onAddCrimeGroup,
  onRemoveCrimeGroup,
  onRemoveImage,
  primaryImage,
  setPrimaryImage,
  customGalleries,
  customGalleriesLoading,
  toggleAddCustomGallery,
  updateNewOffenderTagData,
  addCustomGallery,
  updateNewCustomGalleryData,
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
            alias: data?.offender?.alias || [],
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
            customGalleries:
              data?.offender?.customGalleries &&
              data.offender.customGalleries.length > 0
                ? data.offender.customGalleries.map(({ id }) => id)
                : [],
            idVerified: data?.offender?.idVerified || false,
            idSource: data?.offender?.idSource,
          }}
        >
          <Card>
            <OffenderDetails
              tags={tags}
              tagsLoading={tagsLoading}
              saving={saving}
              ageCheck={ageCheck}
              setAgeCheck={setAgeCheck}
              adminRights={adminRights}
              toggleAddOffenderTag={toggleAddOffenderTag}
              idVerified={idVerified}
              customGalleries={customGalleries}
              customGalleriesLoading={customGalleriesLoading}
              toggleAddCustomGallery={toggleAddCustomGallery}
              addOffenderTag={addOffenderTag}
              updateNewOffenderTagData={updateNewOffenderTagData}
              addCustomGallery={addCustomGallery}
              updateNewCustomGalleryData={updateNewCustomGalleryData}
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
              {addressesData && addressesData.length > 0 ? (
                <Table
                  size="small"
                  pagination={{
                    hideOnSinglePage: true,
                    defaultPageSize: 20,
                    pageSize: 20,
                  }}
                  columns={[
                    {
                      key: 'alias',
                      title: 'Label',
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
              ) : (
                <Row justify="start">
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="There are no addresses for this offender."
                    style={{ marginLeft: 150 }}
                  />
                </Row>
              )}
            </Card>
          )}
          {adminRights && (
            <Card>
              <Profiles
                saving={saving}
                vehiclesData={vehiclesData}
                onRemoveVehicle={onRemoveVehicle}
                onRemoveCrimeGroup={onRemoveCrimeGroup}
                crimeGroupsData={crimeGroupsData}
                listVehiclesData={listVehiclesData}
                // titleNumber={adminRights ? 3 : 2}
                titleNumber={3}
                onAddVehicle={onAddVehicle}
                onAddCrimeGroup={onAddCrimeGroup}
                onEditVehicle={onEditVehicle}
              />
            </Card>
          )}
          {adminRights && (
            <OffenderExclusions
              addExclusion={addExclusion}
              toggleAddExclusion={toggleAddExclusion}
              onAddExclusion={onAddExclusion}
              editExclusion={editExclusion}
              toggleEditExclusion={toggleEditExclusion}
              onUpdateExclusion={onUpdateExclusion}
              bansData={bansData}
              banData={banData}
              setBanData={setBanData}
              deleteConfirm={deleteConfirm}
              saving={saving}
              titleOrder={4}
              emptyDescription={
                "You haven't add any exclusion for this offender yet."
              }
            />
          )}
          <OffenderImage
            titleOrder={adminRights ? 5 : 2}
            imgChange={imgChange}
            onPreview={onPreview}
            beforeUpload={beforeUpload}
            fileList={fileList}
            editImage={editImage}
            onEditImage={onEditImage}
            toggleEditImage={toggleEditImage}
            onRemoveImage={onRemoveImage}
            primaryImage={primaryImage}
            setPrimaryImage={setPrimaryImage}
          />

          <Card>
            <>
              <Row align="bottom">
                <Col>
                  <Title style={{ marginBottom: 0 }} level={4}>
                    {adminRights ? 6 : 3}.
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
