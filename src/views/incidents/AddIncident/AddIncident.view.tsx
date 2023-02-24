import React from 'react';
import {
  AddressesQuery,
  CreateTagMutation,
  ListCrimeGroupsQuery,
  ListOffendersQuery,
  ListVehiclesQuery,
} from 'graphql/generated';

import {
  Button,
  Card,
  Col,
  Descriptions,
  Drawer,
  Form,
  FormInstance,
  Input,
  Modal,
  PageHeader,
  Row,
  Select,
  Skeleton,
  Typography,
} from 'antd';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { MutationUpdaterFn } from '@apollo/client';
import AddIncidentTag from 'components/form-components/tags/crimeTypes/AddCrimeType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlus } from '@fortawesome/pro-light-svg-icons';
import moment from 'moment';
import AddNewLocation from 'components/form-components/incident/location/AddLocation';
import AddPreviousLocation from 'components/form-components/incident/location/AddPreviousLocation';
import AssignImageOffender from 'components/form-components/incident/image/AssignImageOffenders';
import { UploadChangeParam } from 'antd/lib/upload';
import IncidentDetails from 'components/incidents/IncidentForm/IncidentDetails';
import {
  CrimeGroupData,
  LocationData,
  OffenderData,
  VehicleData,
} from 'types/DataType';
import Profiles from 'components/incidents/IncidentForm/Profiles';
import ImageSection from 'components/incidents/IncidentForm/ImageSection';
import ProfileDrawer from 'components/incidents/IncidentForm/ProfileDrawer';

const { Title, Paragraph } = Typography;

type Offender = Exclude<
  ListOffendersQuery['listOffenders'],
  null | undefined
>['offenders'][0];

interface FormData {
  subject: string;
  description: string;
  date: Date;
  value?: number;
  recoveredValue?: number;
  policeReported?: boolean;
  policeInvolved?: boolean;
  policeRef?: string;
  fullAddress: string;
  groups: string[];
  tags: string[];
  images?: { id: string; url: string; optimised: string }[];
}

interface Image extends UploadFile {
  offenders?: {
    id: string;
    name?: string | undefined | null;
  }[];
}

interface Props {
  addExistingOffender: boolean;
  addIncidentTag: boolean;
  addNewLocation: boolean;
  addOffender: boolean;
  addPreviousLocation: boolean;
  addRecentOffender: Offender | null;
  addressLoading: boolean;
  adminRights: boolean;
  assignOffendersToImages: (data: {
    image: Image;
    offenders: OffenderData[];
  }) => void;
  beforeUpload: (value: RcFile) => void;
  fileList: Image[];
  form: FormInstance<FormData>;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  imgChange: UploadProps['onChange'];
  listOffendersData: ListOffendersQuery | undefined;
  newImage: Image | null;
  offenderImgChange: (
    info: UploadChangeParam<UploadFile>,
    currentId: string
  ) => void;
  offendersData: OffenderData[];
  onCancelNewImage: () => void;
  onSubmit: (value: FormData) => void;
  primaryAddress:
    | Exclude<AddressesQuery['addresses'], undefined | null>[0]
    | undefined;
  recentOffenderData: ListOffendersQuery | undefined;
  recentOffenderLoading: boolean;
  removeImage: (uid: string) => void;
  removeImageFromOffender: (data: { image: Image; offenderId: string }) => void;
  removeOffender: (offenderId: string) => void;
  saving: boolean;
  searchOffenders: string;
  editOffenderId: string;
  setAddRecentOffender: (value: Offender | null) => void;
  setAssignToImage: (image: Image) => void;
  setSearchOffenders: (value: string) => void;
  setEditOffenderId: (arg0: string) => void;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  toggleAddIncidentTag: () => void;
  toggleAddNewLocation: () => void;
  toggleAddExistingOffender: () => void;
  toggleAddOffender: () => void;
  toggleAddPreviousLocation: () => void;
  updateIncidentTag: MutationUpdaterFn<CreateTagMutation>;
  updateNewLocation: (value: LocationData | undefined) => void;
  updateOffender: (value: OffenderData) => void;
  updateOffendersData: (value: OffenderData) => void;
  updatePreviousLocation: (value: string | undefined) => void;
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
  listVehiclesData: ListVehiclesQuery | undefined;
  listCrimeGroupsData: ListCrimeGroupsQuery | undefined;
}

