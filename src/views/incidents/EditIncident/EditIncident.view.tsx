import React from 'react';
import {
  CreateTagMutation,
  ListCrimeGroupsQuery,
  ListOffendersQuery,
  ListVehiclesQuery,
  ViewIncidentQuery,
} from 'graphql/generated';

import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Descriptions,
  Drawer,
  Form,
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

import moment from 'moment';

import AssignImageOffender from 'components/form-components/incident/image/AssignImageOffenders';
import { UploadChangeParam } from 'antd/lib/upload';
import { CrimeGroupData, OffenderData, VehicleData } from 'types/DataType';
import Profiles from 'components/incidents/IncidentForm/Profiles';
import ImageSection from 'components/incidents/IncidentForm/ImageSection';
import ProfileDrawer from 'components/incidents/IncidentForm/ProfileDrawer';
import DebounceSelect from 'components/form-components/DebounceSelect';

const { Title, Paragraph } = Typography;

interface FormData {
  subject: string;
  description: string;
  date: Date;
  value?: number;
  recoveredValue?: number;
  policeReported?: boolean;
  policeInvolved?: boolean;
  policeRef?: string;
  business: {
    label: React.ReactNode;
    value: string;
  };
  groups: string[];
  tags: string[];
  images: [{ id: string; url: string; optimised: string }];
}

interface Image extends UploadFile {
  offenders?: {
    id: string;
    name?: string | undefined | null;
  }[];
  optimised?: string | null;
}

type Offender = Exclude<
  ListOffendersQuery['listOffenders'],
  null | undefined
>['offenders'][0];

interface Props {
  addExistingOffender: boolean;
  addIncidentTag: boolean;
  addOffender: boolean;
  addRecentOffender: Offender | null;
  assignOffendersToImages: (data: {
    image: Image;
    offenders: OffenderData[];
  }) => void;
  beforeUpload: (value: RcFile) => void;
  data: ViewIncidentQuery | undefined;
  fileList: Image[];
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  imgChange: UploadProps['onChange'];
  listOffendersData: ListOffendersQuery | undefined;
  loading: boolean;
  newImage: Image | null;
  offenderImgChange: (
    info: UploadChangeParam<UploadFile>,
    currentId: string
  ) => void;
  offendersData: OffenderData[];
  onCancelNewImage: () => void;
  onPreview: (value: Image) => void;
  onReject: () => void;
  onSubmit: (value: FormData) => void;
  recentOffenderData: ListOffendersQuery | undefined;
  recentOffenderLoading: boolean;
  removeImage: (uid: string) => void;
  removeImageFromOffender: (data: { image: Image; offenderId: string }) => void;
  removeOffender: (offenderId: string) => void;
  reviewed: boolean;
  saving: boolean;
  searchOffenders: string;
  setAddRecentOffender: (value: Offender | null) => void;
  setAssignToImage: (image: Image) => void;
  setSearchOffenders: (value: string) => void;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  toggleAddExistingOffender: () => void;
  toggleAddIncidentTag: () => void;
  toggleAddOffender: () => void;
  updateIncidentTag: MutationUpdaterFn<CreateTagMutation>;
  updateOffendersData: (value: OffenderData) => void;
  editOffenderId: string;
  setEditOffenderId: (arg0: string) => void;
  updateOffender: (value: OffenderData) => void;
  listVehiclesData: ListVehiclesQuery | undefined;
  listCrimeGroupsData: ListCrimeGroupsQuery | undefined;
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
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: React.ReactNode; value: string }[]>;
}