const EditIncident = ({
  onSubmit,
  listVehiclesData,
  listCrimeGroupsData,
  saving,
  groups,
  groupsLoading,
  tags,
  tagsLoading,
  primaryAddress,
  addressLoading,
  imgChange,
  fileList,
  beforeUpload,
  addIncidentTag,
  toggleAddIncidentTag,
  updateIncidentTag,
  addOffender,
  toggleAddOffender,
  addExistingOffender,
  toggleAddExistingOffender,
  updateOffendersData,
  offendersData,
  addPreviousLocation,
  toggleAddPreviousLocation,
  updatePreviousLocation,
  addNewLocation,
  toggleAddNewLocation,
  updateNewLocation,
  form,
  recentOffenderData,
  recentOffenderLoading,
  addRecentOffender,
  setAddRecentOffender,
  searchOffenders,
  setSearchOffenders,
  newImage,
  onCancelNewImage,
  assignOffendersToImages,
  setAssignToImage,
  removeImageFromOffender,
  removeImage,
  removeOffender,
  adminRights,
  listOffendersData,
  offenderImgChange,
  editOffenderId,
  setEditOffenderId,
  updateOffender,
  addNewVehicle,
  addExistingVehicle,
  editVehicleId,
  toggleAddNewVehicle,
  toggleAddExistingVehicle,
  setEditVehicleId,
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
}: Props): JSX.Element => (
  <div className="page-view">
    <PageHeader onBack={() => window.history.back()} title="Add Incident" />
    <Card>
      <Form<FormData>
        form={form}
        initialValues={{
          fullAddress: primaryAddress?.full,
          date: moment(),
        }}
        onFinish={onSubmit}
        layout="vertical"
      >
        <IncidentDetails
          tags={tags}
          tagsLoading={tagsLoading}
          adminRights={adminRights}
          saving={saving}
          toggleAddIncidentTag={toggleAddIncidentTag}
        />

        <Row>
          <Col span={16}>
            {addressLoading ? (
              <Skeleton paragraph={false} />
            ) : (
              <Row gutter={10} align="middle">
                {primaryAddress && (
                  <Col flex={1}>
                    <Form.Item
                      name="fullAddress"
                      label="Location"
                      tooltip="The location of the incident, you default location is pre-populated but you can select from previous locations or add a new one."
                      style={{ marginBottom: 0 }}
                      rules={[
                        {
                          required: true,
                          message:
                            'Please select or add a new location for the incident.',
                        },
                      ]}
                    >
                      <Input
                        disabled={saving}
                        readOnly
                        bordered={false}
                        style={{ marginBottom: 20 }}
                      />
                    </Form.Item>
                  </Col>
                )}

                <Col>
                  <Button
                    disabled={saving}
                    onClick={toggleAddPreviousLocation}
                    style={{ color: 'red', padding: 8 }}
                    icon={
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        style={{ marginRight: 5 }}
                      />
                    }
                  >
                    Use Previous Locations
                  </Button>
                </Col>
                <Col>
                  <Button
                    disabled={saving}
                    onClick={toggleAddNewLocation}
                    style={{ color: 'red', padding: 8 }}
                    icon={
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: 5 }}
                      />
                    }
                  >
                    Add New Location
                  </Button>
                </Col>
              </Row>
            )}
          </Col>
        </Row>

        {/* <Divider /> */}

        <Profiles
          titleOrder={2}
          saving={saving}
          setEditOffenderId={setEditOffenderId}
          toggleAddExistingOffender={toggleAddExistingOffender}
          toggleAddOffender={toggleAddOffender}
          searchOffenders={searchOffenders}
          setSearchOffenders={setSearchOffenders}
          offendersData={offendersData}
          recentOffenderData={recentOffenderData}
          recentOffenderLoading={recentOffenderLoading}
          setAddRecentOffender={setAddRecentOffender}
          offenderImgChange={offenderImgChange}
          removeOffender={removeOffender}
          // adminRights={adminRights}
          listOffendersData={listOffendersData}
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
          listCrimeGroupsData={listCrimeGroupsData}
        />
        {/* <Divider /> */}
        <ImageSection
          titleOrder={3}
          imgChange={imgChange}
          fileList={fileList}
          beforeUpload={beforeUpload}
          setAssignToImage={setAssignToImage}
          removeImageFromOffender={removeImageFromOffender}
          removeImage={removeImage}
        />
        {/* <Divider /> */}
        <Row align="bottom" style={{ marginBottom: 20 }}>
          <Col>
            <Title style={{ marginBottom: 0 }} level={4}>
              4.
            </Title>
          </Col>
          <Col>
            <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
              Who is it visible to?
            </Title>
          </Col>
          <Col>
            <Paragraph
              style={{ marginBottom: 1, marginLeft: 5 }}
              type="secondary"
              italic
            >
              - Please select the groups that this incident is for.
            </Paragraph>
          </Col>
        </Row>
        {groups.length > 1 && (
          <Row>
            <Col span={8}>
              <Form.Item
                name="groups"
                label="Groups"
                tooltip="Please select the relevant groups to report this incident to, for GDPR it is important that the data is relevant to the groups."
                rules={[
                  {
                    required: true,
                    message:
                      'Please add at least one group that you would like this incident to be visible to.',
                  },
                ]}
              >
                <Select
                  loading={groupsLoading}
                  disabled={saving}
                  mode="multiple"
                  maxTagCount={3}
                  placeholder="Select the groups that you would like this incident to be visible to."
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
        )}

        <Form.Item>
          <Row style={{ marginTop: 30 }} gutter={10} justify="end">
            <Col>
              <Button disabled={saving} onClick={() => window.history.back()}>
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                disabled={saving}
                loading={saving}
                type="primary"
                htmlType="submit"
              >
                Create Incident
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>

    <Drawer
      title="Add Crime Type"
      visible={addIncidentTag}
      width="400"
      onClose={toggleAddIncidentTag}
    >
      {addIncidentTag ? (
        <AddIncidentTag
          update={updateIncidentTag}
          onClose={toggleAddIncidentTag}
        />
      ) : (
        <div />
      )}
    </Drawer>
    <Drawer
      title="Add New Location"
      visible={addNewLocation}
      width="600"
      onClose={toggleAddNewLocation}
    >
      {addNewLocation ? (
        <AddNewLocation
          update={updateNewLocation}
          onClose={toggleAddNewLocation}
        />
      ) : (
        <div />
      )}
    </Drawer>

    <Drawer
      title="Select Previous Locations"
      visible={addPreviousLocation}
      width="600"
      onClose={toggleAddPreviousLocation}
    >
      {addPreviousLocation ? (
        <AddPreviousLocation
          update={updatePreviousLocation}
          onClose={toggleAddPreviousLocation}
        />
      ) : (
        <div />
      )}
    </Drawer>
    <ProfileDrawer
      updateOffender={updateOffender}
      editOffenderId={editOffenderId}
      setEditOffenderId={setEditOffenderId}
      addExistingOffender={addExistingOffender}
      addOffender={addOffender}
      offendersData={offendersData}
      toggleAddExistingOffender={toggleAddExistingOffender}
      toggleAddOffender={toggleAddOffender}
      updateOffendersData={updateOffendersData}
      addNewVehicle={addNewVehicle}
      addExistingVehicle={addExistingVehicle}
      editVehicleId={editVehicleId}
      setEditVehicleId={setEditVehicleId}
      toggleAddNewVehicle={toggleAddNewVehicle}
      toggleAddExistingVehicle={toggleAddExistingVehicle}
      vehiclesData={vehiclesData}
      updateVehiclesData={updateVehiclesData}
      addNewCrimeGroup={addNewCrimeGroup}
      addExistingCrimeGroup={addExistingCrimeGroup}
      editCrimeGroupId={editCrimeGroupId}
      setEditCrimeGroupId={setEditCrimeGroupId}
      toggleAddNewCrimeGroup={toggleAddNewCrimeGroup}
      toggleAddExistingCrimeGroup={toggleAddExistingCrimeGroup}
      crimeGroupsData={crimeGroupsData}
      updateCrimeGroupsData={updateCrimeGroupsData}
      isIncident
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
                backgroundImage: `url(${addRecentOffender?.images[0]?.optimised})`,
                width: 180,
                height: 200,
                backgroundSize: 'cover',
              }}
            />
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

    <AssignImageOffender
      image={newImage || undefined}
      offenderData={offendersData || []}
      onCancel={onCancelNewImage}
      onSubmit={assignOffendersToImages}
    />
  </div>
);
export default EditIncident;