const EditIncident = ({
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
  reviewed,
  onReject,
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
  listOffendersData,
  offenderImgChange,
  editOffenderId,
  setEditOffenderId,
  updateOffender,
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
  listCrimeGroupsData,
  onSearchBusiness,
}: Props): JSX.Element => (
  <div className="list-view">
    <PageHeader
      onBack={() => window.history.back()}
      title={reviewed ? 'Review Incident' : 'Edit Incident'}
    />
    {loading ? (
      <Skeleton />
    ) : (
      <Form<FormData>
        onFinish={onSubmit}
        layout="vertical"
        initialValues={{
          subject: data?.incident?.subject,
          description: data?.incident?.description,
          date: moment(data?.incident?.date, 'YYYY-MM-DD,HH:mm:ss'),
          value: data?.incident?.value || null,
          recoveredValue: data?.incident?.recoveredValue || null,
          business: {
            label: data?.incident?.business?.name,
            value: data?.incident?.business?.id,
          },
          policeInvolved: data?.incident?.policeInvolved,
          policeRef: data?.incident?.policeRef,
          policeReported: data?.incident?.policeReported,
          groups:
            data?.incident?.groups && data?.incident?.groups.length > 0
              ? data?.incident?.groups.map(({ id }) => id)
              : [],
          tags:
            data?.incident?.crimeTypes && data?.incident?.crimeTypes.length > 0
              ? data?.incident?.crimeTypes.map(({ id }) => id)
              : [],
        }}
      >
        <Card style={{ marginBottom: 10 }}>
          <Row style={{ marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0 }} level={4}>
                1.
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                Incident Details
              </Title>
            </Col>
          </Row>
          <Form.Item
            name="tags"
            label="Incident Type"
            tooltip="Select the relevant crime types for this incident, these help to categorise the incident,"
            rules={[
              {
                required: true,
                message: 'Please add at least one crime type.',
              },
            ]}
          >
            <Select
              loading={tagsLoading}
              disabled={saving}
              mode="multiple"
              maxTagCount={3}
              placeholder="Search for a crime type..."
            >
              {tags.map((tag) => (
                <Select.Option value={tag.value}>{tag.label}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Row gutter={16}>
            <Col>
              <Form.Item name="subject" label="Subject">
                <Input style={{ width: 500 }} disabled={saving} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="date"
                label="Time &amp; Date"
                tooltip="The date and time that the incident occurred."
                rules={[
                  {
                    required: true,
                    message: 'Please select a date for the incident.',
                  },
                ]}
              >
                <DatePicker
                  disabled={saving}
                  disabledDate={(current) =>
                    current && current.valueOf() > Date.now()
                  }
                  format="HH:mm - DD/MM/YY"
                  showTime={{ showSecond: false, showNow: true }}
                  placeholder="Set Date &amp; Time"
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="business"
                label="Business"
                rules={[
                  {
                    required: true,
                    message: 'Please select a business for the incident.',
                  },
                ]}
              >
                <DebounceSelect
                  showSearch
                  allowClear
                  disabled={saving}
                  placeholder="Search for a business..."
                  fetchOptions={onSearchBusiness}
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="description"
            label="Description"
            tooltip="A more detailed description of the incident."
            rules={[
              {
                required: true,
                message: 'Please enter a description for the incident.',
              },
            ]}
          >
            <Input.TextArea disabled={saving} />
          </Form.Item>
        </Card>
        <Card style={{ marginBottom: 10 }}>
          <Row align="bottom" style={{ marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0 }} level={4}>
                3.
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                What goods were involved?
              </Title>
            </Col>
          </Row>
        </Card>
        <Card style={{ marginBottom: 10 }}>
          <Row align="bottom" style={{ marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0 }} level={4}>
                6.
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                Police involvement
              </Title>
            </Col>
          </Row>
          <Row gutter={50}>
            <Col>
              <Form.Item
                name="policeReported"
                valuePropName="checked"
                tooltip="The incident has been reported to the police"
                label="Police Involvement"
                style={{ marginBottom: 0 }}
              >
                <Checkbox disabled={saving}>Reported to the police</Checkbox>
              </Form.Item>
              <Form.Item
                name="policeInvolved"
                valuePropName="checked"
                tooltip="The police have been involved in the incident."
              >
                <Checkbox disabled={saving}>Police Involved</Checkbox>
              </Form.Item>
            </Col>

            <Col>
              <Form.Item
                name="policeRef"
                label="Crime Ref No."
                tooltip="The crime reference number provided by the police."
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card style={{ marginBottom: 10 }}>
          <Profiles
            titleOrder={3}
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
        </Card>
        <Card style={{ marginBottom: 10 }}>
          <ImageSection
            titleOrder={4}
            imgChange={imgChange}
            fileList={fileList}
            beforeUpload={beforeUpload}
            setAssignToImage={setAssignToImage}
            removeImageFromOffender={removeImageFromOffender}
            removeImage={removeImage}
            onPreview={onPreview}
          />
        </Card>
        <Card style={{ marginBottom: 10 }}>
          <Row align="bottom" style={{ marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0 }} level={4}>
                5.
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
        </Card>
        <Form.Item>
          <Row style={{ marginTop: 30 }} gutter={10} justify="end">
            <Col>
              <Button
                disabled={saving}
                onClick={() => (reviewed ? onReject() : window.history.back())}
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
    )}
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
